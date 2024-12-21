import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { DataProvider } from "@/context/DataContext";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MyImaginator",
  description: "Your ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <DataProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1"> {children}</main>
            <Footer />
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
