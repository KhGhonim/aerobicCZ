"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { IoArrowForwardOutline } from "react-icons/io5";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  tagText?: string;
  buttonText: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  objectPosition?: boolean;
  onButtonClick?: () => void;
}

export default function HeroSection({
  title,
  subtitle,
  tagText,
  buttonText,
  backgroundImage,
  objectPosition = false, 
  backgroundImageAlt = "Hero background",
  onButtonClick,
}: HeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0,
      },
    },
  };

  const backgroundVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative h-[90dvh] flex flex-col justify-between shadow-xl font-['Montserrat']"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image and overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
      >
        {/*  Background image */}
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          className={`object-cover ${objectPosition ? "object-center" : "object-top"}`}
          priority
          quality={100}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(#2d142000 50%, #2d142099 90%)",
          }}
        />
      </motion.div>

      {/* The box - No animation */}
      <div className="absolute inset-5 z-0 border-[0.1px] border-[var(--lightWhite)] rounded-4xl" />

      {/* Hero Content - Mobile responsive */}
      <div className="relative z-10 flex flex-1 items-end justify-between p-10 md:p-16 pb-28 md:pb-16">
        <div className="w-full max-w-7xl mx-auto flex items-end justify-between lg:px-5">
          {/* Left: Tag and Headline */}
          <motion.div
            className="flex flex-col gap-2 md:gap-6"
            variants={contentVariants}
          >
            {tagText && (
              <motion.div
                className="w-fit border-[0.1px]  flex items-center gap-2 border-[var(--lightWhite)] rounded-4xl px-4 py-1.5 md:py-2 text-white/90 font-medium text-sm"
                variants={contentVariants}
              >
                <span className="text-white text-base">•</span>{" "}
                <span className="text-white text-sm">{tagText}</span>
              </motion.div>
            )}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg"
              variants={contentVariants}
            >
              {title}
            </motion.h1>
          </motion.div>

          {/* Right: Subheadline and Button - Hidden on mobile, shown on desktop */}
          {subtitle && (
            <motion.div
              className="hidden md:flex flex-col items-start gap-6 max-w-sm"
              variants={contentVariants}
            >
              <motion.p
                className="text-white text-sm font-medium text-start drop-shadow"
                variants={contentVariants}
              >
                {subtitle}
              </motion.p>
              {buttonText && buttonText !== "" && (
                <motion.button
                  className="bg-white text-black cursor-pointer font-medium   rounded-full px-5 py-3 text-base shadow flex items-center gap-2"
                  variants={buttonVariants}
                  whileHover={{
                    scale: 0.9,
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.5 },
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={onButtonClick}
                  aria-label={`${buttonText} - Přejít na stránku`}
                >
                  {buttonText}
                  <span className="text-lg ">
                    <IoArrowForwardOutline />
                  </span>
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile CTA Button - 20px from bottom */}
      {buttonText && buttonText !== "" && (
        <motion.div
          className="absolute bottom-10 left-10 right-10 z-10 md:hidden"
          variants={buttonVariants}
        >
          <div className="w-full max-w-7xl mx-auto">
            <motion.button
              className="w-full bg-white text-black font-medium py-4 rounded-full shadow-lg flex items-center justify-between px-6"
              whileHover={{
                scale: 0.9,
                transition: { duration: 0.5 },
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.5 },
              }}
              transition={{ duration: 0.5 }}
              onClick={onButtonClick}
              aria-label={`${buttonText} - Přejít na stránku`}
            >
              <span>{buttonText}</span>
              <span className="text-lg">
                <IoArrowForwardOutline />
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
