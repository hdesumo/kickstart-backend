// scripts/syncCourses.ts
import { syncExternalCourses } from "../src/controllers/courseController.js";
console.log("🔄 Synchronisation des cours externes...");
try {
    await syncExternalCourses();
    console.log("✅ Synchronisation terminée.");
}
catch (err) {
    console.error("❌ Erreur lors de la synchro:", err);
    process.exit(1);
}
