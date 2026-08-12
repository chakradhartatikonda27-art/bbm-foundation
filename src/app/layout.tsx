import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BBM FOUNDATION",
    default: "BBM FOUNDATION — Building Lives, Creating Opportunities, Serving Humanity",
  },
  description:
    "BBM FOUNDATION is a social-impact and charitable organization committed to empowering individuals and communities through education, skill development, women's support, youth citizenship, and humanitarian initiatives.",
  keywords: [
    "BBM Foundation",
    "charitable foundation",
    "social impact foundation",
    "community development",
    "education support",
    "skill development",
    "women empowerment",
    "youth development",
    "humanitarian support",
  ],
  openGraph: {
    title: "BBM FOUNDATION",
    description: "Building Lives • Creating Opportunities • Serving Humanity",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBM FOUNDATION",
    description: "Building Lives • Creating Opportunities • Serving Humanity",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-primary">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
