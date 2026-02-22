// components/checkout/OrderReview.jsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const OrderReview = ({
  shippingInfo,
  paymentMethod,
  billingSameAsShipping,
  onBack,
  onPlaceOrder,
}) => {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const shipping = 5.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!termsAccepted) return;
    onPlaceOrder();
    // In real app, send order to backend
    // Then redirect to confirmation page
    router.push("/order/success");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

      {/* Order items summary */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Items ({cartItems.length})</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedVariant}`}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-5 text-gray-500">{item.quantity}x</span>
              <span className="flex-1 line-clamp-1">{item.title}</span>
              <span>${(item.priceMin * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping address */}
      <div className="mb-4">
        <h3 className="font-medium mb-1">Shipping Address</h3>
        <p className="text-sm text-gray-600">
          {shippingInfo.name}
          <br />
          {shippingInfo.addressLine1}
          {shippingInfo.addressLine2 && `, ${shippingInfo.addressLine2}`}
          <br />
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
          <br />
          {shippingInfo.country}
          <br />
          Phone: {shippingInfo.phone}
        </p>
        <button className="text-xs text-[#FF6600] mt-1 hover:underline">
          Edit
        </button>
      </div>

      {/* Payment method */}
      <div className="mb-4">
        <h3 className="font-medium mb-1">Payment Method</h3>
        <p className="text-sm text-gray-600">
          {paymentMethod === "card" && "Credit / Debit Card"}
          {paymentMethod === "paypal" && "PayPal"}
          {paymentMethod === "bank" && "Bank Transfer"}
          {paymentMethod === "cod" && "Cash on Delivery"}
        </p>
        <button className="text-xs text-[#FF6600] mt-1 hover:underline">
          Edit
        </button>
      </div>

      {/* Billing address */}
      <div className="mb-6">
        <h3 className="font-medium mb-1">Billing Address</h3>
        <p className="text-sm text-gray-600">
          {billingSameAsShipping
            ? "Same as shipping address"
            : "Separate billing address (not implemented in demo)"}
        </p>
        <button className="text-xs text-[#FF6600] mt-1 hover:underline">
          Edit
        </button>
      </div>

      {/* Order total breakdown */}
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base pt-2 border-t border-gray-200">
            <span>Grand Total</span>
            <span className="text-[#FF6600]">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Terms and conditions */}
      <div className="mt-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mr-2"
          />
          I agree to the{" "}
          <a href="/terms" className="text-[#FF6600] hover:underline mx-1">
            Terms and Conditions
          </a>
          and
          <a href="/privacy" className="text-[#FF6600] hover:underline mx-1">
            Privacy Policy
          </a>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handlePlaceOrder}
          disabled={!termsAccepted}
          className="px-8 py-3 bg-[#FF6600] text-white rounded-md font-medium hover:bg-[#e65c00] disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
