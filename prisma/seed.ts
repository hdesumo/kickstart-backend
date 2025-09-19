import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Devise par défaut
  const currency = await prisma.currency.create({
    data: {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
      isDefault: true,
    },
  });

  // Tier étudiant
  const tier = await prisma.membershipTier.create({
    data: {
      kind: "student",
      minMonthlyUsd: 10,
      currency: currency.code,
      isDefault: true,
    },
  });

  // Country + Campus + Association + Student
  await prisma.country.create({
    data: {
      name: "Senegal",
      code: "SN",
      campuses: {
        create: {
          name: "Dakar Campus",
          associations: {
            create: {
              name: "Developers Club",
              students: {
                create: {
                  fullName: "Jean Dupont",
                  email: "jean.dupont@example.com",
                  tierId: tier.id,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log("✅ Données initiales insérées avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
