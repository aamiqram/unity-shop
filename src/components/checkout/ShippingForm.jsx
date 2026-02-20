"use client";
import { useState } from "react";

export default function ShippingForm({ onSubmit, initialData }) {
  const [addresses, setAddresses] = useState([
    {
      id: "addr1",
      name: "John Doe",
      phone: "+1 234 567 890",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: "addr2",
      name: "John Doe",
      phone: "+1 987 654 321",
      line1: "456 Oak Ave",
      line2: "",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
      isDefault: false,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || "",
  );
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    setDefault: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = showNewForm
      ? newAddress
      : addresses.find((a) => a.id === selectedAddress);
    onSubmit(address);
  };

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

      {!showNewForm && (
        <>
          <div className="space-y-3 mb-4">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`block p-4 border rounded-lg cursor-pointer ${
                  selectedAddress === addr.id
                    ? "border-orange bg-orange/5"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="radio"
                    name="address"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="mt-1 mr-3 accent-orange"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{addr.phone}</p>
                    <p className="text-sm text-gray-600">
                      {addr.line1}
                      {addr.line2 && `, ${addr.line2}`}
                      <br />
                      {addr.city}, {addr.state} {addr.zip}
                      <br />
                      {addr.country}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowNewForm(true)}
            className="text-orange hover:underline mb-4"
          >
            + Add New Address
          </button>
        </>
      )}

      {showNewForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleNewAddressChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={newAddress.phone}
                onChange={handleNewAddressChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="line1"
              value={newAddress.line1}
              onChange={handleNewAddressChange}
              required
              className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              name="line2"
              value={newAddress.line2}
              onChange={handleNewAddressChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                State/Province *
              </label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                ZIP/Postal *
              </label>
              <input
                type="text"
                name="zip"
                value={newAddress.zip}
                onChange={handleNewAddressChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Country *
              </label>
              <select
                name="country"
                value={newAddress.country}
                onChange={handleNewAddressChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange"
              >
                <option>USA</option>
                <option>Canada</option>
                <option>UK</option>
              </select>
            </div>
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="setDefault"
              checked={newAddress.setDefault}
              onChange={handleNewAddressChange}
              className="accent-orange"
            />
            <span className="text-sm">Set as default address</span>
          </label>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange/90"
            >
              Continue to Payment
            </button>
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!showNewForm && (
        <button
          onClick={handleSubmit}
          className="bg-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange/90"
        >
          Continue to Payment
        </button>
      )}
    </div>
  );
}
