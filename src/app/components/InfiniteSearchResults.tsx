"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Gallery from "./Gallery";
import { Image as ImageType } from "@/types/image";

interface InfiniteSearchResultsProps {
  initialImages: ImageType[];
  query: string;
  totalResults: number;
}

export default function InfiniteSearchResults({
  initialImages,
  query,
  totalResults,
}: InfiniteSearchResultsProps) {
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(
    initialImages.length >= totalResults,
  );
  const { ref, inView } = useInView();

  const loadMoreImages = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&page=${page + 1}`,
      );
      const data = await response.json();

      if (data.photos.length === 0) {
        setAllLoaded(true);
      } else {
        setImages((prev) => [...prev, ...data.photos]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more search results:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, query, page]);

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView, loadMoreImages]);

  return (
    <div>
      <Gallery images={images} />

      <div ref={ref} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {allLoaded && (
          <p className="text-gray-600">
            You&apos;ve reached the end of the search results
          </p>
        )}
      </div>
    </div>
  );
}
