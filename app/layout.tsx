import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Montserrat } from "next/font/google";
import SignUpModal from "@/components/modals/SignUpModal";
import ToasterProvider from "@/libs/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Fluffy Life",
  description: "Premium dog care services",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar currentUser={currentUser} />
        <SignUpModal />
        <LoginModal />
        <ToasterProvider />
        <div>{children}</div>
      </body>
      <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
    </html>
  );
}
