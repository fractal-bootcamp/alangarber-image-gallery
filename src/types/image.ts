export interface Image {
  id: number;
  src: {
    original?: string;
    large: string;
    medium: string;
  };
  alt?: string;
  photographer: string;
  width?: number;
  height?: number;
  photographer_url?: string;
}
