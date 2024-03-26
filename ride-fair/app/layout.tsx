import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Web5Provider from "./lib/store";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className + "bg-neutrals-700"}>
        <main className="bg-neutrals-900 max-w-lg max-h-mobile mx-auto h-screen rounded-md overflow-hidden">
          <Web5Provider>{children}</Web5Provider>
        </main>
      </body>
    </html>
  );
}
