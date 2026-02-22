// components/checkout/ShippingForm.jsx
"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const dummyAddresses = [
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

const ShippingForm = ({ onNext, shippingInfo, setShippingInfo }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(
    dummyAddresses.find((a) => a.isDefault)?.id || null,
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
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

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    const addr = dummyAddresses.find((a) => a.id === id);
    if (addr) {
      setShippingInfo(addr);
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    // In a real app, you'd save to backend
    const newId = Date.now();
    const addr = { ...newAddress, id: newId, isDefault: false };
    dummyAddresses.push(addr);
    setSelectedAddressId(newId);
    setShippingInfo(addr);
    setShowNewAddressForm(false);
    // Reset form
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

  const handleContinue = () => {
    if (selectedAddressId) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

      {/* Saved addresses */}
      <div className="space-y-3 mb-4">
        {dummyAddresses.map((addr) => (
          <label
            key={addr.id}
            className={`flex items-start p-4 border rounded-lg cursor-pointer ${
              selectedAddressId === addr.id
                ? "border-[#FF6600] bg-orange-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="shippingAddress"
              value={addr.id}
              checked={selectedAddressId === addr.id}
              onChange={() => handleSelectAddress(addr.id)}
              className="mt-1 mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{addr.name}</span>
                {addr.isDefault && (
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
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
          </label>
        ))}
      </div>

      {/* Add new address button */}
      {!showNewAddressForm && (
        <button
          onClick={() => setShowNewAddressForm(true)}
          className="flex items-center gap-2 text-[#FF6600] text-sm hover:underline mb-4"
        >
          <FiPlus size={16} />
          Add New Address
        </button>
      )}

      {/* New address form */}
      {showNewAddressForm && (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-3">New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={newAddress.phone}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                name="addressLine1"
                value={newAddress.addressLine1}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Address Line 2 (optional)
              </label>
              <input
                type="text"
                name="addressLine2"
                value={newAddress.addressLine2}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                State/Province
              </label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                name="zip"
                value={newAddress.zip}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Country
              </label>
              <select
                name="country"
                value={newAddress.country}
                onChange={handleNewAddressChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
                <option>Australia</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> Set as default
            </label>
            <button
              onClick={handleAddNewAddress}
              className="bg-[#FF6600] text-white px-4 py-2 rounded-md text-sm hover:bg-[#e65c00]"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowNewAddressForm(false)}
              className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleContinue}
          disabled={!selectedAddressId}
          className="px-6 py-3 bg-[#FF6600] text-white rounded-md font-medium hover:bg-[#e65c00] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default ShippingForm;
