"use client";

import { Pagination, Stack } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PaginationButtons({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(_: React.ChangeEvent<unknown>, page: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


  return (
    <div className="w-full">
      <Stack
        spacing={2}
        alignItems="center"
        className="bg-primary/10 text-foreground rounded-full p-2 my-6 mx-auto w-fit"
      >
        <Pagination
          count={totalPages}
          onChange={handleChange}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--foreground)",
              "&:hover": {
                backgroundColor: "var(--accent)",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": {
                backgroundColor: "var(--primary)",
              },
            },
          }}
        />
      </Stack>
    </div>
  );
}
