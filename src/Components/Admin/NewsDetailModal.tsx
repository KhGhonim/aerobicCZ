"use client";

import Modal from "@/Components/UI/Models/Modal";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCalendar, FaImages, FaNewspaper } from "react-icons/fa";

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

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsItem | null;
}

export default function NewsDetailModal({ isOpen, onClose, article }: NewsDetailModalProps) {
  if (!article) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={article.title}>
      <div className="space-y-6">
        {/* Main Image */}
        <div className="relative">
          <Image
            src={article.mainImage}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg"
            width={100}
            height={100}
            quality={100}
          />
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {article.photoGallery.length} photos
          </div>
        </div>

        {/* Article Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              {article.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FaCalendar className="w-4 h-4" />
              <span>
                Published: {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaNewspaper className="w-4 h-4" />
              <span>Slug: {article.slug}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaImages className="w-4 h-4" />
              <span>{article.photoGallery.length} fotogalerie</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Obsah článku</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {article.photoGallery.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Fotogalerie</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {article.photoGallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <Image
                    src={image}
                    alt={`${article.title} - Photo ${index + 1}`}
                    className="w-full h-36 object-cover rounded-lg"
                    width={100}
                    height={100}
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium">
                      Fotka {index + 1}
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