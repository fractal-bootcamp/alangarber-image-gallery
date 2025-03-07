import Image from "next/image";
import Link from "next/link";
import { Image as ImageType } from "@/types/image";

interface ImageDetailProps {
  image: ImageType;
}

export default function ImageDetail({ image }: ImageDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-[60vh]">
          <Image
            src={image.src.original || image.src.large}
            alt={image.alt || "Detailed image view"}
            fill
            className="object-contain"
            sizes="100vw"
            priority={true}
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">
            Photo by {image.photographer}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Details</h2>
              {image.width && <p>Width: {image.width}px</p>}
              {image.height && <p>Height: {image.height}px</p>}
              <p>ID: {image.id}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Colors</h2>
              <div className="flex flex-wrap gap-2">
                {/* Add color swatches if available */}
              </div>
            </div>
          </div>

          {image.photographer_url && (
            <div className="mt-4">
              <Link
                href={image.photographer_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                View photographer profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
