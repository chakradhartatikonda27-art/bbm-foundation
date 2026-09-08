const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const crypto = require("crypto");

const adapter = new PrismaBetterSqlite3({
  url: "file:./dev.db"
});
const prisma = new PrismaClient({ adapter });

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

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
          imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800"
        },
        {
          title: "Making A Measurable Difference",
          bullets: "How we study data & predict our impact, How we gather statistics, How we measure our success",
          buttonText: "I want to learn more",
          link: "/impact",
          imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"
        },
        {
          title: "Resources To Create Change",
          bullets: "The BBM Roadmap, Parenting & Care Tips, Advocacy Resources, Our vast library of videos & guides",
          buttonText: "I want to read more",
          link: "/our-work",
          imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800"
        }
      ]
    })
  },
  {
    key: "how_you_can_help",
    content: JSON.stringify({
      sectionTitle: "How You Can Help Orphaned and Vulnerable Children",
      sectionSubtitle: "Join hands to make a direct, tangible difference in a child's life today.",
      card1Title: "Donate to BBM Foundation Today",
      card1Desc: "Be the one to bring a significant, lasting impact to the life of a child. Every contribution directly funds essential education kits, health care, and family preservation.",
      card1PhotoUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1000",
      card1Caption: "❤️ Supporting 500+ vulnerable & orphaned children this year",
      card1Badge1: "100% Direct Field Aid",
      card1Badge2: "Verified Transparent NGO",
      card1Notice: "Tax deductible under applicable guidelines",
      card1ButtonText: "I want to donate",
      card2Title: "Stand with Children in Prayer & Support",
      card2Desc: "Unite in purpose. Transform the world. Join our dedicated support & prayer network.",
      card2Tag: "Prayer & Hope Network",
      card2PhotoUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600",
      card2LinkText: "Join Support Network →",
      card3Title: "Help Children Locally",
      card3Desc: "Join a vibrant community of changemakers—leaders, churches, families, and advocates—working together.",
      card3Tag: "Local Leadership",
      card3PhotoUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600",
      card3LinkText: "Become a Local Leader →"
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

async function main() {
  console.log("Seeding real foundation stories & data...");

  // Clean existing records
  await prisma.user.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.story.deleteMany({});
  await prisma.metric.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.contactMessage.deleteMany({});

  // Create Admin User
  const adminPassword = hashPassword("AdminPassword123!");
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@bbmfoundation.org",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Created Admin User:", superAdmin.email);

  // Seed Site Content
  for (const item of siteContentData) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: { content: item.content },
      create: { key: item.key, content: item.content },
    });
  }
  console.log("Seeded Site Content records!");

  // Create Programs
  const programs = [
    {
      title: "Suraksha Safety & Family Care",
      category: "COMMUNITY",
      description: "Empowering children with family-strengthening programs, structural safety workshops, and local awareness campaigns.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Swashakti Leadership Development",
      category: "YOUTH",
      description: "Fostering self-strength, career guidance, and leadership mentorship to mold youth into confident future community leaders.",
      imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Prerna Quality Education Support",
      category: "EDUCATION",
      description: "Promoting higher school retention rates by distributing learning kits, academic scholarships, and parent-teacher counseling.",
      imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
  ];

  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }

  // Create Stories of Change
  const stories = [
    {
      title: "Refresh Camps 2026 — The Stories That Marked Our Summer",
      author: "ARFO Romania & BBM Regional Team",
      challenge: "Abandonment and exhaustion faced by foster parents, adoptive families, and vulnerable children across community care networks.",
      intervention: "The Refresh Camps brought together open hearts, volunteers, professional foster parents, and foster families for a week where abandonment met resilience and exhaustion met rest.",
      outcome: "What remained afterward wasn't just memories, but living relationships and ongoing community support networks that continue even now.",
      quote: "Encouraging news from ARFO Romania! These are stories not easily forgotten. Refresh Camps brought together open hearts and foster families for a week of rest and resilience.",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
      publishedAt: new Date("2026-09-01"),
    },
    {
      title: "From Overwhelming Need to the Hope of Family in Uganda",
      author: "Uganda Care & Reunification Team",
      challenge: "One young caregiver in Uganda was carrying the overwhelming responsibility of caring for 160 children single-handedly without structural aid.",
      intervention: "Through collaboration, family reunification, foster care systems, and community support, pathways of belonging were established.",
      outcome: "Today, more children are growing up with families, while the caregiver and local community continue building pathways of hope and belonging.",
      quote: "In Uganda, one young caregiver was carrying the overwhelming responsibility of 160 children. Collaboration and foster care brought true family reunification.",
      imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800",
      publishedAt: new Date("2026-08-17"),
    },
    {
      title: "WWO Community Gathering 2026: Global Connections, Local Action",
      author: "Global Leadership & Advocacy Council",
      challenge: "Connecting grassroots changemakers and leaders across nations to coordinate systemic solutions for orphaned children.",
      intervention: "On July 17, WWO Community Gathering 2026 brought together more than 500 people across 58 countries for a shared moment of vision, prayer, learning, and local reflection.",
      outcome: "Under the theme Global Connections, Local Action, leaders explored practical next steps ensuring every child grows up in a safe, loving family and community.",
      quote: "Under the theme Global Connections, Local Action, 500 participants across 58 countries explored how vision becomes real when communities act together.",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
      publishedAt: new Date("2026-07-31"),
    },
    {
      title: "Geeta's Pathway to Educational Excellence & Opportunity",
      author: "BBM Foundation Coordinator",
      challenge: "Geeta belonged to an agricultural family in Shamshabad facing financial hardship that threatened to halt her higher education.",
      intervention: "BBM Foundation stepped in through the Prerna initiative, providing full tuition scholarships and academic counseling.",
      outcome: "Geeta completed her degree in computer applications and secured a position as a junior software assistant.",
      quote: "The foundation lifted the financial burden from my parents, giving me the wings to fly and achieve my dreams.",
      imageUrl: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?q=80&w=800",
      publishedAt: new Date("2026-06-15"),
    },
    {
      title: "Anjali's School Renovation Breakthrough in Bhongir",
      author: "Project Lead Bhongir",
      challenge: "The local government school in Anjali's village lacked sanitation facilities and desks, forcing many girls to drop out.",
      intervention: "BBM Foundation renovated the school, constructed clean toilets, and equipped classrooms with libraries and play areas.",
      outcome: "School attendance surged by 40%. Anjali became school library coordinator and topped her class.",
      quote: "Now we feel proud to come to school every day. The library has opened a whole new world of stories for us.",
      imageUrl: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=800",
      publishedAt: new Date("2026-05-20"),
    },
  ];

  for (const story of stories) {
    await prisma.story.create({ data: story });
  }

  // Create Key Performance Metrics
  const metrics = [
    {
      label: "Children & Families Empowered",
      value: "1,70,000+",
      description: "Deserving children provided with learning kits, family care, and academic support.",
      verified: true,
    },
    {
      label: "Milestone Target (2040)",
      value: "20,00,000",
      description: "Empowering 2 million children & families by 2040.",
      verified: true,
    },
    {
      label: "Schools & Community Centers",
      value: "450+",
      description: "Adopted centers equipped with clean sanitation, libraries, and resources.",
      verified: true,
    },
    {
      label: "Global Country Network",
      value: "58+",
      description: "Nations connected through regional foster and family care initiatives.",
      verified: true,
    },
  ];

  for (const metric of metrics) {
    await prisma.metric.create({ data: metric });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
