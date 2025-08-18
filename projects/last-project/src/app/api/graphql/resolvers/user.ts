import { getUserFromCookies } from "@/lib/helper";
import { generateToken } from "@/lib/services/jwt";
import prisma from "@/lib/services/prisma";
import { RoleType } from "@prisma/client";
import { cookies } from "next/headers";

export async function loginUser(
  _: any,
  args: {
    userCred: string;
    password: string;
  }
) {
  try {
    const cookieStore = await cookies();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: args.userCred as string },
          { email: args.userCred as string },
        ],
      },
    });
    if (!user) return false;
    if (user.password == args.password) {
      const token = generateToken({ id: user.id });
      cookieStore.set("token", token);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    role: RoleType;
  }
) {
  try {
    const _user = await getUserFromCookies();
    if (_user?.role !== "admin") return null;
    const user = await prisma.user.create({ data: args });
    return user ? user : null;
  } catch (error) {
    return null;
  }
}

export async function updateUserRole(
  _: any,
  args: {
    userId: string;
    role: RoleType;
  }
) {
  try {
    const _user = await getUserFromCookies();
    if (_user?.role !== "admin") return null;
    const updatedUser = await prisma.user.update({
      where: { id: args.userId },
      data: { role: args.role },
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateUserProfile(
  _: any,
  args: {
    userId: string;
    name?: string;
    email?: string;
    avatar?: string;
    username?: string;
  }
) {
  try {
    const currentUser = await getUserFromCookies();
    if (currentUser?.role !== "admin" && currentUser?.id !== args.userId)
      return false;
    await prisma.user.update({
      where: { id: args.userId },
      data: {
        name: args.name,
        email: args.email,
        avatar: args.avatar,
        username: args.username,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}


export async function getAllUsers(
  _:any,
  args:{
    role : "staff" | "manager"
  }
){
  const roleToFind = args?.role || null;
  try {
    const users = await prisma.user.findMany({
      where:{
        AND : [
          { role : { not : "admin" } },
          { role : roleToFind }
        ]
      }
    })
    return users;
  } catch (error) {
    return null;
  }
}

export async function logoutUser(){
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", "",{
      maxAge: 0
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteUser(
  _: any,
  args: {
    userId: string;
  }
) {
  try {
    const _user = await getUserFromCookies();
    if (_user?.role !== "admin") return false;
    const deletedUser = await prisma.user.delete({
      where: { id: args.userId },
    });
    return deletedUser ? true : false;
  } catch (error) {
    return false;
  }
}
