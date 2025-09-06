import { auth } from "@/auth";
import prisma from "@/lib/services/prisma";

export async function createTeam(_: any, args: { name: string; description?: string; image?: string }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }
    await prisma.$transaction(async (tx) => {
      const team = await prisma.team.create({
      data: {
        name: args.name,
        description: args.description,
        image: args.image || "https://www.ibcs.com/wp-content/uploads/2024/01/Projekt-bez-nazwy-15.png",
        teamLeadId: session.user.id,
      },
    });
      await tx.teamMember.create({
        data: {
          teamId: team.id,
          userId: session.user.id,
        },
      });
    });
    return true;
  } catch (error) {
    console.error("Error creating team:", error);
    return false;
  }
}


export async function getTeamsForProject(_: any, args: { slug: string }) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: args.slug },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const projectLinks = await prisma.projectTeam.findMany({
      where: { projectId: project.id },
      include: {
        team: {
          include: {
            teamLead: {
              select: { id: true, name: true, image: true },
            },
            members: {
              include : {
                user:{
                  select: { id: true, name: true, email: true, image: true },
                }
              }
            }
          },
        },
      },
    });
    const teams = projectLinks.map((link) => link.team);
    return teams;
  } catch (error) {
    console.error("Error fetching teams for project:", error);
    return [];
  }
}


export async function addMemberToTeam(_:any, args: { teamId: string; userId: string }) {
  try {
    const session = await auth();
    if(!session || !session.user) {
      throw new Error("Unauthorized");
    }
    
    const teamLead = await prisma.team.findFirst({
      where: {
        id: args.teamId,
        teamLeadId: session.user.id,
      },
    });

    if (!teamLead) {
      throw new Error("Not authorized");
    }

    await prisma.teamMember.create({
      data: {
        teamId: args.teamId,
        userId: args.userId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error adding member to team:", error);
    return false;
  }
}


export async function addTeamToProject(_:any, args: { teamId: string; projectSlug: string }) {
  try {
    const session = await auth();
    if(!session || !session.user) {
      throw new Error("Unauthorized");
    }
    const [team, project] = await Promise.all([
      prisma.team.findUnique({
        where: { id: args.teamId },
      }),
      prisma.project.findUnique({
        where: { slug: args.projectSlug },
      }),
    ]);
    if (!team) {
      throw new Error("Team not found");
    }
    if (!project) {
      throw new Error("Project not found");
    }
    await prisma.projectTeam.create({
      data: {
        projectId: project.id,
        teamId: args.teamId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error adding team to project:", error);
    return false;
  }
}