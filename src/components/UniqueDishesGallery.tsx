import React, { useState, useMemo } from 'react';
import { Sparkles, Utensils, Eye, X, ChevronRight, ChevronLeft, Flame, Leaf, Clock, ArrowUpRight } from 'lucide-react';

export interface PreparedDish {
  id: string;
  name: string;
  bengaliName: string;
  category: 'All' | 'Street & Nostalgia' | 'Heirloom & Zero-Waste' | 'Ferments & Sea' | 'Harvest Sweets';
  subtitle: string;
  description: string;
  story: string;
  imageUrl: string;
  ingredients: string[];
  pairing: string;
  technique: string;
}

export const PREPARED_DISHES: PreparedDish[] = [
  {
    id: 'dish-1',
    name: 'Burrata Ghugni Chaat',
    bengaliName: 'ঘুঘনি চাট ও বুরাটা',
    category: 'Street & Nostalgia',
    subtitle: 'Creamy Italian burrata, yellow peas & roasted chilli oil',
    description: 'An elevated, cross-cultural bridge between Kolkata street nostalgia and silken Mediterranean cheese.',
    story: '“Walking home from College Street, the aroma of spicy yellow pea ghugni was unforgettable. Here, creamy cold burrata melts gently against warm, spiced yellow peas, finished with a smoky splash of house-steeped roasted chilli oil.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.50.22_AM_dzhiyz.jpg',
    ingredients: ['Whole Yellow Peas', 'Pugliese Burrata', 'Tamarind Chutney', 'Roasted Bhaja Cumin', 'Mustard-Chilli Oil'],
    pairing: 'Sparkling Tamarind Spritz with rock salt',
    technique: 'Slow-simmered tempering & temperature contrast',
  },
  {
    id: 'dish-2',
    name: 'Mango & Wild Tamarind Ceviche',
    bengaliName: 'আম ও তেঁতুল সেভিচে',
    category: 'Ferments & Sea',
    subtitle: 'Citrusy raw mango cure, wild kashundi & crisp pear',
    description: 'Fresh scallop or sweet pear cured in piquant green mango pulp, roasted cumin, and pungent Bengali mustard.',
    story: '“A tribute to Bengal’s sultry summer orchards. The astringent sting of green mango and fermented kashundi cuts cleanly through tender seafood or sweet pear, awakening the palate with every chilled bite.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_2/v1788549943/WhatsApp_Video_2026-09-05_at_12.42.00_AM_jkldp2.jpg',
    ingredients: ['Raw Green Mango', 'Wild Shorshe Kashundi', 'Aged Tamarind', 'Asian Sweet Pear', 'Himalayan Pink Salt'],
    pairing: 'Gondhoraj Lebu Fermented Shrub',
    technique: 'Acid-curing & cold mustard bloom',
  },
  {
    id: 'dish-3',
    name: 'Enchor & Gola Ruti Hand-Tacos',
    bengaliName: 'এঁচোড় ও গোলা রুটি ট্যাকো',
    category: 'Heirloom & Zero-Waste',
    subtitle: 'Spiced young green jackfruit in traditional lacy crepes',
    description: 'Slow-braised green jackfruit carnitas folded inside delicate Bengali rice-flour pan-crepes.',
    story: '“In traditional kitchens, young jackfruit is known fondly as ‘gachh-patha’ (tree mutton). We braise it with bay leaves, cinnamon, and ginger until meltingly tender, wrapped in lacy, golden-edged gola ruti.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
    ingredients: ['Tender Green Jackfruit', 'Lacy Rice Flour Crepe', 'Whole Garam Masala', 'Cold-Pressed Mustard Oil', 'Pickled Shallots'],
    pairing: 'Smoked Coriander Seed Infusion',
    technique: 'Cast-iron braise & griddle blister',
  },
  {
    id: 'dish-4',
    name: 'Overnight Pantaa Bhaat Feast',
    bengaliName: 'পান্তা ভাত ও পঞ্চ ব্যঞ্জন',
    category: 'Ferments & Sea',
    subtitle: 'Probiotic fermented rice, aloor khosha bhaja & mustard',
    description: 'Heritage overnight fermented rice accompanied by charred green chilies, roasted potato mash, and crunchy vegetable peel crisps.',
    story: '“The ultimate ancient comfort of rural Bengal. Fermenting overnight unlocks gut-soothing probiotics, subtle effervescence, and deep earthiness. Paired with crispy potato skins, nothing goes to waste.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
    ingredients: ['Fermented Heritage Jasmine Rice', 'Aloo Chokha', 'Crisp Potato Skin Bhaja', 'Charred Green Chili', 'Mustard Oil Drizzle'],
    pairing: 'Chilled Lebu-Pantaa Water with sea salt',
    technique: '18-hour slow ambient lactic fermentation',
  },
  {
    id: 'dish-5',
    name: 'Steamed Bhetki in Banana Leaf',
    bengaliName: 'কলাপাতায় ভাপা মাছ',
    category: 'Street & Nostalgia',
    subtitle: 'Whole river fish parcel, coconut & yellow-black mustard',
    description: 'Tender river fish fillet smothered in pungent two-mustard paste and coconut, gently steamed in charred banana leaf parcels.',
    story: '“Unwrapping the charred banana leaf releases an intoxicating plume of mustard steam and sweet coconut. The fish flakes at the touch of a fork, soaked in the fragrant oils of the leaf.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_2/v1788549942/WhatsApp_Video_2026-09-05_at_12.42.00_AM_3_lm4akh.jpg',
    ingredients: ['Fresh River Bhetki Fillet', 'Pounded Yellow & Black Mustard', 'Fresh Grated Coconut', 'Slit Green Chilies', 'Smoked Banana Leaf'],
    pairing: 'Crisp Bengal Delta Pilsner / Jasmine Tea',
    technique: 'Leaf-wrapped gentle steam lock',
  },
  {
    id: 'dish-6',
    name: 'Daab Malai Kheer & Nolen Gur Malpua',
    bengaliName: 'ডাব মালাই ক্ষীর ও মালপোয়া',
    category: 'Harvest Sweets',
    subtitle: 'Tender coconut cream pudding with winter date-palm jaggery',
    description: 'Silken tender coconut meat slow-steeped in rich milk, accompanied by warm fennel-scented golden malpua.',
    story: '“Winter in Bengal is synonymous with Nolen Gur—the liquid amber tapped from date-palm trees at dawn. Here, smoky jaggery glazes crispy, pillowy malpuas alongside cooling, delicate coconut pudding.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.39_AM_lq60g7.jpg',
    ingredients: ['Tender Green Coconut Pulp', 'Smoky Nolen Gur Jaggery', 'Reduced Cardamom Milk', 'Fennel Seed Malpua', 'Toasted Pistachios'],
    pairing: 'Spiced Black Tea with saffron and cardamom',
    technique: 'Slow-reduction & artisanal jaggery glaze',
  },
];

const CATEGORIES = [
  'All',
  'Street & Nostalgia',
  'Heirloom & Zero-Waste',
  'Ferments & Sea',
  'Harvest Sweets',
] as const;

export const UniqueDishesGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDish, setSelectedDish] = useState<PreparedDish | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'showcase'>('grid');

  const filteredDishes = useMemo(() => {
    if (activeCategory === 'All') return PREPARED_DISHES;
    return PREPARED_DISHES.filter((d) => d.category === activeCategory);
  }, [activeCategory]);

  const handleNextDish = () => {
    if (!selectedDish) return;
    const currentIdx = filteredDishes.findIndex((d) => d.id === selectedDish.id);
    const nextIdx = (currentIdx + 1) % filteredDishes.length;
    setSelectedDish(filteredDishes[nextIdx]);
  };

  const handlePrevDish = () => {
    if (!selectedDish) return;
    const currentIdx = filteredDishes.findIndex((d) => d.id === selectedDish.id);
    const prevIdx = (currentIdx - 1 + filteredDishes.length) % filteredDishes.length;
    setSelectedDish(filteredDishes[prevIdx]);
  };

  return (
    <section id="dishes-gallery" className="py-20 sm:py-28 bg-[#ECE5DA] text-[#28221D] border-b border-[#D5CBBD] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D5CBBD] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#B58D59] font-sans bg-[#F7F3EC] px-4 py-1.5 rounded-full border border-[#D5CBBD]">
              <Utensils className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>CULINARY GALLERY • PREPARED DISHES</span>
            </div>
            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl font-normal text-[#28221D] tracking-tight">
              Dishes from the Atelier
            </h2>
            <div className="flex items-center space-x-3">
              <span className="font-bengali text-2xl sm:text-3xl text-[#655B51] font-medium">
                অনন্য রান্নার সংগ্রহ
              </span>
              <span className="font-pt-serif italic text-xs sm:text-sm text-[#8C7D70]">
                / Seasonal creations cooked by memory & instinct /
              </span>
            </div>
          </div>

          {/* Right Header Description & View Toggle */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-sans text-xs sm:text-sm text-[#655B51] max-w-md leading-relaxed font-light text-left md:text-right">
              Explore the signature courses handcrafted by Enakshi—spanning slow fermented grains, fire-roasted peels, and nostalgic Bengali heirloom temperings.
            </p>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center bg-[#F7F3EC] p-1 rounded-full border border-[#D5CBBD] text-xs">
              <button
                onClick={() => setActiveView('grid')}
                className={`px-3 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeView === 'grid'
                    ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs font-semibold'
                    : 'text-[#655B51] hover:text-[#28221D]'
                }`}
              >
                Editorial Grid
              </button>
              <button
                onClick={() => setActiveView('showcase')}
                className={`px-3 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeView === 'showcase'
                    ? 'bg-[#28221D] text-[#ECE5DA] shadow-xs font-semibold'
                    : 'text-[#655B51] hover:text-[#28221D]'
                }`}
              >
                Story Carousel
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans whitespace-nowrap transition-all duration-300 cursor-pointer border flex items-center space-x-2 ${
                  isActive
                    ? 'bg-[#28221D] text-[#ECE5DA] border-[#28221D] shadow-sm font-medium scale-102'
                    : 'bg-[#F7F3EC] text-[#4A4138] border-[#D5CBBD] hover:border-[#B58D59] hover:bg-[#FAF6F0]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#B58D59]' : 'bg-[#D5CBBD]'}`} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Content View */}
        {activeView === 'grid' ? (
          /* Editorial Masonry Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group relative bg-[#F7F3EC] rounded-3xl overflow-hidden border border-[#D5CBBD] shadow-xs hover:shadow-2xl hover:border-[#B58D59] transition-all duration-500 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 select-none"
              >
                {/* Image Container with Zoom & Gradient */}
                <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-[#1C1713]/85 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase border border-white/20 text-[#B58D59] font-bold shadow-xs">
                      {dish.category}
                    </span>
                  </div>

                  {/* Quick Inspect Icon Overlay */}
                  <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-9 h-9 rounded-full bg-[#1C1713]/85 backdrop-blur-md text-[#ECE5DA] flex items-center justify-center border border-white/20 shadow-md group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4 text-[#B58D59]" />
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-marcellus text-xl sm:text-2xl font-normal text-[#28221D] group-hover:text-[#B58D59] transition-colors duration-300 leading-snug">
                        {dish.name}
                      </h3>
                      <span className="font-bengali text-sm text-[#8C7D70] font-medium ml-2">
                        {dish.bengaliName}
                      </span>
                    </div>

                    <p className="font-pt-serif italic text-xs sm:text-sm text-[#655B51] leading-relaxed">
                      {dish.subtitle}
                    </p>
                  </div>

                  {/* Flavor / Terroir Tags */}
                  <div className="pt-2 border-t border-[#D5CBBD]/60 flex flex-wrap gap-1.5">
                    {dish.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="bg-[#ECE5DA] text-[#4A4138] px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                    {dish.ingredients.length > 3 && (
                      <span className="text-[10px] text-[#8C7D70] font-mono self-center">
                        +{dish.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Horizontal Story Showcase */
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 scroll-smooth scrollbar-thin scrollbar-thumb-[#B58D59]/50 scrollbar-track-white/5">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="w-[88vw] sm:w-[420px] md:w-[460px] shrink-0 snap-start bg-[#F7F3EC] rounded-3xl overflow-hidden border border-[#D5CBBD] shadow-md hover:shadow-xl hover:border-[#B58D59] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E0D5]">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1C1713]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9.5px] font-mono tracking-wider uppercase border border-white/20 text-[#B58D59] font-bold">
                      {dish.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                    <h3 className="font-marcellus text-2xl font-normal drop-shadow-sm">
                      {dish.name}
                    </h3>
                    <span className="font-bengali text-sm text-[#D5CBBD]">
                      {dish.bengaliName}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 text-left">
                  <p className="font-pt-serif italic text-sm text-[#4A4138] leading-relaxed line-clamp-3">
                    {dish.story}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#655B51] pt-3 border-t border-[#D5CBBD]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B58D59] font-bold">
                      {dish.technique}
                    </span>
                    <span className="inline-flex items-center space-x-1 text-[#28221D] font-medium group-hover:text-[#B58D59]">
                      <span>Read Dish Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Interactive Dish Dossier Lightbox */}
        {selectedDish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in-scale"
            onClick={() => setSelectedDish(null)}
          >
            <div
              className="relative w-full max-w-3xl bg-[#F7F3EC] text-[#28221D] rounded-3xl overflow-hidden shadow-2xl border border-[#D5CBBD] max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#D5CBBD] bg-[#ECE5DA]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#B58D59] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B58D59] font-bold">
                    DISH DOSSIER // {selectedDish.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevDish}
                    className="p-1.5 rounded-full bg-[#F7F3EC] hover:bg-[#28221D] hover:text-white border border-[#D5CBBD] transition-all cursor-pointer"
                    title="Previous Dish"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextDish}
                    className="p-1.5 rounded-full bg-[#F7F3EC] hover:bg-[#28221D] hover:text-white border border-[#D5CBBD] transition-all cursor-pointer"
                    title="Next Dish"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDish(null)}
                    className="p-1.5 rounded-full bg-[#F7F3EC] hover:bg-[#28221D] hover:text-white border border-[#D5CBBD] transition-all cursor-pointer ml-1"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-left">
                {/* Hero Dish Image */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#E8E0D5] border border-[#D5CBBD] shadow-inner">
                  <img
                    src={selectedDish.imageUrl}
                    alt={selectedDish.name}
                    className="w-full h-full object-cover filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="font-marcellus text-3xl sm:text-4xl font-normal leading-tight">
                      {selectedDish.name}
                    </h3>
                    <p className="font-bengali text-lg sm:text-xl text-[#B58D59] font-medium pt-0.5">
                      {selectedDish.bengaliName}
                    </p>
                  </div>
                </div>

                {/* Subtitle & Story */}
                <div className="space-y-4">
                  <p className="font-pt-serif italic text-lg text-[#28221D] leading-relaxed border-l-3 border-[#B58D59] pl-4 py-1">
                    {selectedDish.story}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#4A4138] leading-relaxed font-light">
                    {selectedDish.description}
                  </p>
                </div>

                {/* Grid Info: Ingredients & Technique */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-[#ECE5DA] p-4 rounded-2xl border border-[#D5CBBD] space-y-2">
                    <div className="flex items-center space-x-1.5 text-[#B58D59]">
                      <Leaf className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                        Key Terroir & Ingredients
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#28221D] font-sans">
                      {selectedDish.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span className="w-1 h-1 rounded-full bg-[#B58D59]" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#ECE5DA] p-4 rounded-2xl border border-[#D5CBBD] space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-[#B58D59]">
                        <Flame className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
                          Cooking Technique
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#28221D] font-medium">
                        {selectedDish.technique}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#D5CBBD]/60 space-y-1">
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#655B51] font-bold block">
                        Recommended Pairing
                      </span>
                      <p className="font-pt-serif italic text-xs text-[#4A4138]">
                        {selectedDish.pairing}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-[#D5CBBD] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-sans text-xs text-[#655B51]">
                    Featured on rotating seasonal tasting editions.
                  </span>
                  <a
                    href="#table-concierge"
                    onClick={() => setSelectedDish(null)}
                    className="px-6 py-2.5 bg-[#28221D] hover:bg-[#1C1713] text-[#ECE5DA] rounded-full font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:scale-[1.02]"
                  >
                    Request a Tasting Table
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
