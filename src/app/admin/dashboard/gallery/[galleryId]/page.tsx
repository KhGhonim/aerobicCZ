"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaImage, FaTrash, FaSave } from "react-icons/fa";
import { useGetGalleryById } from "@/Hooks/Gallery/useGetGalleryById";
import { useUpdateGallery } from "@/Hooks/Gallery/useUpdateGallery";
import Image from "next/image";

export default function EditGalleryPage() {
  const params = useParams();
  const router = useRouter();
  const galleryId = params.galleryId as string;

  const { gallery, isLoading, error } = useGetGalleryById(galleryId);
  const {
    formData,
    handleChange,
    handleImageChange,
    removeImage,
    setFormData,
    updateGallery,
    isLoading: isUpdating,
  } = useUpdateGallery();

  useEffect(() => {
    if (gallery) {
      setFormData({
        title: gallery.title,
        description: gallery.description || "",
        category: gallery.category || "",
        tags: gallery.tags ? gallery.tags.join(", ") : "",
        images: [],
        existingImages: gallery.images,
      });
    }
  }, [gallery, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateGallery(galleryId);
    if (success) {
      router.push("/admin/dashboard/gallery");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Gallery not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/admin/dashboard/gallery")}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Edit Gallery
            </h1>
            <p className="text-gray-600">
              Update the gallery: {gallery.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter gallery title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter category"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter gallery description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter tags (comma separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Leave empty to keep current)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              💡 You can upload up to 10 images total in this update (existing images stay as they are). Max 6MB per upload, 4MB per image.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="galleryImages"
              />
              <label
                htmlFor="galleryImages"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaImage className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload new gallery images
                </span>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  New Images ({formData.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={100}
                        height={100}
                        quality={100}
                        src={URL.createObjectURL(image)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.existingImages && formData.existingImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Current gallery images:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {formData.existingImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={100}
                        height={100}
                        quality={100}
                        src={image}
                        alt={`Current image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedImages = [...(formData.existingImages || [])];
                          updatedImages.splice(index, 1);
                          setFormData({
                            ...formData,
                            existingImages: updatedImages
                          });
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/gallery")}
              className="px-6 py-3 border border-gray-300 text-gray-700 cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUpdating}
              className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <FaSave className="w-4 h-4" />
              <span>{isUpdating ? "Updating..." : "Update Gallery"}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 