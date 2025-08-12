import { useState, useEffect } from "react";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  photoGallery: string[];
  slug: string;
  publishDate: string;
  createdAt: string;
  updatedAt?: string;
}

interface UseGetNewsByIdReturn {
  newsArticle: NewsItem | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetNewsById = (id: string | null): UseGetNewsByIdReturn => {
  const [newsArticle, setNewsArticle] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsArticle = async () => {
    if (!id) {
      setNewsArticle(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/news/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch news article");
      }
      
      const data = await response.json();
      setNewsArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsArticle();
  }, [id]);

  return {
    newsArticle,
    isLoading,
    error,
    refetch: fetchNewsArticle,
  };
}; 