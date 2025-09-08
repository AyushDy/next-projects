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

    if (project.ownerId !== session.user.id) {
      throw new Error("Only the project owner can create boards");
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

    const board = await prisma.board.create({
      data: {
        ...parsed.data,
        isDefault: false,
        createdById: session.user.id,
        columns: {
          create: [
            { name: "To Do", order: 0 },
            { name: "In Progress", order: 1 },
            { name: "Done", order: 2 },
          ],
        },
      },
    });

    return true;
  } catch (error) {
    console.error("Error creating board:", error);
    return false;
  }
}

export async function getBoardById(_: any, args: { boardId: string }) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const board = await prisma.board.findUnique({
      where: { id: args.boardId },
      include: {
        columns: { orderBy: { order: "asc" } },
        teams: { include: { team: true } },
      },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  } catch (error) {
    console.error("Error fetching board:", error);
    return null;
  }
}

export async function deleteBoard(_: any, args: { boardId: string }) {
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

export async function addTeamToBoard(
  _: any,
  args: { boardId: string; teamId: string }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const board = await prisma.board.findUnique({
      where: { id: args.boardId },
      include: { project: { select: { ownerId: true } } },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    if (board.project.ownerId !== session.user.id) {
      throw new Error("Only the project owner can add teams to boards");
    }

    const team = await prisma.team.findUnique({
      where: { id: args.teamId },
    });

    if (!team) {
      throw new Error("Team not found");
    }

    await prisma.boardTeam.create({
      data: {
        boardId: board.id,
        teamId: team.id,
        projectId: board.projectId,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding team to board:", error);
    return false;
  }
}

export async function updateBoard(
  _: any,
  args: { boardId: string; name?: string; description?: string }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const board = await prisma.board.findUnique({
      where: { id: args.boardId },
      include: {
        project: {
          select: { ownerId: true },
        },
        teams: { include: { team: { include: { teamLead: true } } } },
      },
    });

    if (!board) {
      throw new Error("Board not found");
    }

    const project = board.project;

    if (project.ownerId !== session.user.id && !board.teams.some(bt => bt.team.teamLeadId === session.user.id)) {
      throw new Error("Only the project owner or team leads can update boards");
    }

    const updatedBoard = await prisma.board.update({
      where: { id: args.boardId },
      data: {
        name: args.name ?? board.name,
        description: args.description ?? board.description,
      },
    });

    return true;
  } catch (error) {
    console.error("Error updating board:", error);
    return null;
  }
}
