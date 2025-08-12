"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { IoArrowForwardOutline } from 'react-icons/io5';

const PricingSection = () => {
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

  const cardVariants = {
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

  const pricingPlans = [
    {
      id: 1,
      title: "Welcome Package",
      validity: "Valid for 3 months",
      price: "$ 599.00 USD",
      features: [
        "Full-Body Engagement",
        "All Levels Welcome",
        "Mind-Body Connection",
        "Dynamic & Energizing"
      ],
      image: "/images/icon2.svg",
      isPopular: false,
      backgroundColor: '#F9EFF4',
      textColor:'var(--text-primary)',
      buttonBg: 'var(--white)',
      buttonText: 'var(--text-primary)',
      iconColor: 'var(--text-primary)'
    },
    {
      id: 2,
      title: "Monthly Unlimited",
      validity: "Valid from bought date",
      price: "$399.00 USD",
      features: [
        "Full-Body Engagement",
        "All Levels Welcome",
        "Mind-Body Connection",
        "Dynamic & Energizing"
      ],
      image: "/images/Plan.svg",
      isPopular: true,
      backgroundColor: 'var(--text-primary)',
      textColor: 'var(--white)',
      buttonBg: 'var(--white)',
      buttonText: 'var(--text-primary)',
      iconColor: 'var(--white)'
    },
    {
      id: 3,
      title: "5 Class Package",
      validity: "Valid for 3 months",
      price: "$ 499.00 USD",
      features: [
        "Full-Body Engagement",
        "All Levels Welcome",
        "Mind-Body Connection",
        "Dynamic & Energizing"
      ],
      image: "/images/icon2.svg",
      isPopular: false,
      backgroundColor: '#F9EFF4',
      textColor: 'var(--text-primary)',
      buttonBg: 'var(--white)',
      buttonText: 'var(--text-primary)',
      iconColor: 'var(--text-primary)'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
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
          {/* Pricing Tag */}
          <div className="flex justify-center mb-6">
            <div
              className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1"
            >
              <span className="text-2xl font-bold">•</span> Pricing
            </div>
          </div>

          {/* Main Heading */}
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6 font-['Montserrat']"
            style={{ color: 'var(--black)' }}
          >
            Flexible Plans for Every Body
          </h2>

          {/* Description */}
          <p
            className="text-lg font-medium font-['Montserrat'] text-[#2d142099] max-w-3xl mx-auto"
          >
            Whether you&apos;re dropping in, just getting started, or fully committed to your wellness routine, we offer pricing options designed to meet your needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:px-10 lg:pb-10"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className="relative p-8 rounded-2xl shadow-lg"
              style={{ backgroundColor: plan.backgroundColor }}
            >
              {/* Icon and Popular Badge */}
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="rounded-lg flex items-center justify-center"
                >
                  <Image src={plan.image} alt="Plan" width={48} height={48} className='w-8 h-8' />
                </div>
                {plan.isPopular && (
                  <div
                    className=" text-sm font-bold text-white font-['Montserrat']"
                  >
                    Most Popular
                  </div>
                )}
              </div>

              {/* Plan Title */}
              <h3
                className="text-2xl font-bold mb-2 font-['Montserrat'] w-full max-w-[100px]"
                style={{ color: plan.textColor }}
              >
                {plan.title}
              </h3>

              {/* Validity */}
              <p
                className="text-sm mb-6 opacity-90 font-['Montserrat']"
                style={{ color: plan.textColor }}
              >
                {plan.validity}
              </p>

              {/* Price */}
              <div
                className="text-3xl font-bold mb-8 font-['Montserrat']"
                style={{ color: plan.textColor }}
              >
                {plan.price}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                whileTap={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                transition={{ duration: 0.5 }}
                className="w-full mb-8 px-6 py-3 rounded-4xl font-medium font-['Montserrat'] cursor-pointer flex items-center justify-between gap-2"
                style={{
                  backgroundColor: plan.buttonBg,
                  color: plan.buttonText
                }}
                aria-label={`Become Member - ${plan.title} plan`}
              >
                Become Member <span className='text-sm'>
                  <IoArrowForwardOutline />
                </span>
              </motion.button>
              {/* Features */}
              <div className="space-y-4 ">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: plan.iconColor }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span
                      className="text-sm font-['Montserrat']"
                      style={{ color: plan.textColor }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingSection; 