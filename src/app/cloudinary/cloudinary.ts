import { v2 as cloudinary } from "cloudinary";

export async function uploadImageToCloudinary(dataUri: string): Promise<string> {
    process.loadEnvFile("./secrets/.env");
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(dataUri, { folder: "evently" });
    return result.secure_url;
}
