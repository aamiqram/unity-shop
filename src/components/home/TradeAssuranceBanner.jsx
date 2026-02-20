import { FiShield, FiCreditCard, FiCheckCircle, FiTruck } from "react-icons/fi";

const features = [
  {
    icon: FiShield,
    title: "Verified Suppliers",
    description: "All suppliers are verified by third-party agencies.",
  },
  {
    icon: FiCreditCard,
    title: "Secure Payments",
    description: "Your payments are protected until you confirm receipt.",
  },
  {
    icon: FiCheckCircle,
    title: "Quality Guaranteed",
    description: "Inspection services ensure product quality.",
  },
  {
    icon: FiTruck,
    title: "On-time Shipping",
    description: "Guaranteed shipping schedules and tracking.",
  },
];

export default function TradeAssuranceBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Trade with Confidence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="text-3xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition">
            Learn More About Trade Assurance
          </button>
        </div>
      </div>
    </section>
  );
}
