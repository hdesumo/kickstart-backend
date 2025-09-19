import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Chargement des variables d'environnement (.env)
dotenv.config();
import tiersRoutes from "./routes/tiers.routes.js";
import currenciesRoutes from "./routes/currencies.routes.js";
const app = express();
const PORT = process.env.PORT || 8080;
// Middlewares
app.use(cors());
app.use(express.json());
// Endpoint de santé (utile pour Railway)
app.get("/healthz", (req, res) => {
    res.status(200).json({ status: "ok", message: "KickStart Campus API is healthy" });
});
// Routes principales
app.use("/api/tiers", tiersRoutes);
app.use("/api/currencies", currenciesRoutes);
// Gestion d'erreur 404
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
