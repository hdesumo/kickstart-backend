"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const prisma_1 = require("../lib/prisma");
const getCourses = async (req, res) => {
    try {
        const courses = await prisma_1.prisma.course.findMany();
        res.json(courses);
    }
    catch (error) {
        console.error("Erreur getCourses:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};
exports.getCourses = getCourses;
//# sourceMappingURL=courseController.js.map