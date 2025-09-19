"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
// ✅ Lister tous les tiers
router.get("/", async (_req, res) => {
    try {
        const tiers = await prisma_1.prisma.membershipTier.findMany();
        res.json({ total: tiers.length, tiers });
    }
    catch (error) {
        console.error("Erreur GET /tiers :", error);
        res.status(500).json({ error: "Impossible de récupérer les tiers." });
    }
});
// Créer un tier
router.post("/", async (req, res) => {
    try {
        const { kind, minMonthlyUsd, currency, benefits, isDefault } = req.body;
        const tier = await prisma_1.prisma.membershipTier.create({
            data: { kind, minMonthlyUsd, currency, benefits, isDefault },
        });
        res.status(201).json(tier);
    }
    catch (error) {
        console.error("Erreur POST /tiers :", error);
        res.status(500).json({ error: "Impossible de créer le tier." });
    }
});
// Mettre à jour un tier
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { kind, minMonthlyUsd, currency, benefits, isDefault } = req.body;
        const updated = await prisma_1.prisma.membershipTier.update({
            where: { id: Number(id) },
            data: { kind, minMonthlyUsd, currency, benefits, isDefault },
        });
        res.json(updated);
    }
    catch (error) {
        console.error("Erreur PUT /tiers/:id :", error);
        res.status(500).json({ error: "Impossible de mettre à jour le tier." });
    }
});
// Supprimer un tier
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.membershipTier.delete({ where: { id: Number(id) } });
        res.json({ message: "Tier supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur DELETE /tiers/:id :", error);
        res.status(500).json({ error: "Impossible de supprimer le tier." });
    }
});
exports.default = router;
//# sourceMappingURL=tiers.routes.js.map