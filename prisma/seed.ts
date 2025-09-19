// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  // 1️⃣ Currencies (upsert pour éviter les doublons)
  await prisma.currency.upsert({
    where: { code: "USD" },
    update: {},
    create: {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      isDefault: true,
    },
  });

  await prisma.currency.upsert({
    where: { code: "XOF" },
    update: {},
    create: {
      code: "XOF",
      name: "Franc CFA BCEAO",
      symbol: "CFA",
      isDefault: false,
    },
  });

  // 2️⃣ Membership Tiers
  await prisma.membershipTier.createMany({
    data: [
      { kind: "student", minMonthlyUsd: 5, currency: "USD", benefits: "Accès aux ressources premium", isDefault: true },
      { kind: "non_student", minMonthlyUsd: 10, currency: "USD", benefits: "Accès complet + événements", isDefault: false },
    ],
    skipDuplicates: true,
  });

  // 3️⃣ Course
  const course = await prisma.course.upsert({
    where: { id: 1 }, // id arbitraire pour éviter duplication
    update: {},
    create: {
      title: "Introduction à Prisma",
      content: "Cours pour apprendre à utiliser Prisma avec Node.js",
    },
  });

  // 4️⃣ Quiz lié au cours
  const quiz = await prisma.quiz.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Quiz Prisma Basics",
      courseId: course.id,
    },
  });

  // 5️⃣ Questions du quiz
  await prisma.quizQuestion.createMany({
    data: [
      { question: "Qu'est-ce que Prisma ?", answer: "Un ORM pour Node.js", quizId: quiz.id },
      { question: "Quelle commande génère le client ?", answer: "`npx prisma generate`", quizId: quiz.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
