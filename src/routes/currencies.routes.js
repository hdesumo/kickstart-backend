"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Exemple de route GET
router.get("/", async (req, res) => {
    // Plus tard : remplacer par une requête Prisma
    res.json([
        { code: "XAF", name: "Franc CFA (BEAC)", symbol: "FCFA" },
        { code: "XOF", name: "Franc CFA (UEMOA)", symbol: "FCFA" },
        { code: "GHS", name: "Cedi ghanéen", symbol: "₵" },
        { code: "NGN", name: "Naira nigérian", symbol: "₦" }
    ]);
});
exports.default = router;
//# sourceMappingURL=currencies.routes.js.map