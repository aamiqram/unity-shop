// app/admin/users/page.jsx
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
  FiMail,
  FiUserX,
  FiUserCheck,
  FiX,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://via.placeholder.com/40x40?text=JS",
    role: "user",
    verified: true,
    status: "active",
    registrationDate: "2025-01-15",
    lastLogin: "2025-02-22",
    orders: 12,
    spent: 1250.75,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.w@example.com",
    avatar: "https://via.placeholder.com/40x40?text=EW",
    role: "seller",
    verified: true,
    status: "active",
    registrationDate: "2024-11-20",
    lastLogin: "2025-02-22",
    orders: 45,
    spent: 8900.0,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: "https://via.placeholder.com/40x40?text=MB",
    role: "user",
    verified: false,
    status: "inactive",
    registrationDate: "2025-02-01",
    lastLogin: "2025-02-10",
    orders: 2,
    spent: 156.47,
  },
  {
    id: 4,
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    avatar: "https://via.placeholder.com/40x40?text=SD",
    role: "seller",
    verified: true,
    status: "active",
    registrationDate: "2024-09-10",
    lastLogin: "2025-02-21",
    orders: 128,
    spent: 23450.0,
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.w@example.com",
    avatar: "https://via.placeholder.com/40x40?text=JW",
    role: "admin",
    verified: true,
    status: "active",
    registrationDate: "2024-05-05",
    lastLogin: "2025-02-22",
    orders: 0,
    spent: 0,
  },
  {
    id: 6,
    name: "Linda Taylor",
    email: "linda.t@example.com",
    avatar: "https://via.placeholder.com/40x40?text=LT",
    role: "user",
    verified: true,
    status: "active",
    registrationDate: "2025-01-28",
    lastLogin: "2025-02-20",
    orders: 5,
    spent: 429.99,
  },
  {
    id: 7,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    avatar: "https://via.placeholder.com/40x40?text=RJ",
    role: "seller",
    verified: false,
    status: "pending",
    registrationDate: "2025-02-22",
    lastLogin: "2025-02-22",
    orders: 0,
    spent: 0,
  },
];

// Pending seller applications
const pendingSellers = mockUsers.filter(
  (u) => u.role === "seller" && u.status === "pending",
);

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSellerApprovalModal, setShowSellerApprovalModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;
    console.log(`Bulk ${action} on:`, selectedUsers);
    // In real app, call API
    setSelectedUsers([]);
  };

  const handleExport = () => {
    console.log("Export users");
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "seller":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600 mb-6">
          Manage platform users, roles, and permissions
        </p>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="banned">Banned</option>
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
        {selectedUsers.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("ban")}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Ban
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-800 text-white rounded text-sm hover:bg-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Users table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                </th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Registration</th>
                <th className="p-3 text-left">Last Login</th>
                <th className="p-3 text-right">Orders</th>
                <th className="p-3 text-right">Spent</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 relative">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">{user.registrationDate}</td>
                  <td className="p-3">{user.lastLogin}</td>
                  <td className="p-3 text-right">{user.orders}</td>
                  <td className="p-3 text-right">${user.spent.toFixed(2)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingUser(user);
                          setShowUserModal(true);
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
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Seller approval section */}
        {pendingSellers.length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">
              Pending Seller Applications ({pendingSellers.length})
            </h2>
            <div className="space-y-3">
              {pendingSellers.map((seller) => (
                <div
                  key={seller.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{seller.name}</p>
                    <p className="text-xs text-gray-500">
                      Applied: {seller.registrationDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedSeller(seller);
                        setShowSellerApprovalModal(true);
                      }}
                      className="px-3 py-1 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User detail modal */}
        {showUserModal && viewingUser && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowUserModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">User Details</h2>
                <button onClick={() => setShowUserModal(false)}>
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={viewingUser.avatar}
                      alt={viewingUser.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {viewingUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">{viewingUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium">{viewingUser.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-medium capitalize">
                      {viewingUser.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Verified</p>
                    <p>{viewingUser.verified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Member since</p>
                    <p>{viewingUser.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last login</p>
                    <p>{viewingUser.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total orders</p>
                    <p>{viewingUser.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total spent</p>
                    <p>${viewingUser.spent.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 flex gap-2">
                  <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]">
                    Send Email
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

        {/* Seller approval modal */}
        {showSellerApprovalModal && selectedSeller && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowSellerApprovalModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  Review Seller Application
                </h2>
              </div>
              <div className="p-4">
                <p className="font-medium">{selectedSeller.name}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedSeller.email}
                </p>
                <p className="text-sm mb-2">Documents uploaded:</p>
                <ul className="text-sm text-gray-600 list-disc ml-5 mb-4">
                  <li>Government ID</li>
                  <li>Proof of address</li>
                  <li>Business registration (if applicable)</li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">
                  Application date: {selectedSeller.registrationDate}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50">
                    Reject
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
