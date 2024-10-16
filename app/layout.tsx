export const dynamic = "force-dynamic"; // solution that helped to deploy on Vercel

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import NavBar from "@/app/components/nav/NavBar";
import Footer from "@/app/components/footer/footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/actions/getCurrentUser";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Matrick shop",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-state-700`}>
        {/*will add the message about success or error*/}
        <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "rgb(255,255,255)",
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
