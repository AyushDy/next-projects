"use client";

import { AddBoardButton } from "@/components/buttons/AddBoardButton";
import BoardCard from "@/components/cards/BoardCard";
import { Card, CardContent } from "@/components/ui/card";
import { useBoards } from "@/lib/hooks/useBoards";
import { CalendarDays, Loader2 } from "lucide-react";
import React from "react";
import SkeletonBoards from "./skeleton/SkeletonBoards";

export default function ClientTeamsPage({ slug }: { slug: string }) {


  return (
    <div className="space-y-6">
      <Header slug={slug} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      </div>

      
    </div>
  );
}

function Header({ slug }: { slug: string }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">
            Manage and organize the teams affiliated with your project.
          </p>
        </div>
        
      </div>
    </>
  );
}
