"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiPlus, FiEdit2, FiCopy, FiTrash2 } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    sku: "WB-123",
    price: 29.99,
    stock: 45,
    status: "Active",
    image: "/earbuds.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    sku: "SW-456",
    price: 49.99,
    stock: 12,
    status: "Active",
    image: "/watch.jpg",
  },
  {
    id: 3,
    name: "Phone Case",
    sku: "PC-789",
    price: 9.99,
    stock: 0,
    status: "Out of Stock",
    image: "/case.jpg",
  },
];

export default function SellerProductsPage() {
  const [view, setView] = useState("table");
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Products ({products.length})</h1>
        <div className="space-x-2">
          <Link
            href="/dashboard/seller/products/add"
            className="bg-orange text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <FiPlus className="mr-2" /> Add Product
          </Link>
          <button className="border px-4 py-2 rounded-lg">Import</button>
        </div>
      </div>

      {/* Search & filters */}
      <div className="flex mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select className="ml-2 border rounded-lg px-3">
          <option>All</option>
          <option>Active</option>
          <option>Out of Stock</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="bg-gray-100 p-2 rounded mb-4 flex items-center justify-between">
          <span>{selected.length} selected</span>
          <div>
            <button className="text-orange mr-3">Activate</button>
            <button className="text-red-600">Delete</button>
          </div>
        </div>
      )}

      {/* Table view */}
      {view === "table" && (
        <table className="w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-50">
              <th>
                <input type="checkbox" />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                  />
                </td>
                <td className="p-2 flex items-center">
                  <img
                    src={p.image}
                    className="w-10 h-10 object-cover rounded mr-2"
                  />
                  {p.name}
                </td>
                <td className="p-2">{p.sku}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${p.status === "Active" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-2">
                  <button>
                    <FiEdit2 className="inline mr-2" />
                  </button>
                  <button>
                    <FiCopy className="inline mr-2" />
                  </button>
                  <button>
                    <FiTrash2 className="inline text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
