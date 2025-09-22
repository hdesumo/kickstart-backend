"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const tiers = await prisma_1.prisma.membershipTier.findMany({
            orderBy: { minMonthlyUsd: "asc" } // ✅ tri logique
        });
        res.json(tiers);
    }
    catch (error) {
        console.error("Erreur GET /tiers:", error);
        res.status(500).json({ error: "Impossible de récupérer les tiers d'abonnement." });
    }
});
exports.default = router;
//# sourceMappingURL=tiers.routes.js.map