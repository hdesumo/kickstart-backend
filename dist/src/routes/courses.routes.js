import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const router = Router();
// 📌 Récupérer tous les cours
router.get("/", async (req, res) => {
    try {
        const { level, campus } = req.query;
        const where = {};
        if (level)
            where.level = String(level);
        if (campus)
            where.campus = String(campus);
        const total = await prisma.course.count({ where });
        const courses = await prisma.course.findMany({ where });
        res.json({ total, courses });
    }
    catch (err) {
        console.error("Erreur GET /courses :", err);
        res.status(500).json({ error: "Impossible de récupérer les cours." });
    }
});
// 📌 Créer un nouveau cours
router.post("/", async (req, res) => {
    try {
        const { title, content, level, campus, fileUrl } = req.body;
        const course = await prisma.course.create({
            data: { title, content, level, campus, fileUrl }
        });
        res.status(201).json(course);
    }
    catch (err) {
        console.error("Erreur POST /courses :", err);
        res.status(500).json({ error: "Impossible de créer le cours." });
    }
});
// 📌 Mettre à jour un cours existant
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, level, campus, fileUrl } = req.body;
        const updated = await prisma.course.update({
            where: { id: Number(id) }, // ✅ conversion en number
            data: { title, content, level, campus, fileUrl }
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Erreur PUT /courses :", err);
        res.status(500).json({ error: "Impossible de mettre à jour le cours." });
    }
});
// 📌 Supprimer un cours
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.course.delete({
            where: { id: Number(id) } // ✅ conversion en number
        });
        res.status(204).end();
    }
    catch (err) {
        console.error("Erreur DELETE /courses :", err);
        res.status(500).json({ error: "Impossible de supprimer le cours." });
    }
});
export default router;
