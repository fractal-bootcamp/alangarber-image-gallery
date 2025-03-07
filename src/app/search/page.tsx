import { Suspense } from "react";
import { searchImages } from "@/app/lib/api";
import InfiniteSearchResults from "@/app/components/InfiniteSearchResults";
import { Image as ImageType } from "@/types/image";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";
  return {
    title: query ? `Search results for "${query}"` : "Search Images",
    description: `Image search results for "${query}"`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams?.q || "";

  let images: ImageType[] = [];
  let totalResults = 0;

  if (query) {
    try {
      const result = await searchImages(query);
      images = result.photos;
      totalResults = result.total_results;
    } catch (error) {
      console.error("Error searching images:", error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        {query ? `Search results for "${query}"` : "Search for images"}
      </h1>

      {query && (
        <p className="mb-6 text-gray-600">Found {totalResults} results</p>
      )}

      <Suspense fallback={<p className="text-gray-900">Searching...</p>}>
        {images.length > 0 ? (
          <InfiniteSearchResults
            initialImages={images}
            query={query}
            totalResults={totalResults}
          />
        ) : (
          query && (
            <p className="text-gray-900">
              No images found for &quot;{query}&quot;
            </p>
          )
        )}
      </Suspense>
    </div>
  );
}
