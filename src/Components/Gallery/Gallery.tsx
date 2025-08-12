"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { IoArrowForwardOutline, IoImagesOutline, IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5';
import { useGetGallery } from '../../Hooks/Gallery/useGetGallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Individual Gallery Item Component
const GalleryItem = ({ gallery }: { gallery: { _id: string; title: string; description?: string; images: string[]; category?: string; tags?: string[]; createdAt: string } }) => {
  const itemRef = useRef(null);
  const isItemInView = useInView(itemRef, { once: true, margin: "-100px" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const openModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <motion.div
        ref={itemRef}
        variants={itemVariants}
        initial="hidden"
        animate={isItemInView ? "visible" : "hidden"}
        className="group"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Gallery Images Swiper */}
          <div className="relative h-[400px]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                prevEl: `.gallery-prev-${gallery._id}`,
                nextEl: `.gallery-next-${gallery._id}`,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              className="h-full"
            >
              {gallery.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className="relative h-full cursor-pointer group"
                    onClick={() => openModal(index)}
                  >
                    <Image
                      src={image}
                      alt={`${gallery.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Image failed to load:', image);
                        e.currentTarget.src = '/images/women.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <IoImagesOutline className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className={`gallery-prev-${gallery._id} absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100`}>
              <IoChevronBack className="w-5 h-5 text-gray-800" />
            </button>
            <button className={`gallery-next-${gallery._id} absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100`}>
              <IoChevronForward className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Gallery Info */}
          <div className="p-6">
            {/* Category and Date */}
            <div className="flex gap-3 items-center mb-4">
              {gallery.category && (
                <div className="px-4 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1">
                  <span className="text-2xl font-bold">•</span> {gallery.category}
                </div>
              )}
              <div className="px-4 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1">
                <span className="text-2xl font-bold">•</span> {formatDate(gallery.createdAt)}
              </div>
            </div>

            {/* Gallery Title */}
            <h3 className="text-2xl font-semibold font-['Montserrat'] leading-tight mb-3" style={{ color: 'var(--black)' }}>
              {gallery.title}
            </h3>

            {/* Gallery Description */}
            {gallery.description && (
              <p className="text-gray-600 font-['Montserrat'] mb-4 line-clamp-3">
                {gallery.description}
              </p>
            )}

            {/* Tags */}
            {gallery.tags && gallery.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {gallery.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-['Montserrat'] font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {gallery.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-['Montserrat'] font-medium">
                    +{gallery.tags.length - 3} více
                  </span>
                )}
              </div>
            )}

            {/* Images Count */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-['Montserrat']">
                {gallery.images.length} {gallery.images.length === 1 ? 'obrázek' : gallery.images.length < 5 ? 'obrázky' : 'obrázků'}
              </span>
              <button
                onClick={() => openModal(0)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors font-['Montserrat']"
              >
                Zobrazit galerii
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal for Full-Screen Gallery */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-colors"
          >
            <IoClose className="w-6 h-6 text-white" />
          </button>
          
          <div className="w-full h-full max-w-6xl max-h-[90vh] mx-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              initialSlide={selectedImageIndex}
              navigation={{
                prevEl: '.modal-prev',
                nextEl: '.modal-next',
              }}
              pagination={{
                clickable: true,
              }}
              className="h-full"
            >
              {gallery.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full flex items-center justify-center">
                    <Image
                      src={image}
                      alt={`${gallery.title} - Image ${index + 1}`}
                      width={1200}
                      height={800}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/images/women.jpg';
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button className="modal-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-colors">
              <IoChevronBack className="w-6 h-6 text-white" />
            </button>
            <button className="modal-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-colors">
              <IoChevronForward className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const GalleryPage = () => {
  const ref = useRef(null);
  const { galleries, isLoading, error } = useGetGallery();
  
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

  // Loading state
  if (isLoading) {
    return (
      <section className="py-10 lg:py-20 px-4 bg-white w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[1360px] mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--text-primary)' }}></div>
              <p className="text-gray-600 font-medium font-['Montserrat']">Načítání galerie...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-10 lg:py-20 px-4 bg-white w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[1360px] mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4 font-['Montserrat']">Chyba při načítání galerie</p>
              <p className="text-gray-600 font-['Montserrat']">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (galleries.length === 0) {
    return (
      <section className="py-10 lg:py-20 px-4 bg-white w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[1360px] mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <IoImagesOutline className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2 font-['Montserrat']">
                Žádné galerie nenalezeny
              </h3>
              <p className="text-gray-500 font-['Montserrat']">
                V tuto chvíli nejsou k dispozici žádné galerie.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-20 px-4 bg-white w-full max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1360px] mx-auto"
      >
        {/* Gallery Tag and Heading */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 lg:mb-20"
        >
          {/* Left Side - Tag and Heading */}
          <div className='col-span-2'>
            <div
              className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6"
            >
              <span className="text-2xl font-bold">•</span> Fotogalerie
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat'] w-full max-w-md"
              style={{ color: 'var(--black)' }}
            >
              Naše galerie a momenty
            </h2>
          </div>

          {/* Right Side - Text and Button */}
          <div className="flex flex-col items-start col-span-1 pt-6 lg:pt-20">
            <p
              className="body-base mb-8 text-start font-medium font-['Montserrat'] text-[#2d142099]"
            >
              Prohlédněte si naše nejkrásnější momenty, cvičební prostory a akce zachycené v obrazech.
            </p>

            <motion.button
              whileHover={{
                scale: 0.90,
                transition: { duration: 0.5 }
              }}
              whileTap={{
                scale: 0.90,
                transition: { duration: 0.5 }
              }}
              transition={{ duration: 0.5 }}
              className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit rounded-4xl text-start lg:text-center font-medium font-['Montserrat'] cursor-pointer"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--white)'
              }}
            >
              Staň se členem <span className='text-sm'>
                <IoArrowForwardOutline />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {galleries.map((gallery) => (
            <GalleryItem key={gallery._id} gallery={gallery} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GalleryPage;