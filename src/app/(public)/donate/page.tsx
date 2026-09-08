import type { Metadata } from "next";
import DonatePageClient from "@/components/DonatePageClient";

export const metadata: Metadata = {
  title: "Donate & Support",
  description: "Make a direct contribution or tax-deductible donation to fund BBM Foundation child welfare, education, women empowerment, and emergency relief programs.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Donate & Support | BBM FOUNDATION",
    description: "Empower lives through education, health, and skill training programs across India.",
    url: "https://bbmfoundation.online/donate",
  },
};

export default function DonatePage() {
  return <DonatePageClient />;
}
