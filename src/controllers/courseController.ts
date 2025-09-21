import { prisma } from "../lib/prisma.js";

export async function syncCoursesFromExternal(data: any) {
  if (!data?.elements) return;
  for (const c of data.elements) {
    await prisma.course.upsert({
      where: { externalId: `coursera_${c.id}` },
      update: {
        title: c.name,
        content: c.description,
        url: c.slug ?? "",
      },
      create: {
        externalId: `coursera_${c.id}`,
        title: c.name,
        content: c.description,
        url: c.slug ?? "",
      },
    });
  }
}
