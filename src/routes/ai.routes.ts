import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

router.post("/ask", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = (await response.json()) as { response?: string; choices?: any[] };

    res.json({ result: data.response ?? data.choices?.[0]?.message?.content ?? "" });
  } catch (error) {
    console.error("❌ Erreur IA:", error);
    res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
  }
});

export default router;
