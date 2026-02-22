// components/orders/OrderTimeline.jsx
import {
  FiCheckCircle,
  FiCircle,
  FiTruck,
  FiPackage,
  FiHome,
} from "react-icons/fi";

const statusIcons = {
  "order-placed": FiCheckCircle,
  confirmed: FiCheckCircle,
  processing: FiPackage,
  shipped: FiTruck,
  delivered: FiHome,
};

const OrderTimeline = ({ status, events }) => {
  // status should be one of: 'order-placed', 'confirmed', 'processing', 'shipped', 'delivered'
  const steps = [
    { key: "order-placed", label: "Order Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = statusIcons[step.key] || FiCircle;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center flex-1 last:flex-none"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                } ${isCurrent ? "ring-2 ring-[#FF6600] ring-offset-2" : ""}`}
              >
                <Icon size={20} />
              </div>
              <span className="text-xs mt-2 text-center">{step.label}</span>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                    index < currentIndex ? "bg-green-500" : "bg-gray-200"
                  }`}
                  style={{ transform: "translateX(50%)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Status messages from events */}
      {events && events.length > 0 && (
        <div className="mt-6 space-y-3">
          {events.map((event, idx) => (
            <div key={idx} className="flex gap-3 text-sm">
              <div className="w-5 text-gray-400">•</div>
              <div>
                <p className="text-gray-700">{event.message}</p>
                <p className="text-xs text-gray-500">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
