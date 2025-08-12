"use client"
import Navbar from '@/Components/UI/Navbar/Navbar'
import FAQSection from '@/Components/Home/FAQSection/FAQSection'
import ImageContainer from '@/Components/Home/ImageContainer/ImageContainer'
import ContactPage from '@/Components/Contact/ContactPage'
import Footer from '@/Components/UI/Footer/Footer'

function ContactUs() {
  return (
    <div className='w-full'>
      <Navbar />
      <ContactPage />
      <FAQSection />
      <ImageContainer />
      <Footer />
    </div>

  )
}

export default ContactUs
