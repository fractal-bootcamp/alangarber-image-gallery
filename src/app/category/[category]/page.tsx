import { Suspense } from "react";
import { fetchImagesByCategory } from "@/app/lib/api";
import Gallery from "@/app/components/Gallery";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = params.category;
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Images`,
    description: `Explore ${category} images from our collection`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const images = await fetchImagesByCategory(category);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Images</h1>
      <Suspense fallback={<p>Loading category images...</p>}>
        <Gallery images={images} />
      </Suspense>
    </main>
  );
}
