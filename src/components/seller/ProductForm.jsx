// components/seller/ProductForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiUpload,
  FiTrash2,
  FiPlus,
  FiX,
  FiSave,
  FiEye,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";

const categories = {
  Electronics: {
    sub: ["Mobile Phones", "Laptops", "Cameras", "Audio", "Wearables"],
    attributes: ["Brand", "Model", "Warranty", "Power"],
  },
  Fashion: {
    sub: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"],
    attributes: ["Material", "Size", "Color", "Care Instructions"],
  },
  "Home & Garden": {
    sub: ["Furniture", "Decor", "Kitchen", "Garden"],
    attributes: ["Material", "Dimensions", "Weight", "Assembly Required"],
  },
  // Add more as needed
};

const ProductForm = ({ initialData = null, isEditing = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    shortDescription: initialData?.shortDescription || "",
    category: initialData?.category || "",
    subCategory: initialData?.subCategory || "",
    brand: initialData?.brand || "",
    tags: initialData?.tags || [],
    images: initialData?.images || [],
    video: initialData?.video || "",
    price: initialData?.price || "",
    salePrice: initialData?.salePrice || "",
    saleStart: initialData?.saleStart || "",
    saleEnd: initialData?.saleEnd || "",
    cost: initialData?.cost || "",
    sku: initialData?.sku || "",
    barcode: initialData?.barcode || "",
    stock: initialData?.stock || "",
    lowStockAlert: initialData?.lowStockAlert || "",
    allowBackorders: initialData?.allowBackorders || false,
    stockStatus: initialData?.stockStatus || "in_stock",
    hasVariations: initialData?.hasVariations || false,
    variations: initialData?.variations || [],
    weight: initialData?.weight || "",
    dimensions: { length: "", width: "", height: "" },
    shippingClass: initialData?.shippingClass || "",
    freeShipping: initialData?.freeShipping || false,
    processingTime: initialData?.processingTime || "1-3",
    attributes: initialData?.attributes || [],
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    slug: initialData?.slug || "",
    status: initialData?.status || "draft",
    visibility: initialData?.visibility || "public",
    featured: initialData?.featured || false,
    publishDate: initialData?.publishDate || "",
  });

  const [tagInput, setTagInput] = useState("");
  const [selectedMainCat, setSelectedMainCat] = useState(formData.category);
  const [selectedSubCat, setSelectedSubCat] = useState(formData.subCategory);
  const [variationTypes, setVariationTypes] = useState([]); // e.g., { name: "Color", values: ["Red", "Blue"] }
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Derived categories list
  const mainCategories = Object.keys(categories);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDimensionChange = (dim, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dim]: value },
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, event.target.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddVariationType = () => {
    setVariationTypes([...variationTypes, { name: "", values: [] }]);
  };

  const handleVariationTypeChange = (index, field, value) => {
    const updated = [...variationTypes];
    updated[index][field] = value;
    setVariationTypes(updated);
  };

  const handleAddVariationValue = (index, value) => {
    if (!value.trim()) return;
    const updated = [...variationTypes];
    updated[index].values = [...updated[index].values, value.trim()];
    setVariationTypes(updated);
  };

  const handleRemoveVariationValue = (typeIndex, valueIndex) => {
    const updated = [...variationTypes];
    updated[typeIndex].values = updated[typeIndex].values.filter(
      (_, i) => i !== valueIndex,
    );
    setVariationTypes(updated);
  };

  const generateVariations = () => {
    // Simple Cartesian product of variation types
    // For demo, we just set a flag
    setFormData((prev) => ({ ...prev, hasVariations: true }));
    // In real app, you'd generate combinations table
  };

  const handleAddAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { name: "", value: "" }],
    }));
  };

  const handleAttributeChange = (index, field, value) => {
    const updated = [...formData.attributes];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, attributes: updated }));
  };

  const handleRemoveAttribute = (index) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (publish) {
      setFormData((prev) => ({ ...prev, status: "published" }));
    }
    setSaving(false);
    // Redirect to products list after save
    router.push("/dashboard/seller/products");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      // API call
      router.push("/dashboard/seller/products");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main form */}
      <div className="flex-1 space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Rich text editor can be integrated later
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange(e);
                    setSelectedMainCat(e.target.value);
                    setFormData((prev) => ({ ...prev, subCategory: "" }));
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                >
                  <option value="">Select Category</option>
                  {mainCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-category
                </label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  disabled={!formData.category}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600] disabled:bg-gray-100"
                >
                  <option value="">Select Sub-category</option>
                  {formData.category &&
                    categories[formData.category]?.sub.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand (optional)
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords / Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  placeholder="Add a tag"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Images & Media */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Images & Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Product Image (required)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square bg-gray-100 rounded border border-gray-200"
                  >
                    <Image
                      src={img}
                      alt={`Product ${idx}`}
                      fill
                      className="object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-red-50"
                    >
                      <FiTrash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600]">
                  <FiUpload className="text-gray-400" size={24} />
                  <span className="text-xs text-gray-500 mt-1">Upload</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Drag & drop or click to upload (max 8 images)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Video (optional)
              </label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleInputChange}
                placeholder="YouTube or Vimeo URL"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Pricing & Inventory */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regular Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
            </div>

            {formData.salePrice && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale Start Date
                  </label>
                  <input
                    type="date"
                    name="saleStart"
                    value={formData.saleStart}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sale End Date
                  </label>
                  <input
                    type="date"
                    name="saleEnd"
                    value={formData.saleEnd}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost per item (for profit tracking)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Barcode (UPC, ISBN)
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  name="lowStockAlert"
                  value={formData.lowStockAlert}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="allowBackorders"
                  checked={formData.allowBackorders}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">Allow backorders</span>
              </label>
              <select
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="made_to_order">Made to Order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Variations */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Variations</h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasVariations"
                checked={formData.hasVariations}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm">
                This product has variations (e.g., size, color)
              </span>
            </label>

            {formData.hasVariations && (
              <>
                {variationTypes.map((type, idx) => (
                  <div key={idx} className="border border-gray-200 p-3 rounded">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Variation name (e.g., Color)"
                        value={type.name}
                        onChange={(e) =>
                          handleVariationTypeChange(idx, "name", e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                      />
                      <button
                        onClick={() =>
                          setVariationTypes(
                            variationTypes.filter((_, i) => i !== idx),
                          )
                        }
                        className="text-red-500"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {type.values.map((val, vIdx) => (
                        <span
                          key={vIdx}
                          className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                          {val}
                          <button
                            onClick={() =>
                              handleRemoveVariationValue(idx, vIdx)
                            }
                          >
                            <FiX size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add value"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddVariationValue(idx, e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddVariationType}
                  className="flex items-center gap-1 text-[#FF6600] text-sm"
                >
                  <FiPlus size={16} /> Add another variation type
                </button>

                {variationTypes.length > 0 && (
                  <button
                    onClick={generateVariations}
                    className="mt-2 px-4 py-2 bg-[#FF6600] text-white rounded text-sm hover:bg-[#e65c00]"
                  >
                    Generate Variations
                  </button>
                )}

                {/* In a real app, you'd display a table of generated combinations here */}
                {formData.hasVariations && (
                  <p className="text-sm text-gray-500 mt-2">
                    Variation table would appear here with price/stock per
                    combination.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Section 5: Shipping */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Shipping</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions (cm)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="L"
                    value={formData.dimensions.length}
                    onChange={(e) =>
                      handleDimensionChange("length", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <span>x</span>
                  <input
                    type="number"
                    placeholder="W"
                    value={formData.dimensions.width}
                    onChange={(e) =>
                      handleDimensionChange("width", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <span>x</span>
                  <input
                    type="number"
                    placeholder="H"
                    value={formData.dimensions.height}
                    onChange={(e) =>
                      handleDimensionChange("height", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Class
              </label>
              <select
                name="shippingClass"
                value={formData.shippingClass}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Standard</option>
                <option value="express">Express</option>
                <option value="freight">Freight</option>
              </select>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="freeShipping"
                checked={formData.freeShipping}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm">Free shipping</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Processing Time
              </label>
              <select
                name="processingTime"
                value={formData.processingTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="1-3">1-3 business days</option>
                <option value="3-5">3-5 business days</option>
                <option value="5-7">5-7 business days</option>
                <option value="7-14">1-2 weeks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 6: Attributes (category-specific) */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Attributes</h2>
          {formData.category && (
            <p className="text-sm text-gray-500 mb-2">
              Category-specific attributes for {formData.category}
            </p>
          )}
          <div className="space-y-2">
            {formData.attributes.map((attr, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Attribute name"
                  value={attr.name}
                  onChange={(e) =>
                    handleAttributeChange(idx, "name", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) =>
                    handleAttributeChange(idx, "value", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => handleRemoveAttribute(idx)}
                  className="text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddAttribute}
              className="flex items-center gap-1 text-[#FF6600] text-sm"
            >
              <FiPlus size={16} /> Add attribute
            </button>
          </div>
        </div>

        {/* Section 7: SEO */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Recommended: 50-60 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
              <p className="text-xs text-gray-400 mt-1">
                Recommended: 150-160 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6600]"
              />
              <p className="text-xs text-gray-400 mt-1">
                e.g., wireless-earbuds
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky sidebar */}
      <div className="lg:w-80">
        <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24 space-y-4">
          <h3 className="font-semibold">Publish</h3>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Visibility
            </label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="public">Public</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm">Featured product</span>
          </label>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Publish Date
            </label>
            <input
              type="datetime-local"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <hr />

          <button
            onClick={() => setPreviewMode(true)}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-sm hover:bg-gray-50"
          >
            <FiEye size={16} /> Preview
          </button>

          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-gray-100 rounded py-2 text-sm hover:bg-gray-200 disabled:opacity-50"
          >
            <FiSave size={16} /> Save as Draft
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="w-full bg-[#FF6600] text-white rounded py-2 text-sm hover:bg-[#e65c00] disabled:opacity-50"
          >
            Publish
          </button>

          {isEditing && (
            <button
              onClick={handleDelete}
              className="w-full text-red-600 border border-red-300 rounded py-2 text-sm hover:bg-red-50"
            >
              Delete Product
            </button>
          )}
        </div>
      </div>

      {/* Preview modal (simplified) */}
      {previewMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewMode(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">
              {formData.name || "Product Preview"}
            </h2>
            <p className="text-gray-600 mb-4">{formData.shortDescription}</p>
            <div className="aspect-square bg-gray-100 rounded mb-4">
              {formData.images[0] && (
                <Image
                  src={formData.images[0]}
                  alt="Preview"
                  width={400}
                  height={400}
                  className="object-cover rounded"
                />
              )}
            </div>
            <p className="text-2xl font-bold text-[#FF6600]">
              ${formData.price}
            </p>
            <button
              onClick={() => setPreviewMode(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
