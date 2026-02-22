// app/dashboard/seller/products/edit/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SellerLayout from "@/components/seller/SellerLayout";
import ProductForm from "@/components/seller/ProductForm";
import { demoProducts } from "@/lib/demoProducts";

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const found = demoProducts.find((p) => p.id === params.id);
      // Enhance with additional fields for editing
      if (found) {
        setProduct({
          ...found,
          sku: `SKU-${found.id}`,
          stock: Math.floor(Math.random() * 100) + 10,
          status: "active",
          // ... other fields
        });
      }
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading)
    return (
      <SellerLayout>
        <div>Loading...</div>
      </SellerLayout>
    );
  if (!product)
    return (
      <SellerLayout>
        <div>Product not found</div>
      </SellerLayout>
    );

  return (
    <SellerLayout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Product</h1>
        <ProductForm initialData={product} isEditing />
      </div>
    </SellerLayout>
  );
}
