import { Router } from "express";
const router = Router();
// Exemple de route GET
router.get("/", async (req, res) => {
    // Plus tard : remplacer par une requête Prisma
    res.json([
        { id: 1, kind: "student", minMonthlyUsd: 3 },
        { id: 2, kind: "non_student", minMonthlyUsd: 10 }
    ]);
});
export default router;
