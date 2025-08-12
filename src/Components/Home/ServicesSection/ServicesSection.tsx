"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  // State to track which cards are active on mobile
  // This allows the hover effects to work on mobile devices via click
  const [activeCards, setActiveCards] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Function to toggle card state on mobile
  const toggleCard = (cardId: string) => {
    setActiveCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Function to get hover state - works for both hover and click on mobile
  const getHoverState = (cardId: string) => {
    return activeCards[cardId] ? "hover" : "initial";
  };

  // Function to check if we're on a mobile device
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-10 lg:py-20 px-4 bg-white w-full max-w-7xl mx-auto relative">
      {/* Background Pattern with Fade Effect */}
      <div className="absolute inset-5 z-0 opacity-25">
        <Image
          src="/images/pattern.png"
          alt="Background Pattern"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent 100%)'
          }}
        />
      </div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl mx-auto relative z-10"
      >
        {/* Services Tag and Heading */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10"
        >
          {/* Left Side - Tag and Heading */}
          <div className="col-span-2">
            <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold">•</span> Naše služby
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat']"
              style={{ color: "var(--black)" }}
            >
              Aerobní aktivity
            </h2>
          </div>

          {/* Right Side - Text and Buttons */}
          <div className="flex flex-col items-center col-span-1  pt-6 lg:pt-20">
            <p className="body-base mb-8 text-start  font-medium font-['Montserrat'] text-[#2d142099] ">
              Najděte svůj rytmus s naší pečlivě sestavenou kombinací pilates,
              jógy a posilování.{" "}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full ">
              <motion.button
                whileHover={{
                  scale: 0.9,
                  transition: { duration: 0.5 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.5 },
                }}
                transition={{ duration: 0.5 }}
                onClick={() => router.push("/contact")}
                className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit rounded-4xl text-start lg:text-center font-medium font-['Montserrat'] cursor-pointer"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--white)",
                }}
                aria-label="Staň se členem - Přejít na kontaktní stránku"
              >
                Staň se členem
                <span className="text-sm">
                  <IoArrowForwardOutline />
                </span>
              </motion.button>
              {/* <motion.button
                whileHover={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                whileTap={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                transition={{ duration: 0.5 }}
                className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit font-medium text-start lg:text-center  font-['Montserrat'] cursor-pointer"
                style={{ color: 'var(--text-primary)' }}
              >
              Všechny lekce<span className='text-sm'>
                  <IoArrowForwardOutline />
                </span>
              </motion.button> */}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - 3 Cards */}
          <motion.div variants={cardVariants} className="col-span-2">
            {/* Top Card - Full Width */}
            <motion.div
              variants={itemVariants}
              className="px-8 py-6 rounded-2xl group bg-[#F9EFF4] mb-4 relative overflow-hidden cursor-pointer transition-all duration-300"
              whileHover="hover"
              initial="initial"
              animate={getHoverState("card1")}
              onClick={() => toggleCard("card1")}
              whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
              aria-label="Karta s aktuálními informacemi - klikněte pro zobrazení detailů"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCard("card1");
                }
              }}
            >
              {/* Mobile click indicator */}
              {isMobileDevice && (
                <div className="absolute top-2 right-2 z-20 bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-gray-700 opacity-75">
                  Klikněte na kartu
                </div>
              )}
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/Cover-011.webp"
                  alt="Background"
                  fill
                  className="object-cover object-center"
                />
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              </div>

              {/* Content with higher z-index */}
              <div className="relative z-10">
                <motion.h3
                  className="text-xl font-bold mt-24 font-['Montserrat'] text-white"
                  initial={{ y: 100 }}
                  variants={{
                    initial: { y: 100 },
                    hover: {
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  AKTUÁLNÍ INFO
                </motion.h3>

                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  variants={{
                    initial: { y: 100, opacity: 0 },
                    hover: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <p className="text-sm leading-relaxed mb-6 font-semibold font-['Montserrat'] text-white text-start">
                    Stále přibíráme další děti (4-9 let). Ozvěte se nám nebo
                    napište. POZOR - VHODNÉ I PRO CHLAPCE !!! Začínáme v září.
                    Na všechny se Těšíme !{" "}
                  </p>
                  <motion.button
                    whileHover={{
                      scale: 0.9,
                      transition: { duration: 0.5 },
                    }}
                    whileTap={{
                      scale: 0.9,
                      transition: { duration: 0.5 },
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => router.push("/contact")}
                    className="font-medium font-['Montserrat'] text-white cursor-pointer flex items-center gap-2"
                    aria-label="Připojte se k lekcím - Přejít na kontaktní stránku"
                  >
                    Připojte se k lekcím{" "}
                    <span>
                      <IoArrowForwardOutline className="text-base" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Flow Yoga Card */}
              <motion.div
                variants={itemVariants}
                className="px-8 py-6 rounded-2xl group bg-[#F9EFF4] relative overflow-hidden cursor-pointer transition-all duration-300"
                whileHover="hover"
                initial="initial"
                animate={getHoverState("card2")}
                onClick={() => toggleCard("card2")}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label="Karta závodního aerobiku - klikněte pro zobrazení detailů"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard("card2");
                  }
                }}
              >
                {/* Mobile click indicator */}
                {isMobileDevice && (
                  <div className="absolute top-2 right-2 z-20 bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-gray-700 opacity-75">
                    Klikněte na kartu
                  </div>
                )}
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/Cover -02.webp"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Dark overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>

                {/* Content with higher z-index */}
                <div className="relative z-10">
                  <motion.h3
                    className="text-xl font-bold mt-20 font-['Montserrat'] text-white"
                    initial={{ y: 400 }}
                    variants={{
                      initial: { y: 400 },
                      hover: {
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    Závodní aerobic
                  </motion.h3>

                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    variants={{
                      initial: { y: 100, opacity: 0 },
                      hover: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          staggerChildren: 0.1,
                          delay: 0.2,
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="text-sm leading-relaxed mb-6 font-semibold font-['Montserrat'] text-white text-start">
                      Děti cvičí v různých věkových kategoriích tématickou
                      pódiovou skladbu, která je výsledkem jejich celoročního
                      snažení na trénincích. S touto sestavou se prezentují v
                      jarní sezoně po různých soutěžích, zejména pak nejvíce v
                      rámci soutěže aerobictour. Abychom vše zvládli, musíme se
                      nejrpve naučit správně držet tělo, zlepšit výdrž, sílu a
                      flexibilitu. Proto trénujeme 2 x týdně v Kyjově. Docházka
                      je důležitá. Jedná se o kolektivní sport a musíme se celá
                      skupina sladit. Není to jen dřína ! S námi si užiješ kopec
                      srandy, různé akce během roku a mnoho dalšího. Neváhem, a
                      přidej se k nám. Sportuj{" "}
                    </p>
                    <motion.button
                      whileHover={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      transition={{ duration: 0.5 }}
                      onClick={() => router.push("/contact")}
                      className="font-medium font-['Montserrat'] text-white cursor-pointer flex items-center gap-2"
                      aria-label="Připojte se k lekcím - Přejít na kontaktní stránku"
                    >
                      Připojte se k lekcím{" "}
                      <span className="text-sm">
                        <IoArrowForwardOutline className="text-base" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Strength Circuit Card */}
              <motion.div
                variants={itemVariants}
                className="px-8 py-6 rounded-2xl group bg-[#F9EFF4] relative overflow-hidden cursor-pointer transition-all duration-300"
                whileHover="hover"
                initial="initial"
                animate={getHoverState("card3")}
                onClick={() => toggleCard("card3")}
                whileTap={{ scale: 0.98 }}
                role="button"
                tabIndex={0}
                aria-label="Karta sportovního aerobiku - klikněte pro zobrazení detailů"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard("card3");
                  }
                }}
              >
                {/* Mobile click indicator */}
                {isMobileDevice && (
                  <div className="absolute top-2 right-2 z-20 bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-gray-700 opacity-75">
                    Klikněte na kartu
                  </div>
                )}
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/Cover -03.webp"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Dark overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>

                {/* Content with higher z-index */}
                <div className="relative z-10">
                  <motion.h3
                    className="text-xl font-bold mt-20 font-['Montserrat'] text-white"
                    initial={{ y: 400 }}
                    variants={{
                      initial: { y: 400 },
                      hover: {
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    SPORTOVNÍ AEROBIC
                  </motion.h3>

                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    variants={{
                      initial: { y: 100, opacity: 0 },
                      hover: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          staggerChildren: 0.1,
                          delay: 0.2,
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="text-sm leading-relaxed mb-6 font-semibold font-['Montserrat'] text-white text-start">
                      Máš na to se zařadit mezi mistry ? Sportovní aerobik
                      prokazuje schopnost předvést komplex prvků obtížnosti s
                      ostatními pohyby, které vychází z tradičního high impact
                      aerobiku, s vysokou intenzitou a dokonalým provedením, a
                      to vše na vhodný hudební doprovod. Závodníky (ženy/muže)
                      dělíme do výkonnostních tříd, které rozlišují závodníky
                      podle jejich úrovně pohybových schopností a dovedností.
                      Nositelem výkonnostní třídy je jedinec, tj. konkrétní
                      závodník bez ohledu za jaký klub startuje. Všichni naši
                      závodníci začínají ve III. výkonnostní třídě a jejich
                      cílem je se propracovat do I. výkonnostní třídy. V I.
                      výkonnostní třídě se lze potom účastnist mistroství ČR, či
                      se pokusit o nominaci na mistroství Evropy či Světa.
                    </p>
                    <motion.button
                      whileHover={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      transition={{ duration: 0.5 }}
                      onClick={() => router.push("/contact")}
                      className="font-medium font-['Montserrat'] text-white cursor-pointer flex items-center gap-2"
                      aria-label="Připojte se k lekcím - Přejít na kontaktní stránku"
                    >
                      Připojte se k lekcím{" "}
                      <span className="text-sm">
                        <IoArrowForwardOutline className="text-base" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Text and Dark Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col  h-[35rem] lg:h-auto"
          >
            {/* Dark Card */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl  flex-1 flex flex-col relative overflow-hidden cursor-pointer group transition-all duration-300"
              style={{ backgroundColor: "var(--text-primary)" }}
              whileHover="hover"
              initial="initial"
              animate={getHoverState("card4")}
              onClick={() => toggleCard("card4")}
              whileTap={{ scale: 0.98 }}
              role="button"
              tabIndex={0}
              aria-label="Karta soustředění - klikněte pro zobrazení detailů"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCard("card4");
                }
              }}
            >
              {/* Mobile click indicator */}
              {isMobileDevice && (
                <div className="absolute top-2 right-2 z-20 bg-white/80 rounded-full px-2 py-1 text-xs font-medium text-gray-700 opacity-75">
                  Klikněte na kartu
                </div>
              )}
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/long.webp"
                  alt="Background"
                  fill
                  className="object-cover object-center"
                />
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              </div>

              {/* Content with higher z-index */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon at top */}
                {/* <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  >
                    <Image src="/images/Plan.svg" alt="Plan" width={48} height={48} className='w-12 h-12' />
                  </div> */}

                {/* Text content at bottom */}
                <div className="mt-auto">
                  <motion.h3
                    className="text-xl font-bold mb-4 font-['Montserrat']"
                    style={{ color: "var(--white)" }}
                    initial={{ y: 150 }}
                    variants={{
                      initial: { y: 150 },
                      hover: {
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    SOUSTŘEDĚNÍ
                  </motion.h3>

                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    variants={{
                      initial: { y: 100, opacity: 0 },
                      hover: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          staggerChildren: 0.1,
                          delay: 0.1,
                        },
                      },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "var(--white)" }}
                    >
                      V průběhu roku probíhají víkendová soustředění formou
                      příměšťáku, kde se snažíme &quot;pohnout&quot; se závodní
                      sestavou a vylepšovat techniku provedení.
                    </p>
                    <motion.button
                      whileHover={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.5 },
                      }}
                      transition={{ duration: 0.5 }}
                      onClick={() => router.push("/contact")}
                      className="font-medium font-['Montserrat'] cursor-pointer flex items-center gap-2"
                      style={{ color: "var(--white)" }}
                      aria-label="Kontaktujte nás - Přejít na kontaktní stránku"
                    >
                      Kontaktujte nás{" "}
                      <span className="text-sm">
                        <IoArrowForwardOutline className="text-base" />
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
