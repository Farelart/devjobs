import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const josephinSans = localFont({
  src: "./fonts/KumbhSans-VariableFont_YOPQ,wght.ttf",
  variable: "--font-kumbh-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Devjobs",
  description: "Jobs for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josephinSans.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
