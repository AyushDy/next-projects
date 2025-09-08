"use client";

import { AddBoardButton } from "@/components/buttons/AddBoardButton";
import BoardCard from "@/components/cards/BoardCard";
import { Card, CardContent } from "@/components/ui/card";
import { useBoards } from "@/lib/hooks/useBoards";
import { CalendarDays, Loader2 } from "lucide-react";
import React from "react";
import SkeletonBoards from "./skeleton/SkeletonBoards";

export default function ClientBoardsPage({ slug }: { slug: string }) {
  const { data: boards = [], isLoading, error } = useBoards(slug);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header slug={slug} />
        <SkeletonBoards />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header slug={slug} />
        <Card className="border-red-200 rounded-xs">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-600">Failed to load boards</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header slug={slug} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} slug={slug} />
        ))}
      </div>

      {boards.length === 0 && (
        <Card className="border-dashed rounded-xs">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No boards yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Get started by creating your first board to organize your project.
            </p>
            <AddBoardButton slug={slug} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Header({ slug }: { slug: string }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accessible Boards</h1>
          <p className="text-muted-foreground">
            Manage and organize your project boards. Only boards you have access to
            are displayed here.
          </p>
        </div>
        <AddBoardButton slug={slug} />
      </div>
    </>
  );
}
