"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useColumns, useCreateBoardColumn } from "@/lib/hooks/useColumns";
import {
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";

export default function AddColumnButton({ boardId }: { boardId: string }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const addColumnMutation = useCreateBoardColumn();
  const { columns } = useColumnsContext() as ColumnsContextType;
  const { isLoading } = useColumns(boardId);

  return (
    <>
      {!adding ? (
        <Button
          variant="default"
          onClick={() => setAdding(true)}
          className="w-full"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add a List
        </Button>
      ) : (
        <form
          className="w-full space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!boardId) return;
            if (!name.trim()) return;
            addColumnMutation.mutate({
              name: name.trim(),
              boardId,
              order: Math.max(0, ...(columns?.map((c) => c.order) || [0])) + 1,
            });
            if (addColumnMutation.isSuccess) {
              setName("");
              setAdding(false);
            }
          }}
        >
          <Input
            placeholder="Enter list title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setAdding(false);
                setName("");
              }
            }}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              size="sm"
              className="flex-1"
            >
              {isLoading ? "Adding..." : "Add List"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setAdding(false);
                setName("");
              }}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
