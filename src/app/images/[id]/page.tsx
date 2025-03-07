import { fetchImageById } from "@/app/lib/api";
import ImageDetail from "@/app/components/ImageDetail";

interface ImagePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ImagePageProps) {
  const resolvedParams = await params;
  const image = await fetchImageById(resolvedParams.id);
  return {
    title: `Photo by ${image.photographer}`,
    description: image.alt || `A photo by ${image.photographer}`,
    openGraph: {
      images: [{ url: image.src.large }],
    },
  };
}

export default async function ImagePage({ params }: ImagePageProps) {
  const resolvedParams = await params;
  const image = await fetchImageById(resolvedParams.id);

  return <ImageDetail image={image} />;
}
