import { auth } from "@/auth";
import MyProjectsCard from "@/components/cards/MyProjectsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GET_USER_PROJECTS } from "@/lib/grapgql/query";
import gqlClient from "@/lib/services/gql";
import { Project } from "@prisma/client";
import Link from "next/link";

export default async function ProjectsList() {
  const session = await auth();
  if (!session?.user) {
    return (
      <Card className="p-4 min-h-66 flex items-center justify-center">
        <p>You need to be logged in to view your projects.</p>
      </Card>
    );
  }

  const projects = (await gqlClient.request(GET_USER_PROJECTS, {
    userId: session.user.id,
  })) as { getUserProjects: (Project & { owner: { image: string } })[] };
  const projectsList = projects.getUserProjects;

  return (
    <>
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <Link href="/new">
          <Button className="ml-auto bg-green-600 text-white hover:bg-green-700">
            New Project
          </Button>
        </Link>
      </div>
      <Input type="text" placeholder="Search projects..." />
      <div className="flex flex-col space-y-2">
        {projectsList &&
          projectsList.map((project) => (
            <MyProjectsCard
              key={project.id}
              projectName={project.name}
              ownerImg={project.owner.image}
              slug={project.slug}
            />
          ))}
      </div>
    </>
  );
}
