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

export default function BoardCard({ board, slug }: { board: BoardWithRelations, slug: string }) {
  return (
    <Card
      key={board.id}
      className="hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{board.name}</CardTitle>
          {board.isDefault && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
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
          <Button className="ml-auto">
            Open Board
          </Button>
        </Link>
        <Button variant={"outline"} className="ml-auto">
          <Edit className="h-4 w-4" />
        </Button>
        <DeleteBoardButton boardId={board.id} slug={slug} />
      </CardContent>
    </Card>
  );
}
