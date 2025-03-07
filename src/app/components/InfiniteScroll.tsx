"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
  children,
}: InfiniteScrollProps) {
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const loadMoreItems = async () => {
      if (inView && hasMore && !loading) {
        setLoading(true);
        await loadMore();
        setLoading(false);
      }
    };

    loadMoreItems();
  }, [inView, hasMore, loading, loadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={ref} className="w-full py-8 flex justify-center">
          {loading ? (
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-100" />
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-200" />
            </div>
          ) : (
            <div className="h-16" />
          )}
        </div>
      )}
    </>
  );
}
