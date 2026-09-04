import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/siteContent";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerInfo = await getSiteContent("footer_info", {
    description: "A premium social-impact and charitable foundation committed to creating meaningful change through service, opportunity creation, community development, and humanitarian initiatives.",
    regAddress: "# 3-150, Main Street, Bypureddy Palem, Narsipatnam, Anakapalli Dist., A.P. - 531116",
    corpAddress: "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana",
    phone: "+91 8500863000 / +91 9885126368",
    email: "bbmindiafoundation@gmail.com",
    copyright: "© BBM FOUNDATION. All Rights Reserved.",
  });

  const branding = await getSiteContent("branding", {
    logoUrl: "/logo.png",
    siteName: "BBM FOUNDATION",
    tagline: "Building Lives • Creating Opportunities • Serving Humanity",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar branding={branding} />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer footerInfo={footerInfo} branding={branding} />
    </div>
  );
}
