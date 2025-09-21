import { Router } from "express";
import OpenAI from "openai";
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
router.post("/suggest", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt)
            return res.status(400).json({ error: "Prompt requis" });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });
        res.json({ result: completion.choices[0]?.message?.content ?? "" });
    }
    catch (error) {
        console.error("Erreur IA:", error);
        res.status(500).json({ error: "Service IA indisponible" });
    }
});
export default router;
