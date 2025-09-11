"use client";
import ColumnsContextProvider from "@/components/context/ColumnsContextProvider";
import { useColumns } from "@/lib/hooks/useColumns";
import { use } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = use(params);
  const { data: columns } = useColumns(boardId);

  return (
    <ColumnsContextProvider initialColumns={columns}>
      {children}
    </ColumnsContextProvider>
  );
}
