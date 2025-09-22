import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    console.error("Erreur getCourses:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
