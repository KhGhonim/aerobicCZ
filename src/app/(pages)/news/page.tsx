
import React from 'react'
import NewsPage from '@/Components/News/News'
import Navbar from '@/Components/UI/Navbar/Navbar'
import ImageContainer from '@/Components/Home/ImageContainer/ImageContainer'
import FAQSection from '@/Components/Home/FAQSection/FAQSection'
import Footer from '@/Components/UI/Footer/Footer'

function News() {
  return (
    <div className='w-full'>
      <Navbar />
      <NewsPage />
      <FAQSection />
      <ImageContainer />
      <Footer />

    </div>
  )
}

export default News
