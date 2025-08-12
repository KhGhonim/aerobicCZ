"use client"
import React from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'

interface Logo {
  id: number | string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogoMarqueeProps {
  logos: Logo[];
  speed?: number;
  className?: string;
  containerClassName?: string;
  logoClassName?: string;
  showGradients?: boolean;
  gradientWidth?: number;
  minLogoWidth?: number;
  logoWidth?: number;
  logoHeight?: number;
  grayscale?: boolean;
  hoverEffect?: boolean;
  padding?: string;
}

const LogoMarquee = ({
  logos,
  speed = 150,
  className = "relative bg-white overflow-hidden border-b-[0.5px] border-gray-200 h-[16dvh] scrollbar-hide",
  containerClassName = "h-full flex items-center w-full max-w-7xl mx-auto",
  logoClassName = "object-contain filter grayscale hover:grayscale-0 transition-all duration-300",
  showGradients = true,
  minLogoWidth = 150,
  grayscale = true,
  hoverEffect = true,
  padding = "px-0"
}: LogoMarqueeProps) => {
  const finalLogoClassName = grayscale
    ? logoClassName
    : logoClassName.replace('filter grayscale hover:grayscale-0', '');

  const finalLogoClassNameWithHover = hoverEffect
    ? finalLogoClassName
    : finalLogoClassName.replace('hover:grayscale-0', '');

  return (
    <div className={className}>
      {showGradients && (
        <div
          className={`absolute left-0 top-0 bottom-0 w-24 lg:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none`}
        />
      )}

      {showGradients && (
        <div
          className={`absolute right-0 top-0 bottom-0 w-24 lg:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none`}
        />
      )}

      {/* Marquee */}
      <Marquee
        speed={speed}
        gradient={false}
        className={containerClassName}
      >
        <div className={`flex items-center ${padding} gap-10`}>
          {/* First set of logos */}
          {logos.map((logo) => (
            <div
              key={`first-${logo.id}`}
              className="flex items-center justify-center gap-10"
              style={{ minWidth: `${minLogoWidth}px` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 75}
                height={logo.height || 75}
                className={finalLogoClassNameWithHover}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo) => (
            <div
              key={`second-${logo.id}`}
              className="flex items-center justify-center gap-10"
              style={{ minWidth: `${minLogoWidth}px` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 75}
                height={logo.height || 75}
                className={finalLogoClassNameWithHover}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}

export default LogoMarquee 