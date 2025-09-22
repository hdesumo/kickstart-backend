import { Router } from "express";
// ✅ Correction de l'import : suppression de l'extension .js
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(notifications);
  } catch (error) {
    console.error("Erreur GET /notifications:", error);
    res.status(500).json({ error: "Impossible de récupérer les notifications." });
  }
});

export default router;
