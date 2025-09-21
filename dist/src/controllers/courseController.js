import { prisma } from "../lib/prisma.js";
export async function syncExternalCourses() {
    const res = await fetch("https://api.coursera.org/api/courses.v1");
    const data = await res.json();
    for (const c of data.elements) {
        await prisma.course.upsert({
            where: { externalId: `coursera_${c.id}` },
            update: {
                title: c.name,
                content: c.description,
                url: c.slug,
                source: "coursera",
            },
            create: {
                externalId: `coursera_${c.id}`,
                title: c.name,
                content: c.description,
                url: c.slug,
                source: "coursera",
            },
        });
    }
}
