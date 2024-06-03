const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error('File path is required');
    }
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'avatars',
    });
    
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    throw new Error('Failed to upload image');
  }
};

module.exports = uploadImage;
