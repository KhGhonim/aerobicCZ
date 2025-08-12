import { NewsURL } from "@/Keys/Keys";
import { useState } from "react";
import toast from "react-hot-toast";
import { MAX_IMAGES, MAX_FILE_SIZE, MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH, VALIDATION_MESSAGES, MAX_UPLOAD_SIZE_PER_REQUEST } from "@/Utils/constants";
import { uploadManyToCloudinary, uploadToCloudinary } from "@/Utils/ClientCloudinary";

interface NewsFormData {
  title: string;
  description: string;
  content: string;
  mainImage: File | null;
  photoGallery: File[];
  slug: string;
  publishDate: string;
}

export const usePostNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    description: "",
    content: "",
    mainImage: null,
    photoGallery: [],
    slug: "",
    publishDate: new Date().toISOString().split('T')[0], // Default to today's date
  });

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
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
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

  // Handler for main image
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

    setFormData(prev => ({ ...prev, mainImage: file }));
  };

  // Single handler for photo gallery - adds multiple photos with limit
  const handlePhotoGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentCount = formData.photoGallery.length;
    
    if (currentCount + files.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed per upload. You can add ${MAX_IMAGES - currentCount} more images.`);
      return;
    }

    // validate each file and total planned bytes
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
      photoGallery: [...prev.photoGallery, ...files] 
    }));
  };

  // Remove individual photo from gallery
  const removePhotoFromGallery = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      photoGallery: prev.photoGallery.filter((_, i) => i !== index) 
    }));
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      mainImage: null,
      photoGallery: [],
      slug: "",
      publishDate: new Date().toISOString().split('T')[0],
    });
  };

  const validateNewsData = (data: NewsFormData): boolean => {
    // Check for required fields
    if (!data.title || data.title.trim() === "") {
      toast.error("Title is required");
      return false;
    }

    // Description is optional, so we skip this validation

    if (!data.content || data.content.trim() === "") {
      toast.error("Content is required");
      return false;
    }

    if (!data.slug || data.slug.trim() === "") {
      toast.error("Slug is required");
      return false;
    }

    if (!data.mainImage) {
      toast.error("Main image is required");
      return false;
    }

    // Validate field lengths
    if (data.title.length > MAX_TITLE_LENGTH) {
      toast.error(VALIDATION_MESSAGES.TITLE_TOO_LONG);
      return false;
    }

    if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      toast.error(VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG);
      return false;
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(data.slug)) {
      toast.error("Slug must contain only lowercase letters, numbers, and hyphens");
      return false;
    }

    // Validate main image
    if (!data.mainImage.type.startsWith("image/")) {
      toast.error("Main image must be an image file");
      return false;
    }

    if (data.mainImage.size > MAX_FILE_SIZE) {
      toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
      return false;
    }

    // Validate photo gallery count
    if (data.photoGallery.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed per upload`);
      return false;
    }

    // Validate photo gallery images
    for (const image of data.photoGallery) {
      if (!image.type.startsWith("image/")) {
        toast.error(`File ${image.name} is not an image`);
        return false;
      }

      if (image.size > MAX_FILE_SIZE) {
        toast.error(VALIDATION_MESSAGES.FILE_TOO_LARGE);
        return false;
      }
    }

    // Validate total planned upload size (main + gallery)
    const plannedBytes = getPlannedUploadBytes();
    if (plannedBytes > MAX_UPLOAD_SIZE_PER_REQUEST) {
      toast.error(VALIDATION_MESSAGES.TOTAL_UPLOAD_TOO_LARGE + " - You are allowed 6MB per upload");
      return false;
    }

    return true;
  };

  const postNews = async (e?: React.FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);

      // Validate data
      if (!validateNewsData(formData)) {
        return false;
      }

      // 1) Upload main image and gallery to Cloudinary
      const mainImageUrl = formData.mainImage
        ? await uploadToCloudinary(formData.mainImage, { folder: "news" })
        : null;
      const galleryUrls = await uploadManyToCloudinary(formData.photoGallery, { folder: "news" });

      // 2) Send JSON with URLs
      const response = await fetch(`${NewsURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          slug: formData.slug,
          publishDate: formData.publishDate,
          mainImage: mainImageUrl,
          photoGallery: galleryUrls,
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
        const message = result?.error || raw || "Failed to create news";
        throw new Error(message);
      }

      toast.success("News created successfully!");
      resetFormData();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create news";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  const captureContent = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content: content,
    }));
  };

  return {
    formData,
    handleChange,
    handleMainImageChange,
    handlePhotoGalleryChange,
    removePhotoFromGallery,
    resetFormData,
    postNews,
    captureContent,
    isLoading,
    error,
    maxImages: MAX_IMAGES,
  };
};
