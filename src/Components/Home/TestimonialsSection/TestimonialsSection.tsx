"use client";

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const testimonials = [
    {
      id: 1,
      title: "Studio With Heart",
      text: "The studio vibe is everything — clean, calming, and filled with good energy. But it&apos;s the people that make it truly special.",
      name: "Rachel Klein",
      classes: "9 classes",
      rating: 4,
      image: "/images/women.jpg"
    },
    {
      id: 2,
      title: "Fit My Pace",
      text: "I love that I can take a slower class one day and go full-out the next. Whether it&apos;s yoga, pilates, or strength — every session meets me where I&apos;m at.",
      name: "Anita Sharma",
      classes: "32 classes",
      rating: 3,
      image: "/images/women.jpg"
    },
    {
      id: 3,
      title: "Real Results",
      text: "I&apos;ve tried intense workouts that left me drained. Here, I feel energized, not exhausted. My strength and flexibility have improved.",
      name: "Lena Thompson",
      classes: "5 classes",
      rating: 3,
      image: "/images/women.jpg"
    },
    {
      id: 4,
      title: "Supportive Space",
      text: "From day one, I felt at home. The instructors are so knowledgeable and encouraging, and every class like a step forward in my wellness journey.",
      name: "Monica Delgado",
      classes: "21 classes",
      rating: 5,
      image: "/images/women.jpg"
    }
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className="w-4 h-4"
            fill={index < rating ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ 
              color: index < rating ? 'var(--text-primary)' : '#2d142099' 
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section 
      className="py-20 px-4 bg-[#F9EFF4]"
    >
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-16"
        >
          {/* Testimonials Tag */}
          <div className="flex justify-center mb-6">
            <div 
              className="px-5 w-fit py-2 bg-white text-[var(--text-primary)] rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1"
            >
              <span className="text-2xl font-bold">•</span> Odkaz
            </div>
          </div>

          {/* Main Heading */}
          <h2 
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6 font-['Montserrat']"
            style={{ color: 'var(--black)' }}
          >
  Co říkají naši klienti          </h2>

          {/* Description */}
          <p 
            className="text-lg font-medium font-['Montserrat'] text-[#2d142099] max-w-3xl mx-auto"
          >
            Nejenom naše slova, ale i skutečné zkušenosti našich klientů.
          </p>
        </motion.div>

        {/* Testimonials Marquee */}
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <Marquee
            speed={100}
        
            className="py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        
          >
            <div className="flex gap-3 px-2">
              {/* First set of testimonials */}
              {testimonials.map((testimonial) => (
                <div
                  key={`first-${testimonial.id}`}
                  className=" w-full max-w-sm p-8 rounded-2xl bg-white"
                >
                  <StarRating rating={testimonial.rating} />
                  
                  <h3 
                    className="text-lg font-bold  font-['Montserrat']"
                    style={{ color: 'var(--black)' }}
                  >
                    {testimonial.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed mb-6 font-medium font-['Montserrat'] text-[#2d142099]"
                  >
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 
                        className="font-bold text-sm font-['Montserrat']"
                        style={{ color: 'var(--black)' }}
                      >
                        {testimonial.name}
                      </h4>
                      <p 
                        className="text-xs font-['Montserrat'] text-[#2d142099]"
                      >
                        {testimonial.classes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial) => (
                <div
                  key={`second-${testimonial.id}`}
                  className=" w-full max-w-sm p-8 rounded-2xl bg-white"
                >
                  <StarRating rating={testimonial.rating} />
                  
                  <h3 
                    className="text-lg font-bold  font-['Montserrat']"
                    style={{ color: 'var(--black)' }}
                  >
                    {testimonial.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed mb-6 font-medium font-['Montserrat'] text-[#2d142099]"
                  >
                    {testimonial.text}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 
                        className="font-bold text-sm font-['Montserrat']"
                        style={{ color: 'var(--black)' }}
                      >
                        {testimonial.name}
                      </h4>
                      <p 
                        className="text-xs font-['Montserrat'] text-[#2d142099]"
                      >
                        {testimonial.classes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection; 