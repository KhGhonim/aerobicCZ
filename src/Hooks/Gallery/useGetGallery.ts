import { useState, useEffect } from "react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  category?: string;
  tags?: string[];
  createdAt: string;
}

interface UseGetGalleryReturn {
  galleries: GalleryItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetGallery = (): UseGetGalleryReturn => {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/gallery");
      
      if (!response.ok) {
        throw new Error("Failed to fetch galleries");
      }
      
      const data = await response.json();
      setGalleries(data.galleries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  return {
    galleries,
    isLoading,
    error,
    refetch: fetchGalleries,
  };
}; 