import shachindraImage from "../assets/shachindra.jpeg";

export const promoCodes = {
  PINK10: 0.1,
  LUXE15: 0.15,
  RUNWAY20: 0.2,
};

export const reviews = [
  {
    id: 1,
    name: "Ava Martinez",
    title: "Fashion Editor",
    rating: 5,
    text: "The fit, finishing, and customization quality feel far beyond typical online stores. It genuinely feels premium.",
  },
  {
    id: 2,
    name: "Noah Carter",
    title: "Creative Director",
    rating: 5,
    text: "The hoodie customization preview is incredibly smooth. Our team used it to create a full capsule drop mockup.",
  },
  {
    id: 3,
    name: "Mia Brooks",
    title: "Returning Customer",
    rating: 4,
    text: "Clean checkout, beautiful packaging concepts, and the hot pink accents make the whole experience memorable.",
  },
];

export const collections = [
  {
    title: "Men",
    description: "Sharp tailoring, fluid silhouettes, and luxe statement essentials.",
    image: shachindraImage,
  },
  {
    title: "Women",
    description: "Modern layering pieces crafted for elevated everyday style.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Streetwear",
    description: "Graphic energy and bold proportions with premium materials.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
  },
];

export const products = [
  {
    id: "nova-tee",
    title: "Nova Signature Tee",
    price: 89,
    oldPrice: 115,
    rating: 4.8,
    reviewsCount: 124,
    category: "New Arrival",
    collection: "Streetwear",
    colors: ["Pearl White", "Hot Pink", "Jet Black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "An elevated heavyweight tee designed for clean drape, crisp structure, and effortless customization.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Trending",
  },
  {
    id: "atelier-hoodie",
    title: "Atelier Cloud Hoodie",
    price: 149,
    oldPrice: 189,
    rating: 4.9,
    reviewsCount: 208,
    category: "Best Seller",
    collection: "Women",
    description:
      "Soft-touch fleece hoodie with a sculpted silhouette, premium trims, and a customization-ready front panel.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Rose Pink", "Espresso"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Limited",
  },
  {
    id: "satin-bomber",
    title: "Satin Flux Bomber",
    price: 220,
    oldPrice: 260,
    rating: 4.7,
    reviewsCount: 96,
    category: "Trending",
    collection: "Men",
    description:
      "A statement satin bomber finished with minimalist detailing and designed for layered city styling.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blush", "Chrome", "Black"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "Editor Pick",
  },
  {
    id: "runway-cargo",
    title: "Runway Cargo Pant",
    price: 132,
    oldPrice: 160,
    rating: 4.6,
    reviewsCount: 71,
    category: "Trending",
    collection: "Streetwear",
    description:
      "Relaxed luxury cargo tailoring with architectural seams and a polished off-duty attitude.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "Rose Quartz", "Midnight"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    ],
    badge: "New",
  },
];

export const offers = [
  {
    title: "Seasonal Edit",
    subtitle: "Up to 35% off curated premium staples",
  },
  {
    title: "Customization Week",
    subtitle: "Free design saves and bonus sticker pack unlock",
  },
  {
    title: "Midnight Pink Drop",
    subtitle: "Limited-time launch pieces available for 48 hours",
  },
];
