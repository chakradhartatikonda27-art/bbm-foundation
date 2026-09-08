const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

const siteContentData = [
  {
    key: "branding",
    content: JSON.stringify({
      logoUrl: "/logo.png",
      siteName: "BBM FOUNDATION",
      tagline: "Building Lives • Creating Opportunities • Serving Humanity",
      phone: "+91 8500863000 / +91 9885126368",
      email: "bbmindiafoundation@gmail.com",
      address: "BBM Foundation, Plot No. 42, Green Avenue, Narsipatnam, Visakhapatnam Dist - 531116, Andhra Pradesh",
      registrationNo: "551/401/2026/AP-NSP"
    })
  },
  {
    key: "hero",
    content: JSON.stringify({
      badge: "Instant & Direct Impact",
      title: "YOU CAN PLAY A VITAL ROLE IN ATTAINING A WORLD WITHOUT ORPHANS",
      highlight: "VITAL",
      subtitle: "Everything we do together multiplies, so with your participation, millions of children can grow up in strong families and know their identity with a loving future.",
      primaryCtaText: "Donate Now",
      primaryCtaLink: "/donate",
      secondaryCtaText: "Explore Our Work",
      secondaryCtaLink: "/our-work",
      backgroundImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920"
    })
  },
  {
    key: "action_cards",
    content: JSON.stringify({
      sectionTitle: "Understanding Our Child & Family Mission",
      sectionSubtitle: "How we build a future where every child has a strong family & life opportunities",
      cards: [
        {
          title: "Helping Orphans Through Action",
          bullets: "Family-strengthening programs, Learning communities, Hope groups, Educational initiatives",
          buttonText: "I want to act right now",
          link: "/get-involved",
          imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
        },
        {
          title: "Making A Measurable Difference",
          bullets: "How we study data & predict our impact, How we gather statistics, How we measure our success",
          buttonText: "I want to learn more",
          link: "/impact",
          imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800"
        },
        {
          title: "Resources To Create Change",
          bullets: "The BBM Roadmap, Parenting & Care Tips, Advocacy Resources, Our vast library of videos & guides",
          buttonText: "I want to read more",
          link: "/our-work",
          imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800"
        }
      ]
    })
  },
  {
    key: "mission_vision",
    content: JSON.stringify({
      badge: "Our Mission & Vision",
      heading: "Building Stronger Families & Empowering Communities",
      paragraph1: "BBM Foundation is committed to creating sustainable social change through orphan care, family strengthening, youth mentorship, and education access.",
      paragraph2: "We believe that every child deserves a loving family, quality education, and the opportunity to build a dignified future.",
      imageUrl: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200",
      pillar1Title: "Family Strengthening",
      pillar1Desc: "Preventing child abandonment through family preservation programs.",
      pillar2Title: "Education & Skills",
      pillar2Desc: "Providing quality learning materials and youth vocational training.",
      pillar3Title: "Child Protection",
      pillar3Desc: "Advocating for safe foster care and family-based solutions.",
      pillar4Title: "Community Leadership",
      pillar4Desc: "Equipping local leaders and churches to support vulnerable children."
    })
  },
  {
    key: "callout",
    content: JSON.stringify({
      title: "Join Hands With BBM Foundation Today",
      subtitle: "Together, we can ensure every child grows up in a safe, loving family environment with equal opportunities to thrive.",
      ctaText: "Get Involved Now",
      ctaLink: "/get-involved",
      bgImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600"
    })
  },
  {
    key: "payment_scanner",
    content: JSON.stringify({
      upiId: "QR919885126368-0750@unionbankofindia",
      qrImageUrl: "/union_bank_qr.png",
      accountName: "BBM INDIA FOUNDATION",
      bankName: "Union Bank of India",
      accountNumber: "551401010050750",
      ifscCode: "UBIN0555142",
      branch: "Narsipatnam branch",
      panNumber: "AAFTB3316H",
      taxNote: "BBM Foundation is registered under Section 8(1) of the Companies Act, 2013. Contributions are eligible for statutory receipt audit logging."
    })
  },
  {
    key: "about_page",
    content: JSON.stringify({
      title: "About BBM Foundation",
      subtitle: "Dedicated to orphan care, family preservation, youth empowerment, and community development across India.",
      story: "Founded with a vision to eliminate orphanhood and family crisis, BBM Foundation works tirelessly across South India to strengthen families, mentor youth, and provide holistic care.",
      mission: "To ensure every child grows up in a safe, loving family and receives equal opportunities for education, health, and personal growth.",
      vision: "A world without orphans, where strong families nurture confident, educated, and resilient future leaders.",
      coreValues: "Integrity, Servant Leadership, Compassion, Transparency, and Community Empowerment."
    })
  },
  {
    key: "our_work_page",
    content: JSON.stringify({
      title: "Our Initiatives & Programs",
      subtitle: "Comprehensive social programs focusing on child care, education, youth skills, and emergency relief.",
      overview: "From grass-roots education drives to strategic family reunification, explore our core initiatives across South India."
    })
  },
  {
    key: "impact_page",
    content: JSON.stringify({
      title: "Our Measurable Social Impact",
      subtitle: "Empirical metrics tracking transformed lives, family reunifications, and community developments.",
      highlightMetric: "1,70,000+",
      metricLabel: "Children & Families Direct Impact"
    })
  },
  {
    key: "contact_info",
    content: JSON.stringify({
      primaryEmail: "bbmindiafoundation@gmail.com",
      primaryPhone: "8500863000",
      secondaryPhone: "9885126368",
      officeAddress: "BBM Foundation, Plot No. 42, Green Avenue, Narsipatnam, Visakhapatnam Dist - 531116, Andhra Pradesh",
      operatingHours: "Monday – Saturday: 9:00 AM – 6:00 PM IST",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.5!2d82.6!3d17.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQwJzEyLjAiTiA4MsKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
    })
  },
  {
    key: "transparency_info",
    content: JSON.stringify({
      registrationNo: "551/401/2026/AP-NSP",
      formationDate: "14th January 2026",
      status80G: "In Application / Audit Pending",
      statusFCRA: "Local Contributions Certified",
      primaryBankPartner: "Union Bank of India (Narsipatnam Branch)",
      auditPromise: "BBM Foundation maintains 100% financial transparency. Annual financial statements and independent audit logs are verified by certified chartered accountants."
    })
  },
  {
    key: "footer_info",
    content: JSON.stringify({
      aboutText: "BBM Foundation is a registered non-profit organization dedicated to orphan care, family strengthening, and community empowerment.",
      quickLinksTitle: "Quick Navigation",
      legalLinksTitle: "Legal & Compliance",
      headOffice: "Narsipatnam, Visakhapatnam Dist, AP - 531116",
      corpAddress: "# 4-6-17/1, S1, Kamal's Castle, Savarkar Nagar, Nacharam, Hyd - 500076, Telangana",
      phone: "+91 8500863000 / +91 9885126368",
      email: "bbmindiafoundation@gmail.com",
      copyright: "© BBM FOUNDATION. All Rights Reserved."
    })
  },
  {
    key: "roadmap_page",
    content: JSON.stringify({
      title: "The BBM Roadmap",
      subtitle: "Our 4-quadrant strategic guide for orphanhood prevention, family reunification, and community collaboration.",
      cornerstone1Title: "Prevention",
      cornerstone1Desc: "Strengthening families before crisis occurs through economic enablement, parenting education, and community support networks.",
      cornerstone2Title: "Broadscale Collaboration",
      cornerstone2Desc: "Uniting governments, NGOs, churches, and civic leaders under a shared mission to serve vulnerable children.",
      cornerstone3Title: "Intervention",
      cornerstone3Desc: "Providing immediate foster care, legal protection, and safe havens for children in emergency situations.",
      cornerstone4Title: "Living Refreshed",
      cornerstone4Desc: "Sustaining caregivers and advocates with spiritual renewal, mental health support, and peer hope groups."
    })
  }
];

async function seedSiteContent() {
  console.log("Seeding all 13 site content records into database...");
  for (const item of siteContentData) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: { content: item.content },
      create: { key: item.key, content: item.content },
    });
  }
  console.log("Successfully seeded all 13 site content tabs into database!");
}

seedSiteContent()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
