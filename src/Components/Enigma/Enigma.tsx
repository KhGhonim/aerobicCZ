"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IoPersonOutline } from 'react-icons/io5';

const Enigma = () => {
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
    <section className="py-20 px-4 bg-white w-full">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl mx-auto"
      >
        {/* Enigma Tag and Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 lg:mb-20"
        >
          <div
            className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6 mx-auto"
          >
            <span className="text-2xl font-bold">•</span> Naše hodnoty
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat'] mb-6"
            style={{ color: 'var(--black)' }}
          >
            Hlavní hodnoty, které nás pohánějí
          </h2>
          <p
            className="body-base font-medium font-['Montserrat'] text-[#2d142099] max-w-xl mx-auto"
          >
            Objevte principy, které vede naši komunitu a tvoří každý zážitek v Aerobic Centrum Kyjov.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto"
        >
          {/* Empowerment Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex rounded-br-[200px] flex-col items-start text-left min-h-[350px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Zrušení
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Podporujeme silu, sebevědomí a transformaci prostřednictvím pohybu.
              </p>
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex flex-col items-end text-right min-h-[350px] rounded-bl-[200px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Komunita
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Vytvoření podpůrného a osvěžujícího prostoru pro všechny.
              </p>
            </div>
          </motion.div>

          {/* Balance Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex flex-col rounded-tr-[200px] items-start text-left min-h-[350px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Rovnováha
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Podporujeme rovnováhu mezi tělem, myšlenkou a duchovností.
              </p>
            </div>
          </motion.div>

          {/* Growth Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex flex-col rounded-tl-[200px] items-end text-right min-h-[350px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Růst
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Uctíváme postup a osobní rozvoj v každém kroku.
              </p>
            </div>
          </motion.div>

          {/* Empowerment Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex rounded-br-[200px] flex-col items-start text-left min-h-[350px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Zrušení
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Podporujeme silu, sebevědomí a transformaci prostřednictvím pohybu.
              </p>
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div
            variants={itemVariants}
            className="bg-pink-100 rounded-3xl p-12 flex flex-col items-end text-right min-h-[350px] rounded-bl-[200px] justify-between"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--text-primary)' }}
            >
              <IoPersonOutline className="text-2xl" style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-4" style={{ color: 'var(--black)' }}>
                Komunita
              </h3>
              <p className="text-sm font-medium font-['Montserrat'] text-gray-600 leading-relaxed max-w-xs">
                Vytvoření podpůrného a osvěžujícího prostoru pro všechny.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Enigma;
