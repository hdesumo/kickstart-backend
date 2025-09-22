import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import courseRoutes from "./routes/courses.routes";
import quizRoutes from "./routes/quiz.routes";
import searchRoutes from "./routes/search.routes";
import tierRoutes from "./routes/tiers.routes";
import notificationRoutes from "./routes/notifications.routes";
import supportRoutes from "./routes/support.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/tiers", tierRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);

// --- Health check ---
app.get("/ping", (_req, res) => {
  res.send("pong");
});

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
