// components/home/TradeAssuranceBanner.jsx
import { FiShield, FiLock, FiCheckCircle, FiTruck } from "react-icons/fi";

const TradeAssuranceBanner = () => {
  const features = [
    {
      icon: <FiShield size={32} className="text-[#FF6600]" />,
      title: "Verified Suppliers",
      description:
        "Every supplier is thoroughly vetted and verified by our team.",
    },
    {
      icon: <FiLock size={32} className="text-[#FF6600]" />,
      title: "Secure Payments",
      description:
        "Your transactions are protected with bank-level encryption.",
    },
    {
      icon: <FiCheckCircle size={32} className="text-[#FF6600]" />,
      title: "Quality Guaranteed",
      description: "Inspection services ensure you get what you ordered.",
    },
    {
      icon: <FiTruck size={32} className="text-[#FF6600]" />,
      title: "On-time Shipping",
      description: "Guaranteed shipping schedules with real-time tracking.",
    },
  ];

  return (
    <section className="bg-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Trade with Confidence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unity Shop's Trade Assurance protects your orders from payment to
            delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/trade-assurance"
            className="inline-flex items-center px-6 py-3 bg-[#FF6600] text-white font-medium rounded-md hover:bg-[#e65c00] transition-colors"
          >
            Learn More About Trade Assurance
          </a>
        </div>
      </div>
    </section>
  );
};

export default TradeAssuranceBanner;
