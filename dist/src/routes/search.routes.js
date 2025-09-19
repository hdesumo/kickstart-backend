"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/search.routes.ts
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
router.get("/suggestions", async (req, res) => {
    try {
        // Récupération des données depuis Prisma
        const courses = await prisma_1.prisma.course.findMany();
        const quizzes = await prisma_1.prisma.quiz.findMany();
        const quizQuestions = await prisma_1.prisma.quizQuestion.findMany();
        // Construction d'une réponse unifiée
        const suggestions = [
            ...courses.map((c) => ({ type: "course", title: c.title })),
            ...quizzes.map((q) => ({ type: "quiz", title: q.title })),
            ...quizQuestions.map((qq) => ({
                type: "question",
                title: qq.question,
            })),
        ];
        res.json({ suggestions });
    }
    catch (error) {
        console.error("Erreur dans /suggestions:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des suggestions." });
    }
});
exports.default = router;
//# sourceMappingURL=search.routes.js.map