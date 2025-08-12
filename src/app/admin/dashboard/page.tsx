"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaNewspaper } from "react-icons/fa";
import { LuSquareArrowRight } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";


export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 py-4">
          Welcome to the Aerobic Cup admin panel
        </p>
        <div className="mt-10">
          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <Link href="/admin/dashboard/news" className="flex cursor-pointer items-center justify-between gap-4 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Content */}
              <div className="flex items-center gap-4">
                <FaNewspaper className="text-2xl text-gray-800" />
                <h2 className="text-lg font-semibold text-gray-800">News</h2>
              </div>
              <div
                className="text-blue-500 hover:underline"
              >
                <LuSquareArrowRight className="text-2xl" />
              </div>
            </Link>
             {/* Card 1 */}
             <Link href="/admin/dashboard/gallery" className="flex cursor-pointer items-center justify-between gap-4 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              {/* Content */}
              <div className="flex items-center gap-4">
                <GrGallery className="text-2xl text-gray-800" />
                <h2 className="text-lg font-semibold text-gray-800">Gallery</h2>
              </div>
              <div
                className="text-blue-500 hover:underline"
              >
                <LuSquareArrowRight className="text-2xl" />
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
