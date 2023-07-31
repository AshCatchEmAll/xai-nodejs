"use strict";
//write a middleware that fetches the game details from the api and takes game number as input
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGameDetails = void 0;
const game_entity_cjs_1 = require("../mongoose/game.entity.cjs");
const fetchGameDetails = async (req, res, next) => {
    const { gameNumber } = req.body;
    if (!gameNumber) {
        res.status(400).json({
            message: "Missing gameNumber field",
        });
        return;
    }
    console.log("Here: ", gameNumber);
    const game = await game_entity_cjs_1.Game.findOne({ gameNumber: gameNumber });
    if (!game) {
        res.status(400).json({
            message: `Game with number ${gameNumber} not found`,
        });
    }
    const gameDetailsJson = game.toJSON();
    req.gameDetails = gameDetailsJson;
    next();
};
exports.fetchGameDetails = fetchGameDetails;
//# sourceMappingURL=fetchGameDetails.cjs.map