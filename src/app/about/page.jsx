// app/about/page.jsx
import Image from "next/image";
import Link from "next/link";
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiShield,
  FiAward,
  FiUsers,
} from "react-icons/fi";

export default function AboutPage() {
  // Company milestones
  const milestones = [
    { year: "2020", event: "Unity Shop founded in San Francisco, CA" },
    { year: "2021", event: "Reached 1,000 sellers on the platform" },
    { year: "2022", event: "Expanded to 10 countries across Asia and Europe" },
    { year: "2023", event: "1 million+ products listed, 5 million+ customers" },
    { year: "2024", event: "Launched Trade Assurance and AI-powered sourcing" },
  ];

  // Stats
  const stats = [
    { value: "10,000+", label: "Active Sellers" },
    { value: "1M+", label: "Products Listed" },
    { value: "50+", label: "Countries Served" },
    { value: "5M+", label: "Happy Customers" },
  ];

  // Values
  const values = [
    {
      icon: FiShield,
      title: "Trust & Transparency",
      description:
        "We verify every supplier and protect buyers with Trade Assurance.",
    },
    {
      icon: FiAward,
      title: "Quality First",
      description:
        "Strict quality controls and inspection services for peace of mind.",
    },
    {
      icon: FiTarget,
      title: "Innovation",
      description:
        "Continuously improving our platform with AI and smart tools.",
    },
    {
      icon: FiHeart,
      title: "Customer Focus",
      description: "Your success is our success – we're here to help you grow.",
    },
  ];

  // Team members (placeholder)
  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      image: "/team/placeholder.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "/team/placeholder.jpg",
    },
    { name: "Michael Lee", role: "CTO", image: "/team/placeholder.jpg" },
    {
      name: "Priya Patel",
      role: "Head of Seller Success",
      image: "/team/placeholder.jpg",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF6600] to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Unity Shop
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connecting buyers and sellers globally with trust, innovation, and
            quality.
          </p>
        </div>
      </section>

      {/* Story Section with Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                Unity Shop was founded in 2020 with a simple mission: to make
                global trade accessible, secure, and efficient for businesses of
                all sizes. What started as a small startup has grown into a
                trusted marketplace serving millions of buyers and sellers
                worldwide.
              </p>
              <p className="text-gray-600 mb-8">
                We believe that technology can break down barriers and create
                opportunities. By combining powerful tools with human expertise,
                we help businesses find the right products, build lasting
                partnerships, and grow together.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="space-y-6">
                {milestones.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-[#FF6600] font-bold text-xl">
                      {item.year.slice(-2)}
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200 pl-4">
                      <p className="font-semibold text-gray-800">{item.year}</p>
                      <p className="text-gray-600">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <FiTarget className="text-[#FF6600] text-3xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower businesses worldwide by providing a trusted,
                innovative platform that simplifies global trade, fosters
                growth, and builds lasting partnerships.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <FiEye className="text-[#FF6600] text-3xl mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the world's most trusted B2B marketplace, where any
                business can seamlessly connect, trade, and thrive in a
                borderless economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF6600] mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center"
                >
                  <div className="inline-flex p-3 bg-orange-100 rounded-full text-[#FF6600] mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section (optional) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
                  <FiUsers size={32} />
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6600] to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already growing with Unity Shop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?type=buyer"
              className="px-8 py-3 bg-white text-[#FF6600] font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/register?type=seller"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#FF6600] transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
