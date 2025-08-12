import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link 
          href="/news"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          <IoArrowBackOutline />
          Back to News
        </Link>
      </div>
    </div>
  )
} 