"use client";

import Link from "next/link";

export default function SearchSuggestions({searchResults, onClose}:{searchResults: string[], onClose: () => void}){


    if (!searchResults || searchResults.length === 0) {
        return null;
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-14 z-50 flex rounded-b-xl flex-col bg-background/80 dark:bg-background border-2  border-white/10 backdrop-blur-2xl   w-11/12 space-y-1 p-2 text-foreground">
            {searchResults.map((result,index) => (
                <Link onClick={onClose} href={`/jobs?q=${result}`} key={result+index} className=" hover:bg-primary/20 rounded cursor-pointer">
                    {result}
                </Link>
            ))}
        </div>
    )
}