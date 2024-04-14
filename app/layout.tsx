import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RideFair",
  description: "Decentralized ride-sharing app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-neutrals-700"}>
        <main className="bg-neutrals-900 max-w-lg h-screen mx-auto rounded-md overflow-hidden">
          <ContextProvider>{children}</ContextProvider>
        </main>
      </body>
    </html>
  );
}
