// app/testimonials/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiStar,
  FiPlay,
  FiThumbsUp,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: "John Smith",
    role: "Buyer",
    location: "New York, USA",
    avatar: "https://via.placeholder.com/100x100?text=JS",
    rating: 5,
    text: "I've been using Unity Shop for over a year now. The quality of products and reliability of sellers is unmatched. My go-to platform for sourcing.",
    date: "2025-02-15",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Emma Wilson",
    role: "Seller",
    location: "London, UK",
    avatar: "https://via.placeholder.com/100x100?text=EW",
    rating: 5,
    text: "As a seller, the platform tools are fantastic. I've grown my business by 200% since joining. Customer support is always responsive.",
    date: "2025-02-10",
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Buyer",
    location: "Toronto, Canada",
    avatar: "https://via.placeholder.com/100x100?text=MB",
    rating: 4,
    text: "Great selection of products. Shipping was fast and the quality exceeded my expectations.",
    date: "2025-02-05",
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: "Sarah Davis",
    role: "Seller",
    location: "Sydney, Australia",
    avatar: "https://via.placeholder.com/100x100?text=SD",
    rating: 5,
    text: "The Trade Assurance feature gives buyers confidence. I've received many orders from new customers because of it.",
    date: "2025-02-01",
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Buyer",
    location: "Berlin, Germany",
    avatar: "https://via.placeholder.com/100x100?text=JW",
    rating: 5,
    text: "Excellent platform for sourcing products. The filters and search make it easy to find exactly what I need.",
    date: "2025-01-28",
    verified: true,
    featured: false,
  },
  {
    id: 6,
    name: "Linda Taylor",
    role: "Seller",
    location: "Singapore",
    avatar: "https://via.placeholder.com/100x100?text=LT",
    rating: 4,
    text: "Good platform with a large buyer base. The fees are reasonable and the dashboard is user-friendly.",
    date: "2025-01-20",
    verified: true,
    featured: false,
  },
];

// Video testimonials (mock)
const videoTestimonials = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Seller",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop",
    duration: "2:34",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Buyer",
    thumbnail:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&auto=format&fit=crop",
    duration: "1:56",
  },
];

// Success stories
const successStories = [
  {
    name: "TechGadget Co.",
    growth: "+150% sales in 6 months",
    category: "Electronics",
    link: "/case-studies/techgadget",
  },
  {
    name: "EcoHome",
    growth: "2x revenue",
    category: "Home & Garden",
    link: "/case-studies/ecohome",
  },
];

// Trust badges (logos of media mentions)
const trustBadges = [
  { name: "TechCrunch", logo: "/tc-logo.png" },
  { name: "Forbes", logo: "/forbes-logo.png" },
  { name: "WSJ", logo: "/wsj-logo.png" },
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("all"); // all, buyers, sellers, featured
  const [ratingBreakdown] = useState({
    5: 78,
    4: 15,
    3: 4,
    2: 2,
    1: 1,
  });

  const filteredTestimonials = testimonials.filter((t) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "buyers") return t.role === "Buyer";
    if (activeFilter === "sellers") return t.role === "Seller";
    if (activeFilter === "featured") return t.featured;
    return true;
  });

  const totalReviews = testimonials.length;
  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviews
  ).toFixed(1);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            What Our Community Says
          </h1>
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span className="font-bold">{averageRating}</span>
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  fill={i < Math.round(averageRating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-lg">({totalReviews} reviews)</span>
          </div>
          <p className="mt-2">Join thousands of happy customers and sellers</p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6600]">50K+</p>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6600]">5K+</p>
            <p className="text-sm text-gray-600">Trusted Sellers</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6600]">4.8★</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-2xl font-bold text-[#FF6600]">98%</p>
            <p className="text-sm text-gray-600">Would Recommend</p>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="container mx-auto px-4">
        <div className="flex justify-center gap-2 mb-8">
          {["all", "buyers", "sellers", "featured"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                activeFilter === filter
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      t.name[0]
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
                {t.verified && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mt-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill={i < t.rating ? "currentColor" : "none"}
                    size={16}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2 italic">"{t.text}"</p>
              <p className="text-xs text-gray-400 mt-2">{t.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video testimonials */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Video Testimonials
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {videoTestimonials.map((v, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <div className="aspect-video relative">
                <Image
                  src={v.thumbnail}
                  alt={v.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <FiPlay className="text-white text-4xl" />
                </div>
              </div>
              <p className="mt-2 font-medium">
                {v.name} · {v.role}
              </p>
              <p className="text-xs text-gray-500">{v.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success stories */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {successStories.map((s, idx) => (
            <Link
              key={idx}
              href={s.link}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md"
            >
              <p className="text-xs text-[#FF6600] uppercase">{s.category}</p>
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.growth}</p>
              <span className="text-sm text-[#FF6600] mt-2 inline-block">
                Read full story →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">As Featured In</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500"
            >
              {badge.name}
            </div>
          ))}
        </div>
      </section>

      {/* Rating breakdown */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Rating Breakdown</h2>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 mb-2">
              <span className="w-8 text-sm">{star} ★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${(ratingBreakdown[star] / totalReviews) * 100}%`,
                  }}
                />
              </div>
              <span className="w-8 text-xs text-gray-500">
                {ratingBreakdown[star]}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Seller testimonials (separate) */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Why Sellers Choose Us
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials
            .filter((t) => t.role === "Seller")
            .slice(0, 2)
            .map((t) => (
              <div
                key={t.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <p className="italic text-sm">"{t.text}"</p>
                <p className="mt-2 font-medium">
                  — {t.name}, {t.location}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Social proof - Instagram widget placeholder */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          #UnityShop on Instagram
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded"></div>
          ))}
        </div>
      </section>

      {/* Wall of love - simple ticker */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <p className="animate-marquee whitespace-nowrap text-sm text-gray-600">
            ⭐ "Amazing platform!" – @buyer123 ⭐ "Best sourcing site" –
            @seller456 ⭐ "Highly recommend" – @johndoe
          </p>
        </div>
      </section>

      {/* Submit review CTA */}
      <section className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
        <p className="text-gray-600 mb-4">Help others by leaving a review</p>
        <Link
          href="/submit-review"
          className="inline-block bg-[#FF6600] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#e65c00]"
        >
          Write a Review
        </Link>
      </section>
    </main>
  );
}
