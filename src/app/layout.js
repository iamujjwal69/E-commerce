import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amazon India — Online Shopping",
  description: "Online shopping for Electronics, Books, Clothing & Fashion, Home & Kitchen from a great selection at everyday low prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#eaeded' }}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <AuthModal />
              <Navbar />
              <main style={{ minHeight: '80vh' }}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

