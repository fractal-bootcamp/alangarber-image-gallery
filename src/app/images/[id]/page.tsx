import PhotoDetailPage, { generateMetadata } from "@/app/components/photo";

interface ImagePageProps {
  params: {
    id: string;
  };
}

export { generateMetadata };

export default function ImagePage(props: ImagePageProps) {
  return <PhotoDetailPage {...props} />;
}
