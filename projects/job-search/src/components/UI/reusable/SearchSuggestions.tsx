"use client";

import { Loader2 } from "lucide-react";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isLoading: boolean;
}

export default function SearchSuggestions({
  suggestions,
  onSelect,
  isLoading,
}: SearchSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/30 rounded-lg shadow-lg z-50">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Searching...
          </span>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-accent/50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg border-b border-border/20 last:border-b-0"
          onClick={() => onSelect(suggestion)}
          type="button"
        >
          <span className="block truncate">{suggestion}</span>
        </button>
      ))}
    </div>
  );
}
