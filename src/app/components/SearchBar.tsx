"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(currentQuery);

  // Update local state when URL parameters change
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Create a new URL with updated search params
      const params = new URLSearchParams(searchParams);
      params.set("q", query);

      // Force a refresh by using router.push even if on the same page
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 text-blue-600 hover:text-blue-800"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </form>
  );
}
