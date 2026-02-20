import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ChatButton from "@/components/common/ChatButton"; // if you have it

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://unity-shop.vercel.app"),
  title: "Unity Shop - Global B2B Marketplace",
  description:
    "Connect with verified suppliers worldwide. Trade with confidence.",
  keywords: "B2B, marketplace, wholesale, suppliers, trade assurance",
  openGraph: {
    title: "Unity Shop",
    description: "Global B2B Marketplace",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 animate-fade-in">{children}</main>
        <Footer />
        <ChatButton /> {/* optional floating chat */}
      </body>
    </html>
  );
}
