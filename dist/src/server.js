import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courses.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import searchRoutes from "./routes/search.routes.js";
import tierRoutes from "./routes/tiers.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import supportRoutes from "./routes/support.routes";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/tiers", tierRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/support", supportRoutes);
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "kickstart-backend",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime(),
    });
});
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log(`✅ Routes actives : /api/courses, /api/quizzes, /api/search, /api/tiers, /api/ai`);
});
