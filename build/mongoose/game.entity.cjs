"use strict";
//Create a Game model
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.GameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GameSchema = new mongoose_1.Schema({
    title: { type: 'String', required: true },
    gameNumber: { type: 'Number', required: true },
}, { timestamps: true });
exports.Game = (0, mongoose_1.model)('Game', exports.GameSchema);
//# sourceMappingURL=game.entity.cjs.map