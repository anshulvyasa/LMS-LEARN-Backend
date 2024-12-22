//this file contains routes that will deals with cloudinary

const express = require("express");
const multor = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaToCloudinary,
} = require("../../helper/cloudinary");

const router = express.Router();
const upload = multor({ dest: "uploads/" });


//this route is to used to upload a file to cloudinary
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result =await uploadMediaToCloudinary(req.file.path);
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


//this route handle is for deleting a file from cloudinary
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

module.exports = router;
