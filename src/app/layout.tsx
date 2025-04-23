import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SleepDiary - Track Your Sleep Patterns",
  description: "A cute, interactive sleep diary to help you track, understand, and improve your sleep patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16 overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
