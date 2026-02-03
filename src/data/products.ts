export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  quantity: number;
  featured: boolean;
  inStock: boolean;
}

export const CATEGORIES = [
  'mugs',
  'bowls',
  'vases',
  'plates',
  'planters',
  'decorative',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const products: Product[] = [
  {
    id: 'mug-001',
    name: 'Crescent Moon Mug',
    slug: 'crescent-moon-mug',
    price: 38.0,
    category: 'mugs',
    description:
      'A beautifully crafted mug featuring a delicate crescent moon design. The warm honey glaze catches the light, making your morning coffee feel like a ritual. Holds 12oz comfortably. Dishwasher and microwave safe.',
    images: ['/images/products/mug-001.jpg'],
    quantity: 1,
    featured: true,
    inStock: true,
  },
  {
    id: 'mug-002',
    name: 'Speckled Earth Mug',
    slug: 'speckled-earth-mug',
    price: 34.0,
    category: 'mugs',
    description:
      'Inspired by rich soil after rain, this mug features a gorgeous speckled brown glaze. The comfortable handle and 14oz capacity make it perfect for those who love a generous cup of tea or coffee.',
    images: ['/images/products/mug-002.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'mug-003',
    name: 'Honey Drip Mug',
    slug: 'honey-drip-mug',
    price: 42.0,
    category: 'mugs',
    description:
      'Watch the warm honey-colored glaze drip down the sides of this artisan mug. Each piece is unique with its own drip pattern. A true conversation starter for your kitchen.',
    images: ['/images/products/mug-003.jpg'],
    quantity: 1,
    featured: true,
    inStock: true,
  },
  {
    id: 'bowl-001',
    name: 'Moonlit Serving Bowl',
    slug: 'moonlit-serving-bowl',
    price: 65.0,
    category: 'bowls',
    description:
      'A stunning large serving bowl with a creamy white interior and earth-toned exterior. Perfect for salads, pasta, or as a centerpiece. 10 inches in diameter.',
    images: ['/images/products/bowl-001.jpg'],
    quantity: 1,
    featured: true,
    inStock: true,
  },
  {
    id: 'bowl-002',
    name: 'Nesting Bowl Set',
    slug: 'nesting-bowl-set',
    price: 85.0,
    category: 'bowls',
    description:
      'A set of three nesting bowls in graduating sizes. Each bowl features our signature honey glaze with subtle variations. Perfect for prep work or serving.',
    images: ['/images/products/bowl-002.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'bowl-003',
    name: 'Ramen Bowl',
    slug: 'ramen-bowl',
    price: 48.0,
    category: 'bowls',
    description:
      'Deep and generous, this ramen bowl is perfect for noodles, pho, or hearty soups. The wide rim allows for easy handling and the earth-tone glaze adds warmth to every meal.',
    images: ['/images/products/bowl-003.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'vase-001',
    name: 'Lunar Bud Vase',
    slug: 'lunar-bud-vase',
    price: 32.0,
    category: 'vases',
    description:
      'A petite bud vase perfect for a single stem or small bouquet. The pale moon-white glaze with subtle grey undertones complements any flower arrangement.',
    images: ['/images/products/vase-001.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'vase-002',
    name: 'Terra Tall Vase',
    slug: 'terra-tall-vase',
    price: 78.0,
    category: 'vases',
    description:
      'An elegant tall vase with a rich terracotta-inspired glaze. Standing at 12 inches, it is perfect for long-stemmed flowers or dried arrangements.',
    images: ['/images/products/vase-002.jpg'],
    quantity: 1,
    featured: true,
    inStock: true,
  },
  {
    id: 'vase-003',
    name: 'Organic Form Vase',
    slug: 'organic-form-vase',
    price: 95.0,
    category: 'vases',
    description:
      'An artistic vase with an intentionally imperfect, organic form. Each piece is entirely unique, celebrating the handmade nature of pottery.',
    images: ['/images/products/vase-003.jpg'],
    quantity: 0,
    featured: false,
    inStock: false,
  },
  {
    id: 'plate-001',
    name: 'Dinner Plate - Honey',
    slug: 'dinner-plate-honey',
    price: 36.0,
    category: 'plates',
    description:
      'A 10.5 inch dinner plate with our signature honey glaze. The slightly raised rim keeps sauces contained while the warm color makes every meal feel special.',
    images: ['/images/products/plate-001.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'plate-002',
    name: 'Dinner Plate - Moon',
    slug: 'dinner-plate-moon',
    price: 36.0,
    category: 'plates',
    description:
      'A 10.5 inch dinner plate in our creamy moon-white glaze. Elegant and versatile, it pairs beautifully with any table setting.',
    images: ['/images/products/plate-002.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'plate-003',
    name: 'Appetizer Plate Set',
    slug: 'appetizer-plate-set',
    price: 52.0,
    category: 'plates',
    description:
      'A set of four 6-inch appetizer plates, perfect for small bites, desserts, or bread service. Mixed glazes in honey and moon-white.',
    images: ['/images/products/plate-003.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'planter-001',
    name: 'Moon Phase Planter',
    slug: 'moon-phase-planter',
    price: 55.0,
    category: 'planters',
    description:
      'A medium-sized planter featuring hand-carved moon phases around the exterior. Includes drainage hole and matching saucer. Perfect for small houseplants.',
    images: ['/images/products/planter-001.jpg'],
    quantity: 1,
    featured: true,
    inStock: true,
  },
  {
    id: 'planter-002',
    name: 'Hanging Planter',
    slug: 'hanging-planter',
    price: 68.0,
    category: 'planters',
    description:
      'A beautiful hanging planter with macramé-style rope hanger included. The earthy brown glaze and 6-inch pot size make it ideal for trailing plants.',
    images: ['/images/products/planter-002.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'planter-003',
    name: 'Succulent Trio Set',
    slug: 'succulent-trio-set',
    price: 45.0,
    category: 'planters',
    description:
      'Three tiny planters perfect for succulents or air plants. Each measures 3 inches and comes with a small drainage hole. A lovely gift set.',
    images: ['/images/products/planter-003.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'decor-001',
    name: 'Incense Holder',
    slug: 'incense-holder',
    price: 24.0,
    category: 'decorative',
    description:
      'A simple, elegant incense holder with a moon-shaped catch tray. The smooth honey glaze is easy to clean and looks beautiful on any altar or shelf.',
    images: ['/images/products/decor-001.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'decor-002',
    name: 'Ring Dish',
    slug: 'ring-dish',
    price: 22.0,
    category: 'decorative',
    description:
      'A small dish perfect for rings, earrings, or other small treasures. Features a crescent moon impression in the center and a pale moon-white glaze.',
    images: ['/images/products/decor-002.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
  {
    id: 'decor-003',
    name: 'Soap Dish',
    slug: 'soap-dish',
    price: 28.0,
    category: 'decorative',
    description:
      'An elevated soap dish with drainage ridges to keep your soap dry. The warm earth tones bring a spa-like feel to your bathroom.',
    images: ['/images/products/decor-003.jpg'],
    quantity: 1,
    featured: false,
    inStock: true,
  },
];
