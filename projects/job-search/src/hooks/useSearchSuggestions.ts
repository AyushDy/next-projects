"use client";

import { getJobSuggestions } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function useSearchSuggestions() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  // Initialize query from URL params without triggering suggestions
  useEffect(() => {
    setQuery(initialQuery);
    setIsInitialized(true);
  }, [initialQuery]);

  // Debounce query changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.trim()) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedQuery(query.trim());
      }, 300);
    } else {
      setDebouncedQuery("");
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, isInitialized]);

  // Fetch suggestions
  useEffect(() => {
    async function fetchSuggestions() {
      if (!isInitialized || debouncedQuery.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
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
          const titleArray: string[] = result.data.map((job: any) => job.title);
          const uniqueTitles = [...new Set(titleArray)].slice(0, 6);
          setSuggestions(uniqueTitles);
          setShowSuggestions(uniqueTitles.length > 0);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching suggestions:", error);
        }
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (debouncedQuery && isInitialized) {
      fetchSuggestions();
    }
  }, [debouncedQuery, query, isInitialized]);

  // Cleanup on unmount
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

  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  }, []);

  const handleInputFocus = useCallback(() => {
    if (suggestions.length > 0 && query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  }, [suggestions.length, query]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow click events to fire
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  }, []);

  const hideSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    isLoading,
    handleSuggestionSelect,
    handleInputFocus,
    handleInputBlur,
    hideSuggestions,
  };
}
