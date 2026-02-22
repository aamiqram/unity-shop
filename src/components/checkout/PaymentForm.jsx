// components/checkout/PaymentForm.jsx
"use client";

import { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const PaymentForm = ({
  onNext,
  onBack,
  paymentMethod,
  setPaymentMethod,
  billingSameAsShipping,
  setBillingSameAsShipping,
  billingInfo,
  setBillingInfo,
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholderName: "",
  });

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (!paymentMethod) return;
    if (paymentMethod === "card") {
      // Basic validation
      if (
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvv ||
        !cardDetails.cardholderName
      )
        return;
    }
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

      {/* Payment options */}
      <div className="space-y-3 mb-6">
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            paymentMethod === "card"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => handlePaymentMethodChange("card")}
            className="mr-3"
          />
          <div className="flex items-center gap-2">
            <FaCcVisa size={24} />
            <FaCcMastercard size={24} />
            <span className="text-sm font-medium">Credit / Debit Card</span>
          </div>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            paymentMethod === "paypal"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => handlePaymentMethodChange("paypal")}
            className="mr-3"
          />
          <div className="flex items-center gap-2">
            <FaCcPaypal size={24} />
            <span className="text-sm font-medium">PayPal</span>
          </div>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            paymentMethod === "bank"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => handlePaymentMethodChange("bank")}
            className="mr-3"
          />
          <span className="text-sm font-medium">Bank Transfer</span>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            paymentMethod === "cod"
              ? "border-[#FF6600] bg-orange-50"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => handlePaymentMethodChange("cod")}
            className="mr-3"
          />
          <span className="text-sm font-medium">Cash on Delivery</span>
        </label>
      </div>

      {/* Card details form */}
      {paymentMethod === "card" && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-3">Card Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardholderName"
                value={cardDetails.cardholderName}
                onChange={handleCardChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> Save card for future
              purchases
            </label>
          </div>
        </div>
      )}

      {/* Billing address */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Billing Address</h3>
        <label className="flex items-center text-sm mb-3">
          <input
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(e) => setBillingSameAsShipping(e.target.checked)}
            className="mr-2"
          />
          Same as shipping address
        </label>

        {!billingSameAsShipping && (
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Enter billing address</p>
            {/* Simplified billing form – you can reuse fields from ShippingForm if needed */}
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!paymentMethod}
          className="px-6 py-3 bg-[#FF6600] text-white rounded-md font-medium hover:bg-[#e65c00] disabled:opacity-50"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
