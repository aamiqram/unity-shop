// app/dashboard/profile/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiBell,
  FiLock,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

// Mock user data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  emailVerified: true,
  phone: "+1 234 567 890",
  phoneVerified: true,
  dob: "1990-01-01",
  gender: "male",
  avatar: "https://via.placeholder.com/150x150?text=JD",
};

// Mock addresses
const initialAddresses = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 234 567 890",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    phone: "+1 234 567 891",
    addressLine1: "456 Oak Ave",
    addressLine2: "",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
    isDefault: false,
  },
];

// Mock payment methods
const initialPaymentMethods = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "12/25",
    cardholder: "John Doe",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "8888",
    expiry: "08/24",
    cardholder: "John Doe",
    isDefault: false,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  });

  // Personal info form state
  const [personalInfo, setPersonalInfo] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [personalSaved, setPersonalSaved] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromos: false,
    emailPriceDrops: true,
    emailNewsletter: false,
    smsOrders: true,
    smsDelivery: true,
    push: false,
  });

  // Security form
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityMessage, setSecurityMessage] = useState("");

  const tabs = [
    { id: "personal", label: "Personal Information", icon: FiUser },
    { id: "addresses", label: "Addresses", icon: FiMapPin },
    { id: "payment", label: "Payment Methods", icon: FiCreditCard },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "security", label: "Security", icon: FiLock },
  ];

  // Handlers
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    // Simulate save
    setPersonalSaved(true);
    setTimeout(() => setPersonalSaved(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddAddress = () => {
    const newId = Date.now();
    setAddresses([
      ...addresses,
      { ...newAddress, id: newId, isDefault: false },
    ]);
    setShowAddressForm(false);
    setNewAddress({
      name: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
    });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter((p) => p.id !== id));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(
      paymentMethods.map((p) => ({ ...p, isDefault: p.id === id })),
    );
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      setSecurityMessage("Passwords do not match");
      return;
    }
    if (passwordData.new.length < 6) {
      setSecurityMessage("Password must be at least 6 characters");
      return;
    }
    // Simulate success
    setSecurityMessage("Password updated successfully");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      // In real app, call API
      console.log("Account deletion requested");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Profile Settings
        </h1>

        {/* Tab navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-[#FF6600] text-[#FF6600]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab content */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Personal Information */}
          {activeTab === "personal" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={avatarPreview}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer"
                  >
                    <FiUpload size={14} className="text-gray-600" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Profile Photo</p>
                  <p className="text-xs text-gray-400">
                    Recommended: 200x200px
                  </p>
                </div>
              </div>

              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.name}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="flex items-center">
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            email: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                      />
                      {user.emailVerified ? (
                        <span className="inline-flex items-center px-2 py-2 bg-green-100 text-green-800 text-xs rounded-r">
                          <FiCheckCircle className="mr-1" size={12} /> Verified
                        </span>
                      ) : (
                        <button className="px-2 py-2 bg-[#FF6600] text-white text-xs rounded-r">
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) =>
                          setPersonalInfo({
                            ...personalInfo,
                            phone: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                      />
                      {user.phoneVerified ? (
                        <span className="inline-flex items-center px-2 py-2 bg-green-100 text-green-800 text-xs rounded-r">
                          <FiCheckCircle className="mr-1" size={12} /> Verified
                        </span>
                      ) : (
                        <button className="px-2 py-2 bg-[#FF6600] text-white text-xs rounded-r">
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth (optional)
                    </label>
                    <input
                      type="date"
                      value={personalInfo.dob}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          dob: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender (optional)
                  </label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        gender: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
                  >
                    Save Changes
                  </button>
                </div>
                {personalSaved && (
                  <p className="text-green-600 text-sm text-right">
                    Profile updated!
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && (
            <div>
              <div className="space-y-3 mb-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {addr.addressLine1}
                          {addr.addressLine2 && `, ${addr.addressLine2}`}
                          <br />
                          {addr.city}, {addr.state} {addr.zip}
                          <br />
                          {addr.country}
                          <br />
                          Phone: {addr.phone}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-xs text-[#FF6600] hover:underline"
                          disabled={addr.isDefault}
                        >
                          Set Default
                        </button>
                        <button className="text-xs text-gray-500 hover:text-[#FF6600]">
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-xs text-gray-500 hover:text-red-600"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!showAddressForm ? (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-[#FF6600] text-sm hover:underline flex items-center gap-1"
                >
                  + Add New Address
                </button>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, name: e.target.value })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, phone: e.target.value })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={newAddress.addressLine1}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          addressLine1: e.target.value,
                        })
                      }
                      className="md:col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Address Line 2 (optional)"
                      value={newAddress.addressLine2}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          addressLine2: e.target.value,
                        })
                      }
                      className="md:col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, city: e.target.value })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="State/Province"
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, state: e.target.value })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="ZIP/Postal Code"
                      value={newAddress.zip}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, zip: e.target.value })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <select
                      value={newAddress.country}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          country: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option>USA</option>
                      <option>Canada</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-sm hover:bg-[#e65c00]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payment Methods */}
          {activeTab === "payment" && (
            <div>
              <div className="space-y-3 mb-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {method.type === "visa" ? "💳 Visa" : "💳 Mastercard"}
                        </div>
                        <div>
                          <p className="font-medium">•••• {method.last4}</p>
                          <p className="text-xs text-gray-500">
                            Expires {method.expiry}
                          </p>
                        </div>
                        {method.isDefault && (
                          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSetDefaultPayment(method.id)}
                          className="text-xs text-[#FF6600] hover:underline"
                          disabled={method.isDefault}
                        >
                          Set Default
                        </button>
                        <button
                          onClick={() => handleDeletePayment(method.id)}
                          className="text-xs text-gray-500 hover:text-red-600"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-[#FF6600] text-sm hover:underline flex items-center gap-1">
                + Add New Card
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Your payment information is encrypted and secure.
              </p>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div>
              <div className="space-y-3">
                <h3 className="font-medium">Email Notifications</h3>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Order updates</span>
                  <input
                    type="checkbox"
                    checked={notifications.emailOrders}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailOrders: e.target.checked,
                      })
                    }
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Promotions and offers</span>
                  <input
                    type="checkbox"
                    checked={notifications.emailPromos}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailPromos: e.target.checked,
                      })
                    }
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Price drop alerts</span>
                  <input
                    type="checkbox"
                    checked={notifications.emailPriceDrops}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailPriceDrops: e.target.checked,
                      })
                    }
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Newsletter</span>
                  <input
                    type="checkbox"
                    checked={notifications.emailNewsletter}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        emailNewsletter: e.target.checked,
                      })
                    }
                  />
                </label>

                <h3 className="font-medium mt-4">SMS Notifications</h3>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Order status</span>
                  <input
                    type="checkbox"
                    checked={notifications.smsOrders}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        smsOrders: e.target.checked,
                      })
                    }
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Delivery updates</span>
                  <input
                    type="checkbox"
                    checked={notifications.smsDelivery}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        smsDelivery: e.target.checked,
                      })
                    }
                  />
                </label>

                <h3 className="font-medium mt-4">Push Notifications</h3>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Enable push notifications</span>
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                  />
                </label>
              </div>
              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div>
              <form
                onSubmit={handlePasswordChange}
                className="space-y-4 max-w-md"
              >
                <h3 className="font-medium">Change Password</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, new: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                    required
                  />
                </div>
                {securityMessage && (
                  <p
                    className={`text-sm ${securityMessage.includes("success") ? "text-green-600" : "text-red-600"}`}
                  >
                    {securityMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
                >
                  Update Password
                </button>
              </form>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`px-3 py-1 rounded text-sm ${
                      twoFactorEnabled
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {twoFactorEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
