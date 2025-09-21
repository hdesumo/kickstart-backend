import { Router } from "express";
import { prisma } from "../lib/prisma";
import { createSupportRequest, updateSupportRequestStatus, } from "../controllers/supportController";
const router = Router();
/**
 * ✅ Créer une demande d'assistance (publique ou interne)
 * Body: { userId?, name?, email?, subject, message, type? }
 */
router.post("/", createSupportRequest);
/**
 * ✅ Lister avec pagination et filtres
 * Query params:
 *   - status=open|in_progress|closed
 *   - type=public|internal
 *   - page=1
 *   - limit=20
 */
router.get("/", async (req, res) => {
    try {
        const { status, type, page = "1", limit = "20" } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            prisma.supportRequest.findMany({
                where,
                skip,
                take: Number(limit),
                orderBy: { createdAt: "desc" },
            }),
            prisma.supportRequest.count({ where }),
        ]);
        res.json({
            total,
            page: Number(page),
            pageSize: Number(limit),
            items,
        });
    }
    catch (error) {
        console.error("❌ Erreur GET /api/support:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
/**
 * ✅ Récupérer une demande spécifique
 */
router.get("/:id", async (req, res) => {
    try {
        const item = await prisma.supportRequest.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!item)
            return res.status(404).json({ error: "Demande introuvable" });
        res.json(item);
    }
    catch (error) {
        console.error("❌ Erreur GET /api/support/:id:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
/**
 * ✅ Mettre à jour le statut (open → in_progress → closed)
 * Body: { status }
 */
router.patch("/:id/status", updateSupportRequestStatus);
/**
 * ✅ Supprimer une demande (admin)
 */
router.delete("/:id", async (req, res) => {
    try {
        await prisma.supportRequest.delete({
            where: { id: Number(req.params.id) },
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error("❌ Erreur DELETE /api/support/:id:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
export default router;
