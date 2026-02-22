// app/rewards/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiStar,
  FiGift,
  FiAward,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";

// Mock user loyalty data
const mockUser = {
  name: "John Doe",
  points: 2340,
  tier: "Silver", // Bronze, Silver, Gold
  nextTier: "Gold",
  pointsToNextTier: 1660,
  tierBenefits: {
    Bronze: { pointsPerDollar: 1, birthdayBonus: 50, freeShipping: false },
    Silver: {
      pointsPerDollar: 1.5,
      birthdayBonus: 100,
      freeShipping: "orders over $30",
    },
    Gold: {
      pointsPerDollar: 2,
      birthdayBonus: 200,
      freeShipping: "all orders",
    },
  },
  activity: [
    { date: "2025-02-22", activity: "Purchase", points: 120, balance: 2340 },
    { date: "2025-02-20", activity: "Review", points: 25, balance: 2220 },
    { date: "2025-02-15", activity: "Referral", points: 100, balance: 2195 },
    { date: "2025-02-10", activity: "Purchase", points: 85, balance: 2095 },
    { date: "2025-02-05", activity: "Social Share", points: 10, balance: 2010 },
    {
      date: "2025-02-01",
      activity: "Birthday Bonus",
      points: 100,
      balance: 2000,
    },
  ],
  redeemOptions: [
    {
      name: "$5 Off",
      points: 500,
      description: "Get $5 discount on any order",
    },
    {
      name: "$10 Off",
      points: 1000,
      description: "Get $10 discount on any order",
    },
    {
      name: "$25 Off",
      points: 2500,
      description: "Get $25 discount on any order",
    },
    {
      name: "Free Shipping",
      points: 300,
      description: "One-time free shipping",
    },
    {
      name: "Exclusive Tote Bag",
      points: 800,
      description: "Limited edition tote bag",
    },
  ],
  earnMethods: [
    { action: "Make a purchase", points: "1-2 points per $1" },
    { action: "Write a review", points: 25 },
    { action: "Share on social media", points: 10 },
    { action: "Refer a friend", points: 100 },
    { action: "Birthday bonus", points: "50-200" },
    { action: "Create account", points: 50 },
    { action: "Complete profile", points: 25 },
  ],
};

export default function RewardsPage() {
  const [user] = useState(mockUser);

  const tierColors = {
    Bronze: "bg-amber-600",
    Silver: "bg-gray-400",
    Gold: "bg-yellow-500",
  };

  const tierNames = ["Bronze", "Silver", "Gold"];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Unity Rewards</h1>
          <p className="text-xl mb-4">
            Shop more, save more – earn points on every purchase
          </p>
          {!user && (
            <Link
              href="/register"
              className="inline-block bg-white text-[#FF6600] px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Join Now
            </Link>
          )}
        </div>
      </section>

      {/* Program Tiers */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Membership Tiers
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tierNames.map((tier) => (
            <div
              key={tier}
              className={`bg-white rounded-lg shadow-md border-2 p-6 ${
                user?.tier === tier
                  ? `border-[#FF6600] ring-2 ring-[#FF6600] ring-opacity-50`
                  : "border-gray-200"
              }`}
            >
              <div
                className={`w-12 h-12 ${tierColors[tier]} rounded-full flex items-center justify-center text-white mb-3`}
              >
                <FiStar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{tier}</h3>
              <ul className="text-sm space-y-1 text-gray-600 mb-3">
                <li>
                  • Earn {user?.tierBenefits[tier].pointsPerDollar} point per $1
                  spent
                </li>
                <li>
                  • Birthday bonus: {user?.tierBenefits[tier].birthdayBonus}{" "}
                  points
                </li>
                <li>
                  • Free shipping:{" "}
                  {user?.tierBenefits[tier].freeShipping || "No"}
                </li>
              </ul>
              {user?.tier === tier && (
                <span className="inline-block bg-[#FF6600] text-white text-xs px-2 py-1 rounded">
                  Current Tier
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* User Dashboard */}
      {user && (
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Your Rewards Dashboard
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Points and Tier */}
              <div>
                <p className="text-sm text-gray-500">Available Points</p>
                <p className="text-4xl font-bold text-[#FF6600]">
                  {user.points}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Current Tier:{" "}
                  <span className="font-semibold">{user.tier}</span>
                </p>

                {/* Progress to next tier */}
                {user.tier !== "Gold" && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">
                      {user.pointsToNextTier} points to {user.nextTier}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-[#FF6600] h-2 rounded-full"
                        style={{
                          width: `${(user.points / (user.points + user.pointsToNextTier)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Points Earned (MTD)</p>
                  <p className="text-xl font-bold">345</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Rewards Redeemed</p>
                  <p className="text-xl font-bold">2</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-xl font-bold">2024</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-500">Next Reward</p>
                  <p className="text-xl font-bold">500 pts</p>
                </div>
              </div>
            </div>

            {/* Points Activity */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Activity</th>
                      <th className="p-2 text-right">Points</th>
                      <th className="p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.activity.slice(0, 5).map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="p-2">{item.date}</td>
                        <td className="p-2">{item.activity}</td>
                        <td className="p-2 text-right text-green-600">
                          +{item.points}
                        </td>
                        <td className="p-2 text-right">{item.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                href="/dashboard/rewards/history"
                className="text-sm text-[#FF6600] hover:underline mt-2 inline-block"
              >
                View full history →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Redeem Points */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Redeem Your Points</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUser.redeemOptions.map((reward, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <FiGift className="text-[#FF6600]" size={24} />
                <div>
                  <h3 className="font-semibold">{reward.name}</h3>
                  <p className="text-xs text-gray-500">{reward.description}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-[#FF6600]">
                {reward.points} points
              </p>
              <button
                disabled={!user || user.points < reward.points}
                className={`mt-3 w-full py-2 rounded text-sm ${
                  user && user.points >= reward.points
                    ? "bg-[#FF6600] text-white hover:bg-[#e65c00]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {user && user.points >= reward.points
                  ? "Redeem"
                  : "Not enough points"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to Earn */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Ways to Earn Points</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {mockUser.earnMethods.map((method, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-gray-100 pb-2"
              >
                <span className="text-sm">{method.action}</span>
                <span className="text-sm font-semibold text-[#FF6600]">
                  {method.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers (bonus points events) */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Bonus Points Events</h2>
          <p className="mb-3">Double points on Electronics this weekend! 🎉</p>
          <div className="flex gap-2">
            <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs">
              Feb 25-27
            </span>
            <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs">
              Triple points for new sellers
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                How do I join Unity Rewards?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                You're automatically enrolled when you make your first purchase.
                No sign-up needed!
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Do points expire?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Points expire after 12 months of inactivity. Keep shopping to
                maintain your balance!
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I combine points with other discounts?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Yes, points can be combined with most promotions and coupon
                codes.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                What happens if I return an item?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Points earned from that purchase will be deducted from your
                balance. If you redeemed points for that order, they will be
                credited back.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA for non-members */}
      {!user && (
        <section className="container mx-auto px-4 py-8 text-center">
          <Link
            href="/register"
            className="inline-block bg-[#FF6600] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#e65c00]"
          >
            Start earning points today
          </Link>
        </section>
      )}
    </main>
  );
}
