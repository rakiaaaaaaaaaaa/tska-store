import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
// Tailwind styles
import "./globals.css";

import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import CartDrawer from '@/app/components/layout/CartDrawer';
import ToastProvider from '@/app/components/ui/Toast';
import StoreHydration from '@/app/components/StoreHydration';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tska Store — Porte l\'Inattendu',
  description:
    "Casquettes, robes, vêtements et plus — un style soigné pour ceux qui se démarquent.",
  keywords: ['streetwear', 'lifestyle', 'mode', 'casquettes', 'robes', 'tska'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-ui bg-brand-surface text-brand-ink antialiased">
        <StoreHydration />
        <Navbar />
        <CartDrawer />
        <ToastProvider />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
