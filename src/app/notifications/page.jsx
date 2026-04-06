// app/notifications/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiBell,
  FiCheck,
  FiX,
  FiMoreVertical,
  FiSettings,
  FiMail,
  FiPackage,
  FiMessageSquare,
  FiStar,
  FiGift,
  FiAlertCircle,
} from "react-icons/fi";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "order",
    title: "Order Shipped",
    message: "Your order #ORD-12345 has been shipped. Track your package now.",
    timestamp: "2025-02-22T09:30:00Z",
    read: false,
    link: "/orders/ORD-12345",
  },
  {
    id: 2,
    type: "product",
    title: "Price Drop Alert",
    message: "Wireless Headphones you saved are now 20% off!",
    timestamp: "2025-02-22T08:15:00Z",
    read: false,
    link: "/products/1",
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    message: "Shenzhen Tech Co. sent you a message about your inquiry.",
    timestamp: "2025-02-21T16:45:00Z",
    read: true,
    link: "/messages/conv1",
  },
  {
    id: 4,
    type: "review",
    title: "New Review",
    message: "Someone reviewed your purchased product: Wireless Earbuds.",
    timestamp: "2025-02-21T10:20:00Z",
    read: true,
    link: "/products/1#reviews",
  },
  {
    id: 5,
    type: "promotion",
    title: "Flash Sale Starts Soon",
    message: "Flash sale begins in 1 hour! Up to 60% off.",
    timestamp: "2025-02-20T22:00:00Z",
    read: true,
    link: "/flash-sales",
  },
  {
    id: 6,
    type: "system",
    title: "Profile Updated",
    message: "Your profile information was successfully updated.",
    timestamp: "2025-02-20T14:30:00Z",
    read: true,
    link: "/dashboard/profile",
  },
  {
    id: 7,
    type: "order",
    title: "Order Delivered",
    message: "Your order #ORD-12340 has been delivered. Enjoy your purchase!",
    timestamp: "2025-02-19T11:00:00Z",
    read: true,
    link: "/orders/ORD-12340",
  },
];

// Helper to group by date
const groupByDate = (notifications) => {
  const groups = {
    Today: [],
    Yesterday: [],
    "This Week": [],
    Earlier: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  notifications.forEach((notif) => {
    const date = new Date(notif.timestamp);
    if (date >= today) {
      groups.Today.push(notif);
    } else if (date >= yesterday) {
      groups.Yesterday.push(notif);
    } else if (date >= weekAgo) {
      groups["This Week"].push(notif);
    } else {
      groups.Earlier.push(notif);
    }
  });

  return groups;
};

// Icon mapping
const typeIcon = {
  order: <FiPackage className="text-blue-500" size={18} />,
  product: <FiGift className="text-green-500" size={18} />,
  message: <FiMessageSquare className="text-purple-500" size={18} />,
  review: <FiStar className="text-yellow-500" size={18} />,
  promotion: <FiBell className="text-red-500" size={18} />,
  system: <FiAlertCircle className="text-gray-500" size={18} />,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(null); // id of notification with open menu

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const grouped = groupByDate(filteredNotifications);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setMenuOpen(null);
  };

  const markAsUnread = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: false } : n)),
    );
    setMenuOpen(null);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setMenuOpen(null);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    {
      id: "order",
      label: "Orders",
      count: notifications.filter((n) => n.type === "order").length,
    },
    {
      id: "product",
      label: "Products",
      count: notifications.filter((n) => n.type === "product").length,
    },
    {
      id: "message",
      label: "Messages",
      count: notifications.filter((n) => n.type === "message").length,
    },
    {
      id: "promotion",
      label: "Promotions",
      count: notifications.filter((n) => n.type === "promotion").length,
    },
    {
      id: "system",
      label: "System",
      count: notifications.filter((n) => n.type === "system").length,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-[#FF6600] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#FF6600] hover:underline flex items-center gap-1"
              >
                <FiCheck size={14} /> Mark all as read
              </button>
            )}
            <Link
              href="/notifications/settings"
              className="p-2 text-gray-500 hover:text-[#FF6600]"
            >
              <FiSettings size={20} />
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto gap-1 pb-2 mb-4 border-b border-gray-200">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeFilter === filter.id
                  ? "border-[#FF6600] text-[#FF6600]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {filter.label}{" "}
              {filter.count > 0 && (
                <span className="ml-1 text-xs">({filter.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
            <FiBell className="mx-auto text-gray-300 text-4xl mb-2" />
            <p className="text-gray-500">You're all caught up!</p>
            <p className="text-xs text-gray-400 mt-1">No new notifications.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([groupName, groupNotifications]) => {
              if (groupNotifications.length === 0) return null;
              return (
                <div key={groupName}>
                  <h2 className="text-sm font-semibold text-gray-500 mb-2">
                    {groupName}
                  </h2>
                  <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                    {groupNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`relative p-4 flex items-start gap-3 hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {typeIcon[notif.type] || (
                            <FiBell className="text-gray-400" size={18} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3
                                className={`text-sm font-medium ${!notif.read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notif.title}
                              </h3>
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {notif.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-xs text-gray-400 whitespace-nowrap">
                                {new Date(notif.timestamp).toLocaleTimeString(
                                  [],
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setMenuOpen(
                                      menuOpen === notif.id ? null : notif.id,
                                    )
                                  }
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <FiMoreVertical size={16} />
                                </button>
                                {menuOpen === notif.id && (
                                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                                    {notif.read ? (
                                      <button
                                        onClick={() => markAsUnread(notif.id)}
                                        className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Mark as unread
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => markAsRead(notif.id)}
                                        className="w-full text-left px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Mark as read
                                      </button>
                                    )}
                                    <button
                                      onClick={() =>
                                        deleteNotification(notif.id)
                                      }
                                      className="w-full text-left px-3 py-1 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {notif.link && (
                            <Link
                              href={notif.link}
                              className="text-xs text-[#FF6600] hover:underline mt-1 inline-block"
                            >
                              View details →
                            </Link>
                          )}
                        </div>
                        {!notif.read && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF6600] rounded-r"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
