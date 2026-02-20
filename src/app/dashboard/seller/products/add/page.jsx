"use client";
import { useState } from "react";
import { FiUpload, FiPlus, FiX } from "react-icons/fi";

export default function AddProductPage() {
  const [images, setImages] = useState([]);
  const [variations, setVariations] = useState([]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name *
              </label>
              <input type="text" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <select className="w-full border p-2 rounded">
                <option>Electronics</option>
                <option>Fashion</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea rows="4" className="w-full border p-2 rounded"></textarea>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative border rounded h-24">
                <img src={img} className="w-full h-full object-cover" />
                <button className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl">
                  <FiX />
                </button>
              </div>
            ))}
            <label className="border rounded h-24 flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <FiUpload />
              <input type="file" multiple className="hidden" />
            </label>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Pricing & Inventory</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">Regular Price *</label>
              <input type="number" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Sale Price</label>
              <input type="number" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">SKU</label>
              <input type="text" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Stock Quantity *</label>
              <input type="number" className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>

        {/* Variations */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Variations</h2>
          <button type="button" className="text-orange flex items-center">
            <FiPlus className="mr-1" /> Add Variation
          </button>
        </div>

        {/* Shipping */}
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-4">Shipping</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Weight (kg)</label>
              <input type="number" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Dimensions (L×W×H cm)</label>
              <input type="text" className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>

        {/* Publish */}
        <div className="flex justify-end space-x-4">
          <button type="button" className="border px-6 py-2 rounded-lg">
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-orange text-white px-6 py-2 rounded-lg"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
