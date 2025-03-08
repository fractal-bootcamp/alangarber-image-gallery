"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const [prefetchedImages, setPrefetchedImages] = useState<ImageType[]>([]);
  const prefetchingRef = useRef(false);

  // Reset state when query changes
  useEffect(() => {
    setImages(initialImages);
    setPage(1);
    setLoading(false);
    setAllLoaded(initialImages.length >= totalResults);
    setPrefetchedImages([]);
    prefetchingRef.current = false;
  }, [query, initialImages, totalResults]);

  // Function to prefetch the next page
  const prefetchNextPage = useCallback(async () => {
    if (prefetchingRef.current || allLoaded) return;

    prefetchingRef.current = true;

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&page=${page + 1}`,
      );
      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        setPrefetchedImages(data.photos);
      }
    } catch (error) {
      console.error("Error prefetching search results:", error);
    } finally {
      prefetchingRef.current = false;
    }
  }, [query, page, allLoaded]);

  const loadMoreImages = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);

    try {
      // Use prefetched images if available
      if (prefetchedImages.length > 0) {
        setImages((prev) => [...prev, ...prefetchedImages]);
        setPage((prev) => prev + 1);
        setPrefetchedImages([]);
      } else {
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
      }
    } catch (error) {
      console.error("Error loading more search results:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, query, page, prefetchedImages]);

  // Prefetch next page when current page is loaded
  useEffect(() => {
    if (!loading && !allLoaded) {
      prefetchNextPage();
    }
  }, [page, loading, allLoaded, prefetchNextPage]);

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView, loadMoreImages]);

  // Initial prefetch
  useEffect(() => {
    prefetchNextPage();
  }, [prefetchNextPage]);

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
