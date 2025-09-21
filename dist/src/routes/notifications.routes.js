// backend/src/routes/notifications.routes.ts
import { Router } from "express";
import { prisma } from "../lib/prisma";
const router = Router();
// 📌 GET toutes les notifications
router.get("/", async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json({ total: notifications.length, notifications });
    }
    catch (error) {
        console.error("Erreur récupération notifications:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
// 📌 PATCH marquer comme lue
router.patch("/:id/read", async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await prisma.notification.update({
            where: { id: Number(id) },
            data: { read: true },
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: "Impossible de marquer comme lu" });
    }
});
// 📌 DELETE notification
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.notification.delete({ where: { id: Number(id) } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Impossible de supprimer" });
    }
});
export default router;
