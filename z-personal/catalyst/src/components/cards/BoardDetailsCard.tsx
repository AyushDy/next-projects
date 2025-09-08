"use client";
import { createPortal } from "react-dom";
import { Kanban, Users } from "lucide-react";
import { useBoardById, useUpdateBoard } from "@/lib/hooks/useBoards";
import { Button } from "../ui/button";
import { Spinner } from "../ui/LoadingSpinner";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AddTeamToBoard from "../AddTeamToBoard";

export default function BoardDetailsCard({
  boardId,
  slug,
  onClose,
}: {
  boardId: string;
  slug: string;
  onClose: () => void;
}) {
  if (typeof window === "undefined") return null;
  const [showTeams, setShowTeams] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");

  const { data: board, isLoading } = useBoardById(boardId);
  const updateBoardMutation = useUpdateBoard(boardId);

  useEffect(() => {
    if (board) {
      setBoardName(board.name);
      setBoardDescription(board.description || "");
    }
  }, [board]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-card border border-border rounded-lg shadow-xl w-full h-[90vh] sm:h-[80vh] lg:h-[70vh] overflow-hidden transition-all duration-300 ${
          showTeams ? "max-w-7xl" : "max-w-sm sm:max-w-2xl lg:max-w-4xl"
        }`}
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <Spinner size="sm" />
            <p className="mt-2 text-muted-foreground">
              Loading board details...
            </p>
          </div>
        ) : board ? (
          <div className="flex flex-col h-full">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-border flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Kanban className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <Label className="text-xs sm:text-sm text-muted-foreground">
                      Board Details
                    </Label>
                    <p className="font-semibold text-sm sm:text-lg truncate">{board.name}</p>
                    <p className="text-xs text-muted-foreground">Only the team Leaders can edit this Board</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-xs text-xs sm:text-sm"
                    onClick={() => {
                        updateBoardMutation.mutate({
                        name: boardName,
                        description: boardDescription,
                      });
                    }}
                  >
                    {updateBoardMutation.isPending ? (
                      <>
                        <Spinner size="sm" /> <span className="hidden sm:inline">Saving...</span>
                      </>
                    ) : (
                      <>Save <span className="hidden sm:inline">Changes</span></>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground rounded-xs"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              <div className="flex-shrink-0 w-full lg:max-w-4xl p-3 sm:p-4 lg:p-6 overflow-y-auto thin-scrollbar">
                <div className="mb-4 sm:mb-6 space-y-2">
                  <Label htmlFor="board-name" className="text-xs sm:text-sm font-medium">
                    Board Name
                  </Label>
                  <Input
                    id="board-name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="w-full rounded-xs text-sm"
                    placeholder="Enter board name..."
                  />
                </div>

                <div className="mb-4 sm:mb-6 space-y-2">
                  <Label
                    htmlFor="board-description"
                    className="text-base sm:text-lg font-semibold flex items-center gap-2"
                  >
                    <Kanban className="h-4 w-4 sm:h-5 sm:w-5" />
                    Description
                  </Label>
                  <Textarea
                    id="board-description"
                    value={boardDescription}
                    onChange={(e) => setBoardDescription(e.target.value)}
                    className="w-full min-h-[80px] sm:min-h-[100px] rounded-xs resize-none text-sm"
                    placeholder="Add board description..."
                  />
                </div>

                <div className="mb-4 sm:mb-6 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-3 sm:gap-0">
                    <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      Assigned Teams ({board.teams?.length || 0})
                    </Label>
                    <Button
                      onClick={() => setShowTeams(!showTeams)}
                      variant="outline"
                      className={`rounded-xs w-full sm:w-auto ${showTeams ? "hidden lg:block" : ""}`}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Manage </span>Teams
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {board.teams?.length ? (
                      board.teams.map((teamAssignment) => (
                        <div
                          key={teamAssignment.id}
                          className="flex items-center gap-1.5 sm:gap-2 bg-muted/50 hover:bg-muted rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 transition-colors"
                        >
                          <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                            <AvatarImage
                              src={teamAssignment.team.image}
                              alt={teamAssignment.team.name}
                            />
                            <AvatarFallback className="text-xs">
                              {teamAssignment.team.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs sm:text-sm font-medium truncate max-w-[100px] sm:max-w-none">
                            {teamAssignment.team.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        No teams assigned yet
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {showTeams && (
                <div className="border-t lg:border-t-0 lg:border-l border-border">
                  <AddTeamToBoard
                    slug={slug}
                    boardId={board.id}
                    setShowTeams={setShowTeams}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load board details.
            </p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
