import { auth } from "@/auth";
import { Task } from "@/lib/hooks/useBoards";
import prisma from "@/lib/services/prisma";

export async function getBoardColumns(_: any, args: { boardId: string }) {
  try {
    const columns = await prisma.boardColumn.findMany({
      where: { boardId: args.boardId },
      include: {
        tasks: {
          orderBy: { position: "asc" },
          include: {
            assignees: {
              include: {
                user: true,
                team: true,
              },
            },
            createdBy: true,
          },
        },
      },
    });

    return columns;
  } catch (error) {
    console.error("Error fetching board columns:", error);
    return [];
  }
}

export async function addBoardColumn(_: any, args: {
  boardId : string;
  name : string;
  order : number;
}) {
  try {
    const session = await auth();
    if(!session?.user){
      throw new Error("unauthorized");
    }

    const board = await prisma.board.findUnique({
      where : {id : args.boardId}
    });

    if(!board) return false;
    
    await prisma.boardColumn.create({
      data : {
        boardId : args.boardId,
        name : args.name,
        order : args.order
      }
    })
    return true;
  } catch (error) {
    console.error("error creating column",error);
    return false;
  }
}

export async function syncBoardColumns(
  _: any,
  args: {
    newTasks: Array<Omit<Task, "id"> & { tempId: string }>;
    updatedTasks: Array<{ id: string; updates: Partial<Task> }>;
    columnChanges: Array<{ id: string; taskIds: string[] }>;
  }
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Not authenticated");

    await prisma.$transaction(async (tx) => {
      const tempIdToRealId = new Map<string, string>();

      if (args.newTasks.length > 0) {
        for (const task of args.newTasks) {
          const createdTask = await tx.task.create({
            data: {
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
              columnId: task.columnId,
              createdById: userId,
            },
          });

          tempIdToRealId.set(task.tempId, createdTask.id);
        }
      }

      for (const { id, updates } of args.updatedTasks) {
        if (tempIdToRealId.has(id)) continue;

        const { columnId, createdBy, assignees, ...restUpdates } = updates;
        await tx.task.update({
          where: { id },
          data: restUpdates,
        });
      }

      for (const column of args.columnChanges) {
        const realTaskIds = column.taskIds.map(
          (id) => tempIdToRealId.get(id) || id
        );
        const filteredtaskIds = realTaskIds.filter(
          (id) => !id.startsWith("tmp_")
        );
        await tx.boardColumn.update({
          where: { id: column.id },
          data: { taskIds: filteredtaskIds },
        });
      }
    });

    return true;
  } catch (error) {
    console.error("Error syncing board columns:", error);
    return false;
  }
}
