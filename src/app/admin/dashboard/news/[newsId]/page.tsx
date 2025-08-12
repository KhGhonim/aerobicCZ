"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaImage, FaTrash, FaSave } from "react-icons/fa";
import { useGetNewsById } from "@/Hooks/News/useGetNewsById";
import { useUpdateNews } from "@/Hooks/News/useUpdateNews";
import Image from "next/image";
import RichTextEditor from "@/Components/Admin/RichTextEditor";

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.newsId as string;

  const { newsArticle, isLoading, error } = useGetNewsById(newsId);
  const {
    formData,
    handleChange,
    handleMainImageChange,
    handlePhotoGalleryChange,
    removePhotoFromGallery,
    setFormData,
    updateNews,
    isLoading: isUpdating,
  } = useUpdateNews();

  // Populate form with existing data when news article is loaded
  useEffect(() => {
    if (newsArticle) {
      setFormData({
        title: newsArticle.title,
        description: newsArticle.description,
        content: newsArticle.content,
        slug: newsArticle.slug,
        publishDate: newsArticle.publishDate ? new Date(newsArticle.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        mainImage: null,
        photoGallery: [],
        existingMainImage: newsArticle.mainImage,
        existingPhotoGallery: newsArticle.photoGallery,
      });
    }
  }, [newsArticle]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateNews(newsId);
    if (success) {
      router.push("/admin/dashboard/news");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

  if (!newsArticle) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">News article not found</div>
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
            onClick={() => router.push("/admin/dashboard/news")}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Edit News Article
            </h1>
            <p className="text-gray-600">
              Update the news article: {newsArticle.title}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter news title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="news-article-slug"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date *
              </label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter news description (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => handleChange({ target: { name: 'content', value } } as React.ChangeEvent<HTMLTextAreaElement>)}
              placeholder="Enter news content with rich formatting..."
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image (Leave empty to keep current)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
                id="mainImage"
              />
              <label
                htmlFor="mainImage"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaImage className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.mainImage ? formData.mainImage.name : "Click to upload new main image"}
                </span>
              </label>
            </div>
            {/* Show both current and new main images */}
            <div className="mt-4 space-y-4">
                            {/* Current main image */}
              {newsArticle.mainImage && formData.existingMainImage !== "" && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current main image:</p>
                  <div className="relative inline-block">
                    <Image
                      width={100}
                      height={100}
                      quality={100}
                      src={newsArticle.mainImage}
                      alt="Current main image"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        existingMainImage: "" 
                      }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* New main image preview */}
              {formData.mainImage && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">New main image preview:</p>
                  <div className="relative inline-block">
                    <Image
                      width={100}
                      height={100}
                      quality={100}
                      src={URL.createObjectURL(formData.mainImage)}
                      alt="New main image preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mainImage: null }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Gallery (Leave empty to keep current)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              💡 You can upload up to 10 images total in this update (existing images stay as they are). Max 6MB per upload, 4MB per image.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoGalleryChange}
                className="hidden"
                id="photoGallery"
              />
              <label
                htmlFor="photoGallery"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaImage className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Click to add new photos to gallery
                </span>
              </label>
            </div>

            {formData.photoGallery.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  New Photos ({formData.photoGallery.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photoGallery.map((image, index) => (
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
                        onClick={() => removePhotoFromGallery(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.existingPhotoGallery && formData.existingPhotoGallery.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Current gallery photos:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.existingPhotoGallery.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={100}
                        height={100}
                        quality={100}
                        src={image}
                        alt={`Current photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedGallery = [...(formData.existingPhotoGallery || [])];
                          updatedGallery.splice(index, 1);
                          setFormData(prev => ({
                            ...prev,
                            existingPhotoGallery: updatedGallery
                          }));
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
              onClick={() => router.push("/admin/dashboard/news")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <FaSave className="w-4 h-4" />
              <span>{isUpdating ? "Updating..." : "Update News"}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
} 