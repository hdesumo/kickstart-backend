import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tiers = await prisma.membershipTier.findMany({
      orderBy: { minMonthlyUsd: "asc" } // ✅ tri logique
    });

    res.json(tiers);
  } catch (error) {
    console.error("Erreur GET /tiers:", error);
    res.status(500).json({ error: "Impossible de récupérer les tiers d'abonnement." });
  }
});

export default router;
