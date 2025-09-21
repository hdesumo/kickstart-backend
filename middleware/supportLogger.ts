import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

const logDir = path.resolve(process.cwd(), "logs");
const logFile = path.join(logDir, "support.log");

// Vérifie que le dossier logs existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export function supportLogger(req: Request, res: Response, next: NextFunction) {
  if (req.method === "POST" && req.path.includes("/api/support")) {
    const timestamp = new Date().toISOString();
    const { type, name, email, subject, message, userId } = req.body;

    const logEntry = `[${timestamp}] TYPE=${type} USER_ID=${userId ?? "anon"} | ${name ?? "N/A"} <${
      email ?? "N/A"
    }> | SUBJECT=${subject ?? "N/A"} | MESSAGE=${message ?? "N/A"}\n`;

    try {
      fs.appendFileSync(logFile, logEntry, { encoding: "utf-8" });
      console.log("📝 Support log enregistré:", logEntry.trim());
    } catch (err) {
      console.error("❌ Erreur lors de l'écriture du support.log:", err);
    }
  }
  next();
}
