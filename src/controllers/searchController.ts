import { Request, Response } from "express";
import { PrismaClient, Course } from "@prisma/client";

const prisma = new PrismaClient();

export const searchController = {
  /**
   * Recherche globale sur les cours (simplifié, car pas de modèle Project)
   */
  async search(req: Request, res: Response) {
    try {
      const q = (req.query.q as string) || "";
      if (!q) {
        return res.status(400).json({ error: "Missing query parameter q" });
      }

      // Recherche uniquement sur les cours
      const courses = await prisma.course.findMany({
        where: { title: { contains: q, mode: "insensitive" } },
        select: { id: true, title: true } // pas de description
      });

      return res.json({
        query: q,
        results: { courses }
      });
    } catch (error) {
      console.error("Erreur searchController.search:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suggestions de recherche (cours seulement)
   */
  async getSuggestions(req: Request, res: Response) {
    try {
      const q = (req.query.q as string) || "";
      if (!q) {
        return res.status(400).json({ error: "Missing query parameter q" });
      }

      const courseSuggestions: Pick<Course, "id" | "title">[] =
        await prisma.course.findMany({
          where: { title: { contains: q, mode: "insensitive" } },
          select: { id: true, title: true }
        });

      // Format unifié
      const suggestions = courseSuggestions.map((c) => ({
        id: c.id,
        type: "course",
        title: c.title
      }));

      return res.json(suggestions);
    } catch (error) {
      console.error("Erreur searchController.getSuggestions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
