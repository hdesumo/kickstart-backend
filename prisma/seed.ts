// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding des notifications...");

  // Efface les anciennes notifications
  await prisma.notification.deleteMany();

  await prisma.notification.createMany({
    data: [
      {
        title: "Bienvenue sur Kickstart Campus 🚀",
        message: "Votre compte a été créé avec succès. Explorez les projets disponibles !",
        read: false,
      },
      {
        title: "Nouveau Quiz Disponible",
        message: "Un nouveau quiz sur Prisma a été ajouté. Testez vos connaissances !",
        read: false,
      },
      {
        title: "Défi du mois",
        message: "Participez au défi d’épargne collectif et gagnez jusqu’à 50 000 FCFA !",
        read: false,
      },
      {
        title: "Projet financé ✅",
        message: "Votre projet ‘Startup Green’ a atteint son objectif de financement.",
        read: true,
      },
      {
        title: "Mise à jour des conditions",
        message: "Veuillez lire nos nouvelles conditions d’utilisation.",
        read: false,
      },
      {
        title: "Classement inter-universités",
        message: "Découvrez où se classe votre université ce mois-ci.",
        read: true,
      }
    ],
  });

  console.log("✅ Seeding terminé !");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur lors du seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
