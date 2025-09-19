"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const tiers_routes_1 = __importDefault(require("./routes/tiers.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Montage des routes principales
app.use("/api/search", search_routes_1.default);
app.use("/api/courses", courses_routes_1.default);
app.use("/api/quizzes", quiz_routes_1.default);
app.use("/api/tiers", tiers_routes_1.default);
// ✅ Endpoint racine (health check)
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "kickstart-backend",
        environment: process.env.NODE_ENV || "production",
        uptime: process.uptime(),
    });
});
// ✅ Health check explicite (pour Railway)
app.get("/healthz", async (_req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.status(200).json({ status: "ok", database: "connected" });
    }
    catch (error) {
        console.error("Database connection failed:", error);
        res.status(500).json({ status: "error", database: "unreachable" });
    }
});
// Exemple route: liste des pays
app.get("/countries", async (_req, res) => {
    try {
        const countries = await prisma.country.findMany({
            include: { campuses: true },
        });
        res.json(countries);
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Failed to fetch countries" });
    }
});
// Fallback pour routes inconnues
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Gestion propre de l'arrêt
process.on("SIGINT", async () => {
    console.log("\nShutting down server...");
    await prisma.$disconnect();
    process.exit(0);
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    console.log("✅ Routes actives : /api/courses, /api/quizzes, /api/tiers, /api/search");
});
//# sourceMappingURL=server.js.map