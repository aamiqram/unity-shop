import Image from "next/image";
import { FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] bg-gradient-to-r from-orange to-orange/70 text-white flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Unity Shop</h1>
          <p className="text-xl">
            Connecting buyers and sellers globally since 2020
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-8">
              Founded in 2020, Unity Shop started with a mission to make global
              trade accessible to everyone. What began as a small platform has
              grown into a trusted marketplace with thousands of sellers and
              millions of products.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {[
              { icon: FiUsers, label: "Active Users", value: "2M+" },
              { icon: FiGlobe, label: "Countries", value: "50+" },
              { icon: FiAward, label: "Trust Score", value: "4.8/5" },
              { icon: FiHeart, label: "Happy Customers", value: "1.5M+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="text-4xl text-orange mx-auto mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
