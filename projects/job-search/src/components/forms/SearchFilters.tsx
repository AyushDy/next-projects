"use client";

import React, { useEffect } from "react";
import FilterCard, { FilterSection } from "../cards/FilterCard";
import PriceFilterCard from "../cards/PriceFilterCard";

export default function SearchFilters() {
  const [queryParams ,setQueryParams] = React.useState<URLSearchParams>()
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setQueryParams(params);
  }, []);
  const filters: FilterSection[] = [
    {
      title: "Job Type",
      name: "jobType",
      options: [
        { label: "Remote", value: "remote" },
        { label: "On-site", value: "on-site" },
        { label: "Hybrid", value: "hybrid" },
      ],
    },
    {
      title: "Employment Type",
      name: "employmentType",
      options: [
        { label: "Full Time", value: "Full-time" },
        { label: "Part Time", value: "Part-time" },
        { label: "Contractor", value: "Contractor" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <FilterCard filters={filters} queryParams={queryParams} />
      <PriceFilterCard />
    </div>
  );
}