// lib/blogData.js
export const blogPosts = [
  {
    id: 1,
    title: "10 Tips to Increase Your Sales on Unity Shop",
    slug: "10-tips-increase-sales",
    excerpt:
      "Discover proven strategies to boost your sales and attract more buyers.",
    content: `
      <p>Are you looking to increase your sales on Unity Shop? Here are 10 tips that can help you grow your business:</p>
      <ol>
        <li><strong>Optimize your product listings</strong> – Use high-quality images and detailed descriptions.</li>
        <li><strong>Offer competitive pricing</strong> – Research similar products and price accordingly.</li>
        <li><strong>Provide excellent customer service</strong> – Respond to inquiries quickly and professionally.</li>
        <li><strong>Use promoted listings</strong> – Get more visibility for your products.</li>
        <li><strong>Collect and respond to reviews</strong> – Build trust with potential buyers.</li>
        <li><strong>Offer multiple shipping options</strong> – Give buyers flexibility.</li>
        <li><strong>Run promotions and discounts</strong> – Attract price-sensitive customers.</li>
        <li><strong>Optimize for mobile</strong> – Ensure your listings look good on mobile devices.</li>
        <li><strong>Use social media</strong> – Drive traffic to your store from external channels.</li>
        <li><strong>Analyze your data</strong> – Use analytics to identify trends and improve.</li>
      </ol>
    `,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    category: "Selling Tips",
    author: "Sarah Johnson",
    authorAvatar: "https://via.placeholder.com/50x50?text=SJ",
    date: "2025-02-20",
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Your Analytics Dashboard",
    slug: "understanding-analytics-dashboard",
    excerpt:
      "Learn how to read your seller analytics and make data-driven decisions.",
    content: `
      <p>Your analytics dashboard is a powerful tool. Here's what each metric means and how to use it:</p>
      <ul>
        <li><strong>Revenue</strong> – Total sales after fees and refunds.</li>
        <li><strong>Orders</strong> – Number of orders placed.</li>
        <li><strong>Conversion rate</strong> – Percentage of visitors who buy.</li>
        <li><strong>Traffic sources</strong> – Where your visitors come from.</li>
        <li><strong>Top products</strong> – Your best-selling items.</li>
      </ul>
    `,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    category: "Analytics",
    author: "Michael Lee",
    authorAvatar: "https://via.placeholder.com/50x50?text=ML",
    date: "2025-02-18",
    readTime: 6,
    featured: false,
  },
  {
    id: 3,
    title: "How to Optimize Product Photos for Higher Conversions",
    slug: "optimize-product-photos",
    excerpt:
      "High-quality images can make or break a sale. Follow these photography tips.",
    content: `
      <p>Your product photos are the first thing buyers see. Make them count:</p>
      <ul>
        <li>Use natural light or a lightbox.</li>
        <li>Show multiple angles.</li>
        <li>Include a size reference.</li>
        <li>Use a clean background.</li>
        <li>Show the product in use.</li>
      </ul>
    `,
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop",
    category: "Product Listings",
    author: "Emily Chen",
    authorAvatar: "https://via.placeholder.com/50x50?text=EC",
    date: "2025-02-15",
    readTime: 5,
    featured: true,
  },
  {
    id: 4,
    title: "Shipping Best Practices for International Orders",
    slug: "shipping-best-practices",
    excerpt: "Navigate customs, duties, and delivery times with confidence.",
    content: `
      <p>International shipping can be complex. Here's how to handle it:</p>
      <ul>
        <li>Clearly state shipping times and costs.</li>
        <li>Provide tracking information.</li>
        <li>Understand customs regulations.</li>
        <li>Offer insurance for high-value items.</li>
      </ul>
    `,
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop",
    category: "Shipping",
    author: "David Kim",
    authorAvatar: "https://via.placeholder.com/50x50?text=DK",
    date: "2025-02-12",
    readTime: 7,
    featured: false,
  },
  {
    id: 5,
    title: "Using Social Media to Drive Traffic to Your Store",
    slug: "social-media-traffic",
    excerpt:
      "Learn how to leverage Facebook, Instagram, and Pinterest to attract buyers.",
    content: `
      <p>Social media can be a powerful driver of traffic. Tips:</p>
      <ul>
        <li>Post regularly with high-quality images.</li>
        <li>Use relevant hashtags.</li>
        <li>Engage with your followers.</li>
        <li>Run targeted ads.</li>
      </ul>
    `,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    category: "Marketing",
    author: "Sarah Johnson",
    authorAvatar: "https://via.placeholder.com/50x50?text=SJ",
    date: "2025-02-10",
    readTime: 6,
    featured: false,
  },
];

export const categories = [
  { name: "All", count: blogPosts.length },
  {
    name: "Selling Tips",
    count: blogPosts.filter((p) => p.category === "Selling Tips").length,
  },
  {
    name: "Analytics",
    count: blogPosts.filter((p) => p.category === "Analytics").length,
  },
  {
    name: "Product Listings",
    count: blogPosts.filter((p) => p.category === "Product Listings").length,
  },
  {
    name: "Shipping",
    count: blogPosts.filter((p) => p.category === "Shipping").length,
  },
  {
    name: "Marketing",
    count: blogPosts.filter((p) => p.category === "Marketing").length,
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
export const getPostsByCategory = (category) =>
  category === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === category);
