// components/cart/CartItem.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiHeart } from "react-icons/fi";

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1) {
      setQuantity(newQty);
      onUpdateQuantity(item.id, item.selectedVariant, newQty);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
      onUpdateQuantity(item.id, item.selectedVariant, val);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-200">
      {/* Checkbox (for selection) – we'll add later */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          className="w-4 h-4 text-[#FF6600] border-gray-300 rounded focus:ring-[#FF6600]"
        />
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="flex-1">
        <Link
          href={`/products/${item.id}/${item.slug}`}
          className="text-sm font-medium text-gray-800 hover:text-[#FF6600] line-clamp-2"
        >
          {item.title}
        </Link>
        {item.selectedVariant && (
          <p className="text-xs text-gray-500 mt-1">
            Variant: {item.selectedVariant}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Seller: {item.supplier.name}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onSaveForLater(item)}
            className="text-xs text-gray-500 hover:text-[#FF6600] flex items-center gap-1"
          >
            <FiHeart size={14} />
            Save for later
          </button>
          <button
            onClick={() => onRemove(item.id, item.selectedVariant)}
            className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
          >
            <FiTrash2 size={14} />
            Remove
          </button>
        </div>
      </div>

      {/* Price and quantity */}
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-sm font-medium">${item.priceMin.toFixed(2)}</div>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 hover:bg-gray-100"
          >
            <FiMinus size={14} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            className="w-12 text-center border-x border-gray-300 py-1 text-sm focus:outline-none"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 hover:bg-gray-100"
          >
            <FiPlus size={14} />
          </button>
        </div>
        <div className="font-semibold text-[#FF6600] w-20 text-right">
          ${(item.priceMin * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
