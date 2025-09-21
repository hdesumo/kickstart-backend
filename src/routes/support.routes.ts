// backend/src/routes/support.routes.ts
import { Router } from "express";
import {
  createSupportRequest,
  getSupportRequests,
  getSupportRequestById,
} from "../controllers/supportController.js";

const router = Router();

/**
 * @route POST /api/support
 * @desc Crée une nouvelle demande de support (publique ou interne)
 */
router.post("/", async (req, res) => {
  try {
    const supportRequest = await createSupportRequest(req.body);
    res.status(201).json(supportRequest);
  } catch (error) {
    console.error("❌ Erreur création support:", error);
    res.status(500).json({ error: "Impossible de créer la demande de support" });
  }
});

/**
 * @route GET /api/support
 * @desc Récupère toutes les demandes de support avec pagination & filtrage
 * Query params : page, limit, type
 */
router.get("/", async (req, res) => {
  try {
    const { page, limit, type } = req.query;
    const requests = await getSupportRequests({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      type: type as "public" | "internal" | undefined,
    });
    res.json(requests);
  } catch (error) {
    console.error("❌ Erreur récupération support:", error);
    res.status(500).json({ error: "Impossible de récupérer les demandes" });
  }
});

/**
 * @route GET /api/support/:id
 * @desc Récupère une demande spécifique
 */
router.get("/:id", async (req, res) => {
  try {
    const request = await getSupportRequestById(Number(req.params.id));
    if (!request) {
      return res.status(404).json({ error: "Demande introuvable" });
    }
    res.json(request);
  } catch (error) {
    console.error("❌ Erreur récupération demande support:", error);
    res.status(500).json({ error: "Impossible de récupérer cette demande" });
  }
});

export default router;
