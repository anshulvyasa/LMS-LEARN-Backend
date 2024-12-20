const express = require("express");
const multor = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaToCloudinary,
} = require("../../helper/cloudinary");

const router = express.Router();
const upload = multor({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Uploading File",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Assets Id is required",
      });
    }

    await deleteMediaToCloudinary(id);
    res.status(200).json({
      success: true,
      data: "Assets Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error Deleting File",
    });
  }
});


module.exports=router;
