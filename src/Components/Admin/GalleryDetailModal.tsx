"use client";

import Modal from "@/Components/UI/Models/Modal";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendar, FaImages, FaTag } from "react-icons/fa";

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  category?: string;
  tags?: string[];
  createdAt: string;
}

interface GalleryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  gallery: GalleryItem | null;
}

export default function GalleryDetailModal({ isOpen, onClose, gallery }: GalleryDetailModalProps) {
  if (!gallery) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={gallery.title}>
      <div className="space-y-6">
        {/* Main Image */}
        {gallery.images.length > 0 && (
          <div className="relative">
            <Image
              width={100}
              height={100}
              quality={100}
              priority
              src={gallery.images[0]}
              alt={gallery.title}
              className="w-full h-96 object-cover rounded-lg"
            />
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {gallery.images.length} images
            </div>
          </div>
        )}

        {/* Gallery Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {gallery.title}
            </h3>
            {gallery.description && (
              <p className="text-gray-600 leading-relaxed">
                {gallery.description}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FaCalendar className="w-4 h-4" />
              <span>
                Created: {new Date(gallery.createdAt).toLocaleDateString()}
              </span>
            </div>
            {gallery.category && (
              <div className="flex items-center space-x-2">
                <FaTag className="w-4 h-4" />
                <span>Category: {gallery.category}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <FaImages className="w-4 h-4" />
              <span>{gallery.images.length} images</span>
            </div>
          </div>

          {/* Tags */}
          {gallery.tags && gallery.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {gallery.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Gallery */}
        {gallery.images.length > 1 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-4">All Images</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <Image
                    width={100}
                    height={100}
                    quality={100}
                    priority
                    src={image}
                    alt={`${gallery.title} - Image ${index + 1}`}
                    className="w-full h-36 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                      Image {index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
} 