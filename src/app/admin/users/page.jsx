"use client";
import { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Buyer",
    status: "Active",
    orders: 24,
    joined: "2025-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Seller",
    status: "Active",
    orders: 156,
    joined: "2024-11-20",
  },
  // ...
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="flex mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="ml-2 bg-orange text-white px-4 py-2 rounded-lg">
          Export
        </button>
      </div>

      <table className="w-full bg-white rounded-lg border">
        <thead>
          <tr className="bg-gray-50">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Orders</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${u.status === "Active" ? "bg-green-100" : "bg-gray-100"}`}
                >
                  {u.status}
                </span>
              </td>
              <td className="p-2">{u.orders}</td>
              <td className="p-2">{u.joined}</td>
              <td className="p-2">
                <button className="text-blue-600 mr-2">
                  <FiEye />
                </button>
                <button className="text-orange mr-2">
                  <FiEdit2 />
                </button>
                <button className="text-red-600">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
