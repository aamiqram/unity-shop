"use client";
import { useState } from "react";
import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";

const pendingReviews = [
  {
    id: 1,
    product: "Wireless Bluetooth Earbuds",
    image: "https://images.unsplash.com/photo-1606741965583-5c4b0a5e4b0a?w=100",
    purchaseDate: "Mar 10, 2025",
  },
];

const myReviews = [
  {
    id: 2,
    product: "Smart Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
    rating: 4,
    date: "Feb 20, 2025",
    text: "Great product, battery life is amazing!",
    helpful: 12,
    status: "published",
  },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [showWriteModal, setShowWriteModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews & Ratings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 ${activeTab === "pending" ? "border-b-2 border-orange text-orange" : ""}`}
        >
          To Review ({pendingReviews.length})
        </button>
        <button
          onClick={() => setActiveTab("my")}
          className={`pb-2 ${activeTab === "my" ? "border-b-2 border-orange text-orange" : ""}`}
        >
          My Reviews ({myReviews.length})
        </button>
      </div>

      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingReviews.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white border rounded-lg p-4"
            >
              <img
                src={item.image}
                alt=""
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <p className="font-medium">{item.product}</p>
                <p className="text-sm text-gray-500">
                  Purchased on {item.purchaseDate}
                </p>
              </div>
              <button
                onClick={() => setShowWriteModal(true)}
                className="bg-orange text-white px-4 py-2 rounded"
              >
                Write Review
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "my" && (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg p-4">
              <div className="flex items-start">
                <img
                  src={review.image}
                  alt=""
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium">{review.product}</p>
                  <div className="flex items-center space-x-1 text-orange">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < review.rating ? "fill-current" : "stroke-current"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-1">{review.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {review.date} · {review.helpful} found helpful
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-orange">
                    <FiEdit2 />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write Review Modal (simplified) */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Write a Review</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Rating</label>
                <div className="flex space-x-1 text-2xl text-orange">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="cursor-pointer hover:fill-current"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Review Title
                </label>
                <input type="text" className="w-full border p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Your Review</label>
                <textarea
                  rows="4"
                  className="w-full border p-2 rounded"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Add Photos</label>
                <input type="file" multiple className="w-full" />
              </div>
              <div className="flex space-x-2">
                <button className="bg-orange text-white px-4 py-2 rounded">
                  Submit
                </button>
                <button
                  onClick={() => setShowWriteModal(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
