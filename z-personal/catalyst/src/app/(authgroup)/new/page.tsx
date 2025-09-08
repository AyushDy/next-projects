import { NewProjectForm } from "@/components/forms/NewProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-8">
        <div className="mb-6 sm:mb-8 max-w-xl mx-auto text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            Create a new project
          </h1>
          <p className="text-muted-foreground text-sm sm:text-md max-w-2xl mx-auto">
            Creating a new project will help you organize your task boards and
            collaborate with your teams effectively.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <NewProjectForm />
          </div>
        </div>
      </div>
    </main>
  );
}
