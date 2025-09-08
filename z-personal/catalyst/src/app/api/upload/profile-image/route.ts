import { auth } from "@/auth";
import cloudinary from "@/lib/services/cloudinary";
import prisma from "@/lib/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
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
            if (error) reject(error);
            else resolve(uploadResult);
          }
        )
        .end(buffer);
    });

    // Update user profile with new image URL
    const imageUrl = (result as any).secure_url;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    return NextResponse.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
