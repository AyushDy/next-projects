import { auth } from "@/auth";
import cloudinary from "@/lib/services/cloudinary";
import prisma from "@/lib/services/prisma";
import axios from "axios";
import { signIn } from "next-auth/react";

export async function createUser(
  _: any,
  args: {
    email: string;
    name: string;
    password: string;
    image?: string;
    bio?: string;
  }
) {
  try {
    const { email, name, password, image, bio } = args;
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
      {
        email,
        name,
        password,
        image,
        bio,
      }
    );
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

export async function login(
  _: any,
  args: {
    email: string;
    password: string;
  }
) {
  try {
    await signIn("credentials", {
      email: args.email,
      password: args.password,
      redirect: true,
      callbackUrl: "/",
    });
    return true;
  } catch (error: any) {
    return false;
  }
}

export async function getUserByEmail(_: any, args: { email: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: args.email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}

export async function updateUser(
  _: any,
  args: { name?: string; email?: string; bio?: string; image?: string }
) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const { ...data } = args;
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
}

export const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    if (!file) {
      throw new Error("No file provided");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "blog_posts" }, (error, uploadResult) => {
          if (error) reject(error);
          resolve(uploadResult);
        })
        .end(buffer);
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Not authenticated");
    }

    if (!session.user?.id) {
      throw new Error("User ID not found in session");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
}

export async function getCurrentUserTeams() {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const teams = await prisma.team.findMany({
      where: {
        OR: [
          { teamLeadId: session.user.id },
          { members: { some: { id: session.user.id } } },
        ],
      },
      include: {
        teamLead: true,
        members: {
          include: {
            user: true,
          },
        },
        projectLinks: {
          include: {
            project: true,
          },
        },
      },
    });

    return teams;
  } catch (error) {
    console.error("Error fetching user teams:", error);
    return [];
  }
}
