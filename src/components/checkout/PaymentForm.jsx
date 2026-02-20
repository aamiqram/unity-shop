"use client";
import { useState } from "react";

export default function PaymentForm({ onSubmit, onBack, initialData }) {
  const [method, setMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    saveCard: false,
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ method, ...cardData, billingSameAsShipping });
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Payment options */}
        <div className="space-y-2">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-gray-400">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
              className="mr-3 accent-orange"
            />
            <span className="font-medium">Credit / Debit Card</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-gray-400">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
              className="mr-3 accent-orange"
            />
            <span className="font-medium">PayPal</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-gray-400">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={method === "bank"}
              onChange={() => setMethod("bank")}
              className="mr-3 accent-orange"
            />
            <span className="font-medium">Bank Transfer</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-gray-400">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
              className="mr-3 accent-orange"
            />
            <span className="font-medium">Cash on Delivery</span>
          </label>
        </div>

        {/* Card details (only if card selected) */}
        {method === "card" && (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number *
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) =>
                  setCardData({ ...cardData, number: e.target.value })
                }
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({ ...cardData, expiry: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVC *</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardData.cvc}
                  onChange={(e) =>
                    setCardData({ ...cardData, cvc: e.target.value })
                  }
                  required
                  className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Cardholder Name *
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardData.name}
                onChange={(e) =>
                  setCardData({ ...cardData, name: e.target.value })
                }
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={cardData.saveCard}
                onChange={(e) =>
                  setCardData({ ...cardData, saveCard: e.target.checked })
                }
                className="accent-orange"
              />
              <span className="text-sm">Save card for future purchases</span>
            </label>
          </div>
        )}

        {/* Billing address */}
        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold mb-2">Billing Address</h3>
          <label className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              className="accent-orange"
            />
            <span className="text-sm">Same as shipping address</span>
          </label>
          {!billingSameAsShipping && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                (Billing address form would go here)
              </p>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="bg-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange/90"
          >
            Continue to Review
          </button>
          <button
            type="button"
            onClick={onBack}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
