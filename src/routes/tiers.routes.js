"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Exemple de route GET
router.get("/", async (req, res) => {
    // Plus tard : remplacer par une requête Prisma
    res.json([
        { id: 1, kind: "student", minMonthlyUsd: 3 },
        { id: 2, kind: "non_student", minMonthlyUsd: 10 }
    ]);
});
exports.default = router;
//# sourceMappingURL=tiers.routes.js.map