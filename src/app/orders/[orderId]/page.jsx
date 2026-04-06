// app/orders/[orderId]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiTruck,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiCreditCard,
  FiMapPin,
  FiMessageSquare,
  FiStar,
  FiShoppingBag,
} from "react-icons/fi";

// Mock order data (would come from API)
const mockOrder = {
  id: "ORD-12345",
  date: "2025-02-15T14:30:00Z",
  status: "shipped", // order-placed, confirmed, processing, shipped, delivered
  timeline: [
    {
      status: "order-placed",
      label: "Order Placed",
      timestamp: "2025-02-15T14:30:00Z",
      completed: true,
    },
    {
      status: "confirmed",
      label: "Confirmed",
      timestamp: "2025-02-15T14:32:00Z",
      completed: true,
    },
    {
      status: "processing",
      label: "Processing",
      timestamp: "2025-02-15T16:00:00Z",
      completed: true,
    },
    {
      status: "shipped",
      label: "Shipped",
      timestamp: "2025-02-16T09:00:00Z",
      completed: true,
    },
    {
      status: "out-for-delivery",
      label: "Out for Delivery",
      timestamp: null,
      completed: false,
    },
    {
      status: "delivered",
      label: "Delivered",
      timestamp: null,
      completed: false,
    },
  ],
  products: [
    {
      id: 1,
      name: "Wireless Bluetooth Earbuds",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200&auto=format",
      variant: "Black",
      quantity: 2,
      price: 29.99,
      seller: "Shenzhen Tech Co.",
      sellerId: "shenzhen-tech",
    },
    {
      id: 2,
      name: "USB-C Charging Cable",
      image:
        "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=200&auto=format",
      variant: "2m",
      quantity: 1,
      price: 9.99,
      seller: "Shenzhen Tech Co.",
      sellerId: "shenzhen-tech",
    },
  ],
  shippingAddress: {
    name: "John Doe",
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    phone: "+1 234 567 890",
  },
  billingAddress: {
    name: "John Doe",
    line1: "123 Main St",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  shippingMethod: "Express Shipping",
  trackingNumber: "1Z999AA10123456784",
  estimatedDelivery: "2025-02-19",
  paymentMethod: "Visa ending in 4242",
  transactionId: "ch_123456789",
  paymentStatus: "paid",
  subtotal: 69.97,
  shipping: 5.99,
  tax: 7.0,
  discount: 5.0,
  total: 77.96,
  notes: "Please leave package at the front door.",
  sellerMessages: [
    {
      from: "seller",
      message: "Thank you for your order! We'll ship it soon.",
      timestamp: "2025-02-15T15:00:00Z",
    },
  ],
};

// Timeline icons mapping
const statusIcons = {
  "order-placed": FiCheckCircle,
  confirmed: FiCheckCircle,
  processing: FiPackage,
  shipped: FiTruck,
  "out-for-delivery": FiTruck,
  delivered: FiHome,
};

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setOrder({ ...mockOrder, id: orderId }); // use orderId from URL
      setLoading(false);
    }, 500);
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div>Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Link
          href="/dashboard/orders"
          className="text-[#FF6600] hover:underline mt-2 inline-block"
        >
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex =
    order.timeline.findIndex((step) => !step.completed) - 1;
  const statusColors = {
    "order-placed": "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm mb-4">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/dashboard" className="hover:text-[#FF6600]">
                Dashboard
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/dashboard/orders" className="hover:text-[#FF6600]">
                My Orders
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800">Order #{order.id}</li>
          </ol>
        </nav>

        {/* Back link (mobile) */}
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center text-gray-600 hover:text-[#FF6600] mb-4 lg:hidden"
        >
          <FiArrowLeft className="mr-1" /> Back to Orders
        </Link>

        {/* Order header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.date).toLocaleDateString()} at{" "}
                {new Date(order.date).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h2 className="font-semibold mb-3">Order Timeline</h2>
          <div className="relative flex items-center justify-between">
            {order.timeline.map((step, idx) => {
              const Icon = statusIcons[step.status] || FiClock;
              const isCompleted = step.completed;
              const isCurrent = idx === currentStepIndex + 1;
              return (
                <div
                  key={step.status}
                  className="flex flex-col items-center text-center w-20"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    } ${isCurrent ? "ring-2 ring-[#FF6600] ring-offset-2" : ""}`}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                  {step.timestamp && (
                    <span className="text-[10px] text-gray-400 mt-1">
                      {new Date(step.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Products ordered */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h2 className="font-semibold mb-3">Items Ordered</h2>
          <div className="space-y-3">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium hover:text-[#FF6600]"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    Variant: {product.variant}
                  </p>
                  <p className="text-xs text-gray-500">
                    Seller: {product.seller}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-xs font-semibold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery and Payment info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Delivery info */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold mb-3 flex items-center gap-1">
              <FiTruck className="text-[#FF6600]" /> Delivery Information
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Shipping Address</p>
                <p>
                  {order.shippingAddress.name}
                  <br />
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 && (
                    <>, {order.shippingAddress.line2}</>
                  )}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                  <br />
                  {order.shippingAddress.country}
                  <br />
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Shipping Method</p>
                <p>{order.shippingMethod}</p>
              </div>
              {order.trackingNumber && (
                <div>
                  <p className="text-xs text-gray-500">Tracking Number</p>
                  <p className="font-mono text-xs">{order.trackingNumber}</p>
                  <a
                    href="#"
                    className="text-xs text-[#FF6600] hover:underline"
                  >
                    Track Package
                  </a>
                </div>
              )}
              {order.estimatedDelivery && (
                <div>
                  <p className="text-xs text-gray-500">Estimated Delivery</p>
                  <p>
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold mb-3 flex items-center gap-1">
              <FiCreditCard className="text-[#FF6600]" /> Payment Information
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-mono text-xs">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Billing Address</p>
                <p>
                  {order.billingAddress.name}
                  <br />
                  {order.billingAddress.line1}
                  {order.billingAddress.line2 && (
                    <>, {order.billingAddress.line2}</>
                  )}
                  <br />
                  {order.billingAddress.city}, {order.billingAddress.state}{" "}
                  {order.billingAddress.zip}
                  <br />
                  {order.billingAddress.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-[#FF6600]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Order notes and messages */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <h2 className="font-semibold mb-3">Order Notes & Messages</h2>
          {order.notes && (
            <div className="mb-2">
              <p className="text-xs text-gray-500">Your note:</p>
              <p className="text-sm bg-gray-50 p-2 rounded">{order.notes}</p>
            </div>
          )}
          {order.sellerMessages.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Messages from seller:
              </p>
              {order.sellerMessages.map((msg, idx) => (
                <div key={idx} className="bg-blue-50 p-2 rounded mb-1 text-sm">
                  <span className="font-medium">Seller:</span> {msg.message}
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button className="mt-2 text-sm text-[#FF6600] hover:underline flex items-center gap-1">
            <FiMessageSquare size={14} /> Send message to seller
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]">
            Track Order
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Contact Seller
          </button>
          {order.status === "delivered" && (
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
              <FiStar size={14} /> Write Review
            </button>
          )}
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-1">
            <FiShoppingBag size={14} /> Buy Again
          </button>
          {order.status === "processing" && (
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50">
              Cancel Order
            </button>
          )}
        </div>

        {/* Related products */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">You may also need</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded p-2 text-center"
              >
                <div className="w-full h-20 bg-gray-100 mb-2"></div>
                <p className="text-xs font-medium">Product name</p>
                <p className="text-xs text-[#FF6600]">$19.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
