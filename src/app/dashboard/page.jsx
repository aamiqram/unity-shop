"use client";
import Link from "next/link";
import {
  FiPackage,
  FiHeart,
  FiMapPin,
  FiCreditCard,
  FiUser,
  FiMessageSquare,
  FiStar,
  FiHelpCircle,
  FiBell,
  FiGift,
} from "react-icons/fi";

// Mock data
const user = {
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  memberSince: "2023",
  stats: {
    totalOrders: 24,
    pendingOrders: 3,
    wishlistItems: 12,
    rewardPoints: 1250,
  },
  recentOrders: [
    {
      id: "ORD-123",
      date: "Mar 15, 2025",
      product: "Wireless Earbuds",
      image:
        "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
      total: 59.98,
      status: "Delivered",
    },
    // ... more
  ],
  wishlist: [
    /* ... */
  ],
  notifications: [
    { id: 1, text: "Your order #ORD-124 has shipped", time: "2 hours ago" },
  ],
};

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <img src={user.avatar} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">
                Member since {user.memberSince}
              </p>
            </div>
          </div>
          <nav className="space-y-1">
            {[
              {
                href: "/dashboard",
                label: "Dashboard",
                icon: FiPackage,
                active: true,
              },
              {
                href: "/dashboard/orders",
                label: "My Orders",
                icon: FiPackage,
              },
              { href: "/dashboard/wishlist", label: "Wishlist", icon: FiHeart },
              {
                href: "/dashboard/addresses",
                label: "Addresses",
                icon: FiMapPin,
              },
              {
                href: "/dashboard/payment",
                label: "Payment Methods",
                icon: FiCreditCard,
              },
              { href: "/dashboard/profile", label: "Profile", icon: FiUser },
              { href: "/messages", label: "Messages", icon: FiMessageSquare },
              { href: "/dashboard/reviews", label: "Reviews", icon: FiStar },
              { href: "/support", label: "Support", icon: FiHelpCircle },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  item.active ? "bg-orange/10 text-orange" : "hover:bg-gray-100"
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: user.stats.totalOrders },
            {
              label: "Pending Orders",
              value: user.stats.pendingOrders,
              badge: true,
            },
            { label: "Wishlist Items", value: user.stats.wishlistItems },
            { label: "Reward Points", value: user.stats.rewardPoints },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-lg border">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-orange text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="bg-white rounded-lg border overflow-hidden">
            {user.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center p-4 border-b last:border-0"
              >
                <img
                  src={order.image}
                  alt=""
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium">{order.product}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wishlist preview */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Wishlist</h2>
            <Link
              href="/dashboard/wishlist"
              className="text-orange text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded p-2">
                <div className="h-24 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
          <div className="bg-white rounded-lg border p-4">
            {user.notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-center py-2 border-b last:border-0"
              >
                <FiBell className="text-orange mr-3" />
                <span className="flex-1 text-sm">{n.text}</span>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
