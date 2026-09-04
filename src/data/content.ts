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

export const SAMPLE_SEASONAL_MENU: MenuCourse[] = [
  {
    courseNumber: "01",
    courseTitle: "The Awakening Bite",
    bengaliName: "Aam-Kasundi Shonket",
    description: "Crisp seasonal heirloom cucumber and green raw mango infused with sharp artisanal stone-ground mustard relish (kasundi) and toasted nigella crisps.",
    heirloomElement: "Cooked from instinct: awakening the palate with refreshing sharpness and childhood summer memories.",
    pairingNote: "Infused coriander water & roasted cumin spritz"
  },
  {
    courseNumber: "02",
    courseTitle: "The Hearth & Soil",
    bengaliName: "Posto Bora & Sheuli Phul Bhaja",
    description: "Silken white poppy seeds ground on a traditional stone, pan-crisped in cold-pressed mustard oil with tender seasonal greens and spiced dal fritters.",
    heirloomElement: "A tribute to my grandmother’s kitchen notes and the comforting textures of Rarh Bengal.",
    pairingNote: "Darjeeling first-flush chilled tea with citrus peel"
  },
  {
    courseNumber: "03",
    courseTitle: "The Gentle Coconut Tide",
    bengaliName: "Chhanar Paturi / Golda Chingri",
    description: "Fresh hand-split cottage paneer or river prawns marinated in grated fresh coconut, yellow mustard, and green bird's-eye chilies, wrapped in charred banana leaves and slow-steamed.",
    heirloomElement: "The art of 'Paturi'—steaming in fragrant banana leaves, a technique carried through all my coastal travels.",
    pairingNote: "Smoked green cardamom and tender coconut water"
  },
  {
    courseNumber: "04",
    courseTitle: "The Scented Anchor",
    bengaliName: "Gobindobhog Rice & Niramish Dalna",
    description: "Short-grain heirloom Gobindobhog rice scented with aromatic cow ghee, accompanied by slow-cooked baby potatoes, pointed gourd, and ginger-cumin broth tempered with panch phoron.",
    heirloomElement: "Gobindobhog rice is buttery and inherently fragrant—the soul of family feasts and nostalgic homecomings.",
    pairingNote: "Crisp bitter gourd chips & charred sweet lime"
  },
  {
    courseNumber: "05",
    courseTitle: "The Transition of Sunlight",
    bengaliName: "Aamsotto-Khejur Chutney & Papad",
    description: "Sun-dried mango pulp (aamsotto) stewed gently with Medjool dates, ginger juliennes, and roasted five-spice dust, served with crisp lentil papad.",
    heirloomElement: "A sweet-tart palate transition reminiscent of rooftop jars drying in the afternoon sun.",
    pairingNote: "Light sparkling cider or mineral soda"
  },
  {
    courseNumber: "06",
    courseTitle: "The Winter Gold Epilogue",
    bengaliName: "Nolen Gurer Bhapa Doi",
    description: "Velvety steamed hung yogurt gently sweetened with wild date-palm jaggery (nolen gur) harvested at dawn, topped with crushed pistachio dust.",
    heirloomElement: "Date-palm jaggery is an ephemeral winter gift—warm, butterscotch-scented, and deeply comforting.",
    pairingNote: "Spiced cinnamon-ginger kahwa infusion"
  }
];

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

