"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// ✅ Correction de l'import : suppression de l'extension .js
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const notifications = await prisma_1.prisma.notification.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(notifications);
    }
    catch (error) {
        console.error("Erreur GET /notifications:", error);
        res.status(500).json({ error: "Impossible de récupérer les notifications." });
    }
});
exports.default = router;
//# sourceMappingURL=notifications.routes.js.map