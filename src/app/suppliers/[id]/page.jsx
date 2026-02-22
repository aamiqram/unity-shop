// app/suppliers/[id]/page.jsx
import { notFound } from "next/navigation";
import SupplierHeader from "@/components/supplier/SupplierHeader";
import SupplierTabs from "@/components/supplier/SupplierTabs";
import { demoSuppliers } from "@/lib/demoSuppliers";

// Generate static paths for all suppliers
export async function generateStaticParams() {
  return demoSuppliers.map((supplier) => ({
    id: supplier.id,
  }));
}

export default function SupplierPage({ params }) {
  const supplier = demoSuppliers.find((s) => s.id === params.id);

  if (!supplier) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SupplierHeader supplier={supplier} />
      <SupplierTabs supplier={supplier} />
    </div>
  );
}
