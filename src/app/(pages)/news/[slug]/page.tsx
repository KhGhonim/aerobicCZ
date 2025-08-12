import React from 'react'
import { notFound } from 'next/navigation'
import Navbar from '@/Components/UI/Navbar/Navbar'
import NewsDetailPage from '../../../../Components/News/NewsDetailPage'
import FAQSection from '@/Components/Home/FAQSection/FAQSection'
import ImageContainer from '@/Components/Home/ImageContainer/ImageContainer'
import Footer from '@/Components/UI/Footer/Footer'
import { connectMongoDB } from '@/DB/MongoDB/MongoDB'
import { News } from '@/DB/Config/Models'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getNewsBySlug(slug: string) {
  try {
    // Connect to MongoDB directly
    await connectMongoDB();
    
    // Find the news article by slug
    const news = await News.findOne({ slug: slug });
    
    if (!news) {
      return null;
    }
    
    const plainNews = {
      _id: news._id.toString(),
      title: news.title,
      description: news.description,
      content: news.content,
      mainImage: news.mainImage,
      photoGallery: news.photoGallery,
      slug: news.slug,
      publishDate: news.publishDate.toISOString(),
      createdAt: news.createdAt.toISOString(),
      updatedAt: news.updatedAt.toISOString(),
    };
    
    return { news: plainNews };
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
}

async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  const newsData = await getNewsBySlug(slug);

  if (!newsData || !newsData.news) {
    notFound();
  }

  return (
    <div className='w-full'>
      <Navbar />
      <NewsDetailPage news={newsData.news} />
      <FAQSection />
      <ImageContainer />
      <Footer />
    </div>
  )
}

export default Page 