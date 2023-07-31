//write a middleware that fetches the game details from the api and takes game number as input

import express, { Request, Response, NextFunction } from "express";
import { Game, IGame } from "../mongoose/game.entity.cjs";



export const fetchGameDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameNumber } = req.body;

  if (!gameNumber) {
    res.status(400).json({
      message: "Missing gameNumber field",
    });
    return;
  }

  console.log("Here: ", gameNumber);
  const game = await Game.findOne({ gameNumber: gameNumber });

  if (!game) {
    res.status(400).json({
      message: `Game with number ${gameNumber} not found`,
    });
  }

  const gameDetailsJson = game!.toJSON();

  
  req.gameDetails = gameDetailsJson;

  next();
};
