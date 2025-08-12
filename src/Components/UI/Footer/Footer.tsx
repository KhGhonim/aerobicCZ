"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { mainPages } from '@/Context/Arrays';
import { useNewsletter } from '../../../Hooks/Newsletter/useNewsletter';

const Footer = () => {
  const { email, state, handleEmailChange, subscribeToNewsletter, resetForm } = useNewsletter();

  const successVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="py-24 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/*Logo Section */}
            <div className="space-y-4 w-full lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center mb-10 gap-2">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/logoFooter.png"
                    alt="Aerobic Cup Logo"
                    priority
                    quality={100}
                    width={120}
                    height={90}
                    className="md:w-[130px] md:h-auto md:object-contain"
                  />
                </Link>
              </div>

              {/* Address */}
              <div className='w-full lg:w-1/2'>
                <h3 className="text-sm font-medium mb-2 font-['Montserrat'] text-[#2d142099]">
                  Adresy
                </h3>
                <p className="text-2xl font-bold font-['Montserrat']" style={{ color: 'var(--black)' }}>
                  Sportcentrum Želva, Hodonínská 1680, Dubňany 696 03                </p>
              </div>

              {/* Email Signup Section */}
              <div className="space-y-4 w-full lg:w-1/2">
                <label className="block text-sm font-['Montserrat'] text-[#2d142099]">
                  Přihlaste se k newsletteru
                </label>
                
                {state.isSuccess ? (
                  // Success Message
                  <motion.div
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-6"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold font-['Montserrat'] text-green-800 mb-2">
                      Úspěšně jste se přihlásili!
                    </h3>
                    <p className="text-sm font-medium font-['Montserrat'] text-green-700 mb-4">
                      Děkujeme za přihlášení k newsletteru.
                    </p>
                    <button
                      onClick={() => {
                        resetForm();
                      }}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium font-['Montserrat'] rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      Přihlásit další email
                    </button>
                  </motion.div>
                ) : (
                  // Newsletter Form
                  <>
                    <form onSubmit={subscribeToNewsletter} className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="email@example.com"
                        className="w-full p-6 pr-20 rounded-4xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)]/20 font-['Montserrat']"
                        style={{
                          backgroundColor: '#F9EFF4',
                          color: 'var(--black)'
                        }}
                      />
                      <button
                        type="submit"
                        disabled={state.isLoading}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-4 rounded-3xl font-medium font-['Montserrat'] cursor-pointer flex items-center justify-center gap-1 transition-all duration-300 hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: 'var(--text-primary)',
                          color: 'var(--white)'
                        }}
                      >
                        {state.isLoading ? 'Odesílám...' : 'Zapisz się'}
                      </button>
                    </form>

                    {/* Error Message - shown below form when there's an error */}
                    {state.error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-red-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{state.error}</span>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
                
                <p className="text-xs font-['Montserrat'] text-[#2d142099]">
                  * Poprzez zapisanie się do newslettera zgadzasz się na naszą Politykę prywatności i zgłaszasz zgodę na otrzymywanie aktualizacji od nas.
                </p>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="space-y-4">
              <h3 className="text-base font-medium font-['Montserrat'] text-[#2d142099]">
                Nawigacja
              </h3>
              <div className="space-y-3">
                {mainPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.href}
                    className="block text-2xl font-semibold transition-colors duration-300 hover:opacity-70 font-['Montserrat']"
                    style={{ color: 'var(--black)' }}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other/Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-base font-medium font-['Montserrat'] text-[#2d142099]">
                Inne
              </h3>
              <div className="space-y-3">

                <Link
                  href="https://www.instagram.com/ackyjov/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl font-semibold transition-colors duration-300 hover:opacity-70 font-['Montserrat']"
                  style={{ color: 'var(--black)' }}
                >
                  Instagram
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-6 px-4 border-t"
        style={{ borderColor: '#2d142099' }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-center md:text-left font-['Montserrat'] text-[#2d142099]">
            Autorská práva © {new Date().getFullYear()} Noubodiez - Všechna práva vyhrazena.          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end w-full md:w-auto gap-3 md:gap-6 mt-1 md:mt-0">
            <Link
              href="https://www.noubodiez.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm transition-colors duration-300 hover:opacity-70 font-['Montserrat'] text-[#2d142099]"
            >
              Poháněno Noubodiez
            </Link>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 