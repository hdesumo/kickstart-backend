"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Chargement des variables d'environnement (.env)
dotenv_1.default.config();
const tiers_routes_js_1 = __importDefault(require("./routes/tiers.routes.js"));
const currencies_routes_js_1 = __importDefault(require("./routes/currencies.routes.js"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Endpoint de santé (utile pour Railway)
app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "ok", message: "KickStart Campus API is healthy" });
});
// Routes principales
app.use("/api/tiers", tiers_routes_js_1.default);
app.use("/api/currencies", currencies_routes_js_1.default);
// Gestion d'erreur 404
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map