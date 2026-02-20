"use client";
import { useState } from "react";
import Link from "next/link";
import { FiEdit2, FiCheck } from "react-icons/fi";

export default function OrderReview({
  shippingData,
  paymentData,
  cart,
  onBack,
  onPlaceOrder,
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

      {/* Shipping address review */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Shipping Address</h3>
          <button
            onClick={onBack}
            className="text-orange text-sm flex items-center"
          >
            <FiEdit2 className="mr-1" /> Edit
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <p className="font-medium">{shippingData?.name}</p>
          <p className="text-sm text-gray-600">{shippingData?.phone}</p>
          <p className="text-sm text-gray-600">
            {shippingData?.line1}
            {shippingData?.line2 && `, ${shippingData.line2}`}
            <br />
            {shippingData?.city}, {shippingData?.state} {shippingData?.zip}
            <br />
            {shippingData?.country}
          </p>
        </div>
      </div>

      {/* Payment method review */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Payment Method</h3>
          <button
            onClick={onBack}
            className="text-orange text-sm flex items-center"
          >
            <FiEdit2 className="mr-1" /> Edit
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          {paymentData?.method === "card" && (
            <>
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-gray-600">
                **** **** **** {paymentData.number?.slice(-4)}
                <br />
                Expires: {paymentData.expiry}
              </p>
            </>
          )}
          {paymentData?.method === "paypal" && <p>PayPal</p>}
          {paymentData?.method === "bank" && <p>Bank Transfer</p>}
          {paymentData?.method === "cod" && <p>Cash on Delivery</p>}
        </div>
      </div>

      {/* Items review */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Items</h3>
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded mr-3"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order totals */}
      <div className="bg-gray-50 p-4 rounded mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${cart.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${cart.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span className="text-orange">${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Terms & conditions */}
      <label className="flex items-start space-x-2 mb-6">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-1 accent-orange"
        />
        <span className="text-sm text-gray-600">
          I have read and agree to the{" "}
          <Link href="/terms" className="text-orange hover:underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-orange hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onPlaceOrder}
          disabled={!termsAccepted}
          className={`flex-1 py-3 rounded-lg font-semibold ${
            termsAccepted
              ? "bg-orange text-white hover:bg-orange/90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Place Order
        </button>
        <button
          onClick={onBack}
          className="border border-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      {/* Trust badge */}
      <div className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
        <FiCheck className="text-green-600 mr-1" /> Your order is secure and
        encrypted
      </div>
    </div>
  );
}
