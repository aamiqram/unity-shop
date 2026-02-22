// app/products/[id]/page.jsx
import { notFound } from "next/navigation";
import ProductDetailB2B from "@/components/product/ProductDetailB2B";
import { demoProducts } from "@/lib/demoProducts";

// In a real app, you'd fetch from an API
export async function generateStaticParams() {
  return demoProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }) {
  const product = demoProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailB2B product={product} />
    </div>
  );
}
