import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body
        className="flex flex-col w-full min-h-[100vh] antialiased"
      >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
      </AuthProvider>
      
    </html>
  );
}
