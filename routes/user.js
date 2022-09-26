const express = require("express");
const Router = express.Router();
const UserSchema = require("../model/user");
const verifyToken = require("../middleware/auth");

Router.get("/get-relationships", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UserSchema.findById(userId);
    const nguoi_than_id = user.RelationshipId;
    if (!nguoi_than_id) {
      return res
        .status(400)
        .json({ success: false, message: "Không có người thân nào" });
    }

    let nguoi_than = await UserSchema.find({ _id: { $in: nguoi_than_id } });
    return res.status(200).json({
      success: true,
      nguoi_than: nguoi_than,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Cập nhật thất bại" });
  }
});

Router.post("/update", verifyToken, async (req, res) => {
  const data = req.body;
  const userId = req.userId;

  try {
    await UserSchema.findByIdAndUpdate(userId, data);
    res.status(200).json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công" });
  }
});

Router.post("/set-role", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    await UserSchema.findByIdAndUpdate(userId, {role:'doctor'});
    res.status(200).json({ success: true, message: "Cập nhật thành công" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Cập nhật không thành công" });
  }
});



module.exports = Router;