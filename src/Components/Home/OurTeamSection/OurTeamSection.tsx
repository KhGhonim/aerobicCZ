"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import TeamMemberModal from "../../UI/Models/TeamMemberModal";

const OurTeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMember, setSelectedMember] = useState<{
    id: number;
    name: string;
    title: string;
    image: string;
    description?: string;
    achievements?: string[];
    experience?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setSelectedMember(null);
    }, 350);
  };

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

  const sliderVariants = {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.2,
      },
    },
  };

  const teamMembers = [
    {
      id: 8,
      name: "Veronika Otrusinová",
      title: "Správa klubu",
      image: "/images/Veronika Otrusinová.jpeg",
      description: `šéftrenér Dětí na startu
školení mistrů : Jitka Hofmannová, Adéla Citová (2023)
certificate fitness core
certifikovaný trenér sportovního aerobiku (licence)
certifikát motoricko-funkční (základní + profi)
kurz první pomoci
pedagog volného času`,
    },
    {
      id: 6,
      name: "Karolína Olasz",
      title: "Hlavní trenér",
      image: "/images/Karolína Olasz.webp",
      description: `šéftrenér Dětí na startu 
školení mistrů : Jitka Hofmannová, Adéla Citová (2023)
certificate fitness core  
certifikát trenér sportovního aerobiku FISAF (licence)
certifikát od Toufarové (sportovní aerobik, fitness)`,
    },
    {
      id: 7,
      name: "Krystian Olasz",
      title: "Trenér posilování a aerobiku",
      image: "/images/Krystian Olasz.jpg",
      description: `šéftrenér Dětí na startu (licence)
školení mistrů : Jitka Hofmannová, Adéla Citová (2023)
certificate fitness core
certifikát motoricko-funkční (základní + profi)
vstupní certifikace rozhodčích FISAF (2021)
certifikovaný rozhodčí ČMP, ČSH, ATS, SAMC (komerční aerobik, předcvičováhí, aerobik team show, hobby sportovní aerobik) - splnění podmínek (zkouška a stínové panely)
certifikovaný rozhodčí českým svazem FISAF pro III a II VT sportovní aerobik, fitness aerobik, step aerobik - splnění podmínke (zkouška a stínové panely)
obnovující certifikát školení rozhodčích 01/2023 FISAF (Holzer D.)`,
    },
    {
      id: 1,
      name: "Eliana Trávničková",
      title: "Asistentka trenéra aerobiku",
      image: "/images/Eliana Trávničková.jpeg",
    },
    {
      id: 2,
      name: "Eliška Navrátilová",
      title: "Trenér aerobiku",
      image: "/images/Eliška Navrátilová.jpg",
      description: `certifikát asistent trenéra Dětí na startu
školení mistrů : Jitka Hofmannová, Adéla Citová (2023)`,
    },
    {
      id: 3,
      name: "Hanka Vašíčková",
      title: "Hlavní trenér dětí na startu",
      image: "/images/Hanka Vašíčková.jpeg",
      description: `šéftrenér Dětí na startu`,
    },
    {
      id: 4,
      name: "Jana Polešovská",
      title: "Trenér aerobiku",
      image: "/images/Jana Polešovská.jpeg",
      description: `asistent Dětí na startu
školení mistrů : Jitka Hofmannová, Adéla Citová (2023)
certifikát motoricko-funkční (základní + profi)
studentka vysoké školy Univerzity Palackého, obor Tělesná výchova`,
    },
    {
      id: 5,
      name: "Kateřina Schielová",
      title: "Trenérka dětí na startu",
      image: "/images/Kateřina Schielová.jpg",
      description: `certifkovaná asistentka Dětí na startu`,
    },
  ];

  return (
    <section className=" py-20 px-4 bg-white w-full max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-[1360px] mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          {/* Our Team Tag */}
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1">
              <span className="text-2xl font-bold">•</span> Naše tým
            </div>
          </div>

          {/* Main Heading */}
          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-6 font-['Montserrat']"
            style={{ color: "var(--black)" }}
          >
            Seznamte se se srdcem pohybu
          </h2>

          {/* Description */}
          <p className="text-2xl font-medium font-['Montserrat'] text-[#2d142099] lg:body-xl max-w-3xl mx-auto">
            Náš tým tvoří nadšení instruktoři, vnímaví trenéři a inspirativní
            lidé, kteří žijí pro pohyb a zdravý životní styl.
          </p>
        </motion.div>

        {/* Team Members Slider */}
        <motion.div variants={sliderVariants} className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="team-swiper"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div
                  className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3
                      className="text-xl font-bold mb-1 font-['Montserrat']"
                      style={{ color: "var(--white)" }}
                    >
                      {member.name}
                    </h3>
                    <p
                      className="text-sm font-['Montserrat']"
                      style={{ color: "var(--white)" }}
                    >
                      {member.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button aria-label="Previous" className="swiper-button-prev bg-white absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110">
            <IoArrowBackOutline className="w-6 h-6 text-[var(--text-primary)]" />
          </button>
          <button aria-label="Next" className="swiper-button-next bg-white absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110">
            <IoArrowForwardOutline className="w-6 h-6 text-[var(--text-primary)]" />
          </button>
        </motion.div>
      </motion.div>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default OurTeamSection;
