import React from 'react'
import Navbar from '@/Components/UI/Navbar/Navbar'
import GalleryPage from '@/Components/Gallery/Gallery'
import FAQSection from '@/Components/Home/FAQSection/FAQSection'
import ImageContainer from '@/Components/Home/ImageContainer/ImageContainer'
import Footer from '@/Components/UI/Footer/Footer'

function Gallery() {
  return (
    <div className='w-full'>
      <Navbar />
      <GalleryPage />
      <FAQSection />
      <ImageContainer />
      <Footer />
    </div>
  )
}

export default Gallery
