import ProductDetailB2B from "@/components/product/ProductDetailB2B";
import Link from "next/link";

// This would normally fetch data based on id
export default function ProductPage({ params }) {
  const product = {
    id: params.id,
    title: "Smartphone X10 5G 128GB Unlocked",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    priceTiers: [
      { quantity: "100-499", price: 250 },
      { quantity: "500-999", price: 235 },
      { quantity: "1000+", price: 220 },
    ],
    moq: "100 pieces",
    variants: {
      colors: ["Black", "Silver", "Blue"],
      storage: ["64GB", "128GB", "256GB"],
    },
    supplier: {
      name: "Shenzhen Tech Co.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      location: "Shenzhen, China",
      years: 8,
      responseRate: 95,
      tradeAssurance: true,
    },
    description:
      "<p>This is a premium smartphone with 5G connectivity, 128GB storage, and a powerful camera system. Perfect for bulk orders and customization.</p>",
    specifications: {
      Display: "6.5 inch OLED",
      Processor: "Snapdragon 888",
      RAM: "8GB",
      Battery: "4500mAh",
      OS: "Android 12",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="list-reset flex text-gray-600">
          <li>
            <Link href="/" className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/categories/electronics" className="hover:text-orange-500">
              Electronics
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-medium">{product.title}</li>
        </ol>
      </nav>

      <ProductDetailB2B product={product} />
    </div>
  );
}
