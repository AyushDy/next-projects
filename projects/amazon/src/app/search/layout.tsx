
import React from "react";
import FilterSidebar from "@/components/FilterSidebar";

export default function SearchLayout({  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex">
            <FilterSidebar />
            <div className="">{children}</div>
        </div>
    </div>
  );
}