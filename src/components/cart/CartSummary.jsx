"use client";
import Link from "next/link";
import { FiShield } from "react-icons/fi";

export default function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  promoCode,
  setPromoCode,
  applyPromo,
}) {
  return (
    <div className="bg-white border rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-orange">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo code input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Promo Code</label>
        <div className="flex">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange"
          />
          <button
            onClick={applyPromo}
            className="bg-gray-800 text-white px-4 py-2 text-sm rounded-r hover:bg-gray-900"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Checkout button */}
      <Link
        href="/checkout"
        className="block w-full bg-orange text-white text-center py-3 rounded-lg font-semibold hover:bg-orange/90 mb-3"
      >
        Proceed to Checkout
      </Link>

      {/* Trust badges */}
      <div className="text-center text-xs text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <FiShield className="mr-1 text-green-600" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex justify-center space-x-2">
          <span className="px-2 py-1 bg-gray-100 rounded">Visa</span>
          <span className="px-2 py-1 bg-gray-100 rounded">Mastercard</span>
          <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
        </div>
        <p className="mt-2">
          <Link href="/" className="text-orange hover:underline">
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
