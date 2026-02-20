import Link from "next/link";
import {
  FiCpu,
  FiShoppingBag,
  FiHome,
  FiHeart,
  FiActivity,
  FiGift,
  FiTruck,
  FiBriefcase,
} from "react-icons/fi";

const categories = [
  {
    name: "Electronics & Technology",
    icon: FiCpu,
    href: "/categories/electronics",
  },
  {
    name: "Fashion & Apparel",
    icon: FiShoppingBag,
    href: "/categories/fashion",
  },
  { name: "Home & Garden", icon: FiHome, href: "/categories/home-garden" },
  { name: "Health & Beauty", icon: FiHeart, href: "/categories/health-beauty" },
  {
    name: "Sports & Outdoors",
    icon: FiActivity,
    href: "/categories/sports-outdoors",
  },
  { name: "Toys & Kids", icon: FiGift, href: "/categories/toys-kids" },
  { name: "Automotive", icon: FiTruck, href: "/categories/automotive" },
  {
    name: "Office Supplies",
    icon: FiBriefcase,
    href: "/categories/office-supplies",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="text-3xl text-gray-600 group-hover:text-orange-500 transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
