"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutUsSection = () => {
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

  const statsVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-white  w-full max-w-7xl mx-auto">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-[1360px] mx-auto"
      >
        {/* About Us Tag */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div 
            className="px-5 py-2 primary-title rounded-full text-sm  font-['Montserrat'] font-semibold  flex items-center gap-1"
        
          >
          <span className="text-2xl font-bold">•</span>
          O nás
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={itemVariants}
          className="text-center max-w-[1360px] mx-auto mb-16"
        >
          <p 
            className="text-2xl font-['Montserrat'] font-medium lg:body-xl"
            style={{ color: 'var(--black)' }}
          >
Aerobikový klub se zaměřením na sportovní, fitness a komerční aerobic. Pro ty nejmenší - Děti na startu!😍          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={statsVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1360px] mx-auto"
        >
          {/* Trust of 250 clients */}
          <motion.div 
            variants={itemVariants}
            className="text-center p-7 rounded-2xl bg-[#F9EFF4] flex items-center justify-between"
          >
            <div 
              className="text-5xl  text-[var(--text-primary)]  font-['Montserrat'] font-semibold  mb-2 "
            >
              250+
            </div>
            <div 
              className="text-sm text-[var(--text-primary)] font-['Montserrat'] font-medium"
            >
              Důvěra 250 klientů
            </div>
          </motion.div>

          {/* Classes So Far */}
          <motion.div 
            variants={itemVariants}
            className="text-center p-7 rounded-2xl bg-[#F9EFF4] flex items-center justify-between"
          >
            <div 
              className="text-5xl  text-[var(--text-primary)]  font-['Montserrat'] font-semibold  mb-2 "
            >
              1,000+
            </div>
            <div 
              className="text-sm text-[var(--text-primary)] font-['Montserrat'] font-medium"
            >
              Dosavadní hodiny            </div>
          </motion.div>

          {/* Average Opinion */}
          <motion.div 
            variants={itemVariants}
            className="text-center p-7 rounded-2xl bg-[#F9EFF4] flex items-center justify-between"
          >
            <div 
              className="text-5xl  text-[var(--text-primary)]  font-['Montserrat'] font-semibold  mb-2 "
            >
              4.9/5
            </div>
            <div 
              className="text-sm text-[var(--text-primary)] font-['Montserrat'] font-medium"
            >
              Průměrná hodnocení
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUsSection; 