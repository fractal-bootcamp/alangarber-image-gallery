import { Suspense } from "react";
import { searchImages } from "@/app/lib/api";
import Gallery from "@/app/components/Gallery";

interface SearchPageProps {
  searchParams?: {
    q?: string;
  };
}

export const metadata = {
  title: "Search Images",
  description: "Search for images in our collection",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || "";
  const result = query ? await searchImages(query) : { photos: [] };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search results for "${query}"` : "Search for images"}
      </h1>

      {query && (
        <p className="mb-6 text-gray-600">
          Found {result.total_results} results
        </p>
      )}

      <Suspense fallback={<p>Searching...</p>}>
        {result.photos.length > 0 ? (
          <Gallery images={result.photos} />
        ) : (
          query && <p>No images found for &quot;{query}&quot;</p>
        )}
      </Suspense>
    </main>
  );
}
