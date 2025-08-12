"use client"
import Navbar from '@/Components/UI/Navbar/Navbar'
import HeroSection from '@/Components/Home/HeroSection/HeroSection'
import Enigma from '@/Components/Enigma/Enigma'
import ContactPage from '@/Components/Contact/ContactPage'
import Footer from '@/Components/UI/Footer/Footer'
import { motion } from 'framer-motion'

function AboutUs() {
  return (
    <div className="w-full">
      {/* Navbar */}
      <Navbar />

      {/* Article Title Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Meta Pills */}
            <div className="flex justify-center gap-4 items-center">
              <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
                <span className="text-2xl font-bold">•</span> Náš příběh
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl lg:text-6xl font-bold font-['Montserrat'] leading-tight" style={{ color: 'var(--black)' }}>
              O Aerobic Centrum Kyjov
            </h1>

            {/* Author Section */}
            {/* <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <img
                  src="/images/women.jpg"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold font-['Montserrat'] mb-1" style={{ color: 'var(--black)' }}>
                Our Team
              </h3>
              <p className="text-sm text-gray-600 font-['Montserrat']">
                Dedicated Professionals
              </p>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Hero Section with Main Photo */}
      <div className="mx-4 my-8 rounded-3xl overflow-hidden">
        <HeroSection
          title=""
          subtitle=""
          tagText=""
          buttonText=""
          backgroundImage="/images/IMG_3537.jpeg"
          backgroundImageAlt="Aerobic Centrum Kyjov Team"
          onButtonClick={() => {
            // Scroll to contact section
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* Enigma Component */}
      <Enigma />

      {/* Contact Page Component */}
      <div id="contact-section">
        <ContactPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AboutUs
