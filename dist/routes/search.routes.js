"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
const router = express_1.default.Router();
// Recherche globale
router.get("/", searchController_1.searchController.search);
// Suggestions de recherche
router.get("/suggestions", searchController_1.searchController.getSuggestions);
exports.default = router;
//# sourceMappingURL=search.routes.js.map