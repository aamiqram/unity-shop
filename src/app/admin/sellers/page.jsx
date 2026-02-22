// app/admin/sellers/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

// Mock sellers data
const mockSellers = [
  {
    id: 1,
    storeName: "Shenzhen Tech Co.",
    owner: "Li Wei",
    email: "li.wei@sztech.com",
    logo: "https://via.placeholder.com/40x40?text=ST",
    healthScore: 92,
    status: "active",
    verified: true,
    tradeAssurance: true,
    products: 128,
    totalSales: 52400.5,
    commissionRate: 8,
    totalCommission: 4192.04,
    joinDate: "2024-01-15",
    lastActive: "2025-02-22",
  },
  {
    id: 2,
    storeName: "Guangzhou Fashion Ltd.",
    owner: "Zhang Min",
    email: "zhang.min@gzfashion.com",
    logo: "https://via.placeholder.com/40x40?text=GF",
    healthScore: 78,
    status: "active",
    verified: true,
    tradeAssurance: false,
    products: 95,
    totalSales: 31200.0,
    commissionRate: 8,
    totalCommission: 2496.0,
    joinDate: "2024-03-20",
    lastActive: "2025-02-21",
  },
  {
    id: 3,
    storeName: "Yiwu Houseware Co.",
    owner: "Wang Fang",
    email: "wang.fang@yiwuhouse.com",
    logo: "https://via.placeholder.com/40x40?text=YH",
    healthScore: 45,
    status: "suspended",
    verified: true,
    tradeAssurance: true,
    products: 67,
    totalSales: 8900.75,
    commissionRate: 8,
    totalCommission: 712.06,
    joinDate: "2024-05-10",
    lastActive: "2025-02-15",
  },
  {
    id: 4,
    storeName: "Ningbo Sportswear",
    owner: "Chen Jie",
    email: "chen.jie@ningsport.com",
    logo: "https://via.placeholder.com/40x40?text=NS",
    healthScore: 88,
    status: "active",
    verified: true,
    tradeAssurance: false,
    products: 42,
    totalSales: 18750.0,
    commissionRate: 8,
    totalCommission: 1500.0,
    joinDate: "2024-06-05",
    lastActive: "2025-02-20",
  },
  {
    id: 5,
    storeName: "Chaozhou Ceramics",
    owner: "Lin Tao",
    email: "lin.tao@czceramics.com",
    logo: "https://via.placeholder.com/40x40?text=CC",
    healthScore: 95,
    status: "active",
    verified: true,
    tradeAssurance: true,
    products: 156,
    totalSales: 67800.25,
    commissionRate: 8,
    totalCommission: 5424.02,
    joinDate: "2023-11-12",
    lastActive: "2025-02-22",
  },
  {
    id: 6,
    storeName: "Xiamen Eco Products",
    owner: "Huang Lei",
    email: "huang.lei@xmecho.com",
    logo: "https://via.placeholder.com/40x40?text=XE",
    healthScore: 62,
    status: "pending",
    verified: false,
    tradeAssurance: false,
    products: 23,
    totalSales: 3450.0,
    commissionRate: 8,
    totalCommission: 276.0,
    joinDate: "2025-02-01",
    lastActive: "2025-02-22",
  },
  {
    id: 7,
    storeName: "Shenzhen Peripherals",
    owner: "Liu Yang",
    email: "liu.yang@szperipherals.com",
    logo: "https://via.placeholder.com/40x40?text=SP",
    healthScore: 81,
    status: "active",
    verified: true,
    tradeAssurance: true,
    products: 89,
    totalSales: 43200.5,
    commissionRate: 8,
    totalCommission: 3456.04,
    joinDate: "2024-08-18",
    lastActive: "2025-02-21",
  },
];

