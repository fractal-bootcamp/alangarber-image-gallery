import { Suspense } from "react";
import { fetchFeaturedImages } from "./lib/api";
import Gallery from "./components/Gallery";

export const metadata = {
  title: "Image Gallery | Home",
  description: "Explore curated images from around the world",
};

export default async function Home() {
  const images = await fetchFeaturedImages(18);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Images</h1>
      <Suspense fallback={<p>Loading gallery...</p>}>
        <Gallery images={images} />
      </Suspense>
    </main>
  );
}
