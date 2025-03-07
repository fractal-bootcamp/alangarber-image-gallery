import { Suspense } from "react";
import { fetchFeaturedImages } from "./lib/api";
import InfiniteGallery from "./components/InfiniteGallery";

export const metadata = {
  title: "Image Gallery | Home",
  description: "Explore curated images from around the world",
};

export default async function Home() {
  const initialImages = await fetchFeaturedImages(15);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Featured Images</h1>
      <Suspense fallback={<p className="text-gray-900">Loading gallery...</p>}>
        <InfiniteGallery initialImages={initialImages} />
      </Suspense>
    </div>
  );
}
