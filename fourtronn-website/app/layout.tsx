import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fourtronn Energy Systems | UPS, Batteries, Solar & Water Purifiers in Salem",
  description: "Leading provider of UPS, Batteries, Solar Solutions & Water Purifiers in Salem. Quality products with excellent service across India. Shop online for energy solutions.",
  keywords: "UPS Salem, Battery Salem, Solar Panels Salem, Water Purifier Salem, Inverter Battery, Solar UPS, RO Water Purifier, Car Battery, Motorcycle Battery, Fourtronn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
