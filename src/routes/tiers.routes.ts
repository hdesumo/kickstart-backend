import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// ✅ Lister tous les tiers
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tiers = await prisma.membershipTier.findMany();
    res.json({ total: tiers.length, tiers });
  } catch (error) {
    console.error("Erreur GET /tiers :", error);
    res.status(500).json({ error: "Impossible de récupérer les tiers." });
  }
});

// Créer un tier
router.post("/", async (req: Request, res: Response) => {
  try {
    const { kind, minMonthlyUsd, currency, benefits, isDefault } = req.body;

    const tier = await prisma.membershipTier.create({
      data: { kind, minMonthlyUsd, currency, benefits, isDefault },
    });

    res.status(201).json(tier);
  } catch (error) {
    console.error("Erreur POST /tiers :", error);
    res.status(500).json({ error: "Impossible de créer le tier." });
  }
});

// Mettre à jour un tier
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { kind, minMonthlyUsd, currency, benefits, isDefault } = req.body;

    const updated = await prisma.membershipTier.update({
      where: { id: Number(id) },
      data: { kind, minMonthlyUsd, currency, benefits, isDefault },
    });

    res.json(updated);
  } catch (error) {
    console.error("Erreur PUT /tiers/:id :", error);
    res.status(500).json({ error: "Impossible de mettre à jour le tier." });
  }
});

// Supprimer un tier
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.membershipTier.delete({ where: { id: Number(id) } });

    res.json({ message: "Tier supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /tiers/:id :", error);
    res.status(500).json({ error: "Impossible de supprimer le tier." });
  }
});

export default router;
