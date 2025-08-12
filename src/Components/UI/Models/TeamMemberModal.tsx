"use client";

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  description?: string;
  achievements?: string[];
  experience?: string;
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const TeamMemberModal = ({ member, isOpen, onClose }: TeamMemberModalProps) => {
  const modalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle closing with animation
  const handleClose = () => {
    if (isAnimating) return; // Prevent multiple close attempts
    setIsAnimating(true);
    
    // Allow exit animation to complete before actually closing
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300); // Match the exit animation duration
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const backdropVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const
      }
    }
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: "easeIn" as const,
        staggerChildren: 0.05,
        staggerDirection: -1 // Reverse stagger on exit
      }
    }
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        delay: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
  };

  if (!member) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={modalRef}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              variants={itemVariants}
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isAnimating}
            >
              <IoClose className="text-2xl text-gray-600" />
            </motion.button>

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 items-center gap-8">
                {/* Left Side - Image */}
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-3"
                >
                  <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                {/* Right Side - Content */}
                <motion.div 
                  variants={itemVariants}
                  className="lg:col-span-3 lg:pl-8"
                >
                  {/* Member Tag */}
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <div 
                      className="px-5 py-2 w-fit primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1"
                    >
                      <span className="text-2xl font-bold">•</span> Člen týmu
                    </div>
                  </motion.div>

                  {/* Name and Title */}
                  <motion.h2 
                    variants={itemVariants}
                    className="text-3xl lg:text-4xl font-bold leading-tight mb-4 font-['Montserrat']"
                    style={{ color: 'var(--black)' }}
                  >
                    {member.name}
                  </motion.h2>

                  <motion.h3
                    variants={itemVariants}
                    className="text-xl font-semibold mb-6 font-['Montserrat']"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {member.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.div 
                    variants={itemVariants}
                    className="space-y-4 mb-6"
                  >
                    <p 
                      className="text-gray-600 leading-relaxed font-['Montserrat']"
                    >
                      {member.description || `Seznamte se s ${member.name}, našim důkladně zaměřeným ${member.title.toLowerCase()}. S desítkami let zkušeností v aerobiku a posilování, ${member.name.split(' ')[0]} přináší vášeň a zkušenosti do každého kurzu.`}
                    </p>
                  </motion.div>

                  {/* Experience */}
                  {member.experience && (
                    <motion.div
                      variants={itemVariants}
                      className="mb-6"
                    >
                      <h4 className="font-semibold text-lg mb-2 font-['Montserrat']" style={{ color: 'var(--text-primary)' }}>
                        Zkušenosti
                      </h4>
                      <p className="text-gray-600 font-['Montserrat']">
                        {member.experience}
                      </p>
                    </motion.div>
                  )}

                  {/* Achievements */}
                  {member.achievements && member.achievements.length > 0 && (
                    <motion.div
                      variants={itemVariants}
                      className="mb-6"
                    >
                      <h4 className="font-semibold text-lg mb-3 font-['Montserrat']" style={{ color: 'var(--text-primary)' }}>
                        Klíčové úspěchy
                      </h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            variants={itemVariants}
                            className="flex items-start gap-2 text-gray-600 font-['Montserrat']"
                          >
                            <span className="text-sm mt-1">•</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Contact Button */}
                  <motion.button
                    variants={itemVariants}
                    whileHover={{
                      scale: 0.95,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{
                      scale: 0.9,
                      transition: { duration: 0.1 }
                    }}
                    className="px-6 py-3 rounded-full font-medium font-['Montserrat'] cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--white)'
                    }}
                    onClick={() => {
                      handleClose();
                      // You can add navigation to contact page here if needed
                    }}
                    disabled={isAnimating}
                  >
                    Kontaktujte nás
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamMemberModal;