import { auth } from "@/auth";
import prisma from "@/lib/services/prisma";

export async function getCommentsByTaskId(_: any, args: { taskId: string }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: args.taskId },
      include: { createdBy: true },
      orderBy: { createdAt: "desc" },
    });

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
}

export async function createComment(
  _: any,
  args: { taskId: string; content: string }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Not authenticated");

    const comment = await prisma.comment.create({
      data: {
        content: args.content,
        taskId: args.taskId,
        createdById: userId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating comment:", error);
    return false;
  }
}
