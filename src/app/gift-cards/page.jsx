// app/gift-cards/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiGift,
  FiCheckCircle,
  FiCalendar,
  FiMail,
  FiPrinter,
} from "react-icons/fi";

// Gift card design templates
const designs = [
  {
    id: "birthday",
    name: "Birthday",
    image: "/gift-birthday.jpg",
    color: "bg-pink-100",
  },
  {
    id: "holiday",
    name: "Holiday",
    image: "/gift-holiday.jpg",
    color: "bg-red-100",
  },
  {
    id: "thankyou",
    name: "Thank You",
    image: "/gift-thanks.jpg",
    color: "bg-blue-100",
  },
  {
    id: "congrats",
    name: "Congratulations",
    image: "/gift-congrats.jpg",
    color: "bg-green-100",
  },
  {
    id: "generic",
    name: "Generic",
    image: "/gift-generic.jpg",
    color: "bg-gray-100",
  },
];

// Preset amounts
const presetAmounts = [25, 50, 100, 200];

export default function GiftCardsPage() {
  // Purchase form state
  const [selectedDesign, setSelectedDesign] = useState(designs[0].id);
  const [customAmount, setCustomAmount] = useState("");
  const [amount, setAmount] = useState(50);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [deliveryDate, setDeliveryDate] = useState("now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  });
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Redemption / balance check state
  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [balanceResult, setBalanceResult] = useState(null);
  const [balanceError, setBalanceError] = useState("");

  const handlePresetAmount = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(val) && Number(val) >= 10 && Number(val) <= 500) {
      setAmount(Number(val));
    }
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    // Validate
    if (
      !recipientName ||
      (deliveryMethod === "email" && !recipientEmail) ||
      (deliveryMethod === "physical" && !physicalAddress.addressLine1)
    ) {
      alert("Please fill in all required fields");
      return;
    }
    // Simulate purchase
    console.log("Purchasing gift card:", {
      selectedDesign,
      amount,
      recipientName,
      recipientEmail,
      message,
      deliveryMethod,
      deliveryDate,
      scheduledDate,
      physicalAddress,
    });
    setPurchaseSuccess(true);
    setTimeout(() => setPurchaseSuccess(false), 3000);
  };

  const handleCheckBalance = () => {
    if (!cardNumber) {
      setBalanceError("Please enter a card number");
      return;
    }
    // Simulate balance check
    if (cardNumber === "1234567890123456") {
      setBalanceResult({ balance: 75.5, expiry: "2026-12-31" });
      setBalanceError("");
    } else {
      setBalanceError("Invalid card number or PIN");
      setBalanceResult(null);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Gift Cards
        </h1>
        <p className="text-center text-gray-600 mb-8">
          The perfect gift for any occasion
        </p>

        {/* Purchase section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Buy a Gift Card</h2>

          {purchaseSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <FiCheckCircle className="inline mr-2" /> Gift card purchased
              successfully! Check your email.
            </div>
          )}

          <form onSubmit={handlePurchase}>
            {/* Design selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose a design
              </label>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {designs.map((design) => (
                  <div
                    key={design.id}
                    onClick={() => setSelectedDesign(design.id)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer border-2 ${
                      selectedDesign === design.id
                        ? "border-[#FF6600] ring-2 ring-[#FF6600] ring-opacity-50"
                        : "border-gray-200"
                    } ${design.color} flex items-center justify-center text-xs text-center p-1`}
                  >
                    {design.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Amount selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select amount (min $10, max $500)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetAmount(amt)}
                    className={`px-4 py-2 border rounded-md ${
                      amount === amt && !customAmount
                        ? "bg-[#FF6600] text-white border-[#FF6600]"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">or</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmount}
                  min="10"
                  max="500"
                  className="border border-gray-300 rounded px-3 py-2 text-sm w-32"
                />
              </div>
            </div>

            {/* Personalization */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient's name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient's email (for email delivery)
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal message (max 200 characters)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength="200"
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Write a personal message..."
              />
            </div>

            {/* Delivery method */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery method
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="email"
                    checked={deliveryMethod === "email"}
                    onChange={() => setDeliveryMethod("email")}
                    className="mr-2"
                  />
                  <FiMail className="mr-1" /> Email
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="print"
                    checked={deliveryMethod === "print"}
                    onChange={() => setDeliveryMethod("print")}
                    className="mr-2"
                  />
                  <FiPrinter className="mr-1" /> Print at home
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="delivery"
                    value="physical"
                    checked={deliveryMethod === "physical"}
                    onChange={() => setDeliveryMethod("physical")}
                    className="mr-2"
                  />
                  Physical card (+$2.99 shipping)
                </label>
              </div>
            </div>

            {/* Delivery date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery date
              </label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryDate"
                    value="now"
                    checked={deliveryDate === "now"}
                    onChange={() => setDeliveryDate("now")}
                    className="mr-2"
                  />
                  Send immediately
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryDate"
                    value="schedule"
                    checked={deliveryDate === "schedule"}
                    onChange={() => setDeliveryDate("schedule")}
                    className="mr-2"
                  />
                  Schedule for later
                </label>
              </div>
              {deliveryDate === "schedule" && (
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-2 border border-gray-300 rounded px-3 py-2 text-sm"
                  min={new Date().toISOString().split("T")[0]}
                />
              )}
            </div>

            {/* Physical address (if physical) */}
            {deliveryMethod === "physical" && (
              <div className="border border-gray-200 rounded p-4 mb-4">
                <h3 className="font-medium mb-2">Shipping address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={physicalAddress.name}
                    onChange={(e) =>
                      setPhysicalAddress({
                        ...physicalAddress,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address line 1"
                    value={physicalAddress.addressLine1}
                    onChange={(e) =>
                      setPhysicalAddress({
                        ...physicalAddress,
                        addressLine1: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address line 2 (optional)"
                    value={physicalAddress.addressLine2}
                    onChange={(e) =>
                      setPhysicalAddress({
                        ...physicalAddress,
                        addressLine2: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={physicalAddress.city}
                      onChange={(e) =>
                        setPhysicalAddress({
                          ...physicalAddress,
                          city: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={physicalAddress.state}
                      onChange={(e) =>
                        setPhysicalAddress({
                          ...physicalAddress,
                          state: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="ZIP code"
                      value={physicalAddress.zip}
                      onChange={(e) =>
                        setPhysicalAddress({
                          ...physicalAddress,
                          zip: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <select
                      value={physicalAddress.country}
                      onChange={(e) =>
                        setPhysicalAddress({
                          ...physicalAddress,
                          country: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option>USA</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Summary and purchase button */}
            <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-lg font-semibold">
                  Total: ${amount + (deliveryMethod === "physical" ? 2.99 : 0)}
                </p>
                <p className="text-xs text-gray-500">
                  Gift card amount: ${amount}{" "}
                  {deliveryMethod === "physical" && "+ $2.99 shipping"}
                </p>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
              >
                Buy Gift Card
              </button>
            </div>
          </form>
        </div>

        {/* Redemption section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Have a gift card? Check balance or redeem
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="16-digit number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
              />
              <label className="block text-sm font-medium mb-1">
                PIN (optional)
              </label>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
              />
              <button
                onClick={handleCheckBalance}
                className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
              >
                Check Balance
              </button>
              {balanceError && (
                <p className="text-red-500 text-xs mt-2">{balanceError}</p>
              )}
              {balanceResult && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="font-medium">
                    Balance: ${balanceResult.balance}
                  </p>
                  <p className="text-xs text-gray-600">
                    Expires: {balanceResult.expiry}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">
                To redeem a gift card during checkout:
              </p>
              <ol className="list-decimal list-inside text-xs mt-2 space-y-1">
                <li>Add items to your cart</li>
                <li>Proceed to checkout</li>
                <li>Enter your gift card number in the payment section</li>
                <li>The amount will be applied to your order</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Terms & FAQ */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">Gift Card Terms</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Valid for 2 years from date of purchase</li>
            <li>No fees – the full amount remains until used</li>
            <li>Non-refundable and not redeemable for cash</li>
            <li>Can be combined with promotions and other gift cards</li>
            <li>
              Lost or stolen cards cannot be replaced without proof of purchase
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I use multiple gift cards on one order?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Yes, you can apply up to 3 gift cards per order.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                What if I lose my gift card?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Please contact support with your order number and proof of
                purchase. We may be able to reissue it.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I reload a gift card?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Currently, gift cards cannot be reloaded. You can purchase a new
                one.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Do gift cards expire?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Gift cards expire 2 years after purchase. The expiry date is
                printed on the card.
              </p>
            </details>
          </div>
        </div>

        {/* Bulk orders */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Corporate Gifting</h2>
          <p className="mb-4">
            Order 10+ cards and get special discounts, custom branding, and
            dedicated support.
          </p>
          <Link
            href="/contact?subject=bulk-gift-cards"
            className="inline-block bg-white text-purple-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
          >
            Contact for bulk pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
