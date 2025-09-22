"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/support.routes.ts
const express_1 = require("express");
const supportController_1 = require("../controllers/supportController"); // ✅ sans .js
const router = (0, express_1.Router)();
/**
 * @route POST /api/support
 * @desc Créer une nouvelle demande de support (publique ou interne)
 */
router.post("/", async (req, res) => {
    try {
        await (0, supportController_1.createSupportRequest)(req, res);
    }
    catch (error) {
        console.error("Erreur lors de la création de la demande :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
/**
 * @route GET /api/support
 * @desc Récupérer la liste paginée des demandes
 */
router.get("/", async (req, res) => {
    try {
        await (0, supportController_1.getSupportRequests)(req, res);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des demandes :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
/**
 * @route GET /api/support/:id
 * @desc Récupérer le détail d'une demande par ID
 */
router.get("/:id", async (req, res) => {
    try {
        await (0, supportController_1.getSupportRequestById)(req, res);
    }
    catch (error) {
        console.error("Erreur lors de la récupération de la demande :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
/**
 * @route PATCH /api/support/:id/status
 * @desc Mettre à jour le statut d'une demande (admin/interne)
 */
router.patch("/:id/status", async (req, res) => {
    try {
        await (0, supportController_1.updateSupportRequestStatus)(req, res);
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
/**
 * @route DELETE /api/support/:id
 * @desc Supprimer une demande (si nécessaire, réservé admin)
 */
router.delete("/:id", async (req, res) => {
    try {
        await (0, supportController_1.deleteSupportRequest)(req, res);
    }
    catch (error) {
        console.error("Erreur lors de la suppression de la demande :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
exports.default = router;
//# sourceMappingURL=support.routes.js.map