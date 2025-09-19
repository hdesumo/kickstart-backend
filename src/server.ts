import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import searchRoutes from "./routes/search.routes";
import courseRoutes from "./routes/courses.routes";
import quizRoutes from "./routes/quiz.routes";
import tiersRoutes from "./routes/tiers.routes";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes principales
app.use("/api/search", searchRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/tiers", tiersRoutes);

// Health check endpoint
app.get("/healthz", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ status: "error", database: "unreachable" });
  }
});

// Exemple route: pays
app.get("/countries", async (_req, res) => {
  try {
    const countries = await prisma.country.findMany({
      include: { campuses: true },
    });
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// Fallback pour routes inconnues
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down server...");
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
