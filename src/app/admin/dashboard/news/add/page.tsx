"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaImage } from "react-icons/fa";
import Image from "next/image";
import RichTextEditor, { RichTextEditorRef } from "@/Components/Admin/RichTextEditor";
import { usePostNews } from "@/Hooks/News/usePostNews";

export default function AddNewsPage() {
  const router = useRouter();
  const [mainPreviewUrl, setMainPreviewUrl] = useState<string | null>(null);
  const richTextEditorRef = useRef<RichTextEditorRef>(null);
  const {
    formData,
    handleChange,
    handleMainImageChange,
    handlePhotoGalleryChange,
    removePhotoFromGallery,
    postNews,
    isLoading,
    captureContent,
  } = usePostNews();

  useEffect(() => {
    if (formData.mainImage) {
      const url = URL.createObjectURL(formData.mainImage);
      setMainPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setMainPreviewUrl(null);
  }, [formData.mainImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (richTextEditorRef.current) {
      const content = richTextEditorRef.current.captureCurrentContent();
      captureContent(content); 
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
    }
    const ok = await postNews(e);
    if (ok) router.push("/admin/dashboard/news");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Add News Article
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Create a new news article
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/admin/dashboard/news")}
          className="bg-gray-200 cursor-pointer text-gray-800 px-3 py-2 sm:px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
        >
          Back to List
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
              onChange={captureContent}
              placeholder="Enter news content with rich formatting..."
              className="w-full"
              ref={richTextEditorRef}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
                id="mainImage"
                required
              />
              <label htmlFor="mainImage" className="cursor-pointer flex flex-col items-center">
                <FaImage className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.mainImage ? formData.mainImage.name : "Click to upload main image"}
                </span>
              </label>
            </div>
            {mainPreviewUrl && (
              <div className="mt-4">
                <Image
                  width={100}
                  height={100}  
                  quality={100}
                  src={mainPreviewUrl}
                  alt="Main image preview"
                  className="h-40 w-auto rounded-lg object-cover border border-gray-200"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Gallery
            </label>
            <p className="text-sm text-gray-500 mb-3">
              💡 You can upload up to 10 images in the photo gallery (max 6MB total per upload, 4MB per image)
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
              <label htmlFor="photoGallery" className="cursor-pointer flex flex-col items-center">
                <FaPlus className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to add photos to gallery</span>
              </label>
            </div>

            {formData.photoGallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating News..." : "Create News"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}


