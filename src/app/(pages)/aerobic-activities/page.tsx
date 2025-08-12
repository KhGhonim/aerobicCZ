"use client";
import ContactPage from "@/Components/Contact/ContactPage";
import HeroSection from "@/Components/Home/HeroSection/HeroSection";
import OurTeamSection from "@/Components/Home/OurTeamSection/OurTeamSection";
import ServicesSection from "@/Components/Home/ServicesSection/ServicesSection";
import Footer from "@/Components/UI/Footer/Footer";
import Navbar from "@/Components/UI/Navbar/Navbar";
import { motion } from "framer-motion";

function AerobicActivities() {
  return (
    <div className="w-full">
      {/* Navbar */}
      <Navbar />

      <section className="py-10 lg:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Meta Pills */}
            <div className="flex justify-center gap-4 items-center">
              <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
                <span className="text-2xl font-bold">•</span> Aerobní aktivity
              </div>
            </div>

            {/* Article Title */}
            <h1
              className="text-4xl lg:text-6xl font-bold font-['Montserrat'] leading-tight"
              style={{ color: "var(--black)" }}
            >
              O Aerobic Centrum Kyjov
            </h1>
          </motion.div>
        </div>
      </section>
      {/* Hero Section with Main Photo */}
      <div className="mx-4 rounded-3xl overflow-hidden">
        <HeroSection
          title="Aerobní aktivity"
          subtitle=""
          tagText=""
          buttonText=""
          backgroundImage="/images/IMG_5534-4.jpeg"
          backgroundImageAlt="Aerobic Centrum Kyjov Team"
          onButtonClick={() => {
            // Scroll to contact section
            const contactSection = document.getElementById("contact-section");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>

      <ServicesSection />
      
      <OurTeamSection />

      {/* Contact Page Component */}
      <div id="contact-section">
        <ContactPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AerobicActivities;
