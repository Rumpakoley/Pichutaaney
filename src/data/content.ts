import { MenuCourse, RegionalFlavourPillar } from '../types';

export const MANIFESTO_TEXT = {
  hook: "Food to me has never been about rigid regional rules or culinary formulas. I cook from instincts, memory, and the rhythm of the moment.",
  core: "My recipes are living tapestries shaped by all the places I have lived and traveled to. From the mustard oils of the Bengal delta to the coastal winds, mountain markets, and diverse kitchens I’ve called home—every journey leaves its imprint on my palate.",
  roots: "I come from West Bengal, and home will always remain my emotional anchor. But travel has broadened my kitchen beyond borders. Pichhutaaney is that gentle, nostalgic pull of where you came from, expressed through meals created with raw intuition and wanderlust.",
  purpose: "I invite you to an unhurried table where dishes are not standardized recipes, but personal stories—born of wanderlust, intuition, and heartfelt memory.",
  legacy: "Preserving culture isn’t about museum exhibits. It lives in the way we cook by instinct, in kitchen notebooks, and in the memories we bring back from our travels. That is the soul of Pichhutaaney."
};

export const REGIONAL_PILLARS: RegionalFlavourPillar[] = [
  {
    region: "The Bengal Anchor & River Silts",
    anchorIngredient: "Mustard Oil, Poppy Seed (Posto) & Nigella",
    description: "The emotional foundation: pungent cold-pressed mustard oil, silken poppy seed pastes, and fragrant tempered spices that sparked my lifelong love for cooking.",
    nuance: "The childhood memories and grandmother's kitchen notebooks that anchor my palate."
  },
  {
    region: "Coastal Journeys & Southern Wanderings",
    anchorIngredient: "Fresh Coconut, Curry Leaves & Kokum",
    description: "Inspirations drawn from living and traveling along coastal belts: fragrant coconut broths, tangy tamarind temperings, and the freshness of sea breezes.",
    nuance: "Lightness, acidity, and aromatic crackles that found their way into my everyday instincts."
  },
  {
    region: "Wanderings through Mountain & Plateau Terroirs",
    anchorIngredient: "Slow-reduced Stocks, Himalayan Spices & Roasted Seeds",
    description: "Memories of misty mountain kitchens, rustic hearths, and the warmth of slow simmered broths shared with strangers on long travels.",
    nuance: "Hearty, unpretentious cooking that taught me patience and the power of simple ingredients."
  },
  {
    region: "Global Migrations & Cross-Cultural Kitchens",
    anchorIngredient: "Heirloom Produce, Contemporary Ferments & Wild Aromatics",
    description: "Living across different cities abroad and weaving unexpected local seasonal harvests into traditional flavor memories.",
    nuance: "Where intuition meets wanderlust—creating soulful dishes that belong to a traveler's heart."
  }
];

export interface TastingMenuTheme {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  bengaliTitle: string;
  description: string;
  imageUrl: string;
  courses: {
    courseNumber: string;
    courseTitle: string;
    bengaliName: string;
    description: string;
    tag?: string;
    heirloomElement?: string;
    pairingNote?: string;
  }[];
  drinkPairing?: string;
}

