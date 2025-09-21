import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/suggestions", async (req, res) => {
  try {
    const [courses, quizzes, quizQuestions] = await Promise.all([
      prisma.course.findMany(),
      prisma.quiz.findMany(),
      prisma.quizQuestion.findMany()
    ]);

    const suggestions = [
      ...courses.map((c) => ({ type: "course", title: c.title })),
      ...quizzes.map((q) => ({ type: "quiz", title: q.title })),
      ...quizQuestions.map((qq) => ({ type: "question", title: qq.question }))
    ];

    res.json({ suggestions });
  } catch (err) {
    console.error("Erreur GET /search/suggestions:", err);
    res.status(500).json({ error: "Impossible de récupérer les suggestions." });
  }
});

export default router;
