"use client";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message *
                </label>
                <textarea
                  rows="4"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange text-white px-6 py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <p className="text-lg font-medium">Message sent!</p>
              <p className="text-gray-500">
                We'll get back to you within 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border flex items-start">
            <FiMail className="text-orange text-2xl mr-4" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>support@unityshop.com</p>
              <p className="text-sm text-gray-500">Response within 24h</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border flex items-start">
            <FiPhone className="text-orange text-2xl mr-4" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>+1 (800) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border flex items-start">
            <FiMapPin className="text-orange text-2xl mr-4" />
            <div>
              <h3 className="font-semibold">Office</h3>
              <p>
                123 Market Street, Suite 400
                <br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border flex items-start">
            <FiMessageSquare className="text-orange text-2xl mr-4" />
            <div>
              <h3 className="font-semibold">Live Chat</h3>
              <p>Available 24/7</p>
              <button className="mt-2 bg-orange text-white px-4 py-2 rounded">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
