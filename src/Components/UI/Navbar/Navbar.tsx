"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import {
  mainPages,
  blogPages,
  contactPages,
  pages,
  utilityPages,
  accountPages,
  templatePages,
} from "@/Context/Arrays";
import CartModal from "../Models/CartModal/CartModal";

function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Monthly Unlimited", price: 399, quantity: 1 },
    { id: 2, name: "Yoga Mat", price: 29, quantity: 1 },
    { id: 3, name: "Meditation Cushion", price: 45, quantity: 1 },
  ]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="relative w-full flex items-center justify-between border-b border-gray-200 py-4 px-4">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logoFooter.png"
              alt="Aerobic Cup Logo"
              priority
              quality={100}
              width={120}
              height={90}
              className="md:w-[130px] md:h-auto md:object-contain"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-5 text-black font-medium text-base font-['Montserrat']">
              {mainPages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={page.href}
                    className={`px-3 py-2 rounded-md transition-all duration-300 font-semibold ${
                      pathname === page.href
                        ? 'hover:text-pink-700 text-pink-400'
                        : 'text-black hover:text-gray-600'
                    }`}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
              <li className="relative group">
                {/* <button
                  onClick={toggleDropdown}
                  className="flex cursor-pointer items-center gap-1 hover:text-pink-600 transition-colors font-semibold"
                >
                  All
                  <motion.div
                    animate={{
                      rotate: isDropdownOpen ? 180 : 0,
                      scale: isDropdownOpen ? 1.1 : 1
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    <IoChevronDown className="w-4 h-4" />
                  </motion.div>
                </button> */}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                        borderWidth: "1px",
                        borderRadius: "8px",
                        scale: 0.95,
                        y: -10,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        borderWidth: "1px",
                        borderRadius: "16px",
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        borderWidth: "1px",
                        borderRadius: "8px",
                        scale: 0.95,
                        y: 10,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                        staggerChildren: 0.15,
                      }}
                      className="absolute top-full left-1/12 transform -translate-x-7/12 mt-4 w-[700px] bg-white border border-gray-200 shadow-2xl overflow-hidden"
                    >
                      <div className="p-8 grid grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div>
                          <h3 className="text-gray-600 text-lg mb-4">
                            Main Pages
                          </h3>
                          <ul className="space-y-1">
                            {mainPages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h3 className="text-gray-600 text-lg mb-4 mt-6">
                            Blog
                          </h3>
                          <ul className="space-y-1">
                            {blogPages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h3 className="text-gray-600 text-lg mb-4 mt-6">
                            Contact
                          </h3>
                          <ul className="space-y-1">
                            {contactPages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Middle Column */}
                        <div>
                          <h3 className="text-gray-600 text-lg mb-4">Pages</h3>
                          <ul className="space-y-1">
                            {pages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h3 className="text-gray-600 text-lg mb-4 mt-6">
                            Utility Pages
                          </h3>
                          <ul className="space-y-1">
                            {utilityPages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right Column */}
                        <div>
                          <h3 className="text-gray-600 text-lg mb-4">
                            Accounts
                          </h3>
                          <ul className="space-y-1">
                            {accountPages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <h3 className="text-gray-600 text-lg mb-4 mt-6">
                            Templates
                          </h3>
                          <ul className="space-y-1">
                            {templatePages.map((page, index) => (
                              <li key={index}>
                                <Link
                                  href={page.href}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    pathname === page.href
                                      ? 'hover:text-pink-700 text-pink-400'
                                      : 'text-black hover:text-gray-600'
                                  }`}
                                >
                                  {page.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </nav>

          {/* Mobile/Desktop Cart & Menu */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={toggleCart}
              className="text-black font-['Montserrat'] font-semibold text-base md:text-base hover:text-gray-600 transition-colors cursor-pointer"
            >
              Cart <span className="font-['Montserrat'] font-semibold border-l-2 border-r-2 border-black text-black bg-transparent rounded-lg  px-1 text-sm leading-[130%]">{totalItems}</span>
            </button> */}

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="text-black md:hidden">
              <IoMenu className="w-8 h-8" />
            </button>

            {/* Desktop Join Us Button */}
            <Link href="/contact">
              <motion.button
                onClick={() => {}}
                whileHover={{
                  scale: 0.9,
                  transition: { duration: 0.5 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.5 },
                }}
                transition={{ duration: 0.5 }}
                className="hidden font-['Montserrat'] font-medium md:flex border cursor-pointer text-white bg-[#B12468] rounded-full px-5 py-3 text-lg leading-[100%] items-center gap-2"
              >
                Přidejte se k nám{" "}
                <span className="text-lg ">
                  <IoArrowForwardOutline />
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.5,
              }}
              className="fixed top-0 right-0 h-full w-80 bg-[#F9EFF4] z-50 md:hidden shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#2d142099]/20">
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/images/logoFooter.png"
                      alt="Aerobic Cup Logo"
                      priority
                      quality={100}
                      width={120}
                      height={90}
                      className="w-20 h-auto object-contain"
                    />
                  </Link>
                </div>

                {/* Close Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="text-black hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-6 space-y-8">
                {/* Navigation Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium font-['Montserrat'] text-[#2d142099]">
                    Navigation
                  </h3>
                  <div className="space-y-3">
                    {mainPages.map((page, index) => (
                      <Link
                        key={index}
                        href={page.href}
                        onClick={toggleMobileMenu}
                        className={`block text-lg font-semibold transition-all duration-300 font-['Montserrat'] px-3 py-2 rounded-md ${
                          pathname === page.href
                            ? 'hover:text-pink-700 text-pink-400'
                            : 'hover:opacity-70'
                        }`}
                        style={pathname === page.href ? {} : { color: "var(--text-primary)" }}
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium font-['Montserrat'] text-[#2d142099]">
                    Ostatní
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="https://www.instagram.com/ackyjov/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="block text-lg font-semibold transition-colors duration-300 hover:opacity-70 font-['Montserrat']"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Instagram
                    </Link>
                  </div>
                </div>

                {/* Legal Section */}
                {/* <div className="space-y-4">
                  <h3 className="text-sm font-medium font-['Montserrat'] text-[#2d142099]">
                    Legal
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="/privacy-policy"
                      onClick={toggleMobileMenu}
                      className="block text-lg font-semibold transition-colors duration-300 hover:opacity-70 font-['Montserrat']"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms-of-service"
                      onClick={toggleMobileMenu}
                      className="block text-lg font-semibold transition-colors duration-300 hover:opacity-70 font-['Montserrat']"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div> */}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#2d142099]/20">
                <p className="text-xs font-['Montserrat'] text-[#2d142099]">
                  Autorská práva © {new Date().getFullYear()} Noubodiez -
                  Všechna práva vyhrazena.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={removeItem}
      />
    </>
  );
}

export default Navbar;
