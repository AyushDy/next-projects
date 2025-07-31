"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
};

export default function FilterCard({ filters }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const router = useRouter();

  function handleChange(section: string, value: string) {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: value,
    }));

    const params = new URLSearchParams(window.location.search);
    params.set(section,value);
    router.push(`?${params.toString()}`);
  }

  return filters.map((section) => (
    <div
      key={section.name}
      className="w-full mb-5 min-h-40 text-white border p-5 opacity-40 rounded border-white/30 bg-white/10"
    >
      <form className="grid grid-cols-1">
        <fieldset className="flex flex-col">
          <legend className="mb-2">{section.title}</legend>
          {section.options.map((option) => (
            <div key={option.value} className="flex">
              <input
                type="radio"
                name={section.name}
                id={`${section.name}-${option.value}`}
                className="accent-black"
                onChange={() => handleChange(section.name, option.value)}
                checked={selectedFilters[section.name] === option.value}
              />
              <label
                className="text-white mx-2"
                htmlFor={`${section.name}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </fieldset>
      </form>
    </div>
  ));
}
