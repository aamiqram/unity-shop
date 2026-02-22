// components/supplier/SupplierReviews.jsx
import { demoProducts } from "@/lib/demoProducts";
import { FiStar } from "react-icons/fi";

const SupplierReviews = ({ supplier }) => {
  // Get all reviews from this supplier's products
  const supplierProducts = demoProducts.filter(
    (p) => p.supplier.name === supplier.name,
  );
  const allReviews = supplierProducts.flatMap((p) => p.reviews || []);

  const averageRating = allReviews.length
    ? (
        allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
      ).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: allReviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-6 mb-6">
        <div>
          <span className="text-4xl font-bold text-gray-800">
            {averageRating}
          </span>
          <span className="text-gray-500">/5</span>
        </div>
        <div>
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={20}
                fill={i < Math.round(averageRating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {allReviews.length} reviews
          </p>
        </div>
      </div>

      {/* Rating breakdown */}
      <div className="mb-6">
        {ratingCounts.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-2 text-sm mb-1">
            <span className="w-8">{star} star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(count / allReviews.length) * 100 || 0}%` }}
              />
            </div>
            <span className="w-8 text-right">{count}</span>
          </div>
        ))}
      </div>

      {/* Individual reviews */}
      <h4 className="font-semibold mb-3">Customer Reviews</h4>
      {allReviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {allReviews.slice(0, 5).map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{review.user}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierReviews;
