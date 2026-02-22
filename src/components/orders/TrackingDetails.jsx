// components/orders/TrackingDetails.jsx
import { FiPackage, FiMapPin, FiClock } from "react-icons/fi";

const TrackingDetails = ({ order }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Tracking Details</h3>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <FiPackage className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Tracking Number</p>
            <p className="font-mono font-medium">
              {order.trackingNumber || "Not yet available"}
            </p>
            {order.trackingNumber && (
              <a
                href={`https://www.carrier.com/track?number=${order.trackingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FF6600] hover:underline"
              >
                Track with carrier
              </a>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiMapPin className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Shipping Address</p>
            <p className="text-sm">
              {order.shippingAddress.name}
              <br />
              {order.shippingAddress.line1}
              {order.shippingAddress.line2 &&
                `, ${order.shippingAddress.line2}`}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zip}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FiClock className="text-gray-400 mt-1" size={18} />
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="text-sm font-medium">{order.estimatedDelivery}</p>
            {order.deliveryDate && (
              <p className="text-xs text-green-600">
                Delivered on {order.deliveryDate}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingDetails;
