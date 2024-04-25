import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Montserrat } from "next/font/google";
import Modal from "@/components/modals/Modal";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Fluffy Life",
  description: "Premium dog care services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        <Modal />
        <div>{children}</div>
      </body>
      <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
    </html>
  );
}
