import { useState, useEffect } from "react";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

interface UseGetGalleryByIdReturn {
  gallery: GalleryItem | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetGalleryById = (id: string | null): UseGetGalleryByIdReturn => {
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    if (!id) {
      setGallery(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/gallery/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch gallery");
      }
      
      const data = await response.json();
      setGallery(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [id]);

  return {
    gallery,
    isLoading,
    error,
    refetch: fetchGallery,
  };
}; 