import express from "express";
import { searchController } from "../controllers/searchController";

const router = express.Router();

// Recherche globale
router.get("/", searchController.search);

// Suggestions de recherche
router.get("/suggestions", searchController.getSuggestions);

export default router;
