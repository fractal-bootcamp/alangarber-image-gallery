"use client";

import { useState, useEffect, useCallback } from "react";
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

  const loadMoreImages = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/images?page=${page + 1}`);
      const newImages = await response.json();

      if (newImages.length === 0) {
        setAllLoaded(true);
      } else {
        setImages((prev) => [...prev, ...newImages]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading more images:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, allLoaded, page]);

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
            You&apos;ve reached the end of the gallery
          </p>
        )}
      </div>
    </div>
  );
}
