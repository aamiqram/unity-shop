// app/dashboard/price-alerts/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FiBell,
  FiBellOff,
  FiEdit2,
  FiTrash2,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

// Helper to generate random sparkline data (simple SVG path)
const generateSparkline = (high, low, current) => {
  // Create 5 random points between low and high
  const points = [];
  for (let i = 0; i < 5; i++) {
    points.push(low + Math.random() * (high - low));
  }
  // Ensure current is last point
  points[4] = current;
  // Scale to fit in 40x20 viewBox
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const scaled = points.map((p) => (p - min) / range);
  const path = scaled
    .map((p, i) => {
      const x = i * 10;
      const y = 20 - p * 20;
      return (i === 0 ? "M" : "L") + x + "," + y;
    })
    .join(" ");
  return { path, min, max };
};

// Mock price alerts
const mockAlerts = [
  {
    id: 1,
    productId: "p1",
    productName: "Wireless Bluetooth Earbuds",
    productImage:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
    currentPrice: 29.99,
    targetPrice: 25.0,
    condition: "drop_to", // drop_to, drop_percent
    createdAt: "2025-02-01",
    status: "active", // active, triggered, expired
    priceHistory: [32.99, 31.5, 29.99, 28.75, 29.99], // last 5 points
    high: 34.99,
    low: 27.5,
  },
  {
    id: 2,
    productId: "p2",
    productName: "Smart Watch Fitness Tracker",
    productImage:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&auto=format",
    currentPrice: 79.99,
    targetPrice: 69.99,
    condition: "drop_to",
    createdAt: "2025-02-05",
    status: "active",
    priceHistory: [85.0, 82.5, 79.99, 78.0, 79.99],
    high: 89.99,
    low: 74.99,
  },
  {
    id: 3,
    productId: "p3",
    productName: "Stainless Steel Water Bottle",
    productImage:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
    currentPrice: 14.99,
    targetPrice: 12.99,
    condition: "drop_to",
    createdAt: "2025-01-28",
    status: "triggered",
    priceHistory: [16.99, 15.5, 14.99, 13.25, 12.99],
    high: 17.99,
    low: 12.99,
  },
  {
    id: 4,
    productId: "p4",
    productName: "LED Desk Lamp",
    productImage:
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=100&auto=format",
    currentPrice: 24.99,
    targetPrice: 20.0,
    condition: "drop_percent", // 20% drop
    createdAt: "2025-02-10",
    status: "active",
    priceHistory: [28.99, 27.5, 25.99, 24.99, 24.99],
    high: 29.99,
    low: 22.99,
  },
  {
    id: 5,
    productId: "p5",
    productName: "Ceramic Coffee Mug Set",
    productImage:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&auto=format",
    currentPrice: 34.99,
    targetPrice: 29.99,
    condition: "drop_to",
    createdAt: "2025-01-15",
    status: "expired",
    priceHistory: [36.99, 35.5, 34.99, 33.99, 34.99],
    high: 38.99,
    low: 32.99,
  },
];

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState("active"); // active, triggered, all
  const [editingAlert, setEditingAlert] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTargetPrice, setNewTargetPrice] = useState("");

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "active") return alert.status === "active";
    if (filter === "triggered") return alert.status === "triggered";
    return true;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === "active").length,
    triggered: alerts.filter((a) => a.status === "triggered").length,
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setNewTargetPrice(alert.targetPrice);
    setShowEditModal(true);
  };

  const saveEdit = () => {
    if (!editingAlert) return;
    setAlerts(
      alerts.map((a) =>
        a.id === editingAlert.id
          ? { ...a, targetPrice: parseFloat(newTargetPrice) }
          : a,
      ),
    );
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (confirm("Delete this price alert?")) {
      setAlerts(alerts.filter((a) => a.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Price Alerts</h1>
        <p className="text-gray-600 mb-6">
          Get notified when products reach your target price.
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Total Alerts</p>
            <p className="text-xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-xl font-bold text-blue-600">{stats.active}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Triggered</p>
            <p className="text-xl font-bold text-green-600">
              {stats.triggered}
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {["active", "triggered", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                filter === f
                  ? "bg-[#FF6600] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f} {f === "active" && `(${stats.active})`}{" "}
              {f === "triggered" && `(${stats.triggered})`}
            </button>
          ))}
        </div>

        {/* Alerts list */}
        {filteredAlerts.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
            <FiBell className="mx-auto text-gray-300 text-4xl mb-2" />
            <p className="text-gray-500">No price alerts found.</p>
            <p className="text-xs text-gray-400 mt-1">
              Set a price alert from any product page.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map((alert) => {
              const { path } = generateSparkline(
                alert.high,
                alert.low,
                alert.currentPrice,
              );
              return (
                <div
                  key={alert.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    {/* Product image */}
                    <Link
                      href={`/products/${alert.productId}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-16 h-16 relative">
                        <Image
                          src={alert.productImage}
                          alt={alert.productName}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      {/* Product name and status */}
                      <div className="flex items-start justify-between">
                        <Link
                          href={`/products/${alert.productId}`}
                          className="font-semibold hover:text-[#FF6600] truncate"
                        >
                          {alert.productName}
                        </Link>
                        <div className="flex items-center gap-1 ml-2">
                          {alert.status === "active" && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FiBell size={10} /> Watching
                            </span>
                          )}
                          {alert.status === "triggered" && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FiTrendingDown size={10} /> Price dropped!
                            </span>
                          )}
                          {alert.status === "expired" && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                              Expired
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price info */}
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <div>
                          <span className="text-gray-500">Current:</span>{" "}
                          <span className="font-semibold">
                            ${alert.currentPrice.toFixed(2)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target:</span>{" "}
                          <span className="font-semibold">
                            ${alert.targetPrice.toFixed(2)}
                          </span>
                        </div>
                        {alert.condition === "drop_percent" && (
                          <span className="text-xs text-gray-400">
                            (20% drop)
                          </span>
                        )}
                      </div>

                      {/* Sparkline and actions */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          {/* Mini sparkline */}
                          <svg
                            width="50"
                            height="20"
                            viewBox="0 0 50 20"
                            className="text-gray-500"
                          >
                            <path
                              d={path}
                              stroke="#FF6600"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                          <span className="text-xs text-gray-400">
                            High: ${alert.high} Low: ${alert.low}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(alert)}
                            className="p-1 text-gray-400 hover:text-[#FF6600]"
                            title="Edit target price"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(alert.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete alert"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Edit modal */}
        {showEditModal && editingAlert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowEditModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-sm w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-2">Edit Price Alert</h3>
              <p className="text-sm text-gray-600 mb-3">
                {editingAlert.productName}
              </p>
              <label className="block text-sm font-medium mb-1">
                Target Price ($)
              </label>
              <input
                type="number"
                value={newTargetPrice}
                onChange={(e) => setNewTargetPrice(e.target.value)}
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
