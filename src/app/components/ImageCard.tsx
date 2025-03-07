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
    <div className="group relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-blue-500 transition-colors duration-300">
      <Link href={`/images/${image.id}`}>
        <div className="aspect-[16/9] relative bg-gray-200">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={image.src.large}
            alt={image.alt || "Gallery image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZANgsc1/aQAAAABJRU5ErkJggg=="
            priority={priority}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm font-medium truncate text-white">
              By {image.photographer}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
