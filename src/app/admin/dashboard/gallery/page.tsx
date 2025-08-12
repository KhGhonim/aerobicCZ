"use client";
import { useGetGallery } from "@/Hooks/Gallery/useGetGallery";
import { useDeleteGallery } from "@/Hooks/Gallery/useDeleteGallery";
import { motion } from "framer-motion";
import { FaTrash, FaImage, FaPlus, FaEye, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GalleryDetailModal from "@/Components/Admin/GalleryDetailModal";
import ConfirmationModal from "@/Components/UI/Models/ConfirmationModal";
import Image from "next/image";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  category?: string;
  tags?: string[];
  createdAt: string;
}

export default function AdminGallery() {
  const router = useRouter();

  const { galleries, isLoading: isLoadingGalleries, error, refetch } = useGetGallery();
  const { deleteGallery, isDeleting } = useDeleteGallery();
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [galleryToDelete, setGalleryToDelete] = useState<GalleryItem | null>(null);

  const handleViewGallery = (gallery: GalleryItem) => {
    setSelectedGallery(gallery);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (gallery: GalleryItem) => {
    setGalleryToDelete(gallery);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (galleryToDelete) {
      await deleteGallery(galleryToDelete._id);
      refetch(); // Refresh the list after deletion
      setDeleteModalOpen(false);
      setGalleryToDelete(null);
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
            Gallery Management
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            View and manage uploaded gallery images
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/admin/dashboard/gallery/add")}
          className="bg-green-600 cursor-pointer text-white px-3 py-2 sm:px-4 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          <FaPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add New Gallery</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </motion.div>

      {/* Existing Galleries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Existing Galleries ({galleries.length})
        </h2>

        {isLoadingGalleries ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaImage className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No galleries uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleries.map((gallery) => (
              <motion.div
                key={gallery._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
              >
                {gallery.images.length > 0 && (
                  <div className="relative h-32 sm:h-48 overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      quality={100}
                      src={gallery.images[0]}
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {gallery.images.length} images
                    </div>
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                    {gallery.title}
                  </h3>
                  {gallery.description && (
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                      {gallery.description}
                    </p>
                  )}
                  {gallery.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                      {gallery.category}
                    </span>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(gallery.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handleViewGallery(gallery)}
                        className="text-blue-600 cursor-pointer hover:text-blue-800 p-1"
                      >
                        <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/dashboard/gallery/${gallery._id}`)}
                        className="text-green-600 cursor-pointer hover:text-green-800 p-1"
                      >
                        <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(gallery)}
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
      {/* Upload Form moved to /admin/dashboard/gallery/add */}

      {/* Gallery Detail Modal */}
      <GalleryDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gallery={selectedGallery}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setGalleryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Gallery"
        message={`Are you sure you want to delete "${galleryToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Gallery"
        isLoading={isDeleting}
      />
    </div>
  );
} 