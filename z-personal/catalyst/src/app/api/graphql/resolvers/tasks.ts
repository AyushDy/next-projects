import { auth } from "@/auth";
import prisma from "@/lib/services/prisma";

export async function createTask(
  _: any,
  args: {
    title: string;
    description?: string;
    columnId: string;
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Not authenticated");

    await prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          title: args.title,
          description: args.description,
          columnId: args.columnId,
          createdById: userId,
        },
      });
      const updatedColumn = await tx.boardColumn.update({
        where: { id: args.columnId },
        data: {
          taskIds: {
            push: task.id,
          },
        },
      });
    });
    return true;
  } catch (error) {
    console.error("Error creating task:", error);
    return false;
  }
}

export async function moveTask(
  _: any,
  args: {
    taskId: string;
    fromColumnId: string;
    toColumnId: string;
    newIndex: number;
  }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Not authenticated");

    const [fromColumn, toColumn] = await Promise.all([
      prisma.boardColumn.findUnique({ where: { id: args.fromColumnId } }),
      prisma.boardColumn.findUnique({ where: { id: args.toColumnId } }),
    ]);

    if (!fromColumn || !toColumn) throw new Error("Column not found");

    if (args.fromColumnId === args.toColumnId) {
      const taskIds = Array.from(new Set([...(fromColumn.taskIds || [])]));
      const currentIndex = taskIds.indexOf(args.taskId);

      if (currentIndex === -1) throw new Error("Task not found in column");

      taskIds.splice(currentIndex, 1);

      taskIds.splice(args.newIndex, 0, args.taskId);

      await prisma.boardColumn.update({
        where: { id: args.fromColumnId },
        data: { taskIds: taskIds },
      });
    } else {
      const fromTaskIds = [...(fromColumn.taskIds || [])];
      const toTaskIds = [...(toColumn.taskIds || [])];

      const taskIndex = fromTaskIds.indexOf(args.taskId);
      if (taskIndex > -1) fromTaskIds.splice(taskIndex, 1);

      toTaskIds.splice(args.newIndex, 0, args.taskId);

      await prisma.$transaction([
        prisma.boardColumn.update({
          where: { id: args.fromColumnId },
          data: { taskIds: fromTaskIds },
        }),
        prisma.boardColumn.update({
          where: { id: args.toColumnId },
          data: { taskIds: toTaskIds },
        }),
        prisma.task.update({
          where: { id: args.taskId },
          data: { columnId: args.toColumnId },
        }),
      ]);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getTaskById(_: any, args: { id: string }) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: args.id },
      include: { createdBy: true },
    });

    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

export async function updateTask(
  _: any,
  args: { taskId: string; updates: { title?: string; description?: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error("Not authenticated");

    await prisma.task.update({
      where: { id: args.taskId },
      data: {
        ...(args.updates.title ? { title: args.updates.title } : {}),
        ...(args.updates.description
          ? { description: args.updates.description }
          : {}),
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    return false;
  }
}

