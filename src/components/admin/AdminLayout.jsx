// components/admin/AdminLayout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiPackage,
  FiShoppingBag,
  FiGrid,
  FiDollarSign,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/users", label: "Users Management", icon: FiUsers },
  { href: "/admin/sellers", label: "Sellers Management", icon: FiBriefcase },
  { href: "/admin/products", label: "Products Management", icon: FiPackage },
  { href: "/admin/orders", label: "Orders Management", icon: FiShoppingBag },
  { href: "/admin/categories", label: "Categories", icon: FiGrid },
  { href: "/admin/payments", label: "Payments & Payouts", icon: FiDollarSign },
  { href: "/admin/reports", label: "Reports & Analytics", icon: FiBarChart2 },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
  { href: "/admin/tickets", label: "Support Tickets", icon: FiHelpCircle },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-white rounded-md shadow-md"
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#FF6600] mb-6 lg:hidden">
            Admin Panel
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#FF6600] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">{children}</main>
    </div>
  );
}
