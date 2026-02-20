import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/home/ProductGrid";
import TradeAssuranceBanner from "@/components/home/TradeAssuranceBanner";

export default function Home() {
  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16">
      <HeroCarousel />
      <CategoryGrid />
      <ProductGrid />
      <TradeAssuranceBanner />
    </div>
  );
}
