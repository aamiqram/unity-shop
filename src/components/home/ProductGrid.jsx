// components/home/ProductGrid.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCardB2B from "../product/ProductCardB2B";

// Demo product data (15 items)
const demoProducts = [
  {
    id: "1",
    title: "Wireless Bluetooth Earbuds with Charging Case",
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop",
    priceMin: 2.5,
    priceMax: 5.0,
    moq: 100,
    supplier: {
      name: "Shenzhen Tech Co., Ltd.",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 8,
      responseRate: 95,
      tradeAssurance: true,
      verified: true,
    },
    slug: "wireless-earbuds",
  },
  {
    id: "2",
    title: "Men's Casual Slim Fit T-Shirt (100% Cotton)",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop",
    priceMin: 3.2,
    priceMax: 6.8,
    moq: 200,
    supplier: {
      name: "Guangzhou Fashion Ltd.",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 5,
      responseRate: 98,
      tradeAssurance: false,
      verified: true,
    },
    slug: "casual-t-shirt",
  },
  {
    id: "3",
    title: "Stainless Steel Water Bottle 500ml Insulated",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop",
    priceMin: 4.0,
    priceMax: 7.5,
    moq: 150,
    supplier: {
      name: "Yiwu Houseware Co.",
      location: "Zhejiang, China",
      flag: "🇨🇳",
      yearsInBusiness: 10,
      responseRate: 92,
      tradeAssurance: true,
      verified: true,
    },
    slug: "water-bottle",
  },
  {
    id: "4",
    title: "Smart LED TV 32-inch HD Ready",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop",
    priceMin: 120.0,
    priceMax: 145.0,
    moq: 10,
    supplier: {
      name: "Shenzhen Electronics Ltd.",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 12,
      responseRate: 96,
      tradeAssurance: true,
      verified: true,
    },
    slug: "smart-led-tv",
  },
  {
    id: "5",
    title: "Portable Power Bank 20000mAh",
    image:
      "https://images.unsplash.com/photo-1609592424824-5ba6c7a3d34e?w=400&auto=format&fit=crop",
    priceMin: 8.5,
    priceMax: 12.0,
    moq: 100,
    supplier: {
      name: "Shenzhen Power Ltd.",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 6,
      responseRate: 94,
      tradeAssurance: false,
      verified: true,
    },
    slug: "power-bank",
  },
  {
    id: "6",
    title: "Women's Yoga Pants High Waist",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&auto=format&fit=crop",
    priceMin: 5.5,
    priceMax: 9.9,
    moq: 150,
    supplier: {
      name: "Ningbo Sportswear",
      location: "Zhejiang, China",
      flag: "🇨🇳",
      yearsInBusiness: 4,
      responseRate: 97,
      tradeAssurance: false,
      verified: true,
    },
    slug: "yoga-pants",
  },
  {
    id: "7",
    title: "Ceramic Coffee Mug 350ml Set of 6",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&auto=format&fit=crop",
    priceMin: 2.8,
    priceMax: 4.5,
    moq: 200,
    supplier: {
      name: "Chaozhou Ceramics",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 15,
      responseRate: 91,
      tradeAssurance: true,
      verified: true,
    },
    slug: "coffee-mugs",
  },
  {
    id: "8",
    title: "Fitness Tracker Smart Watch",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop",
    priceMin: 12.0,
    priceMax: 18.5,
    moq: 50,
    supplier: {
      name: "Shenzhen Wearable Tech",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 7,
      responseRate: 93,
      tradeAssurance: true,
      verified: true,
    },
    slug: "fitness-tracker",
  },
  {
    id: "9",
    title: "Foldable Reusable Shopping Bags (Pack of 5)",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop",
    priceMin: 1.2,
    priceMax: 2.5,
    moq: 500,
    supplier: {
      name: "Xiamen Eco Products",
      location: "Fujian, China",
      flag: "🇨🇳",
      yearsInBusiness: 3,
      responseRate: 99,
      tradeAssurance: false,
      verified: false,
    },
    slug: "shopping-bags",
  },
  {
    id: "10",
    title: "Wireless Mechanical Keyboard RGB",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&auto=format&fit=crop",
    priceMin: 25.0,
    priceMax: 35.0,
    moq: 20,
    supplier: {
      name: "Shenzhen Peripherals",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 5,
      responseRate: 90,
      tradeAssurance: true,
      verified: true,
    },
    slug: "mechanical-keyboard",
  },
  {
    id: "11",
    title: "LED Desk Lamp with Wireless Charger",
    image:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&auto=format&fit=crop",
    priceMin: 15.0,
    priceMax: 22.0,
    moq: 30,
    supplier: {
      name: "Ningbo Lighting",
      location: "Zhejiang, China",
      flag: "🇨🇳",
      yearsInBusiness: 8,
      responseRate: 96,
      tradeAssurance: true,
      verified: true,
    },
    slug: "desk-lamp",
  },
  {
    id: "12",
    title: "Digital Kitchen Scale 5kg/1g",
    image:
      "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&auto=format&fit=crop",
    priceMin: 3.5,
    priceMax: 6.0,
    moq: 100,
    supplier: {
      name: "Yongkang Hardware",
      location: "Zhejiang, China",
      flag: "🇨🇳",
      yearsInBusiness: 9,
      responseRate: 92,
      tradeAssurance: false,
      verified: true,
    },
    slug: "kitchen-scale",
  },
  {
    id: "13",
    title: "Men's Leather Wallet RFID Blocking",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop",
    priceMin: 4.0,
    priceMax: 7.5,
    moq: 100,
    supplier: {
      name: "Guangzhou Leather Goods",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 6,
      responseRate: 95,
      tradeAssurance: false,
      verified: true,
    },
    slug: "leather-wallet",
  },
  {
    id: "14",
    title: "Portable Bluetooth Speaker Waterproof",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop",
    priceMin: 10.0,
    priceMax: 16.0,
    moq: 50,
    supplier: {
      name: "Shenzhen Audio",
      location: "Guangdong, China",
      flag: "🇨🇳",
      yearsInBusiness: 7,
      responseRate: 94,
      tradeAssurance: true,
      verified: true,
    },
    slug: "bluetooth-speaker",
  },
  {
    id: "15",
    title: "Rechargeable Headlamp LED 1000 Lumens",
    image:
      "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&auto=format&fit=crop",
    priceMin: 6.5,
    priceMax: 11.0,
    moq: 80,
    supplier: {
      name: "Ningbo Outdoor Gear",
      location: "Zhejiang, China",
      flag: "🇨🇳",
      yearsInBusiness: 5,
      responseRate: 91,
      tradeAssurance: false,
      verified: true,
    },
    slug: "headlamp",
  },
];

const ProductGrid = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [visibleProducts, setVisibleProducts] = useState(10); // initially show 10
  const productsPerLoad = 5;

  const tabs = [
    { id: "recommended", label: "Recommended" },
    { id: "latest", label: "Latest" },
    { id: "top-suppliers", label: "Top Suppliers" },
  ];

  const handleLoadMore = () => {
    setVisibleProducts((prev) =>
      Math.min(prev + productsPerLoad, demoProducts.length),
    );
  };

  // In a real app, you'd filter/sort based on activeTab
  const displayedProducts = demoProducts.slice(0, visibleProducts);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header with filter tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Products for You
          </h2>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#FF6600] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {displayedProducts.map((product) => (
            <ProductCardB2B key={product.id} product={product} />
          ))}
        </div>

        {/* View All / Load More */}
        <div className="text-center mt-10">
          {visibleProducts < demoProducts.length ? (
            <button
              onClick={handleLoadMore}
              className="inline-block border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Load More Products
            </button>
          ) : (
            <Link
              href="/products"
              className="inline-block border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              View All Products
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
