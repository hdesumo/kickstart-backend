"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const { search, courseId } = req.query;
        const total = await prisma_1.prisma.quiz.count({
            where: {
                title: search
                    ? { contains: String(search), mode: "insensitive" }
                    : undefined,
                courseId: courseId ? Number(courseId) : undefined,
            },
        });
        const quizzes = await prisma_1.prisma.quiz.findMany({
            where: {
                title: search
                    ? { contains: String(search), mode: "insensitive" }
                    : undefined,
                courseId: courseId ? Number(courseId) : undefined,
            },
            include: { questions: true },
        });
        res.json({ total, quizzes });
    }
    catch (error) {
        console.error("Erreur GET /quizzes :", error);
        res.status(500).json({ error: "Impossible de récupérer les quiz." });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, courseId } = req.body;
        const quiz = await prisma_1.prisma.quiz.create({
            data: {
                title,
                courseId: courseId ? Number(courseId) : undefined,
            },
        });
        res.status(201).json(quiz);
    }
    catch (error) {
        console.error("Erreur POST /quizzes :", error);
        res.status(500).json({ error: "Impossible de créer le quiz." });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;
        const updated = await prisma_1.prisma.quiz.update({
            where: { id: Number(id) },
            data: { title },
        });
        if (questions) {
            await prisma_1.prisma.quizQuestion.deleteMany({ where: { quizId: Number(id) } });
            await prisma_1.prisma.quizQuestion.createMany({
                data: questions.map((q) => ({
                    question: q.question,
                    answer: q.answer,
                    quizId: Number(id),
                })),
            });
        }
        res.json(updated);
    }
    catch (error) {
        console.error("Erreur PUT /quizzes/:id :", error);
        res.status(500).json({ error: "Impossible de mettre à jour le quiz." });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.quizQuestion.deleteMany({ where: { quizId: Number(id) } });
        await prisma_1.prisma.quiz.delete({ where: { id: Number(id) } });
        res.json({ message: "Quiz supprimé avec succès" });
    }
    catch (error) {
        console.error("Erreur DELETE /quizzes/:id :", error);
        res.status(500).json({ error: "Impossible de supprimer le quiz." });
    }
});
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map