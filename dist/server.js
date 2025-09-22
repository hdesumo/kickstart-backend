"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const courses_routes_1 = __importDefault(require("./routes/courses.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const tiers_routes_1 = __importDefault(require("./routes/tiers.routes"));
const notifications_routes_1 = __importDefault(require("./routes/notifications.routes"));
const support_routes_1 = __importDefault(require("./routes/support.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Routes ---
app.use("/api/courses", courses_routes_1.default);
app.use("/api/quizzes", quiz_routes_1.default);
app.use("/api/search", search_routes_1.default);
app.use("/api/tiers", tiers_routes_1.default);
app.use("/api/notifications", notifications_routes_1.default);
app.use("/api/support", support_routes_1.default);
// --- Health check ---
app.get("/ping", (_req, res) => {
    res.send("pong");
});
// --- Démarrage du serveur ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map