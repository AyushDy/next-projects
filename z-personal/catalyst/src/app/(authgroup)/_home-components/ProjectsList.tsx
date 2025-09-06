"use client";

import MyProjectsCard from "@/components/cards/MyProjectsCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/LoadingSpinner";
import { useUserProjects } from "@/lib/hooks/useProject";
import Link from "next/link";
import { memo, useMemo } from "react";

const ProjectsList = memo(function ProjectsList() {
  const { data: projects, isLoading, error } = useUserProjects();

  const renderedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return null;

    return projects.map((project) => (
      <MyProjectsCard
        key={project.id}
        projectName={project.name}
        ownerImg={project.owner.image}
        slug={project.slug}
      />
    ));
  }, [projects]);

  if (error) {
    return (
      <Card className="p-4 min-h-66 flex items-center justify-center rounded-xs">
        <p>Error loading projects. Please try again.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-lg font-semibold">Your Projects</h2>
        <Link href="/new">
          <Button className="ml-auto bg-green-600 text-white hover:bg-green-700 rounded-xs">
            New Project
          </Button>
        </Link>
      </div>
      <Input
        type="text"
        placeholder="Search projects..."
        className="rounded-xs"
      />
      <div className="flex flex-col space-y-2">
        {renderedProjects ? (
          renderedProjects
        ) : isLoading ? (
          <div className="p-4 flex items-center gap-2 justify-center">
            <Spinner size="sm" />
            <p>Loading projects...</p>
          </div>
        ) : (
          <Card className="p-4 rounded-xs">
            <p>No projects found. Create your first project!</p>
          </Card>
        )}
      </div>
    </>
  );
});

export default ProjectsList;
