"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDragAndDropAttemptEvent = exports.logTaskCompletionEvent = exports.logScoreEvent = void 0;
const gameEvent_entity_cjs_1 = require("../mongoose/gameEvent.entity.cjs");
const logScoreEvent = async (req, res) => {
    if (!req.body?.score || !req.body.userId || !req.gameDetails) {
        res.status(400).json({
            message: "Missing required fields",
        });
        return;
    }
    const scoreEvent = new gameEvent_entity_cjs_1.ScoreLog({
        score: req.body.score,
        userId: req.body.userId,
        gameId: req.gameDetails._id,
    });
    await scoreEvent.save();
    res.json({
        message: "Score event logged",
    });
};
exports.logScoreEvent = logScoreEvent;
const logTaskCompletionEvent = async (req, res) => {
    if (!req.body?.taskName ||
        !req.body?.timeTaken ||
        !req.body.userId ||
        !req.gameDetails) {
        res.status(400).json({
            message: "Missing required fields",
        });
        return;
    }
    const taskCompletionEvent = new gameEvent_entity_cjs_1.TaskCompletionLog({
        taskName: req.body.taskName,
        timeTaken: req.body.timeTaken,
        userId: req.body.userId,
        gameId: req.gameDetails._id,
    });
    await taskCompletionEvent.save();
    res.json({
        message: "Task completion event logged",
    });
};
exports.logTaskCompletionEvent = logTaskCompletionEvent;
const logDragAndDropAttemptEvent = async (req, res) => {
    if (!req.body?.question ||
        !req.body?.answer ||
        !req.body.status ||
        !req.token ||
        !req.gameDetails) {
        res.status(400).json({
            message: "Missing required fields",
        });
        return;
    }
    const dragAndDropAttemptEvent = new gameEvent_entity_cjs_1.DragAndDropAttemptLog({
        question: req.body.question,
        answer: req.body.answer,
        status: req.body.status,
        userId: req.token.id,
        gameId: req.gameDetails._id,
    });
    await dragAndDropAttemptEvent.save();
    res.json({
        message: "Drag and drop attempt event logged",
    });
};
exports.logDragAndDropAttemptEvent = logDragAndDropAttemptEvent;
//# sourceMappingURL=logControllers.cjs.map