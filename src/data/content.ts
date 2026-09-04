import { MenuCourse, RegionalFlavourPillar } from '../types';

export const MANIFESTO_TEXT = {
  hook: "Outside India, “Indian food” often gets reduced to naan, butter chicken, dal, and biryani. But that’s just what travelled—not the whole story.",
  core: "Because there isn’t one Indian cuisine. Every few hundred kilometers, everything shifts—the language, the climate, the soil—and the food follows. Mustard oil in the east, coconut and curry leaves in the south, slow-cooked gravies in the north. It’s vast. It’s layered.",
  roots: "I come from West Bengal, and my cooking is rooted in what I grew up eating. Travel has shaped me, but home is the anchor. And even that is hyper-regional—tied to memory, to seasons, to a specific kitchen.",
  purpose: "That’s why spaces like ours matter. To bring these quieter, regional stories to the table. Because if we don’t share them, who will?",
  legacy: "Preserving culture isn’t just about monuments or heirlooms. It lives in kitchen diaries, in handwritten recipes, in the way something is tempered or plated. That, too, is legacy."
};

export const REGIONAL_PILLARS: RegionalFlavourPillar[] = [
  {
    region: "The East & Bengal Delta",
    anchorIngredient: "Pungent cold-pressed Mustard Oil, Posto & Panch Phoron",
    description: "Bitter greens to start, poppy seed pastes, mustard fish, and subtle sweet-sour finishes shaped by rivers and silt.",
    nuance: "Where a single pinch of nigella seed (kalo jeere) transforms freshly picked winter cauliflower into poetry."
  },
  {
    region: "The Coastal South & Western Ghats",
    anchorIngredient: "Freshly grated Coconut, Curry Leaves & Tamarind",
    description: "Crisp temperings in cold coconut oil, fermentations, peppery broths, and deep souring kokum and kodampuli.",
    nuance: "A universe far removed from heavy restaurant creams, centered on lightness, acidity, and aromatic crackle."
  },
  {
    region: "The Rugged Deccan & Central Soil",
    anchorIngredient: "Toasted Sesame, Peanuts, Black Pepper & Dried Goda Masalas",
    description: "Fiery dry gravies, pearl millet flatbreads, smoked garlic, and rich earthiness born of dry climates and endurance.",
    nuance: "Hearty, unpretentious cooking celebrating rustic grains and dry-roasted spice craftsmanship."
  },
  {
    region: "The Valleys & Northern Terroirs",
    anchorIngredient: "Mustard Greens, Fennel, Asafoetida & Slow-reduced Stocks",
    description: "Rich layered doughs, slow dum-cooked broths, wild mountain herbs, and distinct warming brass-pot stews.",
    nuance: "Layered regional histories spanning Himalayan valleys, Awadh court kitchens, and rustic village hearths."
  }
];

