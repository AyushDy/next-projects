import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchSuggestions } from "@/hooks/useSearchSuggestions";
import SearchSuggestions from "../UI/reusable/SearchSuggestions";

export default function SearchField() {
  const router = useRouter();
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    isLoading,
    handleSuggestionSelect,
    handleInputFocus,
    handleInputBlur,
    hideSuggestions,
  } = useSearchSuggestions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams(window.location.search);
    params.set("q", query.trim());
    hideSuggestions();
    router.push(`/jobs?${params.toString()}`);
  };

  const onSuggestionSelect = (suggestion: string) => {
    handleSuggestionSelect(suggestion);
    const params = new URLSearchParams(window.location.search);
    params.set("q", suggestion);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="relative mx-5 lg:w-2/4 ml-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-background/80 backdrop-blur-sm border border-border/50 hover:border-border rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
          <input
            className="w-full px-4 py-3 outline-none bg-transparent text-foreground placeholder:text-muted-foreground text-sm"
            type="text"
            placeholder="Search for jobs, companies, or skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10 mr-1 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={onSuggestionSelect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
