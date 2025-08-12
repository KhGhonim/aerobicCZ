import { useState } from "react";
import toast from "react-hot-toast";
import { MAX_FILE_SIZE, MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST, VALIDATION_MESSAGES } from "@/Utils/constants";

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  images: File[];
  existingImages?: string[];
}

interface UseUpdateGalleryReturn {
  formData: GalleryFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  setFormData: (data: GalleryFormData) => void;
  updateGallery: (id: string) => Promise<boolean>;
  isLoading: boolean;
}

export const useUpdateGallery = (): UseUpdateGalleryReturn => {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "",
    tags: "",
    images: [],
    existingImages: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const getPlannedUploadBytes = (extraFiles: File[] = []) => {
    return [...formData.images, ...extraFiles].reduce((sum, f) => sum + f.size, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} new images allowed per update.`);
      return;
    }

    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        toast.error(`File ${f.name} is not an image`);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
        return;
      }
    }

    const plannedBytes = getPlannedUploadBytes(files);
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateGallery = async (id: string): Promise<boolean> => {
    if (!formData.title) {
      toast.error("Title is required");
      return false;
    }

    if (formData.images.length > MAX_IMAGES) {
      toast.error(`You can upload up to ${MAX_IMAGES} new images per update.`);
      return false;
    }

    const plannedBytes = getPlannedUploadBytes();
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return false;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("tags", formData.tags);

      if (formData.existingImages && formData.existingImages.length > 0) {
        data.append("existingImages", JSON.stringify(formData.existingImages));
      }

      formData.images.forEach((file) => {
        data.append("images", file);
      });

      const response = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        body: data,
      });

      const raw = await response.text();
      let result = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        const message = result?.error || raw || "Failed to update gallery";
        throw new Error(message);
      }

      toast.success("Gallery updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating gallery:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update gallery");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleImageChange,
    removeImage,
    setFormData,
    updateGallery,
    isLoading,
  };
}; 