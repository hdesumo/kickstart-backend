import { prisma } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";

// 📌 Utilitaire pour écrire dans les logs locaux
function logSupportRequest(entry: object) {
  const logDir = path.resolve(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  const logFile = path.join(logDir, "support.log");
  const timestamp = new Date().toISOString();
  fs.appendFileSync(
    logFile,
    `[${timestamp}] ${JSON.stringify(entry, null, 2)}\n`
  );
}

// ✅ Création d’une demande de support
export async function createSupportRequest(req: Request, res: Response) {
  try {
    const { type, userId, name, email, subject, message } = req.body;

    if (!type || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Champs requis manquants" });
    }

    const newRequest = await prisma.supportRequest.create({
      data: {
        type,
        userId,
        name,
        email,
        subject,
        message,
      },
    });

    // 📝 Log local
    logSupportRequest({ event: "NEW_SUPPORT_REQUEST", payload: newRequest });

    // 📩 Placeholder pour envoyer un email admin (facile à activer plus tard)
    // await sendAdminNotification(newRequest);

    return res.status(201).json({
      success: true,
      message: "Demande enregistrée avec succès",
      data: newRequest,
    });
  } catch (error: any) {
    console.error("❌ Erreur création support:", error);
    logSupportRequest({ event: "ERROR", message: error.message });
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

// ✅ Récupération de toutes les demandes (avec pagination)
export async function getSupportRequests(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [requests, total] = await Promise.all([
      prisma.supportRequest.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.supportRequest.count(),
    ]);

    return res.json({
      success: true,
      data: requests,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    console.error("❌ Erreur récupération support:", error);
    logSupportRequest({ event: "ERROR", message: error.message });
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}

// ✅ Récupération d’une demande par ID
export async function getSupportRequestById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const request = await prisma.supportRequest.findUnique({
      where: { id: Number(id) },
    });

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Demande introuvable" });
    }

    return res.json({ success: true, data: request });
  } catch (error: any) {
    console.error("❌ Erreur récupération support ID:", error);
    logSupportRequest({ event: "ERROR", message: error.message });
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
}
