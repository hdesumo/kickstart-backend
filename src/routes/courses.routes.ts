import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const total = await prisma.course.count();
    const courses = await prisma.course.findMany();
    res.json({ total, courses });
  } catch (error) {
    console.error("Erreur GET /courses :", error);
    res.status(500).json({ error: "Impossible de récupérer les cours." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const course = await prisma.course.create({
      data: { title, content },
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Erreur POST /courses :", error);
    res.status(500).json({ error: "Impossible de créer le cours." });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updated = await prisma.course.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    res.json(updated);
  } catch (error) {
    console.error("Erreur PUT /courses/:id :", error);
    res.status(500).json({ error: "Impossible de mettre à jour le cours." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({ where: { id: Number(id) } });

    res.json({ message: "Cours supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /courses/:id :", error);
    res.status(500).json({ error: "Impossible de supprimer le cours." });
  }
});

export default router;
