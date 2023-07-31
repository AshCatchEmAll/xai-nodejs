"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const log_controllers_cjs_1 = require("../controllers/log-controllers.cjs");
const router = express_1.default.Router();
router.post("/scoreEvent", log_controllers_cjs_1.logScoreEvent);
router.post("/taskCompleteEvent", log_controllers_cjs_1.logTaskCompletionEvent);
router.post("/dragAndDropAttemptEvent", log_controllers_cjs_1.logDragAndDropAttemptEvent);
exports.default = router;
//# sourceMappingURL=game-logger.cjs.map