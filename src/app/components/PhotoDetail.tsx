import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchImageById } from "@/app/lib/api";

interface PhotoProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PhotoProps): Promise<Metadata> {
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

export default async function PhotoDetailPage({ params }: PhotoProps) {
  const resolvedParams = await params;
  const image = await fetchImageById(resolvedParams.id);

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {image.alt || "Untitled Photo"}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="relative rounded-lg overflow-hidden bg-muted">
          <div className="aspect-[16/9] relative">
            <Image
              src={image.src.original || image.src.large}
              alt={image.alt || "Photo"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About this photo</h2>
            <p className="text-muted-foreground">
              {image.alt || "No description available"}
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Photographer</h2>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-muted overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt={image.photographer}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">
                  {image.photographer_url ? (
                    <Link
                      href={image.photographer_url}
                      className="hover:underline"
                      target="_blank"
                    >
                      {image.photographer}
                    </Link>
                  ) : (
                    image.photographer
                  )}
                </h3>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              {image.width && (
                <>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Width
                  </dt>
                  <dd className="text-sm">{image.width}px</dd>
                </>
              )}

              {image.height && (
                <>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Height
                  </dt>
                  <dd className="text-sm">{image.height}px</dd>
                </>
              )}

              <dt className="text-sm font-medium text-muted-foreground">ID</dt>
              <dd className="text-sm">{image.id}</dd>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
