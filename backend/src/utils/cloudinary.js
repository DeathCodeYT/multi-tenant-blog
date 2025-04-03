import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
export const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  if (!file) return;
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "image",
    });
    fs.unlinkSync(file);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("Error Uploading File", error);
    return null;
  }
};

export const deleteFromCloudinary = async (fileID) => {
  if (!fileID) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const result = await cloudinary.uploader.destroy(fileID);
    return result;
  } catch (error) {
    console.log("Error Deleting File", error);
    return null;
  }
};
