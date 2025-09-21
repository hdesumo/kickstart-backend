import { Router } from "express";
import { prisma } from "../lib/prisma.js"; // ✅ ESM obligatoire
const router = Router();
// Récupérer tous les tiers (membership tiers)
router.get("/", async (req, res) => {
    try {
        const tiers = await prisma.membershipTier.findMany();
        res.json({ total: tiers.length, tiers });
    }
    catch (err) {
        console.error("Erreur GET /tiers:", err);
        res.status(500).json({ error: "Impossible de récupérer les niveaux." });
    }
});
export default router;
