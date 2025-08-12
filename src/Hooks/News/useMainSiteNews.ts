import { useState, useEffect } from "react";

/**
 * Custom hook for fetching and formatting news articles for the main site
 * 
 * This hook fetches news articles from the API and formats them for display
 * on the main site news page. It includes:
 * - Automatic read time calculation based on content length
 * - Date formatting for display
 * - Loading and error states
 * - Data transformation to match the expected component interface
 * 
 * @returns {UseMainSiteNewsReturn} Object containing formatted news articles, loading state, error state, and refetch function
 */

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

interface FormattedNewsItem {
  id: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  slug: string;
}

interface UseMainSiteNewsReturn {
  newsArticles: FormattedNewsItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Helper function to calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes} minute${readTimeMinutes !== 1 ? 's' : ''}`;
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const useMainSiteNews = (): UseMainSiteNewsReturn => {
  const [newsArticles, setNewsArticles] = useState<FormattedNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      
      const data = await response.json();
      const rawNewsArticles = data.newsArticles || [];
      
      // Transform the data to match the expected format for the main site
      const formattedNews = rawNewsArticles.map((article: NewsItem) => ({
        id: article._id,
        image: article.mainImage,
        date: formatDate(article.publishDate),
        readTime: calculateReadTime(article.content),
        title: article.title,
        description: article.description,
        slug: article.slug
      }));
      
      setNewsArticles(formattedNews);
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