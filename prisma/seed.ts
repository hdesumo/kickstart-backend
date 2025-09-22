import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Cours ---
  const courses = await prisma.course.createMany({
    data: [
      {
        title: "Mathématiques pour ingénieurs",
        description:
          "Révisez les bases de l'analyse et de l'algèbre pour les applications en sciences et ingénierie.",
      },
      {
        title: "Physique appliquée",
        description:
          "Cours sur la mécanique, l'électricité et l'optique avec exercices pratiques.",
      },
      {
        title: "Chimie organique",
        description:
          "Introduction à la chimie organique, réactions fondamentales et applications industrielles.",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ ${courses.count} cours insérés.`);

  // --- Plans tarifaires ---
  const tiers = await prisma.tier.createMany({
    data: [
      {
        name: "free",
        labelFr: "Offre Gratuite",
        labelEn: "Free Plan",
        price: 0,
        currency: "XOF",
        featuresFr: JSON.stringify([
          "Épargne jusqu'à 100K FCFA",
          "1 projet maximum",
          "Formation de base",
        ]),
        featuresEn: JSON.stringify([
          "Savings up to 100K FCFA",
          "1 project maximum",
          "Basic training",
        ]),
      },
      {
        name: "premium",
        labelFr: "Premium",
        labelEn: "Premium",
        price: 5000,
        currency: "XOF",
        featuresFr: JSON.stringify([
          "Épargne illimitée",
          "Projets illimités",
          "Mentorat expert",
        ]),
        featuresEn: JSON.stringify([
          "Unlimited savings",
          "Unlimited projects",
          "Expert mentorship",
        ]),
      },
      {
        name: "enterprise",
        labelFr: "Entreprise",
        labelEn: "Enterprise",
        price: 50000,
        currency: "XOF",
        featuresFr: JSON.stringify([
          "Solution pour universités",
          "Branding personnalisé",
          "Support dédié",
        ]),
        featuresEn: JSON.stringify([
          "University solution",
          "Custom branding",
          "Dedicated support",
        ]),
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ ${tiers.count} plans tarifaires insérés.`);

  console.log("🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
