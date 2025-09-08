import { useGetTeamsByProject } from "@/lib/hooks/useTeams";
import { Button } from "./ui/button";
import { useAddTeamToBoard } from "@/lib/hooks/useBoards";

export default function AddTeamToBoard({
  slug,
  boardId,
  setShowTeams,
}: {
  slug: string;
  boardId: string;
  setShowTeams: (show: boolean) => void;
}) {
  const { data: teams, isLoading } = useGetTeamsByProject(slug);
  const addTeamToBoardMutation = useAddTeamToBoard(boardId);

  return (
    <div className="flex-1 border-l border-border p-6 overflow-y-auto thin-scrollbar bg-muted/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Team Assignment</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTeams(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </Button>
      </div>
      <div className="text-center text-muted-foreground">
        {isLoading ? (
          <p>Loading teams...</p>
        ) : teams && teams.length > 0 ? (
          <div className="flex flex-col w-full p-8">
            <h3 className="text-md font-medium mb-4">Teams in this Project:</h3>
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => {
                  addTeamToBoardMutation.mutate({ teamId: team.id, boardId });
                }}
                className="flex items-center justify-between p-2 rounded-xs cursor-pointer hover:bg-accent transition-all duration-200"
              >
                <h4 className="font-semibold">{team.name}</h4>
              </div>
            ))}
          </div>
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </div>
  );
}
