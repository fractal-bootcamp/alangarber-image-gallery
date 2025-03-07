"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageType } from "@/types/image";

interface ImageCardProps {
  image: ImageType;
  priority: boolean;
}

export default function ImageCard({ image, priority }: ImageCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300 shadow-sm hover:shadow-md">
      <Link href={`/images/${image.id}`}>
        <div className="aspect-[4/3] relative bg-gray-200">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={image.src.medium} // Use medium size for consistency
            alt={image.alt || "Gallery image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-300"
            onLoad={() => setIsLoaded(true)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZANgsc1/aQAAAABJRU5ErkJggg=="
            priority={priority}
          />
        </div>
        <div className="p-2 bg-white">
          <p className="text-sm font-medium truncate text-gray-900">
            By {image.photographer}
          </p>
        </div>
      </Link>
    </div>
  );
}
