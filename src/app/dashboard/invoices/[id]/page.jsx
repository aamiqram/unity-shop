"use client";
import { useParams } from "next/navigation";
import { FiDownload, FiPrinter } from "react-icons/fi";

const mockInvoice = {
  id: "INV-2025-001",
  orderId: "ORD-123456",
  date: "March 15, 2025",
  dueDate: "March 29, 2025",
  seller: {
    name: "TechCorp Ltd.",
    address: "123 Tech Street, Shenzhen, China",
    taxId: "CN123456789",
  },
  buyer: {
    name: "John Doe",
    address: "123 Main St, New York, NY 10001",
    email: "john@example.com",
  },
  items: [
    { name: "Wireless Earbuds", quantity: 2, price: 29.99, total: 59.98 },
    { name: "Smart Watch", quantity: 1, price: 49.99, total: 49.99 },
  ],
  subtotal: 109.97,
  shipping: 10,
  tax: 8.8,
  total: 128.77,
};

export default function InvoicePage() {
  const params = useParams();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoice #{mockInvoice.id}</h1>
        <div className="space-x-2">
          <button className="border px-4 py-2 rounded-lg inline-flex items-center">
            <FiDownload className="mr-2" /> Download PDF
          </button>
          <button className="border px-4 py-2 rounded-lg inline-flex items-center">
            <FiPrinter className="mr-2" /> Print
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg border">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-orange">UNITY SHOP</h2>
            <p className="text-sm text-gray-500">Invoice #{mockInvoice.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Date: {mockInvoice.date}</p>
            <p className="text-sm">Due Date: {mockInvoice.dueDate}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">From:</h3>
            <p>{mockInvoice.seller.name}</p>
            <p className="text-sm text-gray-600">
              {mockInvoice.seller.address}
            </p>
            <p className="text-sm text-gray-600">
              Tax ID: {mockInvoice.seller.taxId}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">To:</h3>
            <p>{mockInvoice.buyer.name}</p>
            <p className="text-sm text-gray-600">{mockInvoice.buyer.address}</p>
            <p className="text-sm text-gray-600">{mockInvoice.buyer.email}</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Unit Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoice.items.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">${item.price.toFixed(2)}</td>
                <td className="text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${mockInvoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${mockInvoice.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${mockInvoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${mockInvoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
