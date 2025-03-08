import { Suspense } from "react";
import SearchContent from "../components/SearchContent";

interface SearchPageProps {
  searchParams?: Promise<{ q?: string }>;
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        {query ? `Search results for "${query}"` : "Search for images"}
      </h1>

      <Suspense fallback={<p className="text-gray-900">Searching...</p>}>
        <SearchContent query={query} />
      </Suspense>
    </div>
  );
}
