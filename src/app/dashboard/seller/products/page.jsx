// app/dashboard/seller/products/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SellerLayout from "@/components/seller/SellerLayout";
import ProductCardB2B from "@/components/product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";
import {
  FiSearch,
  FiPlus,
  FiUpload,
  FiGrid,
  FiList,
  FiEdit,
  FiCopy,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";

// Mock seller products – for demo, assume current seller is "Shenzhen Tech Co., Ltd."
const sellerName = "Shenzhen Tech Co., Ltd.";
const sellerProducts = demoProducts.filter(
  (p) => p.supplier.name === sellerName,
);

// Add some additional fields for management
const productsWithStatus = sellerProducts.map((p, index) => ({
  ...p,
  status: index % 3 === 0 ? "active" : index % 3 === 1 ? "inactive" : "draft",
  sku: `SKU-${1000 + index}`,
  stock: Math.floor(Math.random() * 200) + 1,
  sales: Math.floor(Math.random() * 500),
}));

export default function SellerProductsPage() {
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Filter products based on search and status
  const filteredProducts = productsWithStatus.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedProducts.length === 0) return;
    console.log(`Bulk ${action} on:`, selectedProducts);
    // In real app, call API
    setSelectedProducts([]);
  };

  return (
    <SellerLayout>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">My Products</h1>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Link
              href="/dashboard/seller/products/add"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
            >
              <FiPlus size={16} />
              Add Product
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <FiUpload size={16} />
              Import
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
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
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 ${viewMode === "table" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              <FiList size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#FF6600] text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              <FiGrid size={18} />
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} product(s) selected
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
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Products count */}
        <p className="text-sm text-gray-500 mb-3">
          {filteredProducts.length} products found
        </p>

        {/* Table view */}
        {viewMode === "table" && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                  </th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">SKU</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Sales</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 relative bg-gray-100 rounded">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <span className="font-medium truncate max-w-[200px]">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{product.sku}</td>
                    <td className="p-3 text-gray-600">{product.category}</td>
                    <td className="p-3 font-medium">
                      ${product.priceMin.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          product.stock < 10 ? "text-red-600 font-medium" : ""
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{product.sales}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : product.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/dashboard/seller/products/edit/${product.id}`}
                          className="text-gray-500 hover:text-[#FF6600]"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button className="text-gray-500 hover:text-[#FF6600]">
                          <FiCopy size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-red-600">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-6 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid view */}
        {viewMode === "grid" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <ProductCardB2B product={product} />
                  {/* Quick edit overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/seller/products/edit/${product.id}`}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                      >
                        <FiEdit size={16} />
                      </Link>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                        <FiCopy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination (simplified) */}
        {filteredProducts.length > 0 && (
          <div className="flex justify-center mt-6">
            <nav className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50">
                Prev
              </button>
              <button className="px-3 py-1 bg-[#FF6600] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
