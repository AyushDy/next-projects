"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("q") as string;

    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set("q", query);
      router.push(`/search?${searchParams.toString()}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        className="flex-1 outline-0  p-2 bg-white text-gray-800 rounded-l"
        type="search"
        name="q"
        placeholder="Search?"
      />
      <button className=" p-2 bg-[#f0b511] rounded-r ">
        <Search className="text-gray-800" />
      </button>
    </form>
  );
}
