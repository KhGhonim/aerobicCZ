"use client";

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useMemo } from 'react';
import { IoArrowForwardOutline, IoCalendarOutline } from 'react-icons/io5';
import { useMainSiteNews } from '../../Hooks/News/useMainSiteNews';
import { useRouter } from 'next/navigation';

// Individual News Article Component
const NewsArticle = ({ article }: { article: { id: string; image: string; date: string; readTime: string; title: string; description: string; slug: string } }) => {
  const articleRef = useRef(null);
  const isArticleInView = useInView(articleRef, { once: true, margin: "-100px" });
  const router = useRouter();

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

  const handleArticleClick = () => {
    // Navigate to individual news article page
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
            console.error('Image failed to load:', article.image);
            e.currentTarget.src = '/images/women.jpg'; // Fallback image
          }}
        />
      </div>

      {/* Article Meta */}
      <div className="flex gap-3 items-center">
        <div
          className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6"
        >
          <span className="text-2xl font-bold">•</span> {article.date}
        </div>

        <div
          className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6"
        >
          <span className="text-2xl font-bold">•</span>{article.readTime}
        </div>
      </div>

      {/* Article Title */}
      <h3
        className="text-3xl w-fit max-w-md font-semibold font-['Montserrat'] leading-tight"
        style={{ color: 'var(--black)' }}
      >
        {article.title}
      </h3>
    </motion.div>
  );
};

const NewsPage = () => {
  const ref = useRef(null);
  const { newsArticles, isLoading, error } = useMainSiteNews();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  // Filter news articles based on selected date or date range
  const filteredNewsArticles = useMemo(() => {
    if (!selectedDate && !dateRange.start && !dateRange.end) {
      return newsArticles;
    }

    return newsArticles.filter(article => {
      const articleDate = new Date(article.date);
      
      if (selectedDate) {
        const selected = new Date(selectedDate);
        return articleDate.toDateString() === selected.toDateString();
      }
      
      if (dateRange.start && dateRange.end) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return articleDate >= startDate && articleDate <= endDate;
      }
      
      if (dateRange.start) {
        const startDate = new Date(dateRange.start);
        return articleDate >= startDate;
      }
      
      if (dateRange.end) {
        const endDate = new Date(dateRange.end);
        return articleDate <= endDate;
      }
      
      return true;
    });
  }, [newsArticles, selectedDate, dateRange]);

  const clearFilters = () => {
    setSelectedDate('');
    setDateRange({ start: '', end: '' });
  };
  
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
      <section className="py-20 px-4 bg-white w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[1360px] mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--text-primary)' }}></div>
              <p className="text-gray-600 font-medium">Načítání článků...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 px-4 bg-white w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[1360px] mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4">Chyba při načítání článků</p>
              <p className="text-gray-600">{error}</p>
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
        {/* News Tag and Heading */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10 lg:mb-20"
        >
          {/* Left Side - Tag and Heading */}
          <div className='col-span-2'>
            <div
              className="px-5 w-fit py-2 primary-title rounded-full text-sm font-['Montserrat'] font-semibold flex items-center gap-1 mb-6"
            >
              <span className="text-2xl font-bold">•</span> Články a zprávy
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold leading-tight font-['Montserrat'] w-full max-w-md"
              style={{ color: 'var(--black)' }}
            >
              Naše zprávy a články
            </h2>
          </div>

          {/* Right Side - Text and Button */}
          <div className="flex flex-col items-start col-span-1 pt-6 lg:pt-20">
            <p
              className="body-base mb-8 text-start font-medium font-['Montserrat'] text-[#2d142099]"
            >
              Naše blog je vaše místo pro pohybové tipy, wellness moudrost a každodenní inspiraci.
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

        {/* Date Filter Section */}
        <motion.div
          variants={itemVariants}
          className="mb-10 lg:mb-16"
        >
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold font-['Montserrat'] mb-2" style={{ color: 'var(--black)' }}>
                  Filtrovat podle data
                </h3>
                <p className="text-sm text-gray-600 font-['Montserrat']">
                  Vyberte konkrétní datum nebo rozsah dat pro filtrování článků
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Single Date Picker */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1 font-['Montserrat']">
                    Konkrétní datum
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setDateRange({ start: '', end: '' }); // Clear date range when single date is selected
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] text-sm w-full sm:w-auto"
                    />
                    <IoCalendarOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Range Pickers */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 font-['Montserrat']">
                      Od
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => {
                        setDateRange(prev => ({ ...prev, start: e.target.value }));
                        setSelectedDate(''); // Clear single date when range is used
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] text-sm w-full sm:w-auto"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1 font-['Montserrat']">
                      Do
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => {
                        setDateRange(prev => ({ ...prev, end: e.target.value }));
                        setSelectedDate(''); // Clear single date when range is used
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-['Montserrat'] text-sm w-full sm:w-auto"
                    />
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedDate || dateRange.start || dateRange.end) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-['Montserrat'] text-sm font-medium self-end"
                  >
                    Vymazat filtry
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-['Montserrat']">
                Zobrazeno {filteredNewsArticles.length} z {newsArticles.length} článků
                {(selectedDate || dateRange.start || dateRange.end) && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Filtrováno
                  </span>
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredNewsArticles.length > 0 ? (
            filteredNewsArticles.map((article: { id: string; image: string; date: string; readTime: string; title: string; description: string; slug: string }) => (
              <NewsArticle key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <div className="text-gray-400 mb-4">
                <IoCalendarOutline className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2 font-['Montserrat']">
                Žádné články nenalezeny
              </h3>
              <p className="text-gray-500 font-['Montserrat']">
                Pro vybrané datum nebo rozsah dat nebyly nalezeny žádné články.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-['Montserrat'] text-sm font-medium"
              >
                Zobrazit všechny články
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default NewsPage;
