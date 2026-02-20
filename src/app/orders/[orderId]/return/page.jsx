"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReturnPage() {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    reason: "",
    explanation: "",
    resolution: "refund",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to API
    router.push("/dashboard/returns?success=1");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Request Return</h1>
      <p className="text-gray-600 mb-6">Order #{params.orderId}</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg border space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Reason for Return *
          </label>
          <select
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="damaged">Item damaged</option>
            <option value="wrong">Wrong item received</option>
            <option value="not_as_described">Not as described</option>
            <option value="changed_mind">Changed my mind</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Explanation *
          </label>
          <textarea
            rows="4"
            value={form.explanation}
            onChange={(e) => setForm({ ...form, explanation: e.target.value })}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Preferred Resolution
          </label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="resolution"
                value="refund"
                checked={form.resolution === "refund"}
                onChange={(e) =>
                  setForm({ ...form, resolution: e.target.value })
                }
                className="mr-1"
              />{" "}
              Refund
            </label>
            <label>
              <input
                type="radio"
                name="resolution"
                value="exchange"
                onChange={(e) =>
                  setForm({ ...form, resolution: e.target.value })
                }
                className="mr-1"
              />{" "}
              Exchange
            </label>
            <label>
              <input
                type="radio"
                name="resolution"
                value="store_credit"
                onChange={(e) =>
                  setForm({ ...form, resolution: e.target.value })
                }
                className="mr-1"
              />{" "}
              Store Credit
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Photos (optional)
          </label>
          <input type="file" multiple className="w-full" />
        </div>

        <button
          type="submit"
          className="bg-orange text-white px-6 py-2 rounded-lg"
        >
          Submit Return Request
        </button>
      </form>
    </div>
  );
}
