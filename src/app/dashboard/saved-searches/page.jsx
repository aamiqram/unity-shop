// app/dashboard/saved-searches/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FiSearch,
  FiBell,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";

// Mock saved searches data
const mockSavedSearches = [
  {
    id: 1,
    name: "Wireless headphones under $50",
    query: "wireless headphones",
    filters: {
      category: "Electronics",
      priceMin: 0,
      priceMax: 50,
    },
    alertEnabled: true,
    frequency: "daily", // daily, weekly, instant
    createdAt: "2025-02-15",
    newResults: 12,
  },
  {
    id: 2,
    name: "Smart watches with heart rate monitor",
    query: "smart watch heart rate",
    filters: {
      category: "Wearables",
    },
    alertEnabled: false,
    frequency: "weekly",
    createdAt: "2025-02-10",
    newResults: 5,
  },
  {
    id: 3,
    name: "Yoga mats non-slip",
    query: "yoga mat non-slip",
    filters: {
      category: "Sports",
      priceMax: 30,
    },
    alertEnabled: true,
    frequency: "instant",
    createdAt: "2025-02-05",
    newResults: 3,
  },
];

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState(mockSavedSearches);
  const [showModal, setShowModal] = useState(false);
  const [editingSearch, setEditingSearch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    query: "",
    category: "",
    priceMin: "",
    priceMax: "",
    alertEnabled: true,
    frequency: "daily",
  });

  const handleOpenModal = (search = null) => {
    if (search) {
      setEditingSearch(search);
      setFormData({
        name: search.name,
        query: search.query,
        category: search.filters.category || "",
        priceMin: search.filters.priceMin || "",
        priceMax: search.filters.priceMax || "",
        alertEnabled: search.alertEnabled,
        frequency: search.frequency,
      });
    } else {
      setEditingSearch(null);
      setFormData({
        name: "",
        query: "",
        category: "",
        priceMin: "",
        priceMax: "",
        alertEnabled: true,
        frequency: "daily",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSearch(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.query) return;

    if (editingSearch) {
      // Update existing
      setSearches(
        searches.map((s) =>
          s.id === editingSearch.id
            ? {
                ...s,
                name: formData.name,
                query: formData.query,
                filters: {
                  category: formData.category || undefined,
                  priceMin: formData.priceMin
                    ? Number(formData.priceMin)
                    : undefined,
                  priceMax: formData.priceMax
                    ? Number(formData.priceMax)
                    : undefined,
                },
                alertEnabled: formData.alertEnabled,
                frequency: formData.frequency,
              }
            : s,
        ),
      );
    } else {
      // Create new
      const newSearch = {
        id: Date.now(),
        name: formData.name,
        query: formData.query,
        filters: {
          category: formData.category || undefined,
          priceMin: formData.priceMin ? Number(formData.priceMin) : undefined,
          priceMax: formData.priceMax ? Number(formData.priceMax) : undefined,
        },
        alertEnabled: formData.alertEnabled,
        frequency: formData.frequency,
        createdAt: new Date().toISOString().split("T")[0],
        newResults: 0,
      };
      setSearches([newSearch, ...searches]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this saved search?")) {
      setSearches(searches.filter((s) => s.id !== id));
    }
  };

  const toggleAlert = (id) => {
    setSearches(
      searches.map((s) =>
        s.id === id ? { ...s, alertEnabled: !s.alertEnabled } : s,
      ),
    );
  };

  const changeFrequency = (id, frequency) => {
    setSearches(searches.map((s) => (s.id === id ? { ...s, frequency } : s)));
  };

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Saved Searches</h1>
            <p className="text-gray-600">
              Get notified when new products match your searches.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
          >
            <FiPlus size={16} /> Create Alert
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Total Searches</p>
            <p className="text-xl font-bold">{searches.length}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Active Alerts</p>
            <p className="text-xl font-bold">
              {searches.filter((s) => s.alertEnabled).length}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">New Items</p>
            <p className="text-xl font-bold">
              {searches.reduce((acc, s) => acc + s.newResults, 0)}
            </p>
          </div>
        </div>

        {/* Saved searches list */}
        {searches.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
            <FiSearch className="mx-auto text-gray-300 text-4xl mb-2" />
            <p className="text-gray-500">No saved searches yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Save a search to get notified of new products.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {searches.map((search) => (
              <div
                key={search.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{search.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                        {search.query}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                      {search.filters.category && (
                        <span>Category: {search.filters.category}</span>
                      )}
                      {search.filters.priceMin !== undefined && (
                        <span>Min: ${search.filters.priceMin}</span>
                      )}
                      {search.filters.priceMax !== undefined && (
                        <span>Max: ${search.filters.priceMax}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {search.newResults > 0 && (
                      <Link
                        href={`/search?q=${encodeURIComponent(search.query)}`}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold hover:bg-green-200"
                      >
                        {search.newResults} new
                      </Link>
                    )}
                    <button
                      onClick={() => handleOpenModal(search)}
                      className="p-1 text-gray-400 hover:text-[#FF6600]"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(search.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Alert settings */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm border-t border-gray-100 pt-3">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={search.alertEnabled}
                      onChange={() => toggleAlert(search.id)}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                    <FiBell
                      size={14}
                      className={
                        search.alertEnabled ? "text-[#FF6600]" : "text-gray-400"
                      }
                    />
                    <span>Email alerts</span>
                  </label>
                  {search.alertEnabled && (
                    <select
                      value={search.frequency}
                      onChange={(e) =>
                        changeFrequency(search.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    >
                      <option value="instant">Instant</option>
                      <option value="daily">Daily digest</option>
                      <option value="weekly">Weekly digest</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingSearch ? "Edit Search" : "Create Alert"}
                </h2>
                <button onClick={handleCloseModal}>
                  <FiX size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Wireless headphones under $50"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search Query
                  </label>
                  <input
                    type="text"
                    value={formData.query}
                    onChange={(e) =>
                      setFormData({ ...formData, query: e.target.value })
                    }
                    placeholder="e.g., wireless headphones"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Electronics"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Min Price ($)
                    </label>
                    <input
                      type="number"
                      value={formData.priceMin}
                      onChange={(e) =>
                        setFormData({ ...formData, priceMin: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Price ($)
                    </label>
                    <input
                      type="number"
                      value={formData.priceMax}
                      onChange={(e) =>
                        setFormData({ ...formData, priceMax: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      min="0"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={formData.alertEnabled}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alertEnabled: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                    <span className="text-sm font-medium">
                      Enable email alerts
                    </span>
                  </label>

                  {formData.alertEnabled && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Frequency
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            frequency: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      >
                        <option value="instant">
                          Instant (as soon as new products match)
                        </option>
                        <option value="daily">Daily digest</option>
                        <option value="weekly">Weekly digest</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
