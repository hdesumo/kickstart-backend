import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ total: notifications.length, notifications });
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération notifications" });
  }
});

export default router;
