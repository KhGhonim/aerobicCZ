"use client"
import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import LogoMarquee from '../UI/LogoMarquee/LogoMarquee';
import ServicesSection from './ServicesSection/ServicesSection';
import OurTeamSection from './OurTeamSection/OurTeamSection';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';
import FAQSection from './FAQSection/FAQSection';
import AboutUsSection from './AboutUsSection/AboutUsSection';
import ImageContainer from './ImageContainer/ImageContainer';
import StickyNavbar from '../UI/StickyNavbar/StickyNavbar';
import Footer from '../UI/Footer/Footer';
import { useRouter } from 'next/navigation';

function HomeUI() {
  const router = useRouter();
  const logos = [
    {
      id: 1,
      src: "/images/logo fisaf.jpg",
      width: 90,
      alt: "Logo 2"
    },
    {
      id: 2,
      src: "/images/logo NSA.png",
      width: 150,
      alt: "Logo 3"
    },
    {
      id: 3,
      src: "/images/kyjov_město.png",
      alt: "Logo 1"
    },
    {
      id: 4,
      src: "/images/logo_hartmann_rgb.jpg",
      width: 140,
      alt: "Logo 1"
    },
    {
      id: 5,
      src: "/images/editor-9-85-cs_2.png",
      width: 60,
      alt: "Logo 1"
    },

  ];

  return (
    < >
      <StickyNavbar />
      <HeroSection
        title="Fitness a komerční aerobic"
        subtitle="JPřidejte se k Aerobic Centrum Kyjov – kde se spojuje vášeň, pohyb a síla. Od kurzů pro začátečníky až po národní soutěže trénujeme šampiony všech věkových kategorií."
        buttonText="Aerobní aktivity"
        backgroundImage="/images/-0zaza2.webp"
        backgroundImageAlt="Meditating Woman"
        onButtonClick={() => {
          router.push('/aerobic-activities');
        }}
      />
      <LogoMarquee logos={logos} />
      <AboutUsSection />
      <ServicesSection />
      <OurTeamSection />
      <TestimonialsSection />
      <FAQSection />
      <ImageContainer />
      <Footer />

    </>
  );
}

export default HomeUI;
