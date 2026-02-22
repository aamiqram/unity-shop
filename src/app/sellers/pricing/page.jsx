// app/sellers/pricing/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiX,
  FiPercent,
  FiUsers,
  FiAward,
  FiClock,
  FiStar,
} from "react-icons/fi";

export default function SellerPricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" or "annual"
  const [calculatorInput, setCalculatorInput] = useState(5000); // monthly sales
  const [showCalculator, setShowCalculator] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: { monthly: 0, annual: 0 },
      commission: "8%",
      products: 25,
      analytics: "Basic",
      support: "Email",
      promotedListings: 0,
      customUrl: false,
      bulkUpload: false,
      api: false,
      accountManager: false,
      badge: null,
    },
    {
      name: "Professional",
      price: { monthly: 29, annual: 278 }, // 278/12 = 23.17, saves 20%
      commission: "5%",
      products: 500,
      analytics: "Advanced",
      support: "Priority",
      promotedListings: 5,
      customUrl: true,
      bulkUpload: true,
      api: true,
      accountManager: false,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: { monthly: 99, annual: 950 }, // 950/12 = 79.17, saves 20%
      commission: "3%",
      products: "Unlimited",
      analytics: "Advanced + API",
      support: "24/7 Phone",
      promotedListings: 20,
      customUrl: true,
      bulkUpload: true,
      api: true,
      accountManager: true,
      badge: null,
    },
  ];

  const features = [
    { key: "commission", label: "Commission per sale" },
    { key: "products", label: "Max products" },
    { key: "analytics", label: "Analytics" },
    { key: "support", label: "Support" },
    { key: "promotedListings", label: "Promoted listings/month" },
    { key: "customUrl", label: "Custom store URL" },
    { key: "bulkUpload", label: "Bulk upload tools" },
    { key: "api", label: "API access" },
    { key: "accountManager", label: "Dedicated account manager" },
  ];

  // Calculator: show savings based on monthly sales
  const calculateSavings = () => {
    const basicCommission = calculatorInput * 0.08;
    const proCommission = calculatorInput * 0.05;
    const enterpriseCommission = calculatorInput * 0.03;
    const basicTotal = basicCommission;
    const proTotal = proCommission + (billingCycle === "annual" ? 23.17 : 29);
    const enterpriseTotal =
      enterpriseCommission + (billingCycle === "annual" ? 79.17 : 99);
    return {
      basic: basicTotal.toFixed(2),
      pro: proTotal.toFixed(2),
      enterprise: enterpriseTotal.toFixed(2),
      savings: (basicTotal - proTotal).toFixed(2),
    };
  };

  const savings = calculateSavings();

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Seller Subscription Plans
          </h1>
          <p className="text-gray-600">
            Choose the plan that fits your business. All plans include access to
            millions of buyers.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full inline-flex border border-gray-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === "monthly"
                  ? "bg-[#FF6600] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                billingCycle === "annual"
                  ? "bg-[#FF6600] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Annual <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md border relative ${
                plan.badge
                  ? "border-[#FF6600] ring-2 ring-[#FF6600] ring-opacity-20"
                  : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6600] text-white text-xs px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    $
                    {billingCycle === "monthly"
                      ? plan.price.monthly
                      : plan.price.annual}
                  </span>
                  <span className="text-gray-500 text-sm">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                  {billingCycle === "annual" && plan.price.annual > 0 && (
                    <p className="text-xs text-green-600 mt-1">Save 20%</p>
                  )}
                </div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-0.5" size={16} />
                    <span>{plan.commission} commission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-0.5" size={16} />
                    <span>Up to {plan.products} products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-0.5" size={16} />
                    <span>{plan.analytics} analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheck className="text-green-500 mt-0.5" size={16} />
                    <span>{plan.support} support</span>
                  </li>
                  {plan.promotedListings > 0 && (
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-green-500 mt-0.5" size={16} />
                      <span>{plan.promotedListings} promoted listings/mo</span>
                    </li>
                  )}
                  {plan.customUrl && (
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-green-500 mt-0.5" size={16} />
                      <span>Custom store URL</span>
                    </li>
                  )}
                </ul>
                <Link
                  href={
                    plan.price.monthly === 0
                      ? "/register?seller=basic"
                      : "/register?seller=pro"
                  }
                  className={`block text-center py-2 px-4 rounded-md font-medium ${
                    plan.badge
                      ? "bg-[#FF6600] text-white hover:bg-[#e65c00]"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.price.monthly === 0 ? "Start Free" : "Choose Plan"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4">Compare Features</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center py-2">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat) => (
                <tr key={feat.key} className="border-b border-gray-100">
                  <td className="py-2">{feat.label}</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="text-center py-2">
                      {typeof plan[feat.key] === "boolean" ? (
                        plan[feat.key] ? (
                          <FiCheck
                            className="inline text-green-500"
                            size={16}
                          />
                        ) : (
                          <FiX className="inline text-red-400" size={16} />
                        )
                      ) : (
                        plan[feat.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculator */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-4">Calculate Your Savings</h2>
          <p className="text-sm text-gray-600 mb-4">
            Compare total monthly costs including commission and subscription
            fee.
          </p>
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Your estimated monthly sales ($)
              </label>
              <input
                type="number"
                value={calculatorInput}
                onChange={(e) => setCalculatorInput(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2"
                min="0"
                step="100"
              />
            </div>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Calculate
            </button>
          </div>
          {showCalculator && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm">
                With ${calculatorInput} in monthly sales:
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div>
                  <p className="text-xs text-gray-500">Basic</p>
                  <p className="font-bold">${savings.basic}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Professional</p>
                  <p className="font-bold">${savings.pro}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Enterprise</p>
                  <p className="font-bold">${savings.enterprise}</p>
                </div>
              </div>
              {Number(savings.savings) > 0 && (
                <p className="text-green-600 text-sm mt-2">
                  You could save ${savings.savings} per month with Professional!
                </p>
              )}
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I change plans later?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Yes, you can upgrade or downgrade at any time. Changes take
                effect at the start of the next billing cycle.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                What happens if I exceed my product limit?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                You'll be notified and given 30 days to upgrade or remove
                products. After that, you may be automatically upgraded.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Are there setup fees?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                No setup fees for any plan.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                What payment methods are accepted?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                We accept all major credit cards and PayPal. Annual plans can
                also be paid via bank transfer.
              </p>
            </details>
            <details className="border-b border-gray-100 pb-2">
              <summary className="font-medium cursor-pointer">
                Can I cancel anytime?
              </summary>
              <p className="text-sm text-gray-600 mt-1">
                Yes, you can cancel your subscription at any time. You'll retain
                access until the end of your billing period.
              </p>
            </details>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            What Sellers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <FiStar className="text-yellow-400 mb-2" size={20} />
              <p className="text-sm text-gray-600 italic">
                "The Professional plan paid for itself in the first month with
                the lower commission rate."
              </p>
              <p className="text-xs font-medium mt-2">
                — Alex Chen, TechGadget Co.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <FiStar className="text-yellow-400 mb-2" size={20} />
              <p className="text-sm text-gray-600 italic">
                "I love the bulk upload and analytics tools. Saved me hours
                every week."
              </p>
              <p className="text-xs font-medium mt-2">
                — Maria Garcia, EcoHome
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <FiStar className="text-yellow-400 mb-2" size={20} />
              <p className="text-sm text-gray-600 italic">
                "Customer support is lightning fast on the Enterprise plan."
              </p>
              <p className="text-xs font-medium mt-2">
                — David Kim, Kim's Electronics
              </p>
            </div>
          </div>
        </div>

        {/* Trial CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-2">
            Try Professional free for 14 days – no credit card required.
          </p>
          <Link
            href="/register?seller=pro-trial"
            className="inline-block bg-[#FF6600] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#e65c00]"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </main>
  );
}
