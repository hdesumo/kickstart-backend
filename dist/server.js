import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courses.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import searchRoutes from "./routes/search.routes.js";
import tierRoutes from "./routes/tiers.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";
import supportRoutes from "./routes/support.routes.js";
import aiRoutes from "./routes/ai.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "kickstart-backend",
        environment: process.env.NODE_ENV || "production",
        uptime: process.uptime(),
    });
});
// Routes API
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/tiers", tierRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/ai", aiRoutes);
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
