"use client";

import { Pagination, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PaginationButtons({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleChange(_: React.ChangeEvent<unknown>, page: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(page));
    router.push(`/?${params.toString()}.`);
  }

  return (
    <Stack spacing={2} alignItems="center" className="my-6">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Stack>
  );
}