// Pending applications (subset of sellers with status pending)
const pendingSellers = mockSellers.filter((s) => s.status === "pending");

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState(mockSellers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [viewingSeller, setViewingSeller] = useState(null);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [selectedCommissionSeller, setSelectedCommissionSeller] =
    useState(null);
  const [newCommissionRate, setNewCommissionRate] = useState("");

  // Stats
  const stats = {
    total: sellers.length,
    active: sellers.filter((s) => s.status === "active").length,
    pending: sellers.filter((s) => s.status === "pending").length,
    suspended: sellers.filter((s) => s.status === "suspended").length,
  };

  // Filter sellers
  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      searchQuery === "" ||
      seller.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || seller.status === statusFilter;
    const matchesVerified =
      verifiedFilter === "all" ||
      (verifiedFilter === "verified" && seller.verified) ||
      (verifiedFilter === "unverified" && !seller.verified);

    return matchesSearch && matchesStatus && matchesVerified;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSellers(filteredSellers.map((s) => s.id));
    } else {
      setSelectedSellers([]);
    }
  };

  const handleSelectSeller = (id) => {
    setSelectedSellers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedSellers.length === 0) return;
    console.log(`Bulk ${action} on:`, selectedSellers);
    setSelectedSellers([]);
  };

  const handleExport = () => {
    console.log("Export sellers");
  };

  const handleAdjustCommission = (seller) => {
    setSelectedCommissionSeller(seller);
    setNewCommissionRate(seller.commissionRate.toString());
    setShowCommissionModal(true);
  };

  const saveCommissionRate = () => {
    // In real app, call API
    console.log(
      `Set commission for ${selectedCommissionSeller.id} to ${newCommissionRate}%`,
    );
    setShowCommissionModal(false);
  };

  const getHealthColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Seller Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage seller accounts, commissions, and approvals
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Total Sellers</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Suspended</p>
            <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by store name, owner, or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="all">All Verification</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            <FiDownload size={16} />
            Export
          </button>
        </div>

        {/* Bulk actions */}
        {selectedSellers.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedSellers.length} seller(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("approve")}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction("suspend")}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Sellers table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedSellers.length === filteredSellers.length &&
                      filteredSellers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                </th>
                <th className="p-3 text-left">Store</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Health</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-right">Sales</th>
                <th className="p-3 text-left">Commission</th>
                <th className="p-3 text-left">Joined</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr
                  key={seller.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedSellers.includes(seller.id)}
                      onChange={() => handleSelectSeller(seller.id)}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={seller.logo}
                          alt={seller.storeName}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{seller.storeName}</p>
                        <p className="text-xs text-gray-500">{seller.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{seller.owner}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-medium ${getHealthColor(seller.healthScore)}`}
                      >
                        {seller.healthScore}
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            seller.healthScore >= 80
                              ? "bg-green-500"
                              : seller.healthScore >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${seller.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(seller.status)}`}
                    >
                      {seller.status}
                    </span>
                  </td>
                  <td className="p-3">{seller.products}</td>
                  <td className="p-3 text-right">
                    ${seller.totalSales.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <span>{seller.commissionRate}%</span>
                      <button
                        onClick={() => handleAdjustCommission(seller)}
                        className="text-gray-400 hover:text-[#FF6600]"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="p-3">{seller.joinDate}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingSeller(seller);
                          setShowSellerModal(true);
                        }}
                        className="text-gray-500 hover:text-[#FF6600]"
                      >
                        <FiEye size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-[#FF6600]">
                        <FiEdit2 size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSellers.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No sellers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pending approvals section */}
        {pendingSellers.length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">
              Pending Approvals ({pendingSellers.length})
            </h2>
            <div className="space-y-3">
              {pendingSellers.map((seller) => (
                <div
                  key={seller.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{seller.storeName}</p>
                    <p className="text-xs text-gray-500">
                      Owner: {seller.owner} • Applied: {seller.joinDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                      Approve
                    </button>
                    <button className="px-3 py-1 border border-red-300 text-red-600 rounded text-sm hover:bg-red-50">
                      Reject
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seller detail modal */}
        {showSellerModal && viewingSeller && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowSellerModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Seller Details</h2>
                <button onClick={() => setShowSellerModal(false)}>
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={viewingSeller.logo}
                      alt={viewingSeller.storeName}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {viewingSeller.storeName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {viewingSeller.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="font-medium">{viewingSeller.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-medium capitalize">
                      {viewingSeller.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Health Score</p>
                    <p
                      className={`font-medium ${getHealthColor(viewingSeller.healthScore)}`}
                    >
                      {viewingSeller.healthScore}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Verified</p>
                    <p>{viewingSeller.verified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Trade Assurance</p>
                    <p>{viewingSeller.tradeAssurance ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Products</p>
                    <p>{viewingSeller.products}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Sales</p>
                    <p>${viewingSeller.totalSales.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission</p>
                    <p>{viewingSeller.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission Earned</p>
                    <p>${viewingSeller.totalCommission.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p>{viewingSeller.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Active</p>
                    <p>{viewingSeller.lastActive}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex gap-2">
                  <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]">
                    View Store
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                    Edit
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50">
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Commission adjustment modal */}
        {showCommissionModal && selectedCommissionSeller && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowCommissionModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  Adjust Commission Rate
                </h2>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Store:{" "}
                  <span className="font-medium">
                    {selectedCommissionSeller.storeName}
                  </span>
                </p>
                <p className="mb-2 text-sm text-gray-600">
                  Current commission rate:{" "}
                  {selectedCommissionSeller.commissionRate}%
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New rate (%)
                </label>
                <input
                  type="number"
                  value={newCommissionRate}
                  onChange={(e) => setNewCommissionRate(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveCommissionRate}
                    className="flex-1 px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowCommissionModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
