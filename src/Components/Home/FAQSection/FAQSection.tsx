"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const router = useRouter();
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

  const faqItems = [
    {
      id: 1,
      number: "01",
      question: "Potřebuji mít zkušenosti?",
      answer: "Ne, nepotřebujete mít zkušenosti! Naše kurzy jsou určeny pro všechny úrovně, od začátečníků až po pokročilé. Naši instruktory vás provedou každým pohybem a poskytnou případné úpravy."
    },
    {
      id: 2,
      number: "02",
      question: "Co si vzít?",
      answer: "Vezměte sebe a pohodlné oblečení. Poskytujeme všechny potřebné vybavení, včetně mat, bloků a pomůcek. Voda je k dispozici, ale můžete si přivézt vlastní lahev."
    },
    {
      id: 3,
      number: "03",
      question: "Jak si rezervovat?",
      answer: "Rezervace je snadná! Můžete si rezervovat místo prostřednictvím naší webové stránky, mobilní aplikace nebo telefonicky. Doporučujeme rezervovat alespoň 24 hodin dopředu, abyste zajistili svůj preferovaný čas kurzu."
    },
    {
      id: 4,
      number: "04",
      question: "Můžu si zrušit kurz?",
      answer: "Ano, můžete si zrušit kurz až 12 hodin před plánovaným kurzem bez jakýchkoli sankcí. Zpožděné zrušení může být nákladné, ale rozumíme, že se někdy stane!"
    },
    {
      id: 5,
      number: "05",
      question: "Máte zkušební kurz?",
      answer: "Ano! Nabízíme zkušební kurz pro nové členy. Tímto získáte příležitost vyzkoušet naši studio, seznámit se s našimi instruktory a najít perfektní kurz pro vaši cestu k zdraví."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 px-4 bg-white w-full max-w-7xl mx-auto">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Section - Introduction */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            {/* FAQ Tag */}
            <div className="mb-6">
              <div 
                className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1"
              >
                <span className="text-2xl font-bold">•</span> Často kladené otázky
              </div>
            </div>

            {/* Main Heading */}
            <h2 
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6 font-['Montserrat']"
              style={{ color: 'var(--black)' }}
            >
              Často kladené<br />otázky
            </h2>

            {/* Description */}
            <p 
              className="text-lg leading-relaxed mb-8 font-['Montserrat'] text-[#2d142099]"
            >
              Máte otázky? Máme odpovědi. Ať už jste nováček, zvědavý na naše členství, nebo se jen ptáte, co si vzít na svůj první kurz.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                whileTap={{
                  scale: 0.90,
                  transition: { duration: 0.5 }
                }}
                onClick={() => router.push('/contact')}
                transition={{ duration: 0.5 }}
                className="px-8 py-4 rounded-4xl font-medium font-['Montserrat'] cursor-pointer flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: 'var(--text-primary)', 
                  color: 'var(--white)' 
                }}
                aria-label="Stát se členem - Přejít na kontaktní stránku"
              >
                Stát se členem <span className='text-sm'>
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
                onClick={() => router.push('/contact')}
                transition={{ duration: 0.5 }}
                className="px-8 py-4 font-medium font-['Montserrat'] cursor-pointer flex items-center justify-center gap-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Přihlásit se k kurzům <span className='text-sm'>
                  <IoArrowForwardOutline />
                </span>
              </motion.button> */}
            </div>
          </motion.div>

          {/* Right Section - FAQ List */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            {faqItems.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="relative"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 cursor-pointer  rounded-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-between bg-[#F9EFF4]"
                  aria-label={`${openFAQ === faq.id ? 'Skrýt' : 'Zobrazit'} odpověď na otázku ${faq.number}: ${faq.question}`}
                  aria-expanded={openFAQ === faq.id}
                >
                  <div className="flex items-center gap-4">
                    <span 
                      className="text-lg font-bold font-['Montserrat']"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {faq.number}
                    </span>
                    <span 
                      className="text-lg font-medium text-left font-['Montserrat']"
                      style={{ color: 'var(--black)' }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div 
                    className="w-6 h-6 flex items-center justify-center transition-transform duration-300"
                    style={{ 
                      transform: openFAQ === faq.id ? 'rotate(45deg)' : 'rotate(0deg)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* Answer Panel */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === faq.id ? 'auto' : 0,
                    opacity: openFAQ === faq.id ? 1 : 0,
                    marginTop: openFAQ === faq.id ? 16 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div 
                    className="p-6 rounded-lg bg-[#F9EFF4]"
                  >
                    <p 
                      className="text-base leading-relaxed font-['Montserrat'] text-[#2d142099]"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection; 