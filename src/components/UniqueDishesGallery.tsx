import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, X, ChevronRight, ChevronLeft, Sparkles, Utensils, Maximize2 } from 'lucide-react';

interface DishImage {
  id: string;
  title: string;
  bengaliTitle: string;
  imageUrl: string;
  aspect: string; // for mosaic variety
  objectPosition?: string;
}

const DISH_COLLECTION: DishImage[] = [
  {
    id: 'dish-herb-crusted-fish',
    title: 'Herb-Crusted Fish Fillet with Kasundi Emulsion & Rice Timbale',
    bengaliTitle: 'ধনেপাতা মাখা মাছ ও সুগন্ধি ভাত',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790187884/WhatsApp_Image_2026-09-22_at_11.09.29_PM_v7nizk.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-begun-bhaja-rice',
    title: 'Pan-Roasted Begun Bhaja with Steamed Rice Timbale',
    bengaliTitle: 'ঘিয়ে ভাজা বেগুন ও সুগন্ধি ভাত',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790187884/1_a4says.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-beetroot-pistachio',
    title: 'Slow-Roasted Beetroot with Crushed Pistachios & Garden Herbs',
    bengaliTitle: 'ভাজা বিট ও পেস্তার যুগলবন্দী',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790187885/WhatsApp_Image_2026-09-23_at_12.44.49_AM_p5iv1i.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-mango-ceviche',
    title: 'Mango & Tamarind Ceviche with Scallops & Citrus Broth',
    bengaliTitle: 'আম ও তেঁতুল সেভিচে',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790433181/WhatsApp_Image_2026-09-26_at_1.07.12_AM_d2ykfc.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-paati-shapta',
    title: 'Paati Shapta with Vanilla Ice Cream on Nolen Gur Croutons',
    bengaliTitle: 'পাটিসাপটা ও নলেন গুড়',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790433183/WhatsApp_Image_2026-09-26_at_1.05.30_AM_ituj5e.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-1',
    title: 'Plated Grain & Spiced Purée with Vine Tomatoes',
    bengaliTitle: 'অনন্য সাজানো পদ',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_8/v1790183520/WhatsApp_Video_2026-09-23_at_12.43.27_AM_jymoqj.jpg',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'dish-3',
    title: 'Crispy Bhaja, Fish & Fermented Courses',
    bengaliTitle: 'পঞ্চ ব্যঞ্জন ও মাছ ভাজা',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_7/v1790183107/whatsapp-video-2026-09-22-at-110243-pm_hXNXyxwo_1_rh4fal.jpg',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'dish-begun-dal-puree',
    title: 'Roasted Begun & Spiced Dal Purée Tasting Plates',
    bengaliTitle: 'ভাজা বেগুন ও ডাল বাটা',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1790277016/Screenshot_2026-09-25_003652_l9pyz1.png',
    aspect: 'aspect-[3/4]',
  },
];

export const UniqueDishesGallery: React.FC = () => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -400 : 400;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx((prev) => (prev !== null ? (prev + 1) % DISH_COLLECTION.length : null));
      if (e.key === 'ArrowLeft') setLightboxIdx((prev) => (prev !== null ? (prev - 1 + DISH_COLLECTION.length) % DISH_COLLECTION.length : null));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx]);

  return (
    <section id="dishes-gallery" className="py-20 sm:py-28 bg-[#1C1713] text-[#ECE5DA] border-b border-[#382F27] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#B58D59] font-sans bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <Utensils className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>THE LIVING DISHES GALLERY</span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#ECE5DA] tracking-tight">
              Dishes from the Hearth
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <span className="font-bengali text-2xl sm:text-3xl text-[#B58D59] font-medium">
                রান্না ও পরিবেশন
              </span>
              <span className="font-mono text-xs text-[#D5CBBD]/60 hidden lg:inline">
                / Click dish for full view /
              </span>
            </div>

            {/* Horizontal Scroll Navigation Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                title="Scroll Left"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                title="Scroll Right"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Single Row Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 scroll-smooth scrollbar-thin scrollbar-thumb-[#B58D59]/50 scrollbar-track-white/5"
          style={{ scrollbarWidth: 'thin' }}
        >
          {DISH_COLLECTION.map((dish, idx) => (
            <div
              key={dish.id}
              className="w-[82vw] sm:w-[340px] md:w-[370px] lg:w-[390px] shrink-0 snap-start"
            >
              <div
                onClick={() => setLightboxIdx(idx)}
                className="group relative rounded-3xl overflow-hidden bg-[#28221D] border border-white/15 shadow-2xl hover:border-[#B58D59] transition-all duration-500 cursor-pointer hover:-translate-y-2 select-none h-full"
              >
                {/* Image Container with Cinematic Zoom & Ambient Depth */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/60">
                  <img
                    src={dish.imageUrl}
                    alt={dish.title}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />

                  {/* Ambient Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Badge: Bengali Script Watermark */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bengali text-[#B58D59] border border-white/15 shadow-sm">
                      {dish.bengaliTitle}
                    </span>
                  </div>

                  {/* Top Right Expand Icon Button */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="w-10 h-10 rounded-full bg-[#1C1713]/85 backdrop-blur-md text-[#ECE5DA] flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4 text-[#B58D59]" />
                    </span>
                  </div>

                  {/* Bottom Overlay Title on Hover */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-left pointer-events-none z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-marcellus text-lg sm:text-xl text-white font-normal leading-snug drop-shadow-sm">
                      {dish.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Pure Visual Lightbox Modal */}
        {lightboxIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-fade-in-scale select-none"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 pointer-events-none">
              <div className="pointer-events-auto flex items-center space-x-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
                <span className="font-mono text-xs text-[#B58D59] tracking-widest uppercase">
                  {lightboxIdx + 1} / {DISH_COLLECTION.length}
                </span>
                <span className="text-white/30">|</span>
                <span className="font-bengali text-sm text-white">
                  {DISH_COLLECTION[lightboxIdx].bengaliTitle}
                </span>
              </div>

              <button
                onClick={() => setLightboxIdx(null)}
                className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-[#B58D59] hover:text-[#1C1713] text-white border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-110"
                title="Close Lightbox"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((lightboxIdx - 1 + DISH_COLLECTION.length) % DISH_COLLECTION.length);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 hover:bg-[#B58D59] hover:text-[#1C1713] text-white border border-white/20 transition-all cursor-pointer z-50 hover:scale-110 shadow-2xl"
              title="Previous Dish"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((lightboxIdx + 1) % DISH_COLLECTION.length);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 hover:bg-[#B58D59] hover:text-[#1C1713] text-white border border-white/20 transition-all cursor-pointer z-50 hover:scale-110 shadow-2xl"
              title="Next Dish"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image View */}
            <div
              className="relative max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={DISH_COLLECTION[lightboxIdx].imageUrl}
                alt={DISH_COLLECTION[lightboxIdx].title}
                className="max-h-[82vh] w-auto max-w-full object-contain filter contrast-[1.03]"
              />

              {/* Bottom Image Subtitle Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-left pointer-events-none">
                <h3 className="font-marcellus text-lg sm:text-2xl text-white font-normal">
                  {DISH_COLLECTION[lightboxIdx].title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
