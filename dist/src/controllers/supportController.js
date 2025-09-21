import { prisma } from "../lib/prisma";
// ✅ Créer une nouvelle demande d'assistance
export async function createSupportRequest(req, res) {
    try {
        const { type, userId, name, email, subject, message } = req.body;
        if (!subject || !message) {
            return res.status(400).json({ error: "Sujet et message sont requis." });
        }
        const supportRequest = await prisma.supportRequest.create({
            data: {
                type: type || (userId ? "internal" : "public"),
                userId,
                name,
                email,
                subject,
                message,
            },
        });
        res.status(201).json(supportRequest);
    }
    catch (error) {
        console.error("❌ Erreur création support:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
// ✅ Lister toutes les demandes d’assistance (admin seulement)
export async function listSupportRequests(req, res) {
    try {
        const supportRequests = await prisma.supportRequest.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json({ total: supportRequests.length, supportRequests });
    }
    catch (error) {
        console.error("❌ Erreur récupération support:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
// ✅ Mettre à jour le statut d'une demande
export async function updateSupportRequestStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["open", "in_progress", "closed"].includes(status)) {
            return res.status(400).json({ error: "Statut invalide." });
        }
        const updated = await prisma.supportRequest.update({
            where: { id: Number(id) },
            data: { status },
        });
        res.json(updated);
    }
    catch (error) {
        console.error("❌ Erreur mise à jour support:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
