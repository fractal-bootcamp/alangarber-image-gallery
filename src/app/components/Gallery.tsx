import ImageCard from "@/app/components/ImageCard";
import MasonryGrid from "@/app/components/MasonryGrid";
import { Image as ImageType } from "@/types/image";

interface GalleryProps {
  images: ImageType[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <MasonryGrid>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} priority={false} />
      ))}
    </MasonryGrid>
  );
}