export const CLIENT_MENU_COLLECTION: TastingMenuTheme[] = [
  {
    id: 'calcutta-kiss',
    title: 'Calcutta Kiss',
    subtitle: 'Modern intuitive culinary interpretations of Kolkata memories',
    tag: 'POP-UP MENU • CALCUTTA KISS',
    bengaliTitle: 'ক্যালকাটা কিস',
    description: 'An elevated, instinct-led journey that bridges street-food nostalgia, rich dairy notes, and sharp river mustard with global cross-cultural touches.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.50.22_AM_dzhiyz.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Burrata Ghugni Chaat',
        bengaliName: 'ঘুঘনি চাট ও বুরাটা',
        description: 'Creamy burrata layered over street-style yellow pea ghoogni, finished with a gentle drizzle of chili oil.',
        tag: 'Street Food • Creamy • Spiced',
        heirloomElement: 'Warm street-side memory elevated with Italian burrata richness.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Mango & Tamarind Ceviche',
        bengaliName: 'আম ও তেঁতুল সেভিচে',
        description: 'Chilled scallops or sweet crisp pear, cured in citrusy mango pulp, balanced with tangy tamarind and mustardy artisanal kashundi.',
        tag: 'Scallop / Pear Option • Tangy & Mustard',
        heirloomElement: 'Citrus and green mango acid balance derived from delta summers.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Gondhoraj Chicken / Paneer',
        bengaliName: 'গন্ধরাজ চিকেন / পনির',
        description: 'Fragrant chicken or succulent cottage paneer kissed with Bengal’s beloved king of limes—gondhoraj, served alongside a kashundi-marinated mango salad.',
        tag: 'Gondhoraj Citrus • Aromatic',
        heirloomElement: 'The intoxicating floral aroma of fresh Gondhoraj lime leaves.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Jau Bhaat & Maach / Begun Bhaja',
        bengaliName: 'জাউ ভাত ও মাছ / বেগুন ভাজা',
        description: 'Warm comfort rice gruel with spicy miso-flavoured crispy pan-fried fish or charred eggplant, finished with sharp doi-kashundi.',
        tag: 'Comfort Gruel • Umami Miso • Mustard Yogurt',
        heirloomElement: 'The childhood staple of sickbeds and stormy afternoons, given savory depth.',
      },
      {
        courseNumber: '05',
        courseTitle: 'Carrot Halwa with Rasmalai Foam',
        bengaliName: 'গাজরের হালুয়া ও রসমলাই ফোম',
        description: 'Rich slow-simmered carrot halwa crowned with light, aerated saffron milk foam and hand-chopped roasted pistachio and almond slivers.',
        tag: 'Saffron Foam • Warm & Velvety',
        heirloomElement: 'Classic winter confection married with delicate Bengali rasmalai.',
      },
    ],
  },
  {
    id: 'zero-waste-heirloom',
    title: 'Zero-Waste & Heirloom Notes',
    subtitle: 'Root-to-stem cooking and vegetable stories from the ancestral pantry',
    tag: 'TASTING NIGHTS • HEIRLOOM & ZERO-WASTE',
    bengaliTitle: 'শাকসবজি ও খোসা ভাজা',
    description: 'A tribute to the frugality and deep care of home kitchens—where peels, stems, and wild greens take center stage and nothing is wasted.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Neem Begun Chokha with Posto Sauce',
        bengaliName: 'নিম বেগুন চোখা ও পোস্ত সস',
        description: 'Fire-roasted eggplant mashed with tender bitter young neem leaves, cushioned in a silken, stone-ground white poppy seed sauce.',
        tag: 'Bitter & Silken • Posto Backbone',
        heirloomElement: 'The traditional Ayurvedic bitters that awaken digestion and senses.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Dhone Pata & Aloor Khosha Chat',
        bengaliName: 'ধনে পাতা ও আলুর খোসা চাট',
        description: 'Crispy pan-roasted potato peels tossed with vibrant coriander leaf emulsion, roasted spice rub, and sweet-tart reductions.',
        tag: 'Zero-Waste • Crispy Peels • Fresh Herbs',
        heirloomElement: 'Turning humble vegetable skins into an addictive savory delight.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Enchor & Gola Ruti Taco',
        bengaliName: 'এঁচোড় ও গোলা রুটি ট্যাকো',
        description: 'Tender spiced green jackfruit (enchor) slow-braised to a meat-like tenderness, folded inside a traditional Bengali lacy pan crepe (gola ruti) taco.',
        tag: 'Tree Mutton (Jackfruit) • Lacy Roti',
        heirloomElement: 'Bengal’s legendary ‘gachh-paatha’ (tree mutton) in a handheld street vessel.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Miso Glazed Maach / Paneer Bhaja & Lau Ghonto & Bhaat',
        bengaliName: 'মিসো গ্লেজড মাছ / পনির ভাজা, লাউ ঘণ্ট ও ভাত',
        description: 'Crispy river fish or paneer glazed with savoury fermented miso, accompanied by slow-simmered delicate bottle gourd with bori lentil dumplings and hot steamed rice.',
        tag: 'Fermented Umami • Slow Bottle Gourd • Rice',
        heirloomElement: 'Lau ghonto cooked with tender stem fibers and fragrant cumin tempering.',
      },
      {
        courseNumber: '05',
        courseTitle: 'Daab Malai Kheer & Malpua',
        bengaliName: 'ডাব মালাই ক্ষীর ও মালপোয়া',
        description: 'Silken tender green coconut cream pudding paired with warm, fennel-perfumed golden Bengali malpua pancakes.',
        tag: 'Tender Coconut • Warm Spiced Malpua',
        heirloomElement: 'Tender coconut scooped straight from green pods in the delta breeze.',
      },
    ],
    drinkPairing: 'Drink: Gondhoraj Lebu R Ghol (Churned yogurt buttermilk with aromatic Gondhoraj lime)',
  },
  {
    id: 'heritage-fermentation',
    title: 'Heritage Nostalgia & Pantaa Bhaat',
    subtitle: 'Fermented comfort, Anglo-Indian archives, and winter date palm jaggery',
    tag: 'TASTING NIGHTS • FERMENTATION & MEMORY',
    bengaliTitle: 'পান্তা ভাত ও স্মৃতির শহর',
    description: 'An evocative voyage through Kolkata’s colonial culinary archives, ancient rice fermentation techniques, and celebratory jaggery confections.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Mango Tamarind Ceviche',
        bengaliName: 'আম তেঁতুল সেভিচে',
        description: 'Fresh chilled scallops or crisp autumn pears cured in tangy mango puree, tamarind water, and tempered wild radhuni spices.',
        tag: 'Scallops / Pears • Tangy Citric Start',
        heirloomElement: 'The tart edge of raw mangoes and sun-aged tamarind pulp.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Dirty Brioche with Anglo Indian Vindaloo',
        bengaliName: 'ব্রায়োশ ও অ্যাংলো ইন্ডিয়ান ভিন্দালু',
        description: 'Rich butter-toasted brioche soaked in the spicy, vinegar-tinged reduction of historic Anglo-Indian vindaloo (choice of Pork or Wild Forest Mushrooms).',
        tag: 'Pork / Mushroom Option • Tangy Vinegar Stew',
        heirloomElement: 'The fiery, vinegar-matured meat stews of Bow Barracks and vintage Calcutta clubs.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Pantaa Bhaat Feast',
        bengaliName: 'পান্তা ভাত ও পঞ্চ ব্যঞ্জন',
        description: 'Overnight naturally fermented probiotic rice served with aloo chokha (potatoes mashed with fried shallots), Aloor khosha bhaja (potato peel fritters), peyaji (crunchy onion fritters), and Kumro Kurkure (spiced pumpkin fry) or Maach bhaja (crisp river fish fry).',
        tag: 'Overnight Fermented Rice • Fritters Platter',
        heirloomElement: 'The ancient delta tradition of fermented rice cooling the blood in tropical heat.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Paati Shapta on Nolen Gur Croutons',
        bengaliName: 'পাটিসাপটা ও নলেন গুড় ক্রুটন',
        description: 'Delicate rolled rice crepes stuffed with jaggery-laced coconut shavings, served alongside vanilla ice cream on a bed of toasted Nolen Gur date-palm croutons.',
        tag: 'Winter Epilogue • Nolen Gur • Cold Ice Cream',
        heirloomElement: 'Hand-rolled on cast iron during the winter harvest festival (Poush Sankranti).',
      },
    ],
    drinkPairing: 'Signature Drink: Tamarind Kiwi Spritz (Sparkling kiwi nectar with tangy tamarind & Himalayan salt)',
  },
  {
    id: 'tasting-philosophy',
    title: 'The Philosophy of Tasting Nights',
    subtitle: 'An intimate letter on memory, frugality, and cooking with intention',
    tag: 'ESSAY & NOTE • BY ENAKSHI',
    bengaliTitle: 'পিছুটানের কথা',
    description: 'Pichhutaaney is a quiet pull of nostalgia, a gentle tug from everything we leave behind yet carry within us.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.39_AM_lq60g7.jpg',
    courses: [
      {
        courseNumber: 'I',
        courseTitle: 'The Quiet Pull of Nostalgia',
        bengaliName: 'স্মৃতির টান',
        description: 'Pichhutaaney is that gentle tug from everything we leave behind yet carry within us across continents and years.',
      },
      {
        courseNumber: 'II',
        courseTitle: 'Valuing Every Part',
        bengaliName: 'খোসা ও ডাটা',
        description: 'Shaped by home kitchens where vegetables weren’t just ingredients, but stories of seasons, of frugality, of care. Peels, stems, and the everyday.',
      },
      {
        courseNumber: 'III',
        courseTitle: 'Rendition of a Living Meal',
        bengaliName: 'খাওয়ার ছন্দ',
        description: 'Layered, balanced, and deeply personal, coming together with intention and an instinct to make the most of what we have.',
      },
      {
        courseNumber: 'IV',
        courseTitle: 'Remembrance & Quiet Celebration',
        bengaliName: 'উদযাপন',
        description: 'At its heart, this menu reflects a way of cooking where every part is valued, nothing is wasted, and food brings us together.',
      },
    ],
  },
];

