import { auth } from "@/auth";
import prisma from "@/lib/services/prisma";
import { boardSchema } from "@/lib/zod";

export async function createBoard(
  _: any,
  args: {
    name: string;
    description: string;
    projectId: string;
    teamId?: string;
  }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const projectId = args.projectId;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const parsed = boardSchema.safeParse({
      name: args.name,
      description: args.description,
      projectId,
    });

    if (!parsed.success) {
      console.error("Invalid board data:", parsed.error.format());
      return false;
    }

    const res = await prisma.$transaction(async (tx) => {
      const board = await tx.board.create({
        data: {
          ...parsed.data,
          isDefault: false,
          columns: {
            create: [
              { name: "To Do", order: 0 },
              { name: "In Progress", order: 1 },
              { name: "Done", order: 2 },
            ],
          },
        },
      });

      if(args.teamId){
        const team = await tx.boardTeam.create({
          data: {
            boardId: board.id,
            projectId: project.id,
            teamId: args.teamId,
          },
        });
      }
    });
    return true;
  } catch (error) {
    console.error("Error creating board:", error);
    return false;
  }
}


export async function deleteBoard(_:any, args:{boardId:string}) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const board = await prisma.board.findUnique({
      where: { id: args.boardId },
      include: { project: true },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    if (board.isDefault) {
      throw new Error("Cannot delete default board");
    }

    if (board.project.ownerId !== session.user.id) {
      throw new Error("Only the project owner can delete boards");
    }

    await prisma.board.delete({
      where: { id: args.boardId },
    });

    return true;
  } catch (error) {
    console.error("Error deleting board:", error);
    return false;
  }
}


