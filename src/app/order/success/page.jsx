import Link from "next/link";
import { FiCheckCircle, FiDownload, FiMail } from "react-icons/fi";

// Mock order data – in a real app, fetch from API using orderId
const mockOrder = {
  id: "ORD-123456",
  date: "March 15, 2025",
  expectedDelivery: "March 22, 2025",
  total: 128.77,
  paymentMethod: "Credit Card (**** 1234)",
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
      id: "p1",
      name: "Wireless Bluetooth Earbuds",
      quantity: 2,
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
    },
    {
      id: "p2",
      name: "Smart Watch Fitness Tracker",
      quantity: 1,
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    },
  ],
};

export default function OrderSuccessPage({ searchParams }) {
  // Get orderId from URL query parameter, fallback to mock ID
  const orderId = searchParams?.orderId || mockOrder.id;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <FiCheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600">
          Thank you for your order. We've sent a confirmation email to your
          inbox.
        </p>
      </div>

      {/* Order details card */}
      <div className="max-w-3xl mx-auto bg-white border rounded-lg overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Order number</span>
              <p className="font-mono font-bold text-lg">{orderId}</p>
            </div>
            <div className="flex space-x-2">
              <button className="border border-gray-300 px-4 py-2 rounded text-sm flex items-center hover:bg-gray-50">
                <FiDownload className="mr-2" /> Invoice
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded text-sm flex items-center hover:bg-gray-50">
                <FiMail className="mr-2" /> Email
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Order summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Order Date</h3>
              <p>{mockOrder.date}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Expected Delivery</h3>
              <p className="text-green-600 font-medium">
                {mockOrder.expectedDelivery}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <p>{mockOrder.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Total Amount</h3>
              <p className="text-orange font-bold text-xl">
                ${mockOrder.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Shipping address */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-700">
              {mockOrder.shippingAddress.name}
              <br />
              {mockOrder.shippingAddress.line1}
              {mockOrder.shippingAddress.line2 &&
                `, ${mockOrder.shippingAddress.line2}`}
              <br />
              {mockOrder.shippingAddress.city},{" "}
              {mockOrder.shippingAddress.state} {mockOrder.shippingAddress.zip}
              <br />
              {mockOrder.shippingAddress.country}
            </p>
          </div>

          {/* Items ordered */}
          <div>
            <h3 className="font-semibold mb-3">Items Ordered</h3>
            <div className="space-y-3">
              {mockOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What's next section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <div className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange font-bold">1</span>
                </div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-xs text-gray-500">
                  We've received your order
                </p>
              </div>
              <div className="p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-600 font-bold">2</span>
                </div>
                <p className="font-medium">Processing</p>
                <p className="text-xs text-gray-500">Preparing your items</p>
              </div>
              <div className="p-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-600 font-bold">3</span>
                </div>
                <p className="font-medium">Shipped</p>
                <p className="text-xs text-gray-500">On the way to you</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
            <Link
              href={`/orders/${orderId}/track`}
              className="bg-orange text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange/90"
            >
              Track Order
            </Link>
            <Link
              href="/"
              className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Rest of the component remains exactly the same as before... */}
        {/* ... (copy from your existing code) */}
      </div>
    </div>
  );
}
