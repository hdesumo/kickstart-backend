import { Router } from "express";
import OpenAI from "openai";
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
router.post("/recommendations", async (req, res) => {
    try {
        const { profile } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Tu es un assistant pédagogique qui recommande les cours en fonction du profil étudiant.",
                },
                {
                    role: "user",
                    content: `Profil: ${JSON.stringify(profile)}`,
                },
            ],
        });
        res.json({ recommendations: completion.choices[0].message.content });
    }
    catch (error) {
        console.error("Erreur AI:", error);
        res.status(500).json({ error: "Impossible de générer les recommandations" });
    }
});
export default router;
