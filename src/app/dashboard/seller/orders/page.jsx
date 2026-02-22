// app/dashboard/seller/orders/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SellerLayout from "@/components/seller/SellerLayout";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiPrinter,
  FiTruck,
  FiMessageSquare,
  FiX,
  FiChevronDown,
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-1001",
    date: "2025-02-22",
    customer: "John Smith",
    email: "john.smith@example.com",
    products: [
      {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        image:
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
        quantity: 2,
        price: 29.99,
      },
    ],
    total: 59.98,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    shippingMethod: "Standard",
    trackingNumber: "",
    shippingAddress: {
      name: "John Smith",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-1002",
    date: "2025-02-22",
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    products: [
      {
        id: 2,
        name: "Stainless Steel Water Bottle",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
        quantity: 1,
        price: 24.99,
      },
    ],
    total: 24.99,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    shippingMethod: "Express",
    trackingNumber: "1Z999AA10123456784",
    shippingAddress: {
      name: "Emma Wilson",
      line1: "456 Oak Ave",
      line2: "",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
  },
  {
    id: "ORD-1003",
    date: "2025-02-21",
    customer: "Michael Brown",
    email: "michael.b@example.com",
    products: [
      {
        id: 3,
        name: "Fitness Tracker Smart Watch",
        image:
          "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&auto=format",
        quantity: 1,
        price: 89.99,
      },
    ],
    total: 89.99,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    shippingMethod: "Standard",
    trackingNumber: "1Z999BB20234567890",
    shippingAddress: {
      name: "Michael Brown",
      line1: "789 Pine St",
      line2: "",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
    },
  },
  {
    id: "ORD-1004",
    date: "2025-02-21",
    customer: "Sarah Davis",
    email: "sarah.d@example.com",
    products: [
      {
        id: 4,
        name: "Yoga Mat",
        image:
          "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&auto=format",
        quantity: 2,
        price: 29.99,
      },
    ],
    total: 59.98,
    paymentStatus: "Pending",
    orderStatus: "Pending",
    shippingMethod: "Standard",
    trackingNumber: "",
    shippingAddress: {
      name: "Sarah Davis",
      line1: "321 Elm St",
      line2: "",
      city: "Houston",
      state: "TX",
      zip: "77001",
      country: "USA",
    },
  },
  {
    id: "ORD-1005",
    date: "2025-02-20",
    customer: "James Wilson",
    email: "james.w@example.com",
    products: [
      {
        id: 5,
        name: "Ceramic Coffee Mug Set",
        image:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&auto=format",
        quantity: 2,
        price: 34.99,
      },
    ],
    total: 69.98,
    paymentStatus: "Refunded",
    orderStatus: "Cancelled",
    shippingMethod: "Standard",
    trackingNumber: "",
    shippingAddress: {
      name: "James Wilson",
      line1: "654 Maple Dr",
      line2: "",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA",
    },
  },
  {
    id: "ORD-1006",
    date: "2025-02-20",
    customer: "Linda Taylor",
    email: "linda.t@example.com",
    products: [
      {
        id: 6,
        name: "LED Desk Lamp",
        image:
          "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=100&auto=format",
        quantity: 1,
        price: 42.5,
      },
    ],
    total: 42.5,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    shippingMethod: "Express",
    trackingNumber: "",
    shippingAddress: {
      name: "Linda Taylor",
      line1: "987 Cedar Rd",
      line2: "",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
    },
  },
];

const statusTabs = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
  { id: "returns", label: "Returns/Refunds" },
];

const orderStatusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Refunded: "bg-gray-100 text-gray-800",
};

const paymentStatusColors = {
  Paid: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Refunded: "bg-gray-100 text-gray-800",
};

