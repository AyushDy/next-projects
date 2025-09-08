import { Suspense } from "react";
import ProjectsList from "./_home-components/ProjectsList";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/LoadingSpinner";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row gap-4 h-full">
      <div className="h-full w-full lg:w-1/4">
        <div className="w-full h-full p-4">
          <Card className="p-4 min-h-66 rounded-xs">
            <ProjectsList />
          </Card>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="w-full h-full p-4">
          <Card className="p-4 w-full min-h-46 flex rounded-xs">
            <p className="text-xl lg:text-2xl text-center">Latest Updates..</p>
            <Suspense
              fallback={
                <div className="flex items-center justify-center">
                  <Spinner size="md" /> <span>Loading...</span>
                </div>
              }
            >
              <p>q</p>
            </Suspense>
          </Card>
        </div>
      </div>

      <div className="hidden lg:block"></div>
    </main>
  );
}
