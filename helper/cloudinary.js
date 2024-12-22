//This file basically a helper function that deals with lecture instructor uploading and deletion to and from cloudinary  

const cloudinary = require("cloudinary").v2;

//Configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//function that helps in uploading files from cloud 
const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading to cloudinary");
  }
};


//function that helps in deleting files from cloud 
const deleteMediaToCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw new Error("failed to delete assets from cloudinary");
  }
};


module.exports={uploadMediaToCloudinary,deleteMediaToCloudinary};