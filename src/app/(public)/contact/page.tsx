export const dynamic = "force-dynamic";

import ContactClient from "./ContactClient";
import { getSiteContent } from "@/lib/siteContent";

export const metadata = {
  title: "Contact Us — BBM Foundation",
  description: "Get in touch with BBM Foundation Secretariat, leadership team, and regional office locations.",
};

export default async function ContactPage() {
  const defaultContact = {
    title: "Connect With Our Office",
    subtitle: "Have questions about our programs, audit reports, or want to coordinate support? Get in touch with our coordination team.",
    leaderName: "Dr. B. Giribabu",
    leaderRole: "President & Managing Trustee",
    regAddress: "# 3-150, Main Street, Bypureddy Palem, Narsipatnam, Anakapalli Dist., A.P. - 531116",
    corpAddress: "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana",
    phone: "+91 8500863000 / +91 9885126368",
    email: "bbmindiafoundation@gmail.com",
  };

  const contactInfo = await getSiteContent("contact_info", defaultContact);

  return <ContactClient contactInfo={contactInfo} />;
}
