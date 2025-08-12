"use client";

import { useLogin } from "@/Hooks/Auth/useLogin";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaNewspaper, FaImages, FaSignOutAlt, FaHome, FaTimes } from "react-icons/fa";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  onClose?: () => void;
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <FaHome className="w-5 h-5" />,
  },
  {
    name: "News",
    href: "/admin/dashboard/news",
    icon: <FaNewspaper className="w-5 h-5" />,
  },
  {
    name: "Gallery",
    href: "/admin/dashboard/gallery",
    icon: <FaImages className="w-5 h-5" />,
  },
  // {
  //   name: "Contact",
  //   href: "/admin/dashboard/contact",
  //   icon: <FaEnvelope className="w-5 h-5" />,
  // },
];

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useLogin();

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-1">
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8 hidden lg:block">Admin Panel</h1>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavigation}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-r-4 border-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  );
} 