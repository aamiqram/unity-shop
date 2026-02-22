// app/checkout/page.jsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";
import { useCheckout } from "@/context/CheckoutContext"; // optional
import { FiLock, FiShield } from "react-icons/fi";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Checkout data state (can also be managed via context)
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingInfo, setBillingInfo] = useState(null);
  const [estimatedDeliveryDate] = useState(() =>
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  );

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handlePlaceOrder = () => {
    // Here you would submit the order to your backend
    console.log("Order placed", {
      shippingInfo,
      paymentMethod,
      billingSameAsShipping,
      cartItems,
    });
  };

  // Calculate summary totals
  const shipping = 5.99;
  const tax = cartTotal * 0.1;
  const grandTotal = cartTotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

        <CheckoutSteps currentStep={currentStep} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main form area */}
          <div className="flex-1">
            {currentStep === 1 && (
              <ShippingForm
                onNext={handleNext}
                shippingInfo={shippingInfo}
                setShippingInfo={setShippingInfo}
              />
            )}
            {currentStep === 2 && (
              <PaymentForm
                onNext={handleNext}
                onBack={handleBack}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                billingSameAsShipping={billingSameAsShipping}
                setBillingSameAsShipping={setBillingSameAsShipping}
                billingInfo={billingInfo}
                setBillingInfo={setBillingInfo}
              />
            )}
            {currentStep === 3 && (
              <OrderReview
                shippingInfo={shippingInfo}
                paymentMethod={paymentMethod}
                billingSameAsShipping={billingSameAsShipping}
                onBack={handleBack}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>

          {/* Right sidebar summary */}
          <div className="lg:w-80">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 sticky top-24">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm mb-3">
                <div className="flex justify-between">
                  <span>Items ({cartItems.length})</span>
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
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-[#FF6600]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated delivery */}
              <div className="text-xs text-gray-500">
                Estimated delivery: {estimatedDeliveryDate}
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <FiLock className="text-green-600" size={14} />
                  Secure
                </div>
                <div className="flex items-center gap-1">
                  <FiShield className="text-blue-600" size={14} />
                  Protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
