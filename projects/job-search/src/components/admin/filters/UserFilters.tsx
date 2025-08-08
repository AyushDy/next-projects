"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import Button from "@/components/UI/Button";

interface UserFiltersProps {
  filters: {
    search: string;
    role: string;
    page: number;
  };
  onFilterChange: (
    filters: Partial<{ search: string; role: string; page: number }>
  ) => void;
  loading: boolean;
}

export default function UserFilters({
  filters,
  onFilterChange,
  loading,
}: UserFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFilterChange({ search: searchInput });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleRoleChange = (role: string) => {
    onFilterChange({ role });
  };

  const clearFilters = () => {
    setSearchInput("");
    onFilterChange({ search: "", role: "all" });
  };

  const hasActiveFilters = filters.search || filters.role !== "all";

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/30 rounded-xl p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border/50 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Role:
            </span>
            <select
              value={filters.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={loading}
              className="px-3 py-2 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={loading}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      {isFilterOpen && (
        <div className="sm:hidden space-y-4 pt-4 border-t border-border/30">
          {/* Role Filter */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">Role</span>
            <select
              value={filters.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={loading}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
