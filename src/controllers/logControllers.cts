import {
  DragAndDropAttemptLog,
  ScoreLog,
  TaskCompletionLog,
} from "../mongoose/gameEvent.entity.cjs";
import { Request, Response } from "express";

export const logScoreEvent = async (req: Request, res: Response) => {
 
  if (!req.body?.score || !req.body.userId || !req.gameDetails) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
  }


  const scoreEvent = new ScoreLog({
    score: req.body.score,
    userId: req.body.userId,
    gameId: req.gameDetails._id,
  });

  await scoreEvent.save();

  res.json({
    message: "Score event logged",
  });
};

export const logTaskCompletionEvent = async (req: Request, res: Response) => {

  if (
    !req.body?.taskName ||
    !req.body?.timeTaken ||
    !req.body.userId ||
    !req.gameDetails
  ) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
  }
  const taskCompletionEvent = new TaskCompletionLog({
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

export const logDragAndDropAttemptEvent = async (
  req: Request,
  res: Response
) => {
 
  if (
    !req.body?.question ||
    !req.body?.answer ||
    !req.body.status ||
    ! req.token ||
    !req.gameDetails
  ) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
  }
  const dragAndDropAttemptEvent = new DragAndDropAttemptLog({
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


