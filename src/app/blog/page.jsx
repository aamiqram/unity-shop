// app/blog/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { blogPosts, categories } from "@/lib/blogData";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts by category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured post (first one with featured flag)
  const featuredPost = blogPosts.find((p) => p.featured);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Unity Shop Blog
          </h1>
          <p className="text-xl mb-4">
            Insights, tips, and inspiration for buyers and sellers
          </p>
          <div className="max-w-2xl mx-auto relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Featured post */}
            {featuredPost && !searchQuery && selectedCategory === "All" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-[#FF6600] uppercase font-semibold">
                      {featuredPost.category}
                    </span>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h3 className="text-2xl font-bold mt-2 hover:text-[#FF6600]">
                        {featuredPost.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mt-2">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiUser size={14} /> {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} /> {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} /> {featuredPost.readTime} min read
                      </span>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-block mt-4 text-[#FF6600] font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Post grid */}
            <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <span className="text-xs text-[#FF6600] uppercase font-semibold">
                      {post.category}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-semibold text-lg mt-1 hover:text-[#FF6600]">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiUser size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={12} /> {post.readTime} min
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-semibold text-lg mb-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left flex justify-between items-center py-1 px-2 rounded ${
                        selectedCategory === cat.name
                          ? "bg-orange-50 text-[#FF6600] font-medium"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-sm text-gray-400">
                        ({cat.count})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">Popular Posts</h3>
              <ul className="space-y-3">
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex gap-2 hover:text-[#FF6600]"
                    >
                      <div className="w-12 h-12 relative flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-400">{post.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mt-6 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "selling",
                  "analytics",
                  "photography",
                  "shipping",
                  "marketing",
                  "tips",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="px-2 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <h3 className="font-semibold text-lg mt-6 mb-3">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-2">
                Get the latest posts delivered to your inbox.
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button className="bg-[#FF6600] text-white px-3 py-2 rounded text-sm hover:bg-[#e65c00]">
                  Subscribe
                </button>
              </form>

              <div className="mt-6 flex justify-center gap-3">
                <a href="#" className="text-gray-400 hover:text-[#FF6600]">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FF6600]">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FF6600]">
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
