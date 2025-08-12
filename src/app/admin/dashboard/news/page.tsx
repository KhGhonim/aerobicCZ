"use client";
import { useGetNews } from "@/Hooks/News/useGetNews";
import { useDeleteNews } from "@/Hooks/News/useDeleteNews";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEye, FaEdit, FaNewspaper } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewsDetailModal from "@/Components/Admin/NewsDetailModal";
import ConfirmationModal from "@/Components/UI/Models/ConfirmationModal";
import Image from "next/image";

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

export default function AdminNews() {
  const router = useRouter();

  const {
    newsArticles,
    isLoading: isLoadingNews,
    error,
    refetch,
  } = useGetNews();
  const { deleteNews, isDeleting } = useDeleteNews();
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsItem | null>(null);

  const handleViewArticle = (article: NewsItem) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (article: NewsItem) => {
    setArticleToDelete(article);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      await deleteNews(articleToDelete._id);
      refetch(); // Refresh the list after deletion
      setDeleteModalOpen(false);
      setArticleToDelete(null);
    }
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
            News Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            View and manage uploaded news articles
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/admin/dashboard/news/add")}
          className="bg-blue-600 cursor-pointer text-white px-3 py-2 sm:px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          <FaPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Article</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </motion.div>

      {/* Existing News Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing News Articles ({newsArticles.length})
        </h2>

        {isLoadingNews ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : newsArticles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaNewspaper className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No news articles uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {newsArticles.map((article) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <Image
                    width={100}
                    height={100}
                    quality={100}
                    src={article.mainImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {article.photoGallery.length} photos
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleViewArticle(article)}
                        className="text-blue-600 cursor-pointer hover:text-blue-800 p-1"
                      >
                        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/dashboard/news/${article._id}`)
                        }
                        className="text-green-600 cursor-pointer hover:text-green-800 p-1"
                      >
                        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(article)}
                        className="text-red-600 cursor-pointer hover:text-red-800 p-1"
                      >
                        <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Upload Form moved to /admin/dashboard/news/add */}

      {/* News Detail Modal */}
      <NewsDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        article={selectedArticle}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setArticleToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete News Article"
        message={`Opravdu chcete smazat "${articleToDelete?.title}"? Tato akce nelze vrátit zpět.`}
        confirmText="Smazat článek"
        isLoading={isDeleting}
      />
    </div>
  );
}
