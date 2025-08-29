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
    return res.data;
  } catch (error) {
    throw new Error("Failed to create user");
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
    return true
  } catch (error:any) {
    console.log(error.message);
    return false;
  }
}
