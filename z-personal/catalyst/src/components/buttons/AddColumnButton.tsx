"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useColumns, useCreateBoardColumn } from "@/lib/hooks/useColumns";
import { ColumnsContextType, useColumnsContext } from "../context/ColumnsContextProvider";

export default function AddColumnButton({ boardId }: { boardId: string }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const addColumnMutation = useCreateBoardColumn();
  const { columns } = useColumnsContext() as ColumnsContextType;
  const { isLoading } = useColumns(boardId);

  return (
    <>
      {!adding ? (
        <Button variant={"outline"} onClick={() => setAdding(true)}>
          <PlusIcon className="mr-2" /> Add a List
        </Button>
      ) : (
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (!boardId) return;
            if (!name.trim()) return;
            addColumnMutation.mutate({
              name: name.trim(),
              boardId,
              order: Math.max(0, ...(columns?.map(c => c.order) || 0 )) + 1 ,
            });
            addColumnMutation.isSuccess && setName("");
            addColumnMutation.isSuccess && setAdding(false);
          }}
        >
          <Input
            placeholder="Enter list title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2 py-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add List"}
            </Button>
            <Button variant={"outline"} onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
