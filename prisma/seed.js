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
      imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
    {
      title: "Prerna Quality Education Support",
      category: "EDUCATION",
      description: "Promoting higher school retention rates by distributing learning kits, academic scholarships, and parent-teacher counseling.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      status: "ACTIVE",
      verified: true,
    },
  ];

  for (const prog of programs) {
    await prisma.program.create({ data: prog });
  }

  // Create Stories of Change matching user screenshots from worldwithoutorphans.org/stories
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
