import { useState } from "react";
import toast from "react-hot-toast";

interface UseDeleteGalleryReturn {
  deleteGallery: (id: string) => Promise<void>;
  isDeleting: boolean;
}

export const useDeleteGallery = (): UseDeleteGalleryReturn => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteGallery = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete gallery");
      }

      toast.success("Gallery deleted successfully");
    } catch (error) {
      console.error("Error deleting gallery:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete gallery");
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteGallery, isDeleting };
}; 