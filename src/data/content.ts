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
    subtitle: 'Kolkata street-food nostalgia & cross-cultural notes',
    tag: 'CALCUTTA KISS',
    bengaliTitle: 'ক্যালকাটা কিস',
    description: 'An elevated, instinct-led interpretation bridging street nostalgia, rich burrata, and sharp delta mustard.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.50.22_AM_dzhiyz.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Burrata Ghugni Chaat',
        bengaliName: 'ঘুঘনি চাট ও বুরাটা',
        description: 'Creamy burrata layered over street-style yellow pea ghoogni, gentle drizzle of chilli oil.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Mango & Tamarind Ceviche',
        bengaliName: 'আম ও তেঁতুল সেভিচে',
        description: 'Chilled scallops or sweet pear cured in citrusy mango pulp, tamarind, and mustardy kashundi.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Gondhoraj Chicken / Paneer',
        bengaliName: 'গন্ধরাজ চিকেন / পনির',
        description: 'Fragrant chicken or paneer kissed with gondhoraj lime, served with kashundi mango salad.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Jau Bhaat & Maach / Begun Bhaja',
        bengaliName: 'জাউ ভাত ও মাছ / বেগুন ভাজা',
        description: 'Warm rice gruel with spicy miso-flavoured crispy fish or eggplant, finished with sharp doi-kashundi.',
      },
      {
        courseNumber: '05',
        courseTitle: 'Carrot Halwa with Rasmalai Foam',
        bengaliName: 'গাজরের হালুয়া ও রসমলাই ফোম',
        description: 'Rich carrot halwa topped with light, aerated saffron milk foam and chopped roasted nuts.',
      },
    ],
  },
  {
    id: 'zero-waste-heirloom',
    title: 'Zero-Waste & Heirloom',
    subtitle: 'Root-to-stem cooking and vegetable stories',
    tag: 'HEIRLOOM & ZERO-WASTE',
    bengaliTitle: 'শাকসবজি ও খোসা ভাজা',
    description: 'A tribute to the frugality and care of home kitchens—where peels, stems, and wild greens take center stage.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.29_AM_f1smhc.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Neem Begun Chokha',
        bengaliName: 'নিম বেগুন চোখা',
        description: 'Fire-roasted eggplant with tender young neem leaves, served with silken white posto sauce.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Dhone Pata & Aloor Khosha Chat',
        bengaliName: 'ধনে পাতা ও আলুর খোসা চাট',
        description: 'Crispy potato peel chaat with fresh garden coriander and roasted spice reduction.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Enchor & Gola Ruti Taco',
        bengaliName: 'এঁচোড় ও গোলা রুটি ট্যাকো',
        description: 'Tender spiced green jackfruit folded inside a traditional Bengali lacy pan-crepe taco.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Miso Glazed Maach / Paneer Bhaja',
        bengaliName: 'মিসো গ্লেজড মাছ / পনির ভাজা',
        description: 'Crispy miso-glazed fish or paneer accompanied by delicate lau ghonto and hot steamed bhaat.',
      },
      {
        courseNumber: '05',
        courseTitle: 'Daab Malai Kheer & Malpua',
        bengaliName: 'ডাব মালাই ক্ষীর ও মালপোয়া',
        description: 'Silken tender green coconut cream kheer paired with warm fennel-scented golden malpua.',
      },
    ],
    drinkPairing: 'Drink: Gondhoraj Lebu R Ghol (Churned yogurt buttermilk with aromatic Gondhoraj lime)',
  },
  {
    id: 'heritage-fermentation',
    title: 'Heritage & Pantaa Bhaat',
    subtitle: 'Fermentation, Anglo-Indian notes & date-palm jaggery',
    tag: 'FERMENTATION & NOSTALGIA',
    bengaliTitle: 'পান্তা ভাত ও স্মৃতির শহর',
    description: 'A nostalgic voyage through colonial archives, cooling probiotic rice ferments, and harvest sweets.',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.14_AM_uwvgz4.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'Mango Tamarind Ceviche',
        bengaliName: 'আম তেঁতুল সেভিচে',
        description: 'Chilled scallops or sweet pears cured in citrusy mango pulp, tamarind, and wild spices.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Dirty Brioche with Anglo Indian Vindaloo',
        bengaliName: 'ব্রায়োশ ও ভিন্দালু',
        description: 'Butter-toasted brioche with spicy vinegar-simmered vindaloo (Pork or Wild Mushrooms).',
      },
      {
        courseNumber: '03',
        courseTitle: 'Pantaa Bhaat Feast',
        bengaliName: 'পান্তা ভাত ও পঞ্চ ব্যঞ্জন',
        description: 'Overnight fermented rice with aloo chokha, aloor khosha bhaja, peyaji, kumro kurkure / maach bhaja.',
      },
      {
        courseNumber: '04',
        courseTitle: 'Paati Shapta on Nolen Gur Croutons',
        bengaliName: 'পাটিসাপটা ও নলেন গুড়',
        description: 'Delicate crepes stuffed with jaggery-coconut, vanilla ice cream on toasted nolen gur croutons.',
      },
    ],
    drinkPairing: 'Drink: Tamarind Kiwi Spritz (Sparkling kiwi nectar with tangy tamarind & rock salt)',
  },
  {
    id: 'tasting-philosophy',
    title: 'Philosophy of Tasting Nights',
    subtitle: 'Memory, frugality, and cooking with intention',
    tag: 'AN INTIMATE NOTE',
    bengaliTitle: 'পিছুটানের কথা',
    description: '“Pichhutaaney is a quiet pull of nostalgia, a gentle tug from everything we leave behind yet carry within us. Vegetables aren’t just ingredients, but stories of seasons, of frugality, of care—valuing every peel, stem, and everyday moment.”',
    imageUrl: 'https://res.cloudinary.com/dpdtsaalf/image/upload/v1788550859/WhatsApp_Image_2026-09-05_at_12.49.39_AM_lq60g7.jpg',
    courses: [
      {
        courseNumber: '01',
        courseTitle: 'The Quiet Pull of Nostalgia',
        bengaliName: 'স্মৃতির টান',
        description: 'Carrying the warmth of everything we leave behind across continents.',
      },
      {
        courseNumber: '02',
        courseTitle: 'Valuing Every Part',
        bengaliName: 'খোসা ও ডাটা',
        description: 'Peels, stems, and overlooked vegetables brought forward with reverence.',
      },
      {
        courseNumber: '03',
        courseTitle: 'Resourcefulness & Celebration',
        bengaliName: 'উদযাপন',
        description: 'A personal table where nothing is wasted and food brings us home.',
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

