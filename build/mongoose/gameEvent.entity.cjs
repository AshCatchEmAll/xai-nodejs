"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragAndDropAttemptLog = exports.TaskCompletionLog = exports.ScoreLog = exports.GameEventTypes = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var GameEventTypes;
(function (GameEventTypes) {
    GameEventTypes["SCORE"] = "ScoreEvent";
    GameEventTypes["TASK_COMPLETION"] = "TaskCompletionEvent";
    GameEventTypes["DRAG_AND_DROP_ATTEMPT"] = "DragAndDropAttemptEvent";
})(GameEventTypes = exports.GameEventTypes || (exports.GameEventTypes = {}));
const BaseEventSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gameId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
    },
}, { discriminatorKey: "eventType", timestamps: true }); // This field will store the name of the event type
const BaseEventModel = mongoose_1.default.model("BaseEvent", BaseEventSchema);
const ScoreEvent = BaseEventModel.discriminator(GameEventTypes.SCORE, new mongoose_1.default.Schema({
    score: {
        type: Number,
        required: true,
    },
}));
const TaskCompletionEvent = BaseEventModel.discriminator(GameEventTypes.TASK_COMPLETION, new mongoose_1.default.Schema({
    taskName: {
        type: String,
        required: true,
    },
    timeTaken: {
        type: Number,
        required: true,
    },
    successful: {
        type: Boolean,
        required: true,
    },
}));
// DragAndDropItem
const DragAndDropAttemptEvent = BaseEventModel.discriminator(GameEventTypes.DRAG_AND_DROP_ATTEMPT, new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}));
exports.ScoreLog = mongoose_1.default.model(GameEventTypes.SCORE, ScoreEvent.schema);
exports.TaskCompletionLog = mongoose_1.default.model(GameEventTypes.TASK_COMPLETION, TaskCompletionEvent.schema);
exports.DragAndDropAttemptLog = mongoose_1.default.model(GameEventTypes.DRAG_AND_DROP_ATTEMPT, DragAndDropAttemptEvent.schema);
exports.default = BaseEventModel;
//# sourceMappingURL=gameEvent.entity.cjs.map