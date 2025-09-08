"use server";

import { auth } from "@/auth";
import cloudinary from "@/lib/services/cloudinary";
import prisma from "@/lib/services/prisma";

export async function uploadProfileImage(formData: FormData) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      throw new Error("Not authenticated");
    }

    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile_images",
            transformation: [
              { width: 300, height: 300, crop: "fill", gravity: "face" },
            ],
          },
          (error, uploadResult) => {
            if (error) {
              console.error("Cloudinary error:", error);
              reject(error);
            } else {
              resolve(uploadResult);
            }
          }
        )
        .end(buffer);
    });

    const imageUrl = (result as any).secure_url;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    return { success: true, imageUrl };
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return { success: false, imageUrl: null };
  }
}
