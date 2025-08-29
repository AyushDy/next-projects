import { NewProjectForm } from "@/components/forms/NewProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-2">
        <div className="mb-4 max-w-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Create a new project
          </h1>
          <p className="text-muted-foreground text-md max-w-2xl mx-auto">
            Creating a new project will help you organize your task boards and
            collaborate with your teams effectively.
          </p>
        </div>
        <div className="flex justify-center">
          <NewProjectForm />
        </div>
      </div>
    </main>
  );
}
