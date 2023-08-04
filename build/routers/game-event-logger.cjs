"use strict";
//Create a router for the game event logger
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Path: src/routers/game-event-logger.cts
const express_1 = __importDefault(require("express"));
const log_controllers_cjs_1 = require("../controllers/log-controllers.cjs");
const router = express_1.default.Router();
router.post("/scoreEvent", log_controllers_cjs_1.logScoreEvent);
exports.default = router;
//# sourceMappingURL=game-event-logger.cjs.map