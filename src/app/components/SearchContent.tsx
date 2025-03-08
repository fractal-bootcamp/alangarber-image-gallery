"use client";

import { useState, useEffect } from "react";
import InfiniteSearchResults from "./InfiniteSearchResults";
import { Image as ImageType } from "@/types/image";

interface SearchContentProps {
  query: string;
}

export default function SearchContent({ query }: SearchContentProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setImages([]);
        setTotalResults(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Use the API route instead of direct function call
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const result = await response.json();
        setImages(result.photos || []);
        setTotalResults(result.total_results || 0);
      } catch (err) {
        console.error("Error searching images:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <p>Loading search results...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (query && images.length === 0) {
    return <p>No images found for &quot;{query}&quot;</p>;
  }

  if (!query) {
    return <p>Enter a search term to find images</p>;
  }

  return (
    <>
      {query && (
        <p className="mb-6 text-gray-600">Found {totalResults} results</p>
      )}

      <InfiniteSearchResults
        initialImages={images}
        query={query}
        totalResults={totalResults}
      />
    </>
  );
}
