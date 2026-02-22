// components/supplier/SupplierProducts.jsx
import ProductCardB2B from "../product/ProductCardB2B";
import { demoProducts } from "@/lib/demoProducts";

const SupplierProducts = ({ supplier }) => {
  const supplierProducts = demoProducts.filter(
    (p) => p.supplier.name === supplier.name,
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        All Products ({supplierProducts.length})
      </h2>
      {supplierProducts.length === 0 ? (
        <p className="text-gray-500">No products found for this supplier.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {supplierProducts.map((product) => (
            <ProductCardB2B key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierProducts;
