import Navbar from "@/components/common/Navbar";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/home/ProductGrid";
import TradeAssuranceBanner from "@/components/home/TradeAssuranceBanner";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <CategoryGrid />
        <ProductGrid />
        <TradeAssuranceBanner />
      </main>
      <Footer />
    </>
  );
}
