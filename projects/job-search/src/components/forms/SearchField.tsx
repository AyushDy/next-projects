import { debounce, getJobSuggestions } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SearchSuggestions from "../UI/reusable/SearchSuggestions";

export default function SearchField() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (query.trim()) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedQuery(query.trim());
      }, 300);
    } else {
      setDebouncedQuery("");
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    async function handleSearch() {
      if (debouncedQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setIsLoading(true);
      try {
        abortControllerRef.current = new AbortController();
        const result = await getJobSuggestions(debouncedQuery);

        if (debouncedQuery === query.trim()) {
          const titleArray: any[] = result.data.map((job: any) => job.title);
          setSearchResults([...new Set(titleArray)].slice(0, 8));
          setShowSuggestions(true);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          setSearchResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (debouncedQuery) {
      handleSearch();
    }
  }, [debouncedQuery]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const params = new URLSearchParams(window.location.search);
    params.set("q", query);
    setShowSuggestions(false);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <form
      className="flex relative mx-5 lg:w-2/4 ml-auto bg-card/60 backdrop-blur-sm border border-border/50 hover:border-border p-3 rounded-full text-md transition-all duration-300 shadow-sm hover:shadow-md hover:bg-card/80 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full px-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
        type="text"
        placeholder="Search jobs..."
        value={query}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => setShowSuggestions(searchResults.length > 0)}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-full hover:bg-accent/50"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
      {showSuggestions && (
        <SearchSuggestions
          searchResults={searchResults}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </form>
  );
}
