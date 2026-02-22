// app/accessibility/page.jsx
import Link from "next/link";
import { FiMail, FiPhone, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function AccessibilityPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Accessibility Statement
          </h1>
          <p className="text-gray-500 mb-6">Last Updated: March 1, 2025</p>

          <div className="prose prose-sm max-w-none text-gray-700">
            {/* Commitment */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Our Commitment
              </h2>
              <p>
                Unity Shop is committed to ensuring digital accessibility for
                people with disabilities. We continually improve the user
                experience for everyone and apply the relevant accessibility
                standards.
              </p>
            </section>

            {/* Measures */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Measures to Support Accessibility
              </h2>
              <p>We take the following measures to ensure accessibility:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Use semantic HTML5 markup</li>
                <li>Provide ARIA labels and landmarks where needed</li>
                <li>Ensure full keyboard navigation</li>
                <li>Test with screen readers (JAWS, NVDA, VoiceOver)</li>
                <li>Provide alt text for all meaningful images</li>
                <li>Maintain sufficient color contrast (WCAG AA minimum)</li>
                <li>Provide visible focus indicators</li>
                <li>Include captions for videos</li>
                <li>Allow text resizing without loss of functionality</li>
                <li>Properly label form inputs and error messages</li>
              </ul>
            </section>

            {/* Features */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Accessibility Features
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Keyboard shortcuts:</span> Use
                  Tab to navigate, Enter/Space to activate, Esc to close modals,
                  Arrow keys to navigate menus.
                </li>
                <li>
                  <span className="font-medium">Text size:</span> You can adjust
                  text size using your browser's zoom feature.
                </li>
                <li>
                  <span className="font-medium">High contrast mode:</span> Our
                  design maintains high contrast ratios; we also support browser
                  high contrast modes.
                </li>
                <li>
                  <span className="font-medium">Skip to content:</span> A "Skip
                  to main content" link is available on every page (hidden until
                  focused).
                </li>
              </ul>
            </section>

            {/* Known Issues */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Known Issues
              </h2>
              <p>
                We are aware of the following limitations and are working to fix
                them:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Some older PDF documents may not be fully accessible.</li>
                <li>
                  Third‑party content (seller listings) may not always meet our
                  accessibility standards; we encourage sellers to follow best
                  practices.
                </li>
                <li>
                  Video captions are available for our own content, but not for
                  all third‑party videos.
                </li>
              </ul>
              <p className="mt-2">
                Expected fix: Q2 2025 for the above issues.
              </p>
            </section>

            {/* Feedback */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Feedback
              </h2>
              <p>
                We welcome your feedback on the accessibility of Unity Shop.
                Please let us know if you encounter any barriers:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded">
                <p className="flex items-center gap-2">
                  <FiMail className="text-[#FF6600]" /> Email:{" "}
                  <a
                    href="mailto:accessibility@unityshop.com"
                    className="text-[#FF6600] hover:underline"
                  >
                    accessibility@unityshop.com
                  </a>
                </p>
                <p className="flex items-center gap-2 mt-1">
                  <FiPhone className="text-[#FF6600]" /> Phone: +1-800-555-1234
                  (accessible IVR)
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  We aim to respond within 2 business days.
                </p>
              </div>
            </section>

            {/* Third‑Party Content */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Third‑Party Content
              </h2>
              <p>
                Our platform includes content from independent sellers. While we
                encourage sellers to follow accessibility best practices, we
                cannot guarantee that all seller‑supplied content (images,
                descriptions) is accessible. If you encounter inaccessible
                content, please contact us so we can assist you.
              </p>
            </section>

            {/* Assistive Technologies */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Compatibility with Assistive Technologies
              </h2>
              <p>
                Unity Shop is designed to be compatible with the following
                assistive technologies:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>JAWS (latest version) with Chrome</li>
                <li>NVDA (latest version) with Firefox</li>
                <li>VoiceOver (macOS) with Safari</li>
                <li>TalkBack (Android) with Chrome</li>
              </ul>
            </section>

            {/* Compliance Status */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Compliance Status
              </h2>
              <p>
                We aim to meet WCAG 2.1 Level AA standards. Our last audit was
                conducted on February 15, 2025. The next scheduled review is
                August 2025.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <FiCheckCircle className="text-green-600" size={20} />
                <span>
                  Partially conformant (some minor issues noted above).
                </span>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Contact Us
              </h2>
              <p>
                If you need assistance accessing any part of our website, please
                contact our accessibility team:
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded">
                <p>Unity Shop Accessibility Team</p>
                <p>123 Market Street, Suite 400, San Francisco, CA 94105</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:accessibility@unityshop.com"
                    className="text-[#FF6600] hover:underline"
                  >
                    accessibility@unityshop.com
                  </a>
                </p>
                <p>Phone: +1-800-555-1234</p>
              </div>
            </section>

            {/* Date */}
            <p className="text-sm text-gray-400 mt-4">
              This statement was last updated on March 1, 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
