"use client";
import StickyNavbar from "@/Components/UI/StickyNavbar/StickyNavbar";
import HeroSection from "@/Components/Home/HeroSection/HeroSection";
import LogoMarquee from "@/Components/UI/LogoMarquee/LogoMarquee";
import Footer from "@/Components/UI/Footer/Footer";
import ContactPage from "@/Components/Contact/ContactPage";
import Enigma from "@/Components/Enigma/Enigma";
const logos = [
  {
    id: 1,
    src: "/images/logo fisaf.jpg",
    alt: "Logo 2",
  },
  {
    id: 2,
    src: "/images/logo NSA.png",
    alt: "Logo 3",
  },
  {
    id: 3,
    src: "/images/kyjov_město.png",
    alt: "Logo 1",
  },
  {
    id: 4,
    src: "/images/logo_hartmann_rgb.jpg",
    alt: "Logo 1",
  },
  {
    id: 5,
    src: "/images/editor-9-85-cs_2.png",
    alt: "Logo 1",
  },
];

function AerobicCup() {
  return (
    <>
      <StickyNavbar />
      <HeroSection
        title="📍 Místo konání: Sportcentrum Želva, Dubňany (Hodonínská 1680)"
        subtitle="Aerobic Cup Kyjov – 8. ročník (2025) O soutěži Celostátní soutěž v komerčním a fitness aerobiku pro děti i dospělé, pořádaná pod záštitou Aerobic Centrum Kyjov, z.s."
        tagText="🗓 Datum: 13. dubna 2025"
        buttonText="🎉 Přihlášení"
        backgroundImage="/images/BG Aerocup.webp"
        backgroundImageAlt="Meditating Woman"
        onButtonClick={() => {

        }}
      />
      <LogoMarquee logos={logos} />
      <Enigma />
      <ContactPage />

      <Footer />
    </>
  );
}

export default AerobicCup;
