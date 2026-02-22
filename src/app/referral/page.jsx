// app/referral/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiCopy,
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiMail,
  FiUsers,
  FiGift,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Mock user referral data (would come from API)
const mockUser = {
  name: "John Doe",
  referralCode: "JOHNDOE123",
  referralLink: "https://unityshop.com/ref/JOHNDOE123",
  stats: {
    totalReferrals: 12,
    successful: 8,
    earned: 80,
    available: 35,
  },
  history: [
    {
      friend: "Emma Wilson",
      date: "2025-02-20",
      status: "Completed",
      reward: 10,
    },
    {
      friend: "Michael Brown",
      date: "2025-02-18",
      status: "Pending",
      reward: 0,
    },
    {
      friend: "Sarah Davis",
      date: "2025-02-15",
      status: "Completed",
      reward: 10,
    },
    {
      friend: "James Wilson",
      date: "2025-02-10",
      status: "Completed",
      reward: 10,
    },
    {
      friend: "Linda Taylor",
      date: "2025-02-05",
      status: "Used Discount",
      reward: 10,
    },
  ],
};

// Leaderboard data (top referrers)
const leaderboard = [
  { rank: 1, name: "Alex Chen", referrals: 45, earned: 450 },
  { rank: 2, name: "Maria Garcia", referrals: 38, earned: 380 },
  { rank: 3, name: "John Smith", referrals: 32, earned: 320 },
  { rank: 4, name: "Lisa Wong", referrals: 29, earned: 290 },
  { rank: 5, name: "David Kim", referrals: 27, earned: 270 },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const [user] = useState(mockUser); // in real app, fetch logged-in user

  const handleCopyLink = () => {
    navigator.clipboard.writeText(user.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Join me on Unity Shop&body=Sign up using my referral link: ${user.referralLink}`;
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Refer Friends, Earn Rewards
          </h1>
          <p className="text-xl mb-4">
            Give $10, Get $10 – when your friend makes their first purchase
          </p>
          <Link
            href="/register?ref=start"
            className="inline-block bg-white text-[#FF6600] px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Start Referring
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiShare2 className="text-[#FF6600]" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Share Your Link</h3>
            <p className="text-sm text-gray-600">
              Share your unique referral link with friends via email, social
              media, or SMS.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiGift className="text-[#FF6600]" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Friend Gets Discount</h3>
            <p className="text-sm text-gray-600">
              Your friend gets $10 off their first order of $50 or more.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiUsers className="text-[#FF6600]" size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">You Get Rewarded</h3>
            <p className="text-sm text-gray-600">
              You get $10 credit when they make their first purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Referral Dashboard (if logged in) */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Referral Dashboard
          </h2>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-50 p-3 rounded text-center">
              <p className="text-xs text-gray-500">Total Referrals</p>
              <p className="text-2xl font-bold text-[#FF6600]">
                {user.stats.totalReferrals}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded text-center">
              <p className="text-xs text-gray-500">Successful</p>
              <p className="text-2xl font-bold text-green-600">
                {user.stats.successful}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded text-center">
              <p className="text-xs text-gray-500">Total Earned</p>
              <p className="text-2xl font-bold text-[#FF6600]">
                ${user.stats.earned}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded text-center">
              <p className="text-xs text-gray-500">Available Balance</p>
              <p className="text-2xl font-bold text-green-600">
                ${user.stats.available}
              </p>
            </div>
          </div>

          {/* Referral link */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Your Unique Referral Link
            </label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={user.referralLink}
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-50"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#FF6600] text-white rounded-r text-sm hover:bg-[#e65c00] flex items-center gap-1"
              >
                <FiCopy size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              <FiFacebook size={14} /> Facebook
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-sky-500 text-white rounded text-sm hover:bg-sky-600">
              <FiTwitter size={14} /> Twitter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
              <FaWhatsapp size={14} /> WhatsApp
            </button>
            <button
              onClick={shareViaEmail}
              className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
            >
              <FiMail size={14} /> Email
            </button>
          </div>

          {/* QR Code placeholder */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-gray-500">
              QR
            </div>
            <span className="text-sm text-gray-600">
              Scan QR code to share in person
            </span>
          </div>
        </div>
      </section>

      {/* Referral History */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3">Referral History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-2 text-left">Friend</th>
                  <th className="p-2 text-left">Date Referred</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-right">Reward</th>
                </tr>
              </thead>
              <tbody>
                {user.history.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="p-2">{item.friend}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 text-right font-medium">
                      {item.reward > 0 ? `$${item.reward}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3">
            Top Referrers This Month
          </h2>
          <div className="space-y-2">
            {leaderboard.map((ref) => (
              <div
                key={ref.rank}
                className="flex items-center justify-between border-b border-gray-100 pb-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      ref.rank === 1
                        ? "bg-yellow-100 text-yellow-700"
                        : ref.rank === 2
                          ? "bg-gray-200 text-gray-700"
                          : ref.rank === 3
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {ref.rank}
                  </span>
                  <span className="font-medium">{ref.name}</span>
                </div>
                <div className="text-sm">
                  <span className="text-[#FF6600] font-semibold">
                    {ref.referrals} referrals
                  </span>
                  <span className="text-gray-500 ml-2">
                    (${ref.earned} earned)
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Top 10 referrers receive bonus prizes!
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                How long is my referral link valid?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Your referral link never expires. You can use it anytime.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                When do I get my reward?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Once your friend makes their first purchase of $50 or more, the
                $10 credit is added to your account within 24 hours.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I use my credit immediately?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Yes, your credit is available for future purchases immediately
                after being credited.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Is there a limit to how many friends I can refer?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                No, you can refer as many friends as you like. There's no limit.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-500">
          Over 10,000 users have earned through referrals!
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Average earnings per referrer: $47
        </p>
      </section>
    </main>
  );
}
