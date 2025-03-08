import PhotoDetailPage from "@/app/components/PhotoDetail";
import { fetchImageById } from "@/app/lib/api";
import type { Metadata } from "next";

interface ImagePageProps {
  params: Promise<{ id: string }>;
}

// Define generateMetadata directly here to satisfy Next.js 15 constraints
export async function generateMetadata({
  params,
}: ImagePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const image = await fetchImageById(resolvedParams.id);

  return {
    title: `${image.alt || "Photo"} by ${image.photographer}`,
    description: image.alt || `A photo by ${image.photographer}`,
    openGraph: {
      title: `${image.alt || "Photo"} by ${image.photographer}`,
      description: image.alt || `A photo by ${image.photographer}`,
      images: [
        {
          url: image.src.large,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
      type: "article",
      tags: ["photography", "image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${image.alt || "Photo"} by ${image.photographer}`,
      description: image.alt || `A photo by ${image.photographer}`,
      images: [image.src.large],
    },
    authors: [
      {
        name: image.photographer,
        url: image.photographer_url,
      },
    ],
  };
}

export default async function ImagePage(props: ImagePageProps) {
  // Resolve the params before passing to PhotoDetailPage
  const resolvedParams = await props.params;

  // Create a new props object with the resolved params
  const photoProps = {
    params: resolvedParams,
  };

  return <PhotoDetailPage {...photoProps} />;
}
