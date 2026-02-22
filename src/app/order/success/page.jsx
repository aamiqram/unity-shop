// app/order/success/page.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiDownload, FiShoppingBag } from "react-icons/fi";

// Mock order data – in a real app, this would come from an API or context
const mockOrder = {
  orderNumber: "ORD-2024-001234",
  orderDate: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  expectedDelivery: new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  totalAmount: 156.47,
  paymentMethod: "Credit Card",
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
};

export default function OrderSuccessPage() {
  const router = useRouter();

  // In a real app, you'd verify the order exists, else redirect
  useEffect(() => {
    // Simulate checking if order exists
    const hasOrder = true; // replace with actual check
    if (!hasOrder) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FiCheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. We've sent a confirmation email to your
            inbox.
          </p>
        </div>

        {/* Order details card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-mono font-semibold">{mockOrder.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order Date</p>
              <p>{mockOrder.orderDate}</p>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Expected Delivery</p>
                <p className="font-medium">{mockOrder.expectedDelivery}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{mockOrder.paymentMethod}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p className="font-medium">
                {mockOrder.shippingAddress.name}
                <br />
                {mockOrder.shippingAddress.line1}
                {mockOrder.shippingAddress.line2 &&
                  `, ${mockOrder.shippingAddress.line2}`}
                <br />
                {mockOrder.shippingAddress.city},{" "}
                {mockOrder.shippingAddress.state}{" "}
                {mockOrder.shippingAddress.zip}
                <br />
                {mockOrder.shippingAddress.country}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Items Ordered</p>
              <div className="space-y-3">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
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

            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <span className="font-semibold">Total Paid</span>
              <span className="text-xl font-bold text-[#FF6600]">
                ${mockOrder.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/orders/${mockOrder.orderNumber}/track`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00] transition"
          >
            <FiShoppingBag size={18} />
            Track Order
          </Link>
          <Link
            href={`/orders/${mockOrder.orderNumber}/invoice`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            <FiDownload size={18} />
            Download Invoice
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Continue Shopping
          </Link>
        </div>

        {/* What's next section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-sm font-bold">1</span>
              </div>
              <p className="text-sm font-medium">Order Confirmed</p>
              <p className="text-xs text-gray-500 mt-1">
                We've received your order
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-600 text-sm font-bold">2</span>
              </div>
              <p className="text-sm font-medium">Processing</p>
              <p className="text-xs text-gray-500 mt-1">
                Seller prepares your items
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-600 text-sm font-bold">3</span>
              </div>
              <p className="text-sm font-medium">Shipping</p>
              <p className="text-xs text-gray-500 mt-1">
                Estimated {mockOrder.expectedDelivery}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
