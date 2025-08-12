import { GalleryURL } from "@/Keys/Keys";
import { useState } from "react";
import toast from "react-hot-toast";
import { MAX_IMAGES, MAX_FILE_SIZE, MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_CATEGORY_LENGTH, VALIDATION_MESSAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  images: File[];
}

export const usePostGallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({
    title: "",
    description: "",
    category: "",
    tags: "",
    images: [],
  });

  const getPlannedUploadBytes = (extraFiles: File[] = []) => {
    return [...formData.images, ...extraFiles].reduce((sum, f) => sum + f.size, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed per upload. Please select fewer images.`);
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
    
    setFormData(prev => ({ ...prev, images: files }));
  };

  const addImage = (image: File) => {
    if (formData.images.length >= MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed per upload. Cannot add more images.`);
      return;
    }

    if (!image.type.startsWith("image/")) {
      toast.error(`File ${image.name} is not an image`);
      return;
    }

    if (image.size > MAX_FILE_SIZE) {
      toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
      return;
    }

    const plannedBytes = getPlannedUploadBytes([image]);
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return;
    }
    
    setFormData(prev => ({ ...prev, images: [...prev.images, image] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      images: [],
    });
  };

  const validateGalleryData = (data: GalleryFormData): boolean => {
    // Check for required fields
    if (!data.title || data.title.trim() === "") {
      toast.error("Title is required");
      return false;
    }

    if (!data.images || data.images.length === 0) {
      toast.error("At least one image is required");
      return false;
    }

    // Validate image count
    if (data.images.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed per upload`);
      return false;
    }

    // Validate field lengths
    if (data.title.length > MAX_TITLE_LENGTH) {
      toast.error(VALIDATION_MESSAGES.TITLE_TOO_LONG);
      return false;
    }

    if (data.description && data.description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error(VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG);
      return false;
    }

    if (data.category && data.category.length > MAX_CATEGORY_LENGTH) {
      toast.error(VALIDATION_MESSAGES.CATEGORY_TOO_LONG);
      return false;
    }

    // Validate image files
    for (const image of data.images) {
      if (!image.type.startsWith("image/")) {
        toast.error(`File ${image.name} is not an image`);
        return false;
      }

      if (image.size > MAX_FILE_SIZE) {
        toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
        return false;
      }
    }

    // Validate total planned upload size
    const plannedBytes = getPlannedUploadBytes();
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return false;
    }

    return true;
  };

  const postGallery = async (e?: React.FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);

      // Validate data
      if (!validateGalleryData(formData)) return false;

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("category", formData.category);
      submitFormData.append("tags", formData.tags);

      // Add images to FormData
      formData.images.forEach((image) => {
        submitFormData.append("images", image);
      });

      const response = await fetch(`${GalleryURL}`, {
        method: "POST",
        body: submitFormData,
      });

      const raw = await response.text();
      let result= null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        const message = result?.error || raw || "Failed to create gallery";
        throw new Error(message);
      }

      toast.success("Gallery created successfully!");
      resetFormData();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create gallery";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleImageChange,
    addImage,
    removeImage,
    resetFormData,
    postGallery,
    isLoading,
    error,
    maxImages: MAX_IMAGES,
  };
};
