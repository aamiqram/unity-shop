// lib/brands.js
export const brands = [
  {
    id: "apple",
    name: "Apple",
    slug: "apple",
    logo: "https://via.placeholder.com/200x200?text=Apple",
    coverImage:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&auto=format&fit=crop",
    description:
      "Apple Inc. designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories.",
    website: "https://www.apple.com",
    founded: 1976,
    country: "USA",
    categories: ["Electronics", "Wearables"],
    productCount: 145,
    featured: true,
  },
  {
    id: "samsung",
    name: "Samsung",
    slug: "samsung",
    logo: "https://via.placeholder.com/200x200?text=Samsung",
    coverImage:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&auto=format&fit=crop",
    description:
      "Samsung is a South Korean multinational electronics company that produces a wide range of consumer electronics.",
    website: "https://www.samsung.com",
    founded: 1938,
    country: "South Korea",
    categories: ["Electronics", "Home Appliances"],
    productCount: 210,
    featured: true,
  },
  {
    id: "sony",
    name: "Sony",
    slug: "sony",
    logo: "https://via.placeholder.com/200x200?text=Sony",
    coverImage:
      "https://images.unsplash.com/photo-1611162616305-c69b3037c7a8?w=1200&auto=format&fit=crop",
    description:
      "Sony Corporation is a Japanese multinational conglomerate corporation that manufactures electronics, gaming consoles, and entertainment products.",
    website: "https://www.sony.com",
    founded: 1946,
    country: "Japan",
    categories: ["Electronics", "Gaming"],
    productCount: 178,
    featured: false,
  },
  {
    id: "nike",
    name: "Nike",
    slug: "nike",
    logo: "https://via.placeholder.com/200x200?text=Nike",
    coverImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop",
    description:
      "Nike, Inc. is an American multinational corporation that designs, develops, and sells athletic footwear, apparel, and accessories.",
    website: "https://www.nike.com",
    founded: 1964,
    country: "USA",
    categories: ["Fashion", "Sports"],
    productCount: 320,
    featured: true,
  },
  {
    id: "adidas",
    name: "Adidas",
    slug: "adidas",
    logo: "https://via.placeholder.com/200x200?text=Adidas",
    coverImage:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=1200&auto=format&fit=crop",
    description:
      "Adidas is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel, and accessories.",
    website: "https://www.adidas.com",
    founded: 1949,
    country: "Germany",
    categories: ["Fashion", "Sports"],
    productCount: 275,
    featured: false,
  },
  {
    id: "ikea",
    name: "IKEA",
    slug: "ikea",
    logo: "https://via.placeholder.com/200x200?text=IKEA",
    coverImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop",
    description:
      "IKEA is a Swedish multinational conglomerate that designs and sells ready-to-assemble furniture, kitchen appliances, and home accessories.",
    website: "https://www.ikea.com",
    founded: 1943,
    country: "Sweden",
    categories: ["Home & Garden"],
    productCount: 98,
    featured: true,
  },
  {
    id: "lg",
    name: "LG",
    slug: "lg",
    logo: "https://via.placeholder.com/200x200?text=LG",
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop",
    description:
      "LG Electronics is a South Korean multinational electronics company that produces consumer electronics, home appliances, and air solutions.",
    website: "https://www.lg.com",
    founded: 1958,
    country: "South Korea",
    categories: ["Electronics", "Home Appliances"],
    productCount: 132,
    featured: false,
  },
  {
    id: "panasonic",
    name: "Panasonic",
    slug: "panasonic",
    logo: "https://via.placeholder.com/200x200?text=Panasonic",
    coverImage:
      "https://images.unsplash.com/photo-1573164574572-cb89e39749e9?w=1200&auto=format&fit=crop",
    description:
      "Panasonic Corporation is a Japanese multinational electronics company that manufactures a wide range of products.",
    website: "https://www.panasonic.com",
    founded: 1918,
    country: "Japan",
    categories: ["Electronics"],
    productCount: 87,
    featured: false,
  },
];

export const getBrandBySlug = (slug) => brands.find((b) => b.slug === slug);

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Group brands by first letter
export const brandsByLetter = brands.reduce((acc, brand) => {
  const letter = brand.name[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(brand);
  return acc;
}, {});
