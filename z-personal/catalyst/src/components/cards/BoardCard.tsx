import { CalendarDays, Edit, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DeleteBoardButton } from "../buttons/DeleteBoardButton";
import { Button } from "../ui/button";
import Link from "next/link";
import { BoardWithRelations } from "@/lib/hooks/useBoards";
import { useState } from "react";
import BoardDetailsCard from "./BoardDetailsCard";
import { useAuthContext } from "../context/AuthContextProvider";

export default function BoardCard({
  board,
  slug,
}: {
  board: BoardWithRelations;
  slug: string;
}) {
  const [showBoardDetails, setShowBoardDetails] = useState(false);
  const { session } = useAuthContext();
  return (
    <Card
      key={board.id}
      className="hover:shadow-md transition-shadow cursor-pointer rounded-xs"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{board.name}</CardTitle>
          {board.isDefault && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-xs font-medium">
              Default
            </span>
          )}
        </div>
        {board.description && (
          <CardDescription className="line-clamp-2">
            {board.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{board.columns?.length || 0} columns</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{board.teams?.length || 0} team(s)</span>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex items-center gap-2 pt-4 mt-2 border-t">
        <Link href={`/${slug}/${board.id}`}>
          <Button className="ml-auto rounded-xs">Open Board</Button>
        </Link>
        <Button
          variant={"outline"}
          className="ml-auto rounded-xs"
          onClick={() => setShowBoardDetails(true)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        {session?.user.id === board.createdById && (
          <DeleteBoardButton boardId={board.id} slug={slug} />
        )}
      </CardContent>

      {showBoardDetails && (
        <BoardDetailsCard
          slug={slug}
          boardId={board.id}
          onClose={() => setShowBoardDetails(false)}
        />
      )}
    </Card>
  );
}
