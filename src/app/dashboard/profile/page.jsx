"use client";
import { useState } from "react";
import Image from "next/image";
import { FiUser, FiMapPin, FiCreditCard, FiBell, FiLock } from "react-icons/fi";

const tabs = [
  { id: "personal", label: "Personal Info", icon: FiUser },
  { id: "addresses", label: "Addresses", icon: FiMapPin },
  { id: "payment", label: "Payment Methods", icon: FiCreditCard },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "security", label: "Security", icon: FiLock },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex">
      {/* Sidebar tabs */}
      <aside className="w-64 border-r min-h-screen p-4">
        <h2 className="font-bold mb-4">Settings</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? "bg-orange/10 text-orange"
                  : "hover:bg-gray-100"
              }`}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {activeTab === "personal" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <button className="border px-4 py-2 rounded text-sm">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 2MB
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value="John Doe"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value="john@example.com"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value="+1 234 567 890"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value="1990-01-01"
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
              <button className="bg-orange text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "addresses" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-sm">
                    123 Main St, Apt 4B, New York, NY 10001
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="text-orange text-sm">Edit</button>
                  <button className="text-red-600 text-sm">Delete</button>
                </div>
              </div>
              <button className="border border-orange text-orange px-4 py-2 rounded-lg">
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Other tabs similarly ... */}
      </main>
    </div>
  );
}
