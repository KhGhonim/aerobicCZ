import { useState } from "react";
import toast from "react-hot-toast";
import { MAX_FILE_SIZE, MAX_IMAGES, MAX_UPLOAD_SIZE_PER_REQUEST, VALIDATION_MESSAGES } from "@/Utils/constants";
import { uploadManyToCloudinary, uploadToCloudinary } from "@/Utils/ClientCloudinary";

interface NewsFormData {
  title: string;
  description: string;
  content: string;
  slug: string;
  mainImage: File | null;
  photoGallery: File[];
  publishDate: string;
  existingMainImage?: string;
  existingPhotoGallery?: string[];
}

interface UseUpdateNewsReturn {
  formData: NewsFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhotoGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhotoFromGallery: (index: number) => void;
  setFormData: (data: NewsFormData | ((prev: NewsFormData) => NewsFormData)) => void;
  updateNews: (id: string) => Promise<boolean>;
  isLoading: boolean;
}

export const useUpdateNews = (): UseUpdateNewsReturn => {
  const [formData, setFormDataState] = useState<NewsFormData>({
    title: "",
    description: "",
    content: "",
    slug: "",
    mainImage: null,
    photoGallery: [],
    publishDate: new Date().toISOString().split('T')[0],
    existingMainImage: "",
    existingPhotoGallery: [],
  });

  const setFormData = (data: NewsFormData | ((prev: NewsFormData) => NewsFormData)) => {
    setFormDataState(data);
  };

  const [isLoading, setIsLoading] = useState(false);

  const getPlannedUploadBytes = (extraGalleryFiles: File[] = [], extraMain: File | null = null) => {
    const galleryBytes = [...formData.photoGallery, ...extraGalleryFiles].reduce((sum, f) => sum + f.size, 0);
    const mainBytes = (extraMain ?? formData.mainImage)?.size ?? 0;
    return galleryBytes + mainBytes;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title and update both at once
    if (name === 'title' && value.trim()) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: slug,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > MAX_FILE_SIZE) {
      toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
      return;
    }

    const plannedBytes = getPlannedUploadBytes([], file);
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return;
    }

    setFormData(prev => ({
      ...prev,
      mainImage: file,
    }));
  };

  const handlePhotoGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      photoGallery: [...prev.photoGallery, ...files],
    }));
  };

  const removePhotoFromGallery = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photoGallery: prev.photoGallery.filter((_, i) => i !== index),
    }));
  };

  const updateNews = async (id: string): Promise<boolean> => {
    if (!formData.title || !formData.content || !formData.slug) {
      toast.error("Please fill in all required fields (title, content, and slug)");
      return false;
    }

    if (formData.photoGallery.length > MAX_IMAGES) {
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
      // 1) Upload new media to Cloudinary
      const newMainImageUrl = formData.mainImage
        ? await uploadToCloudinary(formData.mainImage, { folder: "news" })
        : null;
      const newGalleryUrls = await uploadManyToCloudinary(formData.photoGallery, { folder: "news" });

      // 2) Send JSON with existing + new URLs
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          slug: formData.slug,
          publishDate: formData.publishDate,
          existingMainImage: formData.existingMainImage,
          existingPhotoGallery: formData.existingPhotoGallery,
          mainImage: newMainImageUrl,
          photoGallery: newGalleryUrls,
        }),
      });

      const raw = await response.text();
      let result= null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        const message = result?.error || raw || "Failed to update news";
        throw new Error(message);
      }

      toast.success("News updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update news");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleMainImageChange,
    handlePhotoGalleryChange,
    removePhotoFromGallery,
    setFormData,
    updateNews,
    isLoading,
  };
}; 