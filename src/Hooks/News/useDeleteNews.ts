import { useState } from "react";
import toast from "react-hot-toast";

interface UseDeleteNewsReturn {
  deleteNews: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export const useDeleteNews = (): UseDeleteNewsReturn => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteNews = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete news");
      }

      toast.success("News deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete news");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteNews, isDeleting };
}; 