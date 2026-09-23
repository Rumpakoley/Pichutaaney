import React, { useState } from 'react';
import { Sparkles, Utensils, Flame, Leaf, ArrowRight, ChevronRight, ChevronLeft, Compass, Wine, Bookmark, Award } from 'lucide-react';

export interface PreparedDish {
  id: string;
  plateNumber: string;
  name: string;
  bengaliName: string;
  category: 'Street & Nostalgia' | 'Heirloom & Zero-Waste' | 'Ferments & Sea' | 'Harvest Sweets';
  subtitle: string;
  description: string;
  story: string;
  imageUrl: string;
  ingredients: { name: string; origin: string }[];
  pairing: string;
  technique: string;
  flavorProfile: {
    mustardHeat: number; // 0 - 100
    citrusAroma: number;
    earthiness: number;
    sweetness: number;
  };
}

export const PREPARED_DISHES: PreparedDish[] = [
  {
    id: 'dish-1',
    plateNumber: 'PLATE 01',
    name: 'Burrata Ghugni Chaat',
    bengaliName: 'ঘুঘনি চাট ও বুরাটা',
    category: 'Street & Nostalgia',
    subtitle: 'Creamy Italian burrata, yellow peas & roasted chilli oil',
    description: 'An elevated, cross-cultural bridge between Kolkata street nostalgia and silken Mediterranean cheese.',
    story: '“Walking home from College Street, the aroma of spicy yellow pea ghugni was unforgettable. Here, creamy cold burrata melts gently against warm, spiced yellow peas, finished with a smoky splash of house-steeped roasted chilli oil.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.50.22_AM_dzhiyz.jpg',
    ingredients: [
      { name: 'Yellow Dried Peas', origin: 'Kolkata Street Markets' },
      { name: 'Pugliese Burrata', origin: 'Fresh Handcrafted Curd' },
      { name: 'Roasted Cumin (Bhaja Moshla)', origin: 'Heirloom Hand-Pounded' },
      { name: 'Aged Tamarind Chutney', origin: 'Slow-Sun Cured' },
      { name: 'Smoky Mustard Chilli Oil', origin: 'Cold-Pressed Raw Oil' },
    ],
    pairing: 'Sparkling Tamarind & Rock Salt Spritz',
    technique: 'Slow-simmered tempering with dual temperature balance',
    flavorProfile: {
      mustardHeat: 65,
      citrusAroma: 40,
      earthiness: 85,
      sweetness: 35,
    },
  },
  {
    id: 'dish-2',
    plateNumber: 'PLATE 02',
    name: 'Mango & Wild Tamarind Ceviche',
    bengaliName: 'আম ও তেঁতুল সেভিচে',
    category: 'Ferments & Sea',
    subtitle: 'Citrusy raw mango cure, wild kashundi & crisp pear',
    description: 'Fresh scallops or sweet pear cured in piquant green mango pulp, roasted cumin, and pungent Bengali mustard.',
    story: '“A tribute to Bengal’s sultry summer orchards. The astringent sting of green mango and fermented kashundi cuts cleanly through tender seafood or sweet pear, awakening the palate with every chilled bite.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_2/v1788549943/WhatsApp_Video_2026-09-05_at_12.42.00_AM_jkldp2.jpg',
    ingredients: [
      { name: 'Green Mango Pulp', origin: 'Malda River Orchards' },
      { name: 'Shorshe Kashundi', origin: 'Nadia Wild Ferment' },
      { name: 'Asian Sweet Pear', origin: 'Cold-Crisp Ribboned' },
      { name: 'Aged Tamarind', origin: 'Spiced Black Tamarind' },
      { name: 'Rock Salt (Bit Noon)', origin: 'Ancient Mineral Flakes' },
    ],
    pairing: 'Gondhoraj Lebu Fermented Probiotic Shrub',
    technique: 'Natural citrus-acid cure & cold mustard blooming',
    flavorProfile: {
      mustardHeat: 80,
      citrusAroma: 95,
      earthiness: 45,
      sweetness: 50,
    },
  },
  {
    id: 'dish-3',
    plateNumber: 'PLATE 03',
    name: 'Enchor & Gola Ruti Hand-Tacos',
    bengaliName: 'এঁচোড় ও গোলা রুটি ট্যাকো',
    category: 'Heirloom & Zero-Waste',
    subtitle: 'Spiced young green jackfruit in traditional lacy crepes',
    description: 'Slow-braised green jackfruit carnitas folded inside delicate Bengali rice-flour pan-crepes.',
    story: '“In traditional kitchens, young jackfruit is known fondly as ‘gachh-patha’ (tree mutton). We braise it with bay leaves, cinnamon, and ginger until meltingly tender, wrapped in lacy, golden-edged gola ruti.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
    ingredients: [
      { name: 'Tender Green Jackfruit', origin: 'Heirloom Tree Harvest' },
      { name: 'Lacy Rice Flour Crepe', origin: 'Cast-Iron Blistered' },
      { name: 'Whole Garam Masala', origin: 'Cardamom, Cinnamon & Clove' },
      { name: 'Cold-Pressed Mustard Oil', origin: 'Village Expeller Pressed' },
      { name: 'Quick-Pickled Shallots', origin: 'Vinegar & Green Chili' },
    ],
    pairing: 'Smoked Coriander Seed & Fennel Infusion',
    technique: 'Heavy iron slow-braise with blistered crepe wrap',
    flavorProfile: {
      mustardHeat: 55,
      citrusAroma: 30,
      earthiness: 90,
      sweetness: 25,
    },
  },
  {
    id: 'dish-4',
    plateNumber: 'PLATE 04',
    name: 'Overnight Pantaa Bhaat Feast',
    bengaliName: 'পান্তা ভাত ও পঞ্চ ব্যঞ্জন',
    category: 'Ferments & Sea',
    subtitle: 'Probiotic fermented rice, aloor khosha bhaja & mustard',
    description: 'Heritage overnight fermented rice accompanied by charred green chilies, roasted potato mash, and crunchy vegetable peel crisps.',
    story: '“The ultimate ancient comfort of rural Bengal. Fermenting overnight unlocks gut-soothing probiotics, subtle effervescence, and deep earthiness. Paired with crispy potato skins, nothing goes to waste.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
    ingredients: [
      { name: 'Fermented Jasmine Rice', origin: '18-Hour Ambient Soak' },
      { name: 'Smoked Aloo Chokha', origin: 'Fire-Roasted with Mustard' },
      { name: 'Potato Peel Crisps', origin: 'Zero-Waste Khosha Bhaja' },
      { name: 'Charred Green Chili', origin: 'Clay Hearth Scorched' },
      { name: 'Raw Mustard Oil Pool', origin: 'Pungent First Press' },
    ],
    pairing: 'Lebu-Pantaa Rice Water with toasted cumin',
    technique: '18-hour slow ambient lactic fermentation',
    flavorProfile: {
      mustardHeat: 70,
      citrusAroma: 60,
      earthiness: 95,
      sweetness: 10,
    },
  },
  {
    id: 'dish-5',
    plateNumber: 'PLATE 05',
    name: 'Steamed Bhetki in Banana Leaf',
    bengaliName: 'কলাপাতায় ভাপা মাছ',
    category: 'Street & Nostalgia',
    subtitle: 'Whole river fish parcel, coconut & yellow-black mustard',
    description: 'Tender river fish fillet smothered in pungent two-mustard paste and coconut, gently steamed in charred banana leaf parcels.',
    story: '“Unwrapping the charred banana leaf releases an intoxicating plume of mustard steam and sweet coconut. The fish flakes at the touch of a fork, soaked in the fragrant oils of the leaf.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/video/upload/so_2/v1788549942/WhatsApp_Video_2026-09-05_at_12.42.00_AM_3_lm4akh.jpg',
    ingredients: [
      { name: 'Fresh River Bhetki Fillet', origin: 'Delta River Silts' },
      { name: 'Yellow & Black Mustard', origin: 'Stone Ground with Green Chili' },
      { name: 'Fresh Grated Coconut', origin: 'Sweet Coastal Flesh' },
      { name: 'Wilted Banana Leaves', origin: 'Open Flame Smoked' },
      { name: 'Raw Mustard Oil Seal', origin: 'Direct Cold Press' },
    ],
    pairing: 'Bengal Delta Roasted Rice Lager / Green Jasmine Tea',
    technique: 'Leaf-wrapped gentle steam aroma lock',
    flavorProfile: {
      mustardHeat: 90,
      citrusAroma: 35,
      earthiness: 75,
      sweetness: 40,
    },
  },
  {
    id: 'dish-6',
    plateNumber: 'PLATE 06',
    name: 'Daab Malai Kheer & Nolen Gur Malpua',
    bengaliName: 'ডাব মালাই ক্ষীর ও মালপোয়া',
    category: 'Harvest Sweets',
    subtitle: 'Tender coconut cream pudding with winter date-palm jaggery',
    description: 'Silken tender coconut meat slow-steeped in rich milk, accompanied by warm fennel-scented golden malpua.',
    story: '“Winter in Bengal is synonymous with Nolen Gur—the liquid amber tapped from date-palm trees at dawn. Here, smoky jaggery glazes crispy, pillowy malpuas alongside cooling, delicate coconut pudding.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.39_AM_lq60g7.jpg',
    ingredients: [
      { name: 'Tender Green Coconut Cream', origin: 'Coastal Palm Groves' },
      { name: 'Smoky Nolen Gur Jaggery', origin: 'Dawn-Tapped Date Palm' },
      { name: 'Reduced Cardamom Milk', origin: 'Slow Clay Pot Simmer' },
      { name: 'Fennel Seed Malpua', origin: 'Ghee-Fried Golden Crisp' },
      { name: 'Roasted Green Pistachios', origin: 'Hand Crushed Garnish' },
    ],
    pairing: 'Smoky Winter Chai with saffron threads',
    technique: 'Slow milk-reduction & smoky molten jaggery dip',
    flavorProfile: {
      mustardHeat: 0,
      citrusAroma: 20,
      earthiness: 60,
      sweetness: 95,
    },
  },
];

export const UniqueDishesGallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'story' | 'ingredients' | 'flavor'>('story');
  const [isAnimating, setIsAnimating] = useState(false);

  const activeDish = PREPARED_DISHES[selectedIdx];

  const handleSelectDish = (idx: number) => {
    if (idx === selectedIdx) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setIsAnimating(false);
    }, 200);
  };

  const handleNext = () => {
    handleSelectDish((selectedIdx + 1) % PREPARED_DISHES.length);
  };

  const handlePrev = () => {
    handleSelectDish((selectedIdx - 1 + PREPARED_DISHES.length) % PREPARED_DISHES.length);
  };

  return (
    <section id="dishes-gallery" className="py-20 sm:py-28 bg-[#1C1713] text-[#ECE5DA] border-b border-[#382F27] text-left relative overflow-hidden">
      {/* Ambient background atmosphere glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#B58D59]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#28221D] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header with Heritage Stamp */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-bold text-[#B58D59] font-sans bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <Utensils className="w-3.5 h-3.5 text-[#B58D59]" />
              <span>THE SENSORY TASTING ATELIER</span>
            </div>
            
            <h2 className="font-marcellus text-3xl sm:text-5xl md:text-6xl font-normal text-[#ECE5DA] tracking-tight leading-tight">
              Dishes Crafted by Instinct
            </h2>

            <div className="flex items-center space-x-3 pt-1">
              <span className="font-bengali text-2xl sm:text-3xl text-[#B58D59] font-medium">
                অনন্য রান্নার সংগ্রহ ও স্মৃতিকথা
              </span>
              <span className="hidden sm:inline font-pt-serif italic text-xs sm:text-sm text-[#D5CBBD]/70">
                / A living exhibition of seasonal plates, wild mustard & memory /
              </span>
            </div>
          </div>

          {/* Right Header: Wax Stamp & Counter */}
          <div className="flex items-center space-x-4 shrink-0">
            {/* Vintage Wax Seal Badge */}
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#B58D59]/50 flex flex-col items-center justify-center p-2 text-center bg-[#28221D]/60 backdrop-blur-md shadow-inner group hover:border-[#B58D59] transition-all">
              <Sparkles className="w-3.5 h-3.5 text-[#B58D59] mb-0.5 animate-pulse" />
              <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#B58D59] font-bold">
                PCH • 2026
              </span>
              <span className="font-bengali text-[8.5px] text-[#ECE5DA]">
                স্বাদ ও স্মৃতি
              </span>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex flex-col items-end space-y-1">
              <span className="font-mono text-[11px] text-[#B58D59] tracking-widest uppercase">
                {activeDish.plateNumber} OF 06
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  aria-label="Previous plate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B58D59] hover:text-[#1C1713] text-white flex items-center justify-center border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  aria-label="Next plate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bespoke Interactive Centerpiece Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Cinematic Visual Plate with Gilded Arch Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-[#28221D] border-2 border-[#B58D59]/40 shadow-2xl group aspect-[4/4.6] sm:aspect-[4/4.2]">
              {/* Main Dish Image with Smooth Cross-Fade */}
              <div
                className={`w-full h-full relative transition-all duration-300 ${
                  isAnimating ? 'opacity-40 scale-98 blur-xs' : 'opacity-100 scale-100 blur-none'
                }`}
              >
                <img
                  src={activeDish.imageUrl}
                  alt={activeDish.name}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Ambient Vignette & Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/25 pointer-events-none" />

              {/* Top Banner Tag */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
                <span className="bg-[#1C1713]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9.5px] font-mono tracking-widest uppercase border border-white/20 text-[#B58D59] font-bold shadow-md">
                  {activeDish.plateNumber} // {activeDish.category}
                </span>

                <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono text-white/90 border border-white/10">
                  CHEF’S SIGNATURE
                </span>
              </div>

              {/* Bottom Image Overlay Plate Title & Bengali Calligraphy */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-left space-y-2 pointer-events-none z-10">
                <span className="font-bengali text-2xl sm:text-3xl text-[#B58D59] font-medium block">
                  {activeDish.bengaliName}
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
                  {activeDish.name}
                </h3>
                <p className="font-pt-serif italic text-xs sm:text-sm text-[#ECE5DA]/80 leading-relaxed max-w-md">
                  {activeDish.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Dossier & Interactive Sensory Matrix */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Interactive Dossier Nav Tabs */}
            <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10 max-w-max">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'story'
                    ? 'bg-[#B58D59] text-[#1C1713] font-bold shadow-sm'
                    : 'text-[#D5CBBD] hover:text-white'
                }`}
              >
                Memory & Story
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'bg-[#B58D59] text-[#1C1713] font-bold shadow-sm'
                    : 'text-[#D5CBBD] hover:text-white'
                }`}
              >
                Terroir & Provenance
              </button>
              <button
                onClick={() => setActiveTab('flavor')}
                className={`px-4 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'flavor'
                    ? 'bg-[#B58D59] text-[#1C1713] font-bold shadow-sm'
                    : 'text-[#D5CBBD] hover:text-white'
                }`}
              >
                Sensory Matrix
              </button>
            </div>

            {/* Tab 1: Memory & Chef's Story */}
            {activeTab === 'story' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="relative pl-6 border-l-2 border-[#B58D59] space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B58D59] font-bold block">
                    CHEF ENAKSHI’S MEMORY NOTE
                  </span>
                  <p className="font-pt-serif italic text-base sm:text-lg md:text-xl text-[#ECE5DA] leading-relaxed">
                    {activeDish.story}
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#D5CBBD] leading-relaxed font-light">
                  {activeDish.description}
                </p>

                {/* Pairing & Technique Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#28221D] border border-white/10 space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#B58D59]">
                      <Wine className="w-3.5 h-3.5" />
                      <span className="font-mono text-[9px] uppercase tracking-wider font-bold">
                        Drink Pairing
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#ECE5DA] font-light">
                      {activeDish.pairing}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#28221D] border border-white/10 space-y-1">
                    <div className="flex items-center space-x-1.5 text-[#B58D59]">
                      <Flame className="w-3.5 h-3.5" />
                      <span className="font-mono text-[9px] uppercase tracking-wider font-bold">
                        Cooking Technique
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#ECE5DA] font-light">
                      {activeDish.technique}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Terroir & Ingredients */}
            {activeTab === 'ingredients' && (
              <div className="space-y-4 animate-fade-in-up">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B58D59] font-bold block">
                  INGREDIENTS ROOTED IN THE SOIL OF BENGAL
                </span>

                <div className="space-y-2.5">
                  {activeDish.ingredients.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#28221D] border border-white/10 flex items-center justify-between hover:border-[#B58D59]/60 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-[#B58D59]" />
                        <span className="font-sans text-xs sm:text-sm text-[#ECE5DA] font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#B58D59] uppercase tracking-wider">
                        {item.origin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Sensory Flavor Matrix */}
            {activeTab === 'flavor' && (
              <div className="space-y-5 animate-fade-in-up">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B58D59] font-bold block">
                  TASTING SPECTRUM // INSTINCTIVE NOTES
                </span>

                <div className="space-y-4 p-5 rounded-2xl bg-[#28221D] border border-white/10">
                  {/* Mustard Heat */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#ECE5DA]">Mustard Heat & Pungency</span>
                      <span className="text-[#B58D59]">{activeDish.flavorProfile.mustardHeat}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B58D59] to-amber-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${activeDish.flavorProfile.mustardHeat}%` }}
                      />
                    </div>
                  </div>

                  {/* Citrus Lift */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#ECE5DA]">Citrus & Acid Brightness</span>
                      <span className="text-[#B58D59]">{activeDish.flavorProfile.citrusAroma}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B58D59] to-lime-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${activeDish.flavorProfile.citrusAroma}%` }}
                      />
                    </div>
                  </div>

                  {/* Earthiness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#ECE5DA]">Earthy & Slow-Simmer Depth</span>
                      <span className="text-[#B58D59]">{activeDish.flavorProfile.earthiness}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B58D59] to-stone-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${activeDish.flavorProfile.earthiness}%` }}
                      />
                    </div>
                  </div>

                  {/* Sweet Warmth */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#ECE5DA]">Sweet Caramel & Jaggery Warmth</span>
                      <span className="text-[#B58D59]">{activeDish.flavorProfile.sweetness}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#B58D59] to-orange-400 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${activeDish.flavorProfile.sweetness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Link */}
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="#table-concierge"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#B58D59] hover:bg-[#C49E67] text-[#1C1713] rounded-full font-sans text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:scale-102"
              >
                <span>Request Plate on Tasting Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <span className="text-xs text-[#D5CBBD]/60 font-mono hidden sm:inline">
                / Prepared fresh for private dinners /
              </span>
            </div>
          </div>
        </div>

        {/* Artisanal Plate Reel: The 6 Exhibition Cards Below */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-xs text-[#B58D59] uppercase tracking-widest font-bold">
              CURATED TASTING EXHIBITION // SELECT ANY PLATE
            </span>
            <span className="text-xs font-sans text-[#D5CBBD]/60">
              Click any plate to inspect recipe & tasting notes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PREPARED_DISHES.map((dish, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={dish.id}
                  onClick={() => handleSelectDish(idx)}
                  className={`group relative rounded-2xl overflow-hidden p-2.5 text-left transition-all duration-300 border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#28221D] border-[#B58D59] shadow-xl scale-[1.03] ring-1 ring-[#B58D59]/60'
                      : 'bg-[#28221D]/50 border-white/10 hover:border-white/30 hover:bg-[#28221D]'
                  }`}
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 mb-2">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isSelected ? 'scale-108' : 'group-hover:scale-105 opacity-80 group-hover:opacity-100'
                      }`}
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="bg-black/80 backdrop-blur-xs text-[8px] font-mono text-[#B58D59] px-1.5 py-0.5 rounded-full uppercase">
                        {dish.plateNumber}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="font-bengali text-[11px] text-[#B58D59] block truncate">
                      {dish.bengaliName}
                    </span>
                    <h4 className="font-marcellus text-xs text-white leading-snug line-clamp-2">
                      {dish.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
