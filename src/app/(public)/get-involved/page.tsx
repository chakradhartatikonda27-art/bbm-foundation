import type { Metadata } from "next";
import GetInvolvedClient from "@/components/GetInvolvedClient";

export const metadata: Metadata = {
  title: "Get Involved — Volunteer & CSR Partnerships",
  description: "Join BBM Foundation as a volunteer, coordinate corporate CSR partnerships, or direct sponsorships to empower local communities across India.",
  alternates: {
    canonical: "/get-involved",
  },
  openGraph: {
    title: "Get Involved — Volunteer & CSR Partnerships | BBM FOUNDATION",
    description: "Empower communities through volunteerism and strategic corporate partnerships.",
    url: "https://bbmfoundation.online/get-involved",
  },
};

export default function GetInvolvedPage() {
  return <GetInvolvedClient />;
}
