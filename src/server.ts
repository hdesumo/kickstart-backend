import express from "express";
import cors from "cors";
import tiersRoutes from "./routes/tiers.routes";
import currenciesRoutes from "./routes/currencies.routes";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tiers", tiersRoutes);
app.use("/api/currencies", currenciesRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`✅ API en cours sur : http://localhost:${port}`));
