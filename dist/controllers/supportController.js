import { prisma } from "../lib/prisma.js";
/**
 * Crée une nouvelle demande de support (publique ou interne)
 */
export async function createSupportRequest(req, res) {
    try {
        const { type, userId, name, email, subject, message } = req.body;
        if (!type || !["public", "internal"].includes(type)) {
            return res.status(400).json({ error: "Type de demande invalide" });
        }
        const supportRequest = await prisma.supportRequest.create({
            data: {
                type,
                userId: type === "internal" ? userId : null,
                name: type === "public" ? name : null,
                email: type === "public" ? email : null,
                subject,
                message,
                status: "open",
            },
        });
        res.status(201).json({
            message: "Demande de support créée avec succès",
            data: supportRequest,
        });
    }
    catch (error) {
        console.error("Erreur dans createSupportRequest:", error);
        res.status(500).json({ error: "Erreur lors de la création de la demande" });
    }
}
/**
 * Récupère la liste des demandes de support (paginée)
 */
export async function getSupportRequests(req, res) {
    try {
        const page = parseInt(req.query.page || "1");
        const limit = parseInt(req.query.limit || "10");
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            prisma.supportRequest.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.supportRequest.count(),
        ]);
        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: requests,
        });
    }
    catch (error) {
        console.error("Erreur dans getSupportRequests:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des demandes" });
    }
}
/**
 * Récupère une demande spécifique par ID
 */
export async function getSupportRequestById(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        const request = await prisma.supportRequest.findUnique({
            where: { id },
        });
        if (!request) {
            return res.status(404).json({ error: "Demande non trouvée" });
        }
        res.status(200).json(request);
    }
    catch (error) {
        console.error("Erreur dans getSupportRequestById:", error);
        res.status(500).json({ error: "Erreur lors de la récupération de la demande" });
    }
}
/**
 * Met à jour le statut d'une demande (admin)
 */
export async function updateSupportRequestStatus(req, res) {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        if (!status || !["open", "in_progress", "resolved", "closed"].includes(status)) {
            return res.status(400).json({ error: "Statut invalide" });
        }
        const updated = await prisma.supportRequest.update({
            where: { id },
            data: { status },
        });
        res.status(200).json({
            message: "Statut mis à jour avec succès",
            data: updated,
        });
    }
    catch (error) {
        console.error("Erreur dans updateSupportRequestStatus:", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du statut" });
    }
}
/**
 * Supprime une demande de support (admin)
 */
export async function deleteSupportRequest(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID invalide" });
        }
        await prisma.supportRequest.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Erreur dans deleteSupportRequest:", error);
        res.status(500).json({ error: "Erreur lors de la suppression de la demande" });
    }
}
