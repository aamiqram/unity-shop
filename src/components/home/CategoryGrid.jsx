// components/home/CategoryGrid.jsx
import Link from "next/link";

const categories = [
  {
    name: "Electronics & Technology",
    icon: "📱",
    href: "/category/electronics",
    color: "bg-blue-50",
  },
  {
    name: "Fashion & Apparel",
    icon: "👕",
    href: "/category/fashion",
    color: "bg-pink-50",
  },
  {
    name: "Home & Garden",
    icon: "🏠",
    href: "/category/home-garden",
    color: "bg-green-50",
  },
  {
    name: "Health & Beauty",
    icon: "💄",
    href: "/category/health-beauty",
    color: "bg-purple-50",
  },
  {
    name: "Sports & Outdoors",
    icon: "⚽",
    href: "/category/sports-outdoors",
    color: "bg-orange-50",
  },
  {
    name: "Toys & Kids",
    icon: "🧸",
    href: "/category/toys-kids",
    color: "bg-yellow-50",
  },
  {
    name: "Automotive",
    icon: "🚗",
    href: "/category/automotive",
    color: "bg-gray-50",
  },
  {
    name: "Office Supplies",
    icon: "📎",
    href: "/category/office-supplies",
    color: "bg-indigo-50",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div
                className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}
              >
                {category.icon}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
