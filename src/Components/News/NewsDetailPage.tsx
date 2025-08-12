"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useMainSiteNews } from "../../Hooks/News/useMainSiteNews";
import HeroSection from "../Home/HeroSection/HeroSection";
import { useRouter } from "next/navigation";

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  content: string;
  mainImage: string;
  photoGallery: string[];
  slug: string;
  publishDate: string;
  createdAt: string;
}

// Helper function to calculate read time based on content length
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes} minuta${readTimeMinutes !== 1 ? "s" : ""}`;
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Individual Related News Article Component
const RelatedNewsArticle = ({
  article,
}: {
  article: {
    id: string;
    image: string;
    date: string;
    readTime: string;
    title: string;
    description: string;
    slug: string;
  };
}) => {
  const articleRef = useRef(null);
  const isArticleInView = useInView(articleRef, {
    once: true,
    margin: "-100px",
  });
  const router = useRouter();

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

  const handleArticleClick = () => {
    router.push(`/news/${article.slug}`);
  };

  return (
    <motion.div
      ref={articleRef}
      variants={itemVariants}
      initial="hidden"
      animate={isArticleInView ? "visible" : "hidden"}
      className="group cursor-pointer"
      onClick={handleArticleClick}
    >
      {/* Article Image */}
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <Image
          src={article.image}
          alt={article.title}
          width={600}
          height={400}
          className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            console.error("Image failed to load:", article.image);
            e.currentTarget.src = "/images/women.jpg";
          }}
        />
      </div>

      {/* Article Meta */}
      <div className="flex gap-3 items-center">
        <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
          <span className="text-2xl font-bold">•</span> {article.date}
        </div>
        <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
          <span className="text-2xl font-bold">•</span>
          {article.readTime}
        </div>
      </div>

      {/* Article Title */}
      <h3
        className="text-3xl w-fit max-w-md font-semibold font-['Montserrat'] leading-tight"
        style={{ color: "var(--black)" }}
      >
        {article.title}
      </h3>
    </motion.div>
  );
};

const NewsDetailPage = ({ news }: { news: NewsItem }) => {
  const ref = useRef(null);
  const { newsArticles } = useMainSiteNews();

  // Filter out the current article from related news
  const relatedNews = newsArticles
    .filter((article) => article.slug !== news.slug)
    .slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <div className="w-full">
      {/* Article Title Section */}
      <section className="py-10 lg:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Meta Pills */}
            <div className="flex justify-center gap-4 items-center">
              <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6 ">
                <span className="text-2xl font-bold">•</span>{" "}
                {formatDate(news.publishDate)}
              </div>
              <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6 ">
                <span className="text-2xl font-bold">•</span>{" "}
                {calculateReadTime(news.content)}
              </div>
            </div>

            {/* Article Title */}
            <h1
              className="text-4xl lg:text-6xl font-bold font-['Montserrat'] leading-tight"
              style={{ color: "var(--black)" }}
            >
              {news.title}
            </h1>

            {/* Author Section */}
            {/* <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                <Image
                  src="/images/women.jpg"
                  alt="Author"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold font-['Montserrat'] mb-1" style={{ color: 'var(--black)' }}>
                Emily Davis
              </h3>
              <p className="text-sm text-gray-600 font-['Montserrat']">
                Junior Trainer
              </p>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Hero Section with Main Photo */}
      <div className="mx-4 my-8 rounded-3xl overflow-hidden">
        <HeroSection
          title={news.title}
          tagText={`${formatDate(news.createdAt)} • ${calculateReadTime(
            news.content
          )}`}
          buttonText=""
          backgroundImage={news.mainImage}
          backgroundImageAlt={news.title}
          objectPosition= {true}
          onButtonClick={() => {}}
        />
      </div>

      {/* Article Content */}
      <section id="news-content" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            style={{ color: "var(--black)" }}
          >
            <div
              className="font-['Montserrat'] rich-text-content"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      {news.photoGallery && news.photoGallery.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2
                className="text-2xl lg:text-4xl font-bold font-['Montserrat'] mb-4"
                style={{ color: "var(--black)" }}
              >
                Fotogalerie
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {news.photoGallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[12/9] overflow-hidden">
                    <Image
                      src={image}
                      alt={`${news.title} - Image ${index + 1}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = "/images/women.jpg";
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Related News Section */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[1360px] mx-auto"
        >
          {/* Related News Tag and Heading */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 lg:mb-20"
          >
            {/* Left Side - Tag and Heading */}
            <div className="col-span-2">
              <div className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6">
                <span className="text-2xl font-bold">•</span> Články a zprávy
              </div>
              <h2
                className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat'] w-full max-w-md"
                style={{ color: "var(--black)" }}
              >
                Naše zprávy a články
              </h2>
            </div>

            {/* Right Side - Text and Button */}
            <div className="flex flex-col items-start col-span-1 pt-6 lg:pt-20">
              <p className="body-base mb-8 text-start font-medium font-['Montserrat'] text-[#2d142099]">
                Naše blog je vaše místo pro pohybové tipy, wellness moudrost a
                každodenní inspiraci.
              </p>

              <motion.button
                whileHover={{ scale: 0.9, transition: { duration: 0.5 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                transition={{ duration: 0.5 }}
                className="px-5 py-3 flex items-center gap-2 justify-between w-full lg:w-fit rounded-4xl text-start lg:text-center font-medium font-['Montserrat'] cursor-pointer"
                style={{
                  backgroundColor: "var(--text-primary)",
                  color: "var(--white)",
                }}
              >
                Staň se členem{" "}
                <span className="text-sm">
                  <IoArrowForwardOutline />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Related News Grid */}
          {relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {relatedNews.map(
                (article: {
                  id: string;
                  image: string;
                  date: string;
                  readTime: string;
                  title: string;
                  description: string;
                  slug: string;
                }) => (
                  <RelatedNewsArticle key={article.id} article={article} />
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 font-medium text-lg">
                V tuto chvíli nejsou k dispozici žádné další články.
              </p>
              <p className="text-gray-500 mt-2">
                Zkontrolujte později pro aktualizace!
              </p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default NewsDetailPage;
