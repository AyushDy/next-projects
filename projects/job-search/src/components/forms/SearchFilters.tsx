"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FilterCard, { FilterSection } from "../cards/FilterCard";

export default function SearchFilters() {
  const [jobtype, setJobType] = useState<string>("");
  const router = useRouter();

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
    <>
        <FilterCard filters={filters} />
    </>
  );
}