export const SAMPLE_SEASONAL_MENU = CLIENT_MENU_COLLECTION[0].courses;

export const KITCHEN_DIARY_SNIPPETS = [
  {
    season: "Hemanta to Sheet (Early Winter)",
    title: "The First Tap of the Date Palm",
    excerpt: "Before the sun cuts through the morning mist, the 'shiuli' climbers descend with terracotta pots filled with fresh date-palm sap. Cooking with fresh nolen gur is not about recipes; it’s an intuitive, tender window of time.",
    note: "Recipe #42, Hand-penned in Ma’s 1984 red cloth diary."
  },
  {
    season: "Barsha (The Monsoons)",
    title: "The Sound of Sputtering Mustard Oil",
    excerpt: "When the sky turns slate-grey and the rain lashes against the shutters, the kitchen smells of pungent golden mustard oil heating to smoke point. A pinch of kalo jeere (nigella) and green chilies. The rhythm is entirely by instinct.",
    note: "Memory of Nadia district & rainy travel afternoons."
  },
  {
    season: "Grishma (Mid-Summer)",
    title: "The Wisdom of Bitters & Travel Notes",
    excerpt: "In the dry heat, meals begin with 'shukto'—a cooling, delicate simmer of bitter gourd, green banana, and wild celery seeds. A rhythm of cooking by feel that I carry with me everywhere in the world.",
    note: "Intuitive notes from Bengal to every city lived in."
  }
];

export const FAQ_ITEMS = [
  {
    question: "What is a supper club experience at Pichhutaaney like?",
    answer: "An intimate, communal gathering of 10 to 14 guests around one table. Rather than a formal restaurant setting, each evening feels like stepping into a warm personal kitchen. Enakshi introduces each course, sharing the travel memories, personal kitchen notes, and intuitive instincts behind each dish."
  },
  {
    question: "How does the waitlist work?",
    answer: "Due to limited seats and seasonal menu curations, dates and menus are released in private seasonal drops to the waitlist community first. Once you join, you will receive an invitation email with upcoming dates, dietary preview, and booking links before public announcement."
  },
  {
    question: "Can dietary preferences and allergies be accommodated?",
    answer: "Yes. Cooking by instinct allows fluid adaptation for vegetarian, pescatarian, plant-forward, and gluten-free guests. When booking, please detail your preferences and we curate tailored preparations."
  },
  {
    question: "What formats do you offer for private events and celebrations?",
    answer: "We curate bespoke in-home dinners, milestone celebrations, brand salon dining, and culinary storytelling circles. Each private event features a custom multi-course tasting menu crafted around your story, intuitive flavors, and seasonal inspirations."
  }
];

