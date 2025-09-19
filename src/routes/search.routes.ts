// src/routes/search.routes.ts
import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/suggestions", async (req: Request, res: Response) => {
  try {
    // Récupération des données depuis Prisma
    const courses = await prisma.course.findMany();
    const quizzes = await prisma.quiz.findMany();
    const quizQuestions = await prisma.quizQuestion.findMany();

    // Construction d'une réponse unifiée
    const suggestions = [
      ...courses.map((c: any) => ({ type: "course", title: c.title })),
      ...quizzes.map((q: any) => ({ type: "quiz", title: q.title })),
      ...quizQuestions.map((qq: any) => ({
        type: "question",
        title: qq.question,
      })),
    ];

    res.json({ suggestions });
  } catch (error) {
    console.error("Erreur dans /suggestions:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des suggestions." });
  }
});

export default router;
