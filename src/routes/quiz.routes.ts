import { Router } from "express";
// ✅ Correction : suppression de l'extension .js dans l'import
import { prisma } from "../lib/prisma";

const router = Router();

// 📌 Récupérer tous les quizzes
router.get("/", async (req, res) => {
  try {
    const { title, courseId } = req.query;

    const where: any = {};
    if (title) where.title = { contains: String(title), mode: "insensitive" };
    if (courseId) where.courseId = Number(courseId);

    const total = await prisma.quiz.count({ where });
    const quizzes = await prisma.quiz.findMany({
      where,
      include: { questions: true }
    });

    res.json({ total, quizzes });
  } catch (err) {
    console.error("Erreur GET /quizzes:", err);
    res.status(500).json({ error: "Impossible de récupérer les quizzes." });
  }
});

// 📌 Créer un nouveau quiz
router.post("/", async (req, res) => {
  try {
    const { title, courseId, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        title,
        courseId: courseId ? Number(courseId) : null,
        questions: questions
          ? {
              create: questions.map((q: any) => ({
                question: q.question,
                answer: q.answer
              }))
            }
          : undefined
      },
      include: { questions: true }
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error("Erreur POST /quizzes:", err);
    res.status(500).json({ error: "Impossible de créer le quiz." });
  }
});

// 📌 Mettre à jour un quiz existant
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, courseId, questions } = req.body;

    const updated = await prisma.quiz.update({
      where: { id: Number(id) },
      data: {
        title,
        courseId: courseId ? Number(courseId) : null,
        questions: questions
          ? {
              deleteMany: { quizId: Number(id) },
              create: questions.map((q: any) => ({
                question: q.question,
                answer: q.answer
              }))
            }
          : undefined
      },
      include: { questions: true }
    });

    res.json(updated);
  } catch (err) {
    console.error("Erreur PUT /quizzes:", err);
    res.status(500).json({ error: "Impossible de mettre à jour le quiz." });
  }
});

// 📌 Supprimer un quiz
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quizQuestion.deleteMany({ where: { quizId: Number(id) } });
    await prisma.quiz.delete({ where: { id: Number(id) } });

    res.status(204).end();
  } catch (err) {
    console.error("Erreur DELETE /quizzes:", err);
    res.status(500).json({ error: "Impossible de supprimer le quiz." });
  }
});

export default router;