export const SAMPLE_SEASONAL_MENU: MenuCourse[] = [
  {
    courseNumber: "01",
    courseTitle: "The Awakening Bite",
    bengaliName: "Aam-Kasundi Shonket",
    description: "Crisp seasonal heirloom cucumber and green raw mango infused with sharp artisanal stone-ground mustard relish (kasundi) and toasted nigella crisps.",
    heirloomElement: "The palate opener: Traditional Bengali meals honor the sequence of tastes, beginning with subtle bitter or sharp notes to awaken digestion.",
    pairingNote: "Infused coriander water & roasted cumin spritz"
  },
  {
    courseNumber: "02",
    courseTitle: "The Hearth & Soil",
    bengaliName: "Posto Bora & Sheuli Phul Bhaja",
    description: "Silken white poppy seeds ground on a traditional shil-nora stone, pan-crisped in cold-pressed mustard oil with tender night-flowering jasmine greens and spiced dal fritters.",
    heirloomElement: "From grandmother's afternoon kitchen diary: Posto (poppy seed) is the serene heart of rural Rarh Bengal cooking.",
    pairingNote: "Darjeeling first-flush chilled tea with citrus peel"
  },
  {
    courseNumber: "03",
    courseTitle: "The Gentle Coconut Tide",
    bengaliName: "Chhanar Paturi / Golda Chingri",
    description: "Fresh hand-split cottage paneer or river prawns marinated in grated fresh coconut, yellow mustard, and green bird's-eye chilies, wrapped in charred banana leaves and slow-steamed.",
    heirloomElement: "The art of 'Paturi'—cooking within fragrant green banana leaves seals moisture and imparts an unmistakable smoky, verdant perfume.",
    pairingNote: "Smoked green cardamom and tender coconut water"
  },
  {
    courseNumber: "04",
    courseTitle: "The Scented Anchor",
    bengaliName: "Gobindobhog Rice & Niramish Dalna",
    description: "Short-grain heirloom Gobindobhog rice scented with aromatic cow ghee, accompanied by slow-cooked baby potatoes, pointed gourd, and ginger-cumin broth tempered with panch phoron.",
    heirloomElement: "Gobindobhog rice is inherently aromatic—sweet and buttery—traditionally offered in Bengal temples and reserved for revered family gatherings.",
    pairingNote: "Crisp bitter gourd chips & charred sweet lime"
  },
  {
    courseNumber: "05",
    courseTitle: "The Transition of Sunlight",
    bengaliName: "Aamsotto-Khejur Chutney & Papad",
    description: "Sun-dried mango pulp (aamsotto) stewed gently with Medjool dates, ginger juliennes, and roasted five-spice dust, served with crisp lentil papad.",
    heirloomElement: "The ceremonial palate cleanser before dessert—sweet, tangy, and deeply nostalgic of Kolkata rooftop drying trays.",
    pairingNote: "Light sparkling cider or mineral soda"
  },
  {
    courseNumber: "06",
    courseTitle: "The Winter Gold Epilogue",
    bengaliName: "Nolen Gurer Bhapa Doi",
    description: "Velvety steamed hung yogurt gently sweetened with wild date-palm jaggery (nolen gur) harvested at dawn, topped with crushed pistachio dust.",
    heirloomElement: "Date-palm jaggery is harvested only in winter months from Bengal's date palms—earthy, butterscotch-like, and ephemeral.",
    pairingNote: "Spiced cinnamon-ginger kahwa infusion"
  }
];

export const KITCHEN_DIARY_SNIPPETS = [
  {
    season: "Hemanta to Sheet (Early Winter)",
    title: "The First Tap of the Date Palm",
    excerpt: "Before the sun cuts through the Bengal morning mist, the 'shiuli' climbers descend from tall date palm trunks with terracotta pots filled with fresh sap. Cooking with fresh nolen gur is not just a technique; it is a brief, tender window of time.",
    note: "Recipe #42, Hand-penned in Ma’s 1984 red cloth diary."
  },
  {
    season: "Barsha (The Monsoons)",
    title: "The Sound of Sputtering Mustard Oil",
    excerpt: "When the sky turns slate-grey and the rain lashes against the wooden shutters, the kitchen smells of pungent golden mustard oil heating to smoke point. A handful of kalo jeere (nigella) goes in with green chilies. The sound is an immediate comfort.",
    note: "Memory of Nadia district, monsoon afternoons."
  },
  {
    season: "Grishma (Mid-Summer)",
    title: "The Wisdom of Bitters",
    excerpt: "In the dry heat, our meals never began with rich curries. They began with 'shukto'—a delicate simmer of bitter gourd, green banana, drumstick, and sweet potato with wild celery seeds (radhuni). It cools the blood and teaches patience.",
    note: "The sacred order of a traditional Bengali course."
  }
];

export const FAQ_ITEMS = [
  {
    question: "What is a supper club experience at Pichhutaaney like?",
    answer: "An intimate, communal gathering of 10 to 14 guests around one table. Rather than a formal restaurant setting, each evening feels like stepping into a warm personal kitchen. Enakshi introduces each regional course, sharing the handwritten kitchen diaries, cultural history, and specific tempering techniques behind what is on your plate."
  },
  {
    question: "How does the waitlist work?",
    answer: "Due to limited seats and seasonal menu curations, dates and menus are released in private seasonal drops to the waitlist community first. Once you join, you will receive an invitation email with upcoming dates, dietary preview, and booking links before public announcement."
  },
  {
    question: "Can dietary preferences and allergies be accommodated?",
    answer: "Yes. While regional Bengali cooking celebrates diverse river fish and slow-simmered dishes, hyper-regional Indian food possesses an equally vast vegetarian and plant-forward lineage. When booking, please detail your preferences and we curate tailored preparations."
  },
  {
    question: "What formats do you offer for private events and celebrations?",
    answer: "We curate bespoke in-home dinners, milestone celebrations, brand salon dining, and culinary storytelling circles. Each private event features a custom multi-course tasting menu crafted around your vision and seasonal terroir."
  }
];
