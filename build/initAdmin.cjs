"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAdmin = void 0;
const category_entity_cjs_1 = require("./mongoose/category.entity.cjs");
const game_entity_cjs_1 = require("./mongoose/game.entity.cjs");
const gameEvent_entity_cjs_1 = require("./mongoose/gameEvent.entity.cjs");
const user_entity_cjs_1 = require("./mongoose/user.entity.cjs");
const initAdmin = () => {
    return {
        resources: [
            category_entity_cjs_1.Category,
            user_entity_cjs_1.User,
            game_entity_cjs_1.Game,
            gameEvent_entity_cjs_1.ScoreLog,
            gameEvent_entity_cjs_1.TaskCompletionLog,
            gameEvent_entity_cjs_1.DragAndDropAttemptLog
        ]
    };
};
exports.initAdmin = initAdmin;
module.exports.initAdmin = exports.initAdmin;
//# sourceMappingURL=initAdmin.cjs.map