"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Gallery from "./Gallery";
import { Image as ImageType } from "@/types/image";

interface InfiniteGalleryProps {
  initialImages: ImageType[];
}

export default function InfiniteGallery({
  initialImages,
}: InfiniteGalleryProps) {
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const { ref, inView } = useInView();
  const [prefetchedImages, setPrefetchedImages] = useState<ImageType[]>([]);
  const prefetchingRef = useRef(false);

  // Function to prefetch the next page
  const prefetchNextPage = useCallback(async () => {
    if (prefetchingRef.current || allLoaded) return;

    prefetchingRef.current = true;

    try {
      const response = await fetch(`/api/images?page=${page + 1}`);
      const newImages = await response.json();

      if (newImages.length > 0) {
        setPrefetchedImages(newImages);
      }
    } catch (error) {
      console.error("Error prefetching images:", error);
    } finally {
      prefetchingRef.current = false;
    }
  }, [page, allLoaded]);

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
        const response = await fetch(`/api/images?page=${page + 1}`);
        const newImages = await response.json();

        if (newImages.length === 0) {
          setAllLoaded(true);
        } else {
          setImages((prev) => [...prev, ...newImages]);
          setPage((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error loading more images:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, page, prefetchedImages]);

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
            You&apos;ve reached the end of the gallery
          </p>
        )}
      </div>
    </div>
  );
}
