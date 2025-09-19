"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const total = await prisma_1.prisma.course.count();
        const courses = await prisma_1.prisma.course.findMany();
        res.json({ total, courses });
    }
    catch (error) {
        console.error("Erreur GET /courses :", error);
        res.status(500).json({ error: "Impossible de récupérer les cours." });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        const course = await prisma_1.prisma.course.create({
            data: { title, content },
        });
        res.status(201).json(course);
    }
    catch (error) {
        console.error("Erreur POST /courses :", error);
        res.status(500).json({ error: "Impossible de créer le cours." });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updated = await prisma_1.prisma.course.update({
            where: { id: Number(id) },
            data: { title, content },
        });
        res.json(updated);
    }
    catch (error) {
        console.error("Erreur PUT /courses/:id :", error);
        res.status(500).json({ error: "Impossible de mettre à jour le cours." });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.course.delete({ where: { id: Number(id) } });
        res.json({ message: "Cours supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur DELETE /courses/:id :", error);
        res.status(500).json({ error: "Impossible de supprimer le cours." });
    }
});
exports.default = router;
//# sourceMappingURL=courses.routes.js.map