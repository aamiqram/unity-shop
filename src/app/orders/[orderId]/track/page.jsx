// app/orders/[orderId]/track/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import OrderTimeline from "@/components/orders/OrderTimeline";
import TrackingDetails from "@/components/orders/TrackingDetails";
import { FiArrowLeft, FiMessageSquare } from "react-icons/fi";

// Mock order data – in a real app, fetch from API
const mockOrder = {
  id: "ORD-2024-001234",
  date: "February 22, 2025",
  status: "shipped", // order-placed, confirmed, processing, shipped, delivered
  trackingNumber: "1Z999AA10123456784",
  estimatedDelivery: "March 1, 2025",
  shippingAddress: {
    name: "John Doe",
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  items: [
    {
      id: 1,
      title: "Wireless Bluetooth Earbuds",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=100&auto=format",
      quantity: 2,
      price: 29.99,
    },
    {
      id: 2,
      title: "Stainless Steel Water Bottle",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&auto=format",
      quantity: 1,
      price: 19.99,
    },
  ],
  events: [
    {
      message: "Order placed",
      timestamp: "February 22, 2025 at 10:30 AM",
    },
    {
      message: "Order confirmed by seller",
      timestamp: "February 22, 2025 at 11:45 AM",
    },
    {
      message: "Processing at warehouse",
      timestamp: "February 23, 2025 at 9:20 AM",
    },
    {
      message: "Shipped from Shenzhen",
      timestamp: "February 24, 2025 at 3:15 PM",
    },
    {
      message: "Arrived at sorting facility (Hong Kong)",
      timestamp: "February 25, 2025 at 8:30 AM",
    },
    {
      message: "Departed facility",
      timestamp: "February 25, 2025 at 6:45 PM",
    },
  ],
};

export default function OrderTrackingPage() {
  const params = useParams();
  const { orderId } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // In a real app, you'd fetch by orderId
      setOrder(mockOrder);
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Order not found.</p>
        <Link
          href="/dashboard/orders"
          className="text-[#FF6600] hover:underline"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-1 text-gray-600 hover:text-[#FF6600] mb-4"
      >
        <FiArrowLeft size={16} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Track Order</h1>
          <p className="text-gray-600">
            Order #{order.id} • Placed on {order.date}
          </p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              order.status === "delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "shipped"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <OrderTimeline status={order.status} events={order.events} />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: order items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Items in this order</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover rounded w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact seller button */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Need help with this order?</h3>
            <button className="flex items-center gap-2 text-[#FF6600] hover:underline">
              <FiMessageSquare size={16} />
              Contact Seller
            </button>
          </div>
        </div>

        {/* Right column: tracking details */}
        <div className="lg:col-span-1">
          <TrackingDetails order={order} />
        </div>
      </div>
    </div>
  );
}
