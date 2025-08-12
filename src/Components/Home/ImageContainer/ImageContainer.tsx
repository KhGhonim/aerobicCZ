"use client"

import React from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation';

function ImageContainer() {
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0
      }
    }
  }

  const backgroundVariants: Variants = {
    hidden: {

      scale: 0.5
    },
    visible: {

      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className="relative h-[100dvh] flex flex-col justify-between font-['Montserrat']"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image and overlay */}
      <motion.div
        className="absolute inset-5 rounded-4xl z-0"
        variants={backgroundVariants}
      >
        {/*  Background image */}
        <Image
          src="/images/IMG_7173.webp"
          alt="Meditating Woman"
          fill
          className="object-cover object-center rounded-4xl"
          priority
          quality={100}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 rounded-4xl"
          style={{
            backgroundImage: 'linear-gradient(#2d142000 50%, #2d142099 90%)'
          }}
        />
      </motion.div>

      <div className="absolute inset-10 z-0 border-[0.1px] border-[var(--lightWhite)] rounded-4xl" />

      {/* Hero Content - Mobile responsive */}
      <div className="relative z-10 flex flex-1 items-end justify-between p-10 md:p-16 pb-28 md:pb-16">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-center lg:px-5">
          <motion.div
            className="flex flex-col items-center justify-center text-center gap-2 md:gap-6"
            variants={contentVariants}
          >
            <motion.div
              className="w-fit border-[0.1px] flex items-center gap-2 border-[var(--lightWhite)] rounded-4xl px-4 py-1.5 md:py-2 text-white/90 font-medium text-sm"
              variants={contentVariants}
            >
              <span className="text-white text-base">•</span> <span className="text-white text-sm">Nezávistný</span>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-5xl  font-extrabold text-white leading-tight drop-shadow-lg"
              variants={contentVariants}
            >
                Začněte svou cestu za kondicí ještě dnes <br className="md:hidden" /> With Aerobic Centrum Kyjov
            </motion.h1>

            <motion.button
              className="bg-white text-black cursor-pointer font-medium rounded-full px-5 py-3 text-base shadow flex items-center gap-2"
              variants={buttonVariants}
              whileHover={{
                scale: 0.90,
                transition: { duration: 0.5 }
              }}
              whileTap={{
                scale: 0.90,
                transition: { duration: 0.5 }
              }}
              transition={{ duration: 0.5 }}
              onClick={() => router.push('/contact')}
              aria-label="Staň se členem - Přejít na kontaktní stránku"
            >
              Staň se členem
              <span className="text-lg">
                <IoArrowForwardOutline />
              </span>
            </motion.button>
          </motion.div>


        </div>
      </div>
    </motion.div>
  )
}

export default ImageContainer
