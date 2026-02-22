// app/privacy/page.jsx
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "collect", title: "1. Information We Collect" },
    { id: "use", title: "2. How We Use Your Information" },
    { id: "share", title: "3. Information Sharing" },
    { id: "cookies", title: "4. Cookies and Tracking" },
    { id: "rights", title: "5. Your Rights (GDPR)" },
    { id: "security", title: "6. Data Security" },
    { id: "retention", title: "7. Data Retention" },
    { id: "children", title: "8. Children's Privacy" },
    { id: "international", title: "9. International Data Transfers" },
    { id: "changes", title: "10. Changes to This Policy" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last Updated: March 1, 2025</p>
            <p className="text-gray-600 mt-2">
              Your privacy matters to us. This policy explains how we collect,
              use, and protect your personal information.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of contents sidebar - sticky on desktop */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <h2 className="font-semibold text-gray-700 mb-3">Contents</h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-gray-600 hover:text-[#FF6600] py-1 border-l-2 border-transparent hover:border-[#FF6600] pl-2 transition"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="/privacy.pdf"
                    download
                    className="flex items-center gap-2 text-sm text-[#FF6600] hover:underline"
                  >
                    <FiDownload size={16} />
                    Download PDF version
                  </a>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 prose prose-sm max-w-none text-gray-700">
              <section id="collect">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  1. Information We Collect
                </h2>
                <p>
                  We collect several types of information to provide and improve
                  our services:
                </p>
                <h3 className="text-lg font-medium mt-3 mb-1">
                  Personal Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Name, email address, phone number, shipping/billing address
                  </li>
                  <li>
                    Payment information (processed securely by our payment
                    partners; we do not store full card numbers)
                  </li>
                  <li>Account credentials</li>
                </ul>
                <h3 className="text-lg font-medium mt-3 mb-1">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>IP address, browser type, device information</li>
                  <li>
                    Cookies and usage data (pages visited, time spent, etc.)
                  </li>
                </ul>
                <h3 className="text-lg font-medium mt-3 mb-1">
                  User-Generated Content
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Product reviews, messages, profile photos</li>
                </ul>
              </section>

              <section id="use" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  <li>To process and fulfill orders</li>
                  <li>
                    To communicate with you (order updates, customer support)
                  </li>
                  <li>
                    To send marketing communications (with your consent, you may
                    opt out)
                  </li>
                  <li>To improve our platform and analyze usage</li>
                  <li>To detect and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section id="share" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  3. Information Sharing
                </h2>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Sellers:</span> To fulfill
                    your orders (shipping address, contact details)
                  </li>
                  <li>
                    <span className="font-medium">Service providers:</span>{" "}
                    Payment processors (Stripe), shipping companies, email
                    services, analytics providers (Google Analytics)
                  </li>
                  <li>
                    <span className="font-medium">Legal authorities:</span> When
                    required by law or to protect our rights
                  </li>
                  <li>
                    <span className="font-medium">Business transfers:</span> In
                    case of merger, acquisition, or sale of assets
                  </li>
                </ul>
                <p className="mt-2">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section id="cookies" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  4. Cookies and Tracking
                </h2>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience. Types of cookies we use:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Essential cookies:</span>{" "}
                    Required for the platform to function (e.g., authentication,
                    cart)
                  </li>
                  <li>
                    <span className="font-medium">Functional cookies:</span>{" "}
                    Remember your preferences (language, currency)
                  </li>
                  <li>
                    <span className="font-medium">Analytics cookies:</span> Help
                    us understand how visitors interact with our site
                  </li>
                  <li>
                    <span className="font-medium">Marketing cookies:</span> Used
                    to deliver relevant ads (with your consent)
                  </li>
                </ul>
                <p className="mt-2">
                  You can manage your cookie preferences through your browser
                  settings or via our{" "}
                  <button className="text-[#FF6600] hover:underline">
                    Cookie Preferences
                  </button>{" "}
                  tool.
                </p>
              </section>

              <section id="rights" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  5. Your Rights (GDPR)
                </h2>
                <p>
                  If you are a resident of the European Economic Area (EEA), you
                  have the following rights:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Right to access:</span>{" "}
                    Request a copy of your personal data
                  </li>
                  <li>
                    <span className="font-medium">Right to rectification:</span>{" "}
                    Correct inaccurate data
                  </li>
                  <li>
                    <span className="font-medium">Right to erasure:</span>{" "}
                    Request deletion of your data
                  </li>
                  <li>
                    <span className="font-medium">
                      Right to data portability:
                    </span>{" "}
                    Receive your data in a structured format
                  </li>
                  <li>
                    <span className="font-medium">Right to object:</span> Object
                    to processing based on legitimate interests
                  </li>
                  <li>
                    <span className="font-medium">
                      Right to withdraw consent:
                    </span>{" "}
                    Withdraw consent at any time (without affecting lawfulness
                    of prior processing)
                  </li>
                </ul>
                <p className="mt-2">
                  To exercise your rights, contact us at{" "}
                  <a
                    href="mailto:privacy@unityshop.com"
                    className="text-[#FF6600] hover:underline"
                  >
                    privacy@unityshop.com
                  </a>
                  . We will respond within one month.
                </p>
              </section>

              <section id="security" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  6. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your data, including:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>SSL/TLS encryption for data in transit</li>
                  <li>Secure payment processing via PCI‑compliant partners</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and employee training</li>
                </ul>
                <p className="mt-2">
                  While we strive to protect your data, no method of
                  transmission or storage is 100% secure. You use our platform
                  at your own risk.
                </p>
              </section>

              <section id="retention" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  7. Data Retention
                </h2>
                <p>
                  We retain your personal information for as long as necessary
                  to fulfill the purposes outlined in this policy, unless a
                  longer retention period is required by law. For example:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Order information is retained for tax and accounting
                    purposes (typically 7 years).
                  </li>
                  <li>
                    Account information is retained until you request deletion.
                  </li>
                  <li>Marketing preferences are retained until you opt out.</li>
                </ul>
              </section>

              <section id="children" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  8. Children's Privacy
                </h2>
                <p>
                  Our platform is not intended for individuals under the age of
                  13 (or 16 in the EEA). We do not knowingly collect personal
                  information from children. If you become aware that a child
                  has provided us with personal data, please contact us.
                </p>
              </section>

              <section id="international" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  9. International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. These countries may have data
                  protection laws different from your jurisdiction. For
                  transfers from the EEA, we use Standard Contractual Clauses
                  approved by the European Commission.
                </p>
                <p className="mt-2">
                  Our servers are located in the United States. By using our
                  platform, you consent to the transfer of your data to the U.S.
                  and other countries where we operate.
                </p>
              </section>

              <section id="changes" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  10. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page with an updated effective date. In some cases, we may
                  provide additional notice (e.g., email).
                </p>
              </section>

              <section id="contact" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please
                  contact our Data Protection Officer:
                </p>
                <div className="mt-2 bg-gray-50 p-4 rounded">
                  <p className="font-medium">
                    Email:{" "}
                    <a
                      href="mailto:privacy@unityshop.com"
                      className="text-[#FF6600] hover:underline"
                    >
                      privacy@unityshop.com
                    </a>
                  </p>
                  <p className="mt-1">
                    Address: 123 Market Street, Suite 400, San Francisco, CA
                    94105, USA
                  </p>
                  <p className="mt-1">Phone: +1-800-555-1234</p>
                </div>
              </section>

              {/* Your Privacy Choices Interactive Section */}
              <section
                id="choices"
                className="mt-8 border-t border-gray-200 pt-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Your Privacy Choices
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    Manage Cookie Preferences
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    Opt Out of Marketing Emails
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    Request My Data
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 text-sm">
                    Delete My Account
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  These options are also available in your account settings.
                </p>
              </section>

              <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
                <p>
                  Unity Shop, Inc. • 123 Market Street, Suite 400 • San
                  Francisco, CA 94105
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
