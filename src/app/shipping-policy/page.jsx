// app/shipping-policy/page.jsx
import Link from "next/link";
import { FiTruck, FiClock, FiGlobe, FiAlertCircle } from "react-icons/fi";

export default function ShippingPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Shipping & Delivery Policy
            </h1>
            <p className="text-gray-500">Last Updated: March 1, 2025</p>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="lead">
              At Unity Shop, we strive to deliver your orders quickly and
              reliably. This policy outlines our shipping methods, costs, and
              timelines.
            </p>

            {/* Shipping Methods Table */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiTruck className="text-[#FF6600]" /> Shipping Methods
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left border-b">Method</th>
                      <th className="p-3 text-left border-b">Delivery Time</th>
                      <th className="p-3 text-left border-b">Cost</th>
                      <th className="p-3 text-left border-b">Tracking</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Standard Shipping</td>
                      <td className="p-3">5‑7 business days</td>
                      <td className="p-3">$5.99</td>
                      <td className="p-3">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Express Shipping</td>
                      <td className="p-3">2‑3 business days</td>
                      <td className="p-3">$12.99</td>
                      <td className="p-3">✓</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Overnight Shipping</td>
                      <td className="p-3">1 business day</td>
                      <td className="p-3">$24.99</td>
                      <td className="p-3">✓</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Free Shipping</td>
                      <td className="p-3">7‑10 business days</td>
                      <td className="p-3">Free (orders over $50)</td>
                      <td className="p-3">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Processing Time */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FiClock className="text-[#FF6600]" /> Order Processing Time
              </h2>
              <p>
                Orders are typically processed within 1‑2 business days after
                payment confirmation. For custom or made‑to‑order items,
                processing may take 3‑5 business days. Orders placed on weekends
                or holidays will be processed the next business day.
              </p>
            </section>

            {/* Delivery Estimates */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Delivery Estimates
              </h2>
              <p>
                Delivery times depend on your location and the shipping method
                selected. Below are estimates for domestic shipments:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Northeast</p>
                  <p className="text-sm text-gray-600">
                    2‑4 days (Express: 1‑2 days)
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">Midwest</p>
                  <p className="text-sm text-gray-600">
                    3‑5 days (Express: 2‑3 days)
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">South</p>
                  <p className="text-sm text-gray-600">
                    3‑5 days (Express: 2‑3 days)
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">West Coast</p>
                  <p className="text-sm text-gray-600">
                    4‑6 days (Express: 2‑3 days)
                  </p>
                </div>
              </div>
            </section>

            {/* Shipping Restrictions */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FiAlertCircle className="text-[#FF6600]" /> Shipping
                Restrictions
              </h2>
              <p>
                We currently ship to all 50 U.S. states and APO/FPO addresses.
              </p>
              <p className="mt-1">
                Some items may have shipping restrictions due to size, weight,
                or hazardous materials (e.g., lithium batteries, aerosols). Such
                restrictions will be noted on the product page.
              </p>
            </section>

            {/* International Shipping */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <FiGlobe className="text-[#FF6600]" /> International Shipping
              </h2>
              <p>
                We offer international shipping to many countries. Shipping
                costs and delivery times vary by destination. Duties, taxes, and
                customs fees are the responsibility of the buyer and are not
                included in the shipping cost.
              </p>
              <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                <p className="font-medium">Countries we currently ship to:</p>
                <p>
                  USA, Canada, United Kingdom, Australia, Germany, France,
                  Japan, South Korea, Singapore, and many more.
                </p>
                <p className="mt-1 text-blue-800">
                  For a full list, contact our support team.
                </p>
              </div>
            </section>

            {/* Tracking Your Order */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Tracking Your Order
              </h2>
              <p>
                Once your order ships, you'll receive a tracking number by
                email. You can also track your order from your account dashboard
                under "My Orders". Tracking information may take 24‑48 hours to
                update after shipment.
              </p>
            </section>

            {/* Delivery Issues */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Delivery Issues
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Lost packages:</span> If your
                  package hasn't arrived within the estimated timeframe, please
                  contact us. We'll investigate with the carrier.
                </li>
                <li>
                  <span className="font-medium">Damaged items:</span> If your
                  item arrives damaged, please report it within 48 hours with
                  photos, and we'll assist you with a return or replacement.
                </li>
                <li>
                  <span className="font-medium">Wrong address:</span> You are
                  responsible for providing an accurate shipping address. If you
                  realize you've entered a wrong address, contact us
                  immediately. Once shipped, we may not be able to reroute the
                  package.
                </li>
                <li>
                  <span className="font-medium">Failed delivery attempts:</span>{" "}
                  The carrier will usually make up to three delivery attempts.
                  After that, the package may be held at a local facility or
                  returned to sender. Additional shipping fees may apply for
                  re‑shipment.
                </li>
              </ul>
            </section>

            {/* Seller-Specific Shipping */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Seller‑Specific Shipping
              </h2>
              <p>
                Many products on Unity Shop are sold by independent sellers.
                Each seller sets their own shipping rates, methods, and
                policies. Please check the product page for seller‑specific
                shipping details. If you order multiple items from the same
                seller, they may combine shipping – you can request this by
                contacting the seller before purchase.
              </p>
            </section>

            {/* Holidays and Delays */}
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Holidays & Unexpected Delays
              </h2>
              <p>
                During peak seasons (e.g., holidays) or extreme weather events,
                delivery may be delayed. We appreciate your patience. You can
                check our{" "}
                <Link href="/help" className="text-[#FF6600] hover:underline">
                  Help Center
                </Link>{" "}
                for updates.
              </p>
            </section>

            {/* Contact */}
            <section className="mt-6 border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Questions?
              </h2>
              <p>
                If you have any questions about shipping, please contact our
                support team at{" "}
                <a
                  href="mailto:shipping@unityshop.com"
                  className="text-[#FF6600] hover:underline"
                >
                  shipping@unityshop.com
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact"
                  className="text-[#FF6600] hover:underline"
                >
                  Contact Page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
