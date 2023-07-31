import express from "express";

import {
  logDragAndDropAttemptEvent,
  logScoreEvent,
  logTaskCompletionEvent,
} from "../controllers/logControllers.cjs";
import { fetchGameDetails } from "../middlewares/fetchGameDetails.cjs";
import isAuthenticated from "../middlewares/checkAuth.cjs";

const router = express.Router();

router.post("/scoreEvent", isAuthenticated, fetchGameDetails, logScoreEvent);

router.post(
  "/taskCompleteEvent",
  isAuthenticated,
  fetchGameDetails,
  logTaskCompletionEvent
);

router.post(
  "/dragAndDropAttemptEvent",
  isAuthenticated,
  fetchGameDetails,
  logDragAndDropAttemptEvent
);

export default router;
