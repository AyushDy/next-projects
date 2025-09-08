import { DeleteProjectButton } from "@/components/buttons/DeleteProjectButton";
import { ProjectSettingsForm } from "@/components/forms/ProjectSettingsForm";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Project Settings</h1>
        <p className="text-muted-foreground">
          Manage your project configuration and preferences.
        </p>
      </div>

      <ProjectSettingsForm slug={slug} />

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold text-destructive mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete this project and all its data.
        </p>
        <DeleteProjectButton slug={slug} />
      </div>
    </main>
  );
}
