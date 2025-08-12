"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const WhyWeBestSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl mx-auto lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-6 items-center">
          {/* Left Side - Image */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image 
                src="/images/women 2.jpg" 
                alt="Woman meditating" 
                fill
                className="object-cover aspect-square"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 lg:pl-16"
          >
            {/* Why We're Best Tag */}
            <motion.div 
              variants={itemVariants}
              className="mb-4 mt-10 lg:mt-0"
            >
              <div 
                className="px-5 py-2 w-fit primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1"
              >
                <span className="text-2xl font-bold">•</span> Why We&apos;re Best?
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold leading-tight mb-10 lg:mb-20 font-['Montserrat']"
              style={{ color: 'var(--black)' }}
            >
              Move with Purpose,<br />
              Grow with Us
            </motion.h2>

            {/* Body Text */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6 mb-6 w-full max-w-sm"
            >
              <p 
                className="text-base font-medium font-['Montserrat'] text-[#2d142099]"
              >
                Movement is more than exercise — it&apos;s a way of life. We believe in strong bodies, calm minds, and a community that lifts each other up. Our studio brings together the best of Pilates, yoga, and gym training to create a space where you can move, breathe, and grow.
              </p>
              <p 
                className="text-base font-medium font-['Montserrat'] text-[#2d142099]"
              >
                Every class, every session, every moment is designed to help you reconnect with yourself and discover your true potential.
              </p>
            </motion.div>

            {/* Call-to-Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-2"
            >
              <button 
                className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit rounded-4xl text-start lg:text-center font-medium transition-all duration-300 hover:scale-105 font-['Montserrat']"
                style={{ 
                  backgroundColor: 'var(--text-primary)', 
                  color: 'var(--white)' 
                }}
              >
                Become Member <span className='text-sm'>→</span>
              </button>
              <button 
                className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit font-medium text-start lg:text-center transition-all duration-300 hover:scale-105 font-['Montserrat']"
                style={{ color: 'var(--text-primary)' }}
              >
                About us <span className='text-sm'>→</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyWeBestSection; 