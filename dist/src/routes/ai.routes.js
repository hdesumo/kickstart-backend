"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = (0, express_1.Router)();
router.post("/ask", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await (0, node_fetch_1.default)("https://api.openai.com/v1/chat/completions", {
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
        const data = (await response.json());
        res.json({ result: data.response ?? data.choices?.[0]?.message?.content ?? "" });
    }
    catch (error) {
        console.error("❌ Erreur IA:", error);
        res.status(500).json({ error: "Erreur lors de la génération de la réponse." });
    }
});
exports.default = router;
//# sourceMappingURL=ai.routes.js.map