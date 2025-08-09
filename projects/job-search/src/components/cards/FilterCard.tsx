"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterSection = {
  title: string;
  name: string;
  options: FilterOption[];
};

export type Props = {
  filters: FilterSection[];
  queryParams?: URLSearchParams;
};

export default function FilterCard({ filters, queryParams }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const employmentType = searchParams.get("employmentType");
  const jobType = searchParams.get("jobType");

  useEffect(() => {
    if (employmentType) {
      setSelectedFilters((prev) => ({
        ...prev,
        ["employmentType"]: employmentType,
      }));
    }
    if(jobType){
      setSelectedFilters((prev)=>({
        ...prev,
        ["jobType"]: jobType
      }))
    }
  }, []);

  function handleChange(section: string, value: string) {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: value,
    }));
    const params = new URLSearchParams(searchParams.toString());
    params.set(section, value);
    router.push(`?${params.toString()}`);
  }

  function clearFilter(section: string) {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[section];
      return updated;
    });
    const params = new URLSearchParams(window.location.search);
    filters.forEach((filter) => params.delete(section));
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="space-y-5">
      {filters.map((section) => (
        <div
          key={section.name}
          className="w-full min-h-40 text-foreground border border-border/50 p-5 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <form className="grid grid-cols-1">
            <fieldset className="flex flex-col">
              <legend className="mb-4 text-lg font-semibold text-foreground">
                {section.title}
              </legend>
              <div className="space-y-3">
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center group">
                    <input
                      type="radio"
                      name={section.name}
                      id={`${section.name}-${option.value}`}
                      className="w-4 h-4 text-primary bg-background accent-black  border-border rounded transition-colors duration-200"
                      onChange={() => handleChange(section.name, option.value)}
                      checked={selectedFilters[section.name] === option.value}
                    />
                    <label
                      className="text-foreground ml-3 cursor-pointer group-hover:text-primary transition-colors duration-200 select-none"
                      htmlFor={`${section.name}-${option.value}`}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            {Object.keys(selectedFilters).includes(section.name) && (
              <button
                onClick={() => clearFilter(section.name)}
                className="w-full mt-4 px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted/80 border border-border/50 hover:border-border rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      ))}
    </div>
  );
}
