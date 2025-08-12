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
}

interface UseGetNewsReturn {
  newsArticles: NewsItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetNews = (): UseGetNewsReturn => {
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/news");
      
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      
      const data = await response.json();
      setNewsArticles(data.newsArticles || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    newsArticles,
    isLoading,
    error,
    refetch: fetchNews,
  };
}; 