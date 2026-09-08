import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bbmfoundation.online"),
  title: {
    template: "%s | BBM FOUNDATION",
    default: "BBM FOUNDATION — Building Lives, Creating Opportunities, Serving Humanity",
  },
  description:
    "BBM FOUNDATION is a registered social-impact and charitable organization committed to empowering individuals and communities through education, skill development, women's support, youth citizenship, and humanitarian initiatives.",
  keywords: [
    "BBM Foundation",
    "BBM India Foundation",
    "Dr B Giribabu",
    "Narsipatnam NGO",
    "charitable foundation India",
    "social impact foundation",
    "community development",
    "education support",
    "skill development",
    "women empowerment",
    "youth development",
    "humanitarian support",
    "donate NGO India",
  ],
  authors: [{ name: "BBM Foundation", url: "https://bbmfoundation.online" }],
  creator: "BBM Foundation",
  publisher: "BBM Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BBM FOUNDATION — Building Lives, Creating Opportunities, Serving Humanity",
    description: "Empowering communities through education, health, women's support, and humanitarian initiatives in India.",
    url: "https://bbmfoundation.online",
    siteName: "BBM FOUNDATION",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "BBM Foundation Community Initiatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BBM FOUNDATION — Building Lives, Creating Opportunities, Serving Humanity",
    description: "Empowering communities through education, health, women's support, and humanitarian initiatives in India.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

