// components/invoices/InvoiceTemplate.jsx
import React from "react";
import { formatCurrency } from "@/lib/invoiceData";

const InvoiceTemplate = ({ invoice }) => {
  if (!invoice) return null;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#FF6600]">UNITY SHOP</h1>
          <p className="text-sm text-gray-500">Invoice</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{invoice.id}</p>
          <p className="text-sm text-gray-500">Date: {invoice.orderDate}</p>
          <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
        </div>
      </div>

      {/* Seller & Buyer */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-1">From:</h3>
          <p className="font-medium">{invoice.seller.name}</p>
          <p className="text-sm text-gray-600">{invoice.seller.address}</p>
          <p className="text-sm text-gray-600">
            Tax ID: {invoice.seller.taxId}
          </p>
          <p className="text-sm text-gray-600">{invoice.seller.email}</p>
          <p className="text-sm text-gray-600">{invoice.seller.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">To:</h3>
          <p className="font-medium">{invoice.buyer.name}</p>
          <p className="text-sm text-gray-600">{invoice.buyer.address}</p>
          <p className="text-sm text-gray-600">{invoice.buyer.email}</p>
        </div>
      </div>

      {/* Items table */}
      <table className="w-full mb-8">
        <thead className="bg-gray-50 border-y border-gray-200">
          <tr>
            <th className="py-2 text-left text-sm font-medium">Item</th>
            <th className="py-2 text-left text-sm font-medium">SKU</th>
            <th className="py-2 text-right text-sm font-medium">Qty</th>
            <th className="py-2 text-right text-sm font-medium">Unit Price</th>
            <th className="py-2 text-right text-sm font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx} className="border-b border-gray-100">
              <td className="py-2 text-sm">{item.name}</td>
              <td className="py-2 text-sm">{item.sku}</td>
              <td className="py-2 text-sm text-right">{item.quantity}</td>
              <td className="py-2 text-sm text-right">
                {formatCurrency(item.unitPrice)}
              </td>
              <td className="py-2 text-sm text-right">
                {formatCurrency(item.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-1">
            <span className="text-sm">Subtotal</span>
            <span className="text-sm">{formatCurrency(invoice.subtotal)}</span>
          </div>
          {invoice.discount > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm">Discount</span>
              <span className="text-sm">
                -{formatCurrency(invoice.discount)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-sm">Shipping</span>
            <span className="text-sm">{formatCurrency(invoice.shipping)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-sm">Tax</span>
            <span className="text-sm">{formatCurrency(invoice.tax)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold border-t border-gray-200">
            <span>Total</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Payment info */}
      <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
        <p>Payment Method: {invoice.paymentMethod}</p>
        {invoice.paymentDate && <p>Payment Date: {invoice.paymentDate}</p>}
        <p>
          Status:{" "}
          <span
            className={`capitalize ${invoice.status === "paid" ? "text-green-600" : "text-orange-600"}`}
          >
            {invoice.status}
          </span>
        </p>
        {invoice.notes && <p className="mt-2">Notes: {invoice.notes}</p>}
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs text-center text-gray-400">
        This is a computer-generated invoice. No signature required.
      </div>
    </div>
  );
};

export default InvoiceTemplate;
