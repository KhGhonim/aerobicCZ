"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  IoArrowForwardOutline,
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useContactForm } from "../../Hooks/Contact/useContactForm";

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { formData, state, handleChange, submitForm, resetForm } = useContactForm();

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

  const formVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

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
    <section className=" py-10 px-4 bg-white w-full max-w-7xl mx-auto relative">
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
        className="w-full max-w-[1360px] mx-auto relative z-10"
      >
        {/* Contact Tag and Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 lg:mb-20"
        >
          <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6 mx-auto">
            <span className="text-2xl font-bold">•</span> Kontakt
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat'] mb-6"
            style={{ color: "var(--black)" }}
          >
            Kontaktujte nás, jdeme vám na pomoc
          </h2>
          <p className="body-base font-medium font-['Montserrat'] text-[#2d142099] max-w-2xl mx-auto">
            Máte otázky ohledně kurzů nebo členství? Rádi vám odpovíme. Zanechte
            nám zprávu, zavolejte nám nebo přijďte navštívit náš studio.
          </p>
        </motion.div>

        {/* Contact Form and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            className="bg-[#F9EFF4] rounded-2xl p-8 lg:p-12"
          >
            {state.isSuccess ? (
              // Success Message
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-2xl font-bold font-['Montserrat'] text-green-800 mb-4">
                  Zpráva byla úspěšně odeslána!
                </h3>
                <p className="text-lg font-medium font-['Montserrat'] text-green-700 mb-8">
                  Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.
                </p>
                <motion.button
                  whileHover={{
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  onClick={resetForm}
                  className="px-6 py-3 bg-green-600 text-white font-medium font-['Montserrat'] rounded-xl hover:bg-green-700 transition-colors duration-300"
                >
                  Odeslat další zprávu
                </motion.button>
              </motion.div>
            ) : (
              // Contact Form
              <>
                <form onSubmit={submitForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium font-['Montserrat'] text-[#2d142099] mb-2">
                        Jméno *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 rounded-xl border-0 bg-white font-['Montserrat'] text-[#2d142099] focus:outline-none focus:ring-2 focus:ring-[#B12468] transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium font-['Montserrat'] text-[#2d142099] mb-2">
                        Příjmení (volitelné)
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-0 bg-white font-['Montserrat'] text-[#2d142099] focus:outline-none focus:ring-2 focus:ring-[#B12468] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-['Montserrat'] text-[#2d142099] mb-2">
                      Email (volitelné)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-0 bg-white font-['Montserrat'] text-[#2d142099] focus:outline-none focus:ring-2 focus:ring-[#B12468] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-['Montserrat'] text-[#2d142099] mb-2">
                      Telefonní číslo (volitelné)
                    </label>
                    <input
                      type="tel"
                      placeholder="+420 777 568 246"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-0 bg-white font-['Montserrat'] text-[#2d142099] focus:outline-none focus:ring-2 focus:ring-[#B12468] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium font-['Montserrat'] text-[#2d142099] mb-2">
                      Popis *
                    </label>
                    <textarea
                      placeholder="Co potřebujete?"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl border-0 bg-white font-['Montserrat'] text-[#2d142099] focus:outline-none focus:ring-2 focus:ring-[#B12468] transition-all duration-300 resize-none"
                    />
                  </div>

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
                    type="submit"
                    disabled={state.isLoading}
                    className="w-full px-5 py-3 flex items-center justify-center gap-2 rounded-4xl font-medium font-['Montserrat'] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--text-primary)",
                      color: "var(--white)",
                    }}
                  >
                    {state.isLoading ? "Odesílám..." : "Odeslat"}{" "}
                    <span className="text-sm">
                      <IoArrowForwardOutline />
                    </span>
                  </motion.button>
                </form>

                {/* Error Message - shown below form when there's an error */}
                {state.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-red-600 flex-shrink-0"
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
                      <span className="font-medium font-['Montserrat']">{state.error}</span>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Contact Image */}
          <motion.div
            variants={imageVariants}
            className="relative overflow-hidden rounded-2xl h-[600px]"
          >
            <Image
              src="/images/contactus.jpeg"
              alt="Contact Us"
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Contact Cards */}
        <motion.div variants={itemVariants} className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visit Us Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#F9EFF4] rounded-2xl p-8 text-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--text-primary)" }}
                >
                  <IoLocationOutline
                    className="text-2xl"
                    style={{ color: "var(--white)" }}
                  />
                </div>
                <h3
                  className="text-xl font-bold font-['Montserrat']"
                  style={{ color: "var(--black)" }}
                >
                  Navštívit nás
                </h3>
              </div>
              <p
                className="text-lg font-medium font-['Montserrat'] mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Sportcentrum Želva, Hodonínská 1680, Dubňany 696 03
              </p>
            </motion.div>

            {/* Call Us Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#F9EFF4] rounded-2xl p-8 text-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--text-primary)" }}
                >
                  <IoCallOutline
                    className="text-2xl"
                    style={{ color: "var(--white)" }}
                  />
                </div>
                <h3
                  className="text-xl font-bold font-['Montserrat']"
                  style={{ color: "var(--black)" }}
                >
                  Zavolejte nám
                </h3>
              </div>
              <p
                className="text-lg font-medium font-['Montserrat'] mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                777 568 246
              </p>
              <p className="text-sm font-medium font-['Montserrat'] text-[#2d142099]">
                Rádi vám odpovíme!
              </p>
            </motion.div>

            {/* Email Us Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#F9EFF4] rounded-2xl p-8 text-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--text-primary)" }}
                >
                  <IoMailOutline
                    className="text-2xl"
                    style={{ color: "var(--white)" }}
                  />
                </div>
                <h3
                  className="text-xl font-bold font-['Montserrat']"
                  style={{ color: "var(--black)" }}
                >
                  Napište nám
                </h3>
              </div>
              <p
                className="text-lg font-medium font-['Montserrat'] mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                ackyjov@gmail.com
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactPage;
