"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiHeart } from "react-icons/fi";

export default function CartItem({
  item,
  sellerId,
  onUpdate,
  onRemove,
  onSaveLater,
}) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    if (newQty > item.stock) {
      alert(`Only ${item.stock} items in stock`);
      return;
    }
    setQuantity(newQty);
    onUpdate(sellerId, item.id, { quantity: newQty });
  };

  return (
    <div className="flex p-4 border-b last:border-b-0">
      {/* Checkbox */}
      <div className="mr-4 flex items-start pt-2">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={(e) =>
            onUpdate(sellerId, item.id, { selected: e.target.checked })
          }
          className="w-5 h-5 accent-orange"
        />
      </div>

      {/* Product image */}
      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-20 h-20 border rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-medium hover:text-orange line-clamp-2"
            >
              {item.name}
            </Link>
            {item.variant && (
              <p className="text-sm text-gray-500">{item.variant}</p>
            )}
            <p className="text-sm text-gray-500">
              Stock: {item.stock > 10 ? "In Stock" : `Only ${item.stock} left`}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-orange">
              ${item.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">each</p>
          </div>
        </div>

        {/* Actions & quantity */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 border-r hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-1 w-12 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 border-l hover:bg-gray-100"
              disabled={quantity >= item.stock}
            >
              +
            </button>
          </div>
          <div className="flex space-x-3 text-sm">
            <button
              onClick={() => onSaveLater(sellerId, item.id)}
              className="text-gray-500 hover:text-orange flex items-center"
            >
              <FiHeart className="mr-1" /> Save for later
            </button>
            <button
              onClick={() => onRemove(sellerId, item.id)}
              className="text-gray-500 hover:text-red-600 flex items-center"
            >
              <FiTrash2 className="mr-1" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
