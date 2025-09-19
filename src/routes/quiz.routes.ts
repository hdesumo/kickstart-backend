import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search, courseId } = req.query;

    const total = await prisma.quiz.count({
      where: {
        title: search
          ? { contains: String(search), mode: "insensitive" }
          : undefined,
        courseId: courseId ? Number(courseId) : undefined,
      },
    });

    const quizzes = await prisma.quiz.findMany({
      where: {
        title: search
          ? { contains: String(search), mode: "insensitive" }
          : undefined,
        courseId: courseId ? Number(courseId) : undefined,
      },
      include: { questions: true },
    });

    res.json({ total, quizzes });
  } catch (error) {
    console.error("Erreur GET /quizzes :", error);
    res.status(500).json({ error: "Impossible de récupérer les quiz." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, courseId } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId: courseId ? Number(courseId) : undefined,
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error("Erreur POST /quizzes :", error);
    res.status(500).json({ error: "Impossible de créer le quiz." });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, questions } = req.body;

    const updated = await prisma.quiz.update({
      where: { id: Number(id) },
      data: { title },
    });

    if (questions) {
      await prisma.quizQuestion.deleteMany({ where: { quizId: Number(id) } });
      await prisma.quizQuestion.createMany({
        data: questions.map((q: any) => ({
          question: q.question,
          answer: q.answer,
          quizId: Number(id),
        })),
      });
    }

    res.json(updated);
  } catch (error) {
    console.error("Erreur PUT /quizzes/:id :", error);
    res.status(500).json({ error: "Impossible de mettre à jour le quiz." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.quizQuestion.deleteMany({ where: { quizId: Number(id) } });
    await prisma.quiz.delete({ where: { id: Number(id) } });

    res.json({ message: "Quiz supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /quizzes/:id :", error);
    res.status(500).json({ error: "Impossible de supprimer le quiz." });
  }
});

export default router;
