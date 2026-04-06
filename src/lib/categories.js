// lib/categories.js
export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description:
      "Cutting-edge gadgets, devices, and electronic components for businesses and consumers.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop",
    productCount: 1234,
    subcategories: [
      {
        id: "phones-tablets",
        name: "Phones & Tablets",
        slug: "phones-tablets",
        productCount: 89,
      },
      {
        id: "computers",
        name: "Computers",
        slug: "computers",
        productCount: 67,
      },
      { id: "cameras", name: "Cameras", slug: "cameras", productCount: 34 },
      { id: "audio", name: "Audio", slug: "audio", productCount: 45 },
      {
        id: "wearables",
        name: "Wearables",
        slug: "wearables",
        productCount: 23,
      },
    ],
    brands: ["Apple", "Samsung", "Sony", "LG", "Dell"],
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    description:
      "Apparel, accessories, and footwear from top suppliers worldwide.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop",
    productCount: 2456,
    subcategories: [
      {
        id: "mens-clothing",
        name: "Men's Clothing",
        slug: "mens-clothing",
        productCount: 156,
      },
      {
        id: "womens-clothing",
        name: "Women's Clothing",
        slug: "womens-clothing",
        productCount: 234,
      },
      { id: "shoes", name: "Shoes", slug: "shoes", productCount: 98 },
      { id: "bags", name: "Bags", slug: "bags", productCount: 45 },
      { id: "jewelry", name: "Jewelry", slug: "jewelry", productCount: 32 },
    ],
    brands: ["Zara", "H&M", "Nike", "Adidas", "Gucci"],
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home, from furniture to gardening tools.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop",
    productCount: 987,
    subcategories: [
      {
        id: "furniture",
        name: "Furniture",
        slug: "furniture",
        productCount: 123,
      },
      { id: "decor", name: "Home Decor", slug: "decor", productCount: 89 },
      {
        id: "kitchen",
        name: "Kitchen & Dining",
        slug: "kitchen",
        productCount: 67,
      },
      {
        id: "garden",
        name: "Garden & Outdoor",
        slug: "garden",
        productCount: 45,
      },
      { id: "tools", name: "Tools & DIY", slug: "tools", productCount: 34 },
    ],
    brands: ["IKEA", "Philips", "Black+Decker", "Stanley"],
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
