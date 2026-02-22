import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ChatProvider } from "@/context/ChatContext";
import ChatButton from "@/components/chat/ChatButton";
import ChatWindow from "@/components/chat/ChatWindow";
import { CartProvider } from "@/context/CartContext";

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
        <ChatProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 animate-fade-in">{children}</main>
            <ChatWindow />
            <ChatButton /> {/* optional floating chat */}
            <Footer />
          </CartProvider>
        </ChatProvider>
      </body>
    </html>
  );
}