export default function SellerOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [trackingInput, setTrackingInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter orders
  const filteredOrders = mockOrders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      order.orderStatus.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === "returns" && order.orderStatus === "Refunded");

    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesTab && matchesSearch;
  });

  // Stats
  const stats = {
    new: mockOrders.filter((o) => o.orderStatus === "Pending").length,
    processing: mockOrders.filter((o) => o.orderStatus === "Processing").length,
    shipped: mockOrders.filter((o) => o.orderStatus === "Shipped").length,
    completed: mockOrders.filter((o) => o.orderStatus === "Delivered").length,
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action) => {
    if (selectedOrders.length === 0) return;
    console.log(`Bulk ${action} on:`, selectedOrders);
    // In real app, call API
    setSelectedOrders([]);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    console.log(`Update order ${orderId} to ${newStatus}`);
    // API call
    setShowOrderModal(false);
  };

  const handleAddTracking = (orderId) => {
    console.log(`Add tracking ${trackingInput} to order ${orderId}`);
    // API call
    setShowOrderModal(false);
  };

  const handleExport = () => {
    // In real app, generate CSV
    console.log("Export orders");
  };

  return (
    <SellerLayout>
      <div>
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Orders</h1>
        <p className="text-gray-600 mb-6">Manage and fulfill customer orders</p>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">New Orders</p>
            <p className="text-2xl font-bold">{stats.new}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-2xl font-bold">{stats.processing}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Shipped</p>
            <p className="text-2xl font-bold">{stats.shipped}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
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
              placeholder="Search by order ID, customer, or product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
            >
              <option value="all">Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <FiDownload size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 space-x-1">
          {statusTabs.map((tab) => {
            const count = mockOrders.filter((o) =>
              tab.id === "all"
                ? true
                : o.orderStatus.toLowerCase() === tab.id.toLowerCase() ||
                  (tab.id === "returns" && o.orderStatus === "Refunded"),
            ).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#FF6600] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label} <span className="ml-1 text-xs">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Bulk actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-md mb-4 flex flex-wrap items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedOrders.length} order(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("process")}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Mark as Processing
              </button>
              <button
                onClick={() => handleBulkAction("ship")}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
              >
                Mark as Shipped
              </button>
              <button
                onClick={() => handleBulkAction("cancel")}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Orders table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                  />
                </th>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-[#FF6600] focus:ring-[#FF6600]"
                    />
                  </td>
                  <td className="p-3 font-mono text-xs">{order.id}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {order.products.map((p) => (
                        <div
                          key={p.id}
                          className="w-6 h-6 relative"
                          title={p.name}
                        >
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-medium">${order.total.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${paymentStatusColors[order.paymentStatus] || ""}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${orderStatusColors[order.orderStatus] || ""}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setViewingOrder(order);
                          setShowOrderModal(true);
                        }}
                        className="text-gray-500 hover:text-[#FF6600]"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-[#FF6600]"
                        title="Print Invoice"
                      >
                        <FiPrinter size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Order Detail Modal */}
        {showOrderModal && viewingOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowOrderModal(false)}
          >
            <div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Order Details - {viewingOrder.id}
                </h2>
                <button onClick={() => setShowOrderModal(false)}>
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Order summary */}
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p>{new Date(viewingOrder.date).toLocaleString()}</p>
                </div>

                {/* Status timeline (simplified) */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${orderStatusColors[viewingOrder.orderStatus]}`}
                    >
                      {viewingOrder.orderStatus === "Delivered" && (
                        <FiCheckCircle size={12} />
                      )}
                      {viewingOrder.orderStatus === "Shipped" && (
                        <FiTruck size={12} />
                      )}
                      {viewingOrder.orderStatus === "Processing" && (
                        <FiPackage size={12} />
                      )}
                      {viewingOrder.orderStatus === "Pending" && (
                        <FiClock size={12} />
                      )}
                      {viewingOrder.orderStatus === "Cancelled" && (
                        <FiXCircle size={12} />
                      )}
                      {viewingOrder.orderStatus}
                    </div>
                  </div>
                </div>

                {/* Customer info */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Customer Information
                  </p>
                  <p className="font-medium">{viewingOrder.customer}</p>
                  <p className="text-sm">{viewingOrder.email}</p>
                </div>

                {/* Shipping address */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                  <p className="text-sm">
                    {viewingOrder.shippingAddress.name}
                    <br />
                    {viewingOrder.shippingAddress.line1}
                    {viewingOrder.shippingAddress.line2 &&
                      `, ${viewingOrder.shippingAddress.line2}`}
                    <br />
                    {viewingOrder.shippingAddress.city},{" "}
                    {viewingOrder.shippingAddress.state}{" "}
                    {viewingOrder.shippingAddress.zip}
                    <br />
                    {viewingOrder.shippingAddress.country}
                  </p>
                </div>

                {/* Products */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Products</p>
                  <div className="space-y-2">
                    {viewingOrder.products.map((p) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <div className="w-10 h-10 relative bg-gray-100 rounded">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{p.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {p.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ${(p.price * p.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${viewingOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(viewingOrder.total + 5.99).toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${paymentStatusColors[viewingOrder.paymentStatus]}`}
                  >
                    {viewingOrder.paymentStatus}
                  </span>
                </div>

                {/* Shipping info */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
                  <p>{viewingOrder.shippingMethod}</p>
                  {viewingOrder.trackingNumber ? (
                    <div>
                      <p className="text-sm text-gray-500 mt-1">
                        Tracking Number
                      </p>
                      <p className="font-mono text-sm">
                        {viewingOrder.trackingNumber}
                      </p>
                      <a
                        href="#"
                        className="text-xs text-[#FF6600] hover:underline"
                        target="_blank"
                      >
                        Track with carrier
                      </a>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        Add Tracking Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          placeholder="Enter tracking #"
                          className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                        />
                        <button
                          onClick={() => handleAddTracking(viewingOrder.id)}
                          className="px-3 py-1 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order notes */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Order Notes
                  </label>
                  <textarea
                    placeholder="Add private note"
                    rows="2"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 pt-4 flex flex-wrap gap-2">
                  <select
                    onChange={(e) =>
                      handleUpdateStatus(viewingOrder.id, e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded text-sm"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Update Status
                    </option>
                    <option value="Processing">Mark as Processing</option>
                    <option value="Shipped">Mark as Shipped</option>
                    <option value="Delivered">Mark as Delivered</option>
                    <option value="Cancelled">Cancel Order</option>
                  </select>
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <FiPrinter size={14} /> Print Invoice
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <FiMessageSquare size={14} /> Contact Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
}
