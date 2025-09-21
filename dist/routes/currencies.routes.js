import { Router } from "express";
const router = Router();
// Exemple de route GET
router.get("/", async (req, res) => {
    // Plus tard : remplacer par une requête Prisma
    res.json([
        { code: "XAF", name: "Franc CFA (BEAC)", symbol: "FCFA" },
        { code: "XOF", name: "Franc CFA (UEMOA)", symbol: "FCFA" },
        { code: "GHS", name: "Cedi ghanéen", symbol: "₵" },
        { code: "NGN", name: "Naira nigérian", symbol: "₦" }
    ]);
});
export default router;
