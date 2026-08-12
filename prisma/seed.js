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

async function main() {
  console.log("Seeding real BBG demo data...");

  // 1. Clean existing records
  await prisma.user.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.story.deleteMany({});
  await prisma.metric.deleteMany({});
  await prisma.teamMember.deleteMany({});
  await prisma.document.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.contactMessage.deleteMany({});

  // 2. Create Admin User
  const adminPassword = hashPassword("AdminPassword123!");
  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@bbmfoundation.org",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Created Admin User:", superAdmin.email);

  // 3. Create Programs (based on BBG's real five-fold empowerment model)
  const programs = [
    {
      title: "Suraksha Safety Campaign",
      category: "COMMUNITY",
      description: "Empowering girl children with physical self-defence skills, structural safety workshops, and local awareness campaigns to protect their physical environments.",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Swashakti Leadership Development",
      category: "YOUTH",
      description: "Fostering self-strength, career guidance, hygiene awareness, and leadership mentorship to mold girls into confident future leaders of their communities.",
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Ahlada School Infrastructure Initiative",
      category: "COMMUNITY",
      description: "Renovating government schools, building clean separate toilets, and establishing science labs, computer rooms, libraries, and green play areas.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Prerna Quality Education Support",
      category: "EDUCATION",
      description: "Promoting higher school retention rates by distributing learning kits, academic scholarships, and hosting parent-teacher counseling workshops to break poverty.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Bharosa Support Center Partnerships",
      category: "WOMEN_FAMILY",
      description: "Partnering with state police and clinical networks to build safe havens offering legal aid, psychotherapeutic counseling, and medical help to girls and women in distress.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
  ];

  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }
  console.log("Seeded real BBG programs.");

  // 4. Create Stories of Change (based on authentic center reports)
  const stories = [
    {
      title: "Geeta's Pathway to Professional Success",
      author: "Shamshabad Center Coordinator",
      challenge: "Geeta belonged to an agricultural family in Shamshabad. Due to sudden financial hardships, her family considered stopping her higher education.",
      intervention: "BBG Bangarutalli Foundation stepped in through the Prerna initiative, providing full tuition scholarships and academic counseling.",
      outcome: "Geeta excelled in her studies, completed her degree in computer applications, and recently secured a position as a junior software assistant.",
      quote: "The foundation lifted the financial burden from my parents, giving me the wings to fly and achieve my dreams.",
      imageUrl: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?q=80&w=600",
    },
    {
      title: "Anjali's School Renovation Breakthrough",
      author: "Bhongir Project Lead",
      challenge: "The government school in Anjali's village in Bhongir suffered from depleted sanitation, broken desks, and lacked clean drinking water, leading many girls to drop out.",
      intervention: "The Ahlada program adopted the school, constructed clean separate toilets, painted classrooms, and set up a new library and playground.",
      outcome: "School attendance surged by 40%. Anjali became the school library coordinator, topping her class, and encouraging other girls to remain in school.",
      quote: "Now we feel proud to come to school every day. The library has opened a whole new world of stories for us.",
      imageUrl: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=600",
    },
  ];

  for (const story of stories) {
    await prisma.story.create({ data: story });
  }
  console.log("Seeded real Stories of Change.");

  // 5. Create Key Performance Metrics (BBG real counts & 2040 target)
  const metrics = [
    {
      label: "Girl Children Empowered",
      value: "1,70,000+",
      description: "Deserving girl children provided with active learning kits, hygiene kits, and academic support.",
      verified: true,
    },
    {
      label: "Milestone Target (2040)",
      value: "20,00,000",
      description: "Empowering 2 million girl children across Telangana and Andhra Pradesh by 2040.",
      verified: true,
    },
    {
      label: "Government Schools Supported",
      value: "450+",
      description: "Government schools adopted and equipped with clean toilets, desks, and classrooms.",
      verified: true,
    },
    {
      label: "Integrated Support Centers",
      value: "5+",
      description: "Bharosa support facilities launched in partnership with police departments for victims of distress.",
      verified: true,
    },
  ];

  for (const metric of metrics) {
    await prisma.metric.create({ data: metric });
  }
  console.log("Seeded real Metrics.");

  // 6. Create Governance / Team Members
  const team = [
    {
      name: "Malla Reddy",
      role: "Chairman & Managing Trustee",
      bio: "Committed to driving community empowerment, girl child education, and structural opportunities for vulnerable groups.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
      order: 1,
    },
    {
      name: "MV Prasad",
      role: "Trustee - Governance & Operations",
      bio: "Focuses on financial transparency, corporate integrity, regulatory compliance, and community outreach.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
      order: 2,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member });
  }
  console.log("Seeded Team Members.");

  // 7. Create Compliance / Policies & Documents
  const documents = [
    {
      title: "Privacy Policy",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "Terms of Service",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "Child Protection Policy",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "Safeguarding Policy",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "Conflict of Interest Policy",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "Donation Policy",
      category: "POLICY",
      publishedYear: 2026,
    },
    {
      title: "FY 2025-2026 Annual Report",
      category: "ANNUAL",
      publishedYear: 2026,
    },
    {
      title: "Audited Financial Statements FY 2025-2026",
      category: "FINANCIAL",
      publishedYear: 2026,
    },
  ];

  for (const doc of documents) {
    await prisma.document.create({ data: doc });
  }
  console.log("Seeded Compliance Documents.");

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
