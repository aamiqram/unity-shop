"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiMessageSquare,
  FiAlertCircle,
  FiDownload,
} from "react-icons/fi";

// Mock order data – in a real app, fetch from API using orderId
const mockOrder = {
  id: "ORD-123456",
  date: "March 15, 2025",
  status: "Delivered",
  paymentMethod: "Credit Card (**** 1234)",
  total: 128.77,
  subtotal: 109.97,
  shipping: 10.0,
  tax: 8.8,
  trackingNumber: "DHL1234567890",
  carrier: "DHL",
  estimatedDelivery: "March 22, 2025",
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
  items: [
    {
      id: "p1",
      name: "Wireless Bluetooth Earbuds",
      variant: "Color: Black",
      quantity: 2,
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
      seller: "TechCorp Ltd.",
      sellerId: "s1",
    },
    {
      id: "p2",
      name: "Smart Watch Fitness Tracker",
      variant: "Size: M",
      quantity: 1,
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
      seller: "TechCorp Ltd.",
      sellerId: "s1",
    },
  ],
  timeline: [
    { date: "Mar 15, 2025 10:30 AM", status: "Order placed" },
    { date: "Mar 16, 2025 09:20 AM", status: "Confirmed by seller" },
    { date: "Mar 17, 2025 02:15 PM", status: "Shipped" },
    { date: "Mar 20, 2025 11:30 AM", status: "Out for delivery" },
    { date: "Mar 20, 2025 03:45 PM", status: "Delivered" },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId;

  // In a real app, you'd fetch the order data using orderId
  const order = mockOrder;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange">
          Home
        </Link>{" "}
        &gt;
        <Link href="/dashboard/orders" className="hover:text-orange ml-1">
          My Orders
        </Link>{" "}
        &gt;
        <span className="text-gray-800 ml-1">Order #{orderId}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-2/3">
          {/* Order header */}
          <div className="bg-white p-6 rounded-lg border mb-6">
            <div className="flex flex-wrap justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">Order #{orderId}</h1>
                <p className="text-gray-500 mt-1">Placed on {order.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || "bg-gray-100"}`}
                >
                  {order.status}
                </span>
                <Link
                  href={`/orders/${orderId}/track`}
                  className="border border-orange text-orange px-4 py-2 rounded-lg text-sm hover:bg-orange/10"
                >
                  Track Order
                </Link>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-white p-6 rounded-lg border mb-6">
            <h2 className="text-lg font-semibold mb-4">Items in this order</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b pb-4 last:border-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="font-medium hover:text-orange"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="text-sm text-gray-500">{item.variant}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Sold by: {item.seller}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order timeline */}
          <div className="bg-white p-6 rounded-lg border mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
            <div className="space-y-3">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">{event.status}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-6">
          {/* Order summary */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span className="text-orange">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping information */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center mb-3">
              <FiMapPin className="text-orange mr-2" />
              <h3 className="font-semibold">Shipping Address</h3>
            </div>
            <p className="text-sm">
              {order.shippingAddress.name}
              <br />
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 &&
                `, ${order.shippingAddress.line2}`}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
              <br />
              {order.shippingAddress.country}
              <br />
              Phone: {order.shippingAddress.phone}
            </p>
            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Tracking</p>
                <p className="text-sm">
                  {order.carrier}: {order.trackingNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Est. delivery: {order.estimatedDelivery}
                </p>
              </div>
            )}
          </div>

          {/* Payment method */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center mb-3">
              <FiCreditCard className="text-orange mr-2" />
              <h3 className="font-semibold">Payment Method</h3>
            </div>
            <p className="text-sm">{order.paymentMethod}</p>
            <p className="text-sm text-gray-500 mt-1">
              Billing address same as shipping
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg border space-y-3">
            <button className="w-full bg-orange text-white py-2 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="mr-2" /> Contact Seller
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center">
              <FiDownload className="mr-2" /> Download Invoice
            </button>
            <Link
              href={`/orders/${orderId}/dispute`}
              className="w-full border border-red-300 text-red-600 py-2 rounded-lg flex items-center justify-center hover:bg-red-50"
            >
              <FiAlertCircle className="mr-2" /> Open Dispute
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
