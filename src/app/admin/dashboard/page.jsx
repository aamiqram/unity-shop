"use client";
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "45,678", icon: FiUsers, change: "+12%" },
    {
      label: "Total Orders",
      value: "12,345",
      icon: FiShoppingBag,
      change: "+8%",
    },
    { label: "Revenue", value: "$1.2M", icon: FiDollarSign, change: "+15%" },
    { label: "Active Sellers", value: "3,456", icon: FiPackage, change: "+5%" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg border flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-green-600">{s.change} vs last month</p>
            </div>
            <s.icon className="text-3xl text-orange/50" />
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Pending Seller Approvals</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2">
              <span>ABC Electronics</span>
              <button className="bg-orange text-white px-3 py-1 text-sm rounded">
                Review
              </button>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Fashion Hub</span>
              <button className="bg-orange text-white px-3 py-1 text-sm rounded">
                Review
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Recent Support Tickets</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Order #12345: Item not received</span>
              <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                Open
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Payment issue with order #12346</span>
              <span className="text-xs bg-yellow-100 px-2 py-1 rounded">
                Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
