"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import OrderTimeline from "@/components/orders/OrderTimeline";
import TrackingDetails from "@/components/orders/TrackingDetails";

// Mock order tracking data
const mockTracking = {
  orderId: "ORD-123456",
  orderDate: "March 15, 2025",
  status: "in_transit", // order_placed, confirmed, processing, shipped, out_for_delivery, delivered
  estimatedDelivery: "March 22, 2025",
  timeline: [
    {
      stage: "order_placed",
      status: "completed",
      timestamp: "March 15, 2025 10:30 AM",
      location: "Online",
      description: "Order placed successfully",
    },
    {
      stage: "confirmed",
      status: "completed",
      timestamp: "March 15, 2025 11:45 AM",
      location: "Warehouse",
      description: "Order confirmed by seller",
    },
    {
      stage: "processing",
      status: "completed",
      timestamp: "March 16, 2025 09:20 AM",
      location: "Fulfillment Center, Shenzhen",
      description: "Order is being processed",
    },
    {
      stage: "shipped",
      status: "completed",
      timestamp: "March 17, 2025 02:15 PM",
      location: "Shenzhen, China",
      description: "Package shipped via DHL",
    },
    {
      stage: "in_transit",
      status: "current",
      timestamp: "March 18, 2025 08:30 AM",
      location: "Hong Kong Hub",
      description: "Package in transit to destination",
    },
    {
      stage: "out_for_delivery",
      status: "pending",
      timestamp: null,
      location: null,
      description: "Package will be out for delivery soon",
    },
    {
      stage: "delivered",
      status: "pending",
      timestamp: null,
      location: null,
      description: "Package delivered to recipient",
    },
  ],
  trackingNumber: "DHL1234567890",
  carrier: "DHL",
  trackingUrl: "https://www.dhl.com/tracking",
  recipientAddress: {
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
      name: "Wireless Bluetooth Earbuds",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
    },
    {
      name: "Smart Watch Fitness Tracker",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    },
  ],
};

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId;

  // In real app, fetch tracking data based on orderId

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/">Home</Link> &gt;{" "}
        <Link href="/dashboard/orders">My Orders</Link> &gt;{" "}
        <span className="text-gray-800">Track Order</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main tracking area */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Track Order</h1>
              <span className="bg-orange/10 text-orange px-3 py-1 rounded-full text-sm font-medium">
                {mockTracking.status.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Order #{orderId} · Placed on {mockTracking.orderDate}
            </p>

            {/* Progress timeline */}
            <OrderTimeline timeline={mockTracking.timeline} />

            {/* Estimated delivery */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Estimated delivery:{" "}
                <span className="font-bold">
                  {mockTracking.estimatedDelivery}
                </span>
              </p>
            </div>

            {/* Tracking number with link */}
            {mockTracking.trackingNumber && (
              <div className="mt-4 flex items-center">
                <span className="text-sm text-gray-600">
                  Tracking #: {mockTracking.trackingNumber}
                </span>
                <a
                  href={mockTracking.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-orange text-sm hover:underline"
                >
                  Track on {mockTracking.carrier} website →
                </a>
              </div>
            )}
          </div>

          {/* Map placeholder (optional) */}
          <div className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-3">Shipment Map</h3>
            <div className="h-48 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              Map visualization would appear here (integrate with Google Maps or
              similar)
            </div>
          </div>

          {/* Shipping updates timeline (detailed) */}
          <div className="mt-6 bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-3">Shipping Updates</h3>
            <div className="space-y-3">
              {mockTracking.timeline
                .filter((t) => t.status !== "pending")
                .map((update, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-medium">{update.description}</p>
                      <p className="text-xs text-gray-500">
                        {update.timestamp} · {update.location}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:w-1/3">
          <TrackingDetails
            address={mockTracking.recipientAddress}
            items={mockTracking.items}
          />
        </div>
      </div>
    </div>
  );
}
