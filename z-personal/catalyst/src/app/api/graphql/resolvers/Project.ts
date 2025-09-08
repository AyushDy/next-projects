import { auth } from "@/auth";
import prisma from "@/lib/services/prisma";
import { projectSchema } from "@/lib/zod";
import { nanoid } from "nanoid";

function slugify(text: string) {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return `${slug}-${nanoid(8)}`;
}

export async function createProject(
  _: any,
  args: {
    name: string;
    slug?: string;
    description?: string;
    visibility: "PUBLIC" | "PRIVATE";
    createBoard: boolean;
    createTeam: boolean;
  }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const { name, slug: providedSlug, description, visibility } = args;
    const slug = providedSlug || slugify(name);

    const parsed = projectSchema.safeParse({
      name,
      slug,
      description,
      visibility,
    });
    if (!parsed.success) {
      console.error("Invalid project data:", parsed.error.format());
      return false;
    }

    const userId = session.user.id;

    const result = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          ...parsed.data,
          ownerId: userId,
          members: {
            create: {
              userId: userId,
              role: "OWNER",
            },
          },
        },
      });

      let board = null;
      let team = null;

      if (args.createBoard) {
        board = await tx.board.create({
          data: {
            name: `${name} Board`,
            description: `Board for project ${name}`,
            isDefault: true,
            projectId: project.id,
            createdById: session.user.id,
            columns: {
              create: [
                {
                  name: "To Do",
                  order: 0,
                },
                {
                  name: "In Progress",
                  order: 1,
                },
                {
                  name: "Done",
                  order: 2,
                },
              ],
            },
          },
        });
      }

      if (args.createTeam) {
        const createdTeam = await tx.team.create({
          data: {
            name: `${name}'s Team`,
            description: `Team for project ${name}`,
            teamLeadId: userId,
            members: {
              create: {
                userId: userId,
                role: "ADMIN",
              },
            },
          },
        });

        await tx.projectTeam.create({
          data: {
            projectId: project.id,
            teamId: createdTeam.id,
          },
        });

        team = createdTeam;
      }

      if (board && team) {
        await tx.boardTeam.create({
          data: {
            boardId: board.id,
            projectId: project.id,
            teamId: team.id,
          },
        });
      }

      return { project, board, team };
    });

    return true;
  } catch (error) {
    console.error("Error creating project:", error);
    return false;
  }
}

export async function getUserProjects() {
  try {
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          {
            teams: {
              some: {
                team: {
                  members: {
                    some: {
                      userId: session.user.id,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        owner: true,
      },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(_: any, args: { slug: string }) {
  try {
    if (!args.slug) {
      throw new Error("Slug is required");
    }
    const project = await prisma.project.findUnique({
      where: { slug: args.slug },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getProjectBoardsBySlug(_: any, args: { slug: string }) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    if (!args.slug) {
      throw new Error("Slug is required");
    }
    const project = await prisma.project.findUnique({
      where: { slug: args.slug },
      include: {
        members: {
          include: {
            user: {
              select: { id: true },
            },
          },
        },
      },
    });
    if (!project) {
      throw new Error("Project not found");
    }
    const boards = await prisma.board.findMany({
      where: { projectId: project.id },
      include: {
        project: true,
        columns: true,
        teams: {
          include: {
            team: {
              include: {
                members: {
                  include: {
                    user: {
                      select: { id: true },
                    },
                  },
                },
                teamLead: true,
              },
            },
          },
        },
      },
    });
    if (project.ownerId === session.user.id) {
      return boards;
    }
    const accessableBoards = boards.filter((board) =>
      board.teams.some((bt) =>
        bt.team.members.some((m) => m.userId === session.user.id)
      )
    );
    return accessableBoards;
  } catch (error) {
    console.error("Error fetching boards:", error);
    return [];
  }
}

export async function deleteProject(_: any, args: { slug: string }) {
  try {
    if (!args.slug) {
      throw new Error("Slug is required");
    }
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    const project = await prisma.project.findFirst({
      where: {
        AND: [{ slug: args.slug }, { ownerId: session.user.id }],
      },
    });
    if (!project) {
      throw new Error("Project not found");
    }

    if (project.ownerId !== session.user.id) {
      throw new Error("Unauthorized");
    }

    const deletedProject = await prisma.project.delete({
      where: { slug: args.slug },
    });

    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
}

export async function updateProject(
  _: any,
  args: {
    slug: string;
    name?: string;
    description?: string;
    visibility?: "PUBLIC" | "PRIVATE";
  }
) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }

    const { slug, name, description, visibility } = args;

    const project = await prisma.project.findFirst({
      where: {
        AND: [{ slug }, { ownerId: session.user.id }],
      },
    });

    if (!project) {
      throw new Error("Project not found or unauthorized");
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (visibility !== undefined) updateData.visibility = visibility;

    await prisma.project.update({
      where: { slug },
      data: updateData,
    });

    return true;
  } catch (error) {
    console.error("Error updating project:", error);
    return false;
  }
}

export async function isUniqueProjectSlug(_: any, args: { slug: string }) {
  try {
    if (!args.slug) {
      throw new Error("Slug is required");
    }
    const project = await prisma.project.findUnique({
      where: { slug: args.slug },
    });
    return project === null;
  } catch (error) {
    console.error("Error checking project slug uniqueness:", error);
    return false;
  }
}
