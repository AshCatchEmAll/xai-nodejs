"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logControllers_cjs_1 = require("../controllers/logControllers.cjs");
const fetchGameDetails_cjs_1 = require("../middlewares/fetchGameDetails.cjs");
const checkAuth_cjs_1 = __importDefault(require("../middlewares/checkAuth.cjs"));
const router = express_1.default.Router();
router.post("/scoreEvent", checkAuth_cjs_1.default, fetchGameDetails_cjs_1.fetchGameDetails, logControllers_cjs_1.logScoreEvent);
router.post("/taskCompleteEvent", checkAuth_cjs_1.default, fetchGameDetails_cjs_1.fetchGameDetails, logControllers_cjs_1.logTaskCompletionEvent);
router.post("/dragAndDropAttemptEvent", checkAuth_cjs_1.default, fetchGameDetails_cjs_1.fetchGameDetails, logControllers_cjs_1.logDragAndDropAttemptEvent);
exports.default = router;
//# sourceMappingURL=gameLogger.cjs.map