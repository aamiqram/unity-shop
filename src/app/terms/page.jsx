// app/terms/page.jsx
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

export default function TermsOfServicePage() {
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "account", title: "2. Account Registration" },
    { id: "conduct", title: "3. User Conduct" },
    { id: "buyers", title: "4. For Buyers" },
    { id: "sellers", title: "5. For Sellers" },
    { id: "fees", title: "6. Platform Fees" },
    { id: "intellectual-property", title: "7. Intellectual Property" },
    { id: "privacy", title: "8. Privacy & Data" },
    { id: "liability", title: "9. Limitation of Liability" },
    { id: "dispute-resolution", title: "10. Dispute Resolution" },
    { id: "general", title: "11. General Provisions" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Terms of Service
            </h1>
            <p className="text-gray-500">
              Last Updated: March 1, 2025 • Effective Date: March 1, 2025
            </p>
            <p className="text-gray-600 mt-2">
              Please read these terms carefully before using Unity Shop.
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
                    href="/terms.pdf"
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
              <section id="acceptance">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the Unity Shop platform, you agree to be
                  bound by these Terms of Service, all applicable laws and
                  regulations, and agree that you are responsible for compliance
                  with any applicable local laws. If you do not agree with any
                  of these terms, you are prohibited from using or accessing
                  this site. The materials contained in this website are
                  protected by applicable copyright and trademark law.
                </p>
                <p className="mt-2">
                  Unity Shop reserves the right to modify or replace these Terms
                  at any time. It is your responsibility to check this page
                  periodically for changes. Your continued use of the platform
                  following the posting of any changes constitutes acceptance of
                  those changes.
                </p>
              </section>

              <section id="account" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  2. Account Registration
                </h2>
                <p>
                  To access certain features of the platform, you must register
                  for an account. You agree to provide accurate, current, and
                  complete information during the registration process and to
                  update such information to keep it accurate, current, and
                  complete.
                </p>
                <p className="mt-2">
                  You are responsible for safeguarding the password that you use
                  to access the platform and for any activities or actions under
                  your password. You agree not to disclose your password to any
                  third party. You must notify us immediately upon becoming
                  aware of any breach of security or unauthorized use of your
                  account.
                </p>
                <p className="mt-2">
                  Unity Shop reserves the right to suspend or terminate your
                  account if any information provided during the registration
                  process or thereafter is inaccurate, not current, or
                  incomplete.
                </p>
              </section>

              <section id="conduct" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  3. User Conduct
                </h2>
                <p>You agree not to use the platform to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Violate any applicable laws or regulations;</li>
                  <li>Infringe the intellectual property rights of others;</li>
                  <li>
                    Post false, inaccurate, misleading, defamatory, or libelous
                    content;
                  </li>
                  <li>Impersonate any person or entity;</li>
                  <li>Engage in any fraudulent activity;</li>
                  <li>Interfere with or disrupt the platform or servers;</li>
                  <li>
                    Transmit any worms, viruses, or code of a destructive
                    nature;
                  </li>
                  <li>
                    Collect or store personal data about other users without
                    their consent.
                  </li>
                </ul>
                <p className="mt-2">
                  We reserve the right to remove any content that violates these
                  terms and to suspend or terminate the accounts of repeat
                  infringers.
                </p>
              </section>

              <section id="buyers" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  4. For Buyers
                </h2>
                <p>
                  As a buyer, you agree to pay for all purchases made through
                  your account. Prices and availability of items are subject to
                  change without notice. We reserve the right to refuse or
                  cancel any order for any reason, including but not limited to
                  product availability, errors in the description or price, or
                  fraud suspicion.
                </p>
                <p className="mt-2">
                  All sales are subject to our Return and Refund Policy, which
                  is incorporated herein by reference. Disputes regarding orders
                  must be initiated within 30 days of the order date.
                </p>
              </section>

              <section id="sellers" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  5. For Sellers
                </h2>
                <p>
                  Sellers are independent contractors and are not employees or
                  agents of Unity Shop. You are solely responsible for your
                  listings, products, and fulfillment. You agree to provide
                  accurate product descriptions, set appropriate prices, and
                  fulfill orders promptly.
                </p>
                <p className="mt-2">
                  Sellers agree to pay applicable fees and commissions as
                  described in the Seller Agreement. Unity Shop may withhold
                  payments or suspend accounts for violation of these terms.
                </p>
                <p className="mt-2">
                  Prohibited items include, but are not limited to: illegal
                  goods, counterfeit items, hazardous materials, and items that
                  infringe intellectual property rights.
                </p>
              </section>

              <section id="fees" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  6. Platform Fees
                </h2>
                <p>
                  Unity Shop charges fees for certain services. For buyers,
                  there are no fees to browse or purchase (except as may be
                  disclosed). For sellers, fees include:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Commission on each sale: 8% of the transaction amount</li>
                  <li>Payment processing fee: 2.9% + $0.30 per transaction</li>
                  <li>
                    Optional promotional fees may apply for featured listings
                  </li>
                </ul>
                <p className="mt-2">
                  All fees are non-refundable except as required by law. We
                  reserve the right to change our fees at any time with 30 days'
                  notice.
                </p>
              </section>

              <section id="intellectual-property" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  7. Intellectual Property
                </h2>
                <p>
                  The platform and its original content, features, and
                  functionality are owned by Unity Shop and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws. Our trademarks and trade
                  dress may not be used in connection with any product or
                  service without our prior written consent.
                </p>
                <p className="mt-2">
                  By posting content on the platform, you grant Unity Shop a
                  non-exclusive, worldwide, royalty-free license to use,
                  reproduce, and display such content in connection with the
                  platform and our business.
                </p>
              </section>

              <section id="privacy" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  8. Privacy & Data
                </h2>
                <p>
                  Your use of the platform is also governed by our Privacy
                  Policy, which explains how we collect, use, and share your
                  personal information. By using the platform, you consent to
                  the collection and use of information as described in the
                  Privacy Policy.
                </p>
              </section>

              <section id="liability" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  9. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by law, Unity Shop shall not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses, resulting from (i) your use or inability to
                  use the platform; (ii) any conduct or content of any third
                  party; (iii) any content obtained from the platform; and (iv)
                  unauthorized access, use, or alteration of your transmissions
                  or content.
                </p>
                <p className="mt-2">
                  Our total liability to you shall not exceed the amount you
                  paid to us during the twelve months preceding the event giving
                  rise to liability.
                </p>
              </section>

              <section id="dispute-resolution" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  10. Dispute Resolution
                </h2>
                <p>
                  These Terms shall be governed by the laws of the State of
                  Delaware, without regard to its conflict of law provisions.
                  Any dispute arising out of or relating to these Terms or your
                  use of the platform shall be resolved through binding
                  arbitration administered by the American Arbitration
                  Association under its Commercial Arbitration Rules.
                </p>
                <p className="mt-2">
                  To the fullest extent permitted by applicable law, you and
                  Unity Shop agree to waive the right to a trial by jury and to
                  participate in a class action. You agree that any claim must
                  be brought in your individual capacity, and not as a plaintiff
                  or class member in any purported class or representative
                  proceeding.
                </p>
              </section>

              <section id="general" className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  11. General Provisions
                </h2>
                <p>
                  If any provision of these Terms is held to be unenforceable or
                  invalid, such provision will be changed and interpreted to
                  accomplish the objectives of such provision to the greatest
                  extent possible under applicable law, and the remaining
                  provisions will continue in full force and effect.
                </p>
                <p className="mt-2">
                  These Terms constitute the entire agreement between you and
                  Unity Shop regarding the use of the platform, superseding any
                  prior agreements between you and Unity Shop.
                </p>
                <p className="mt-2">
                  If you have any questions about these Terms, please contact us
                  at legal@unityshop.com.
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
