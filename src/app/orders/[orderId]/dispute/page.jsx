"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DisputePage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    type: "",
    reason: "",
    description: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to API
    router.push("/dashboard/disputes?success=1");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Open a Dispute</h1>
      <p className="text-gray-600 mb-6">Order #{params.orderId}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Dispute Type *
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="not_received">Item not received</option>
            <option value="not_as_described">Item not as described</option>
            <option value="damaged">Damaged item</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Reason *</label>
          <input
            type="text"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            rows="4"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Disputed Amount (optional)
          </label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Evidence
          </label>
          <input type="file" multiple className="w-full" />
        </div>

        <button
          type="submit"
          className="bg-orange text-white px-6 py-2 rounded-lg"
        >
          Submit Dispute
        </button>
      </form>
    </div>
  );
}
