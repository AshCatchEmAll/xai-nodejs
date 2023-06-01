import mongoose, { Schema, Document } from "mongoose";

interface BaseEvent extends Document {
  userId: Schema.Types.ObjectId;
  gameId: Schema.Types.ObjectId;
}

const BaseEventSchema = new Schema<BaseEvent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
  },
  { discriminatorKey: "eventType", timestamps: true }
); // This field will store the name of the event type

const BaseEventModel = mongoose.model<BaseEvent>("BaseEvent", BaseEventSchema);

/*****************
 * Types of events*
 *****************/

// ScoreEvent
interface ScoreEvent extends BaseEvent {
  score: number;
}

const ScoreEvent = BaseEventModel.discriminator<ScoreEvent>(
  "ScoreEvent",
  new mongoose.Schema({
    score: {
      type: Number,
      required: true,
    },
  })
);

// TaskCompletionEvent
interface TaskCompletionEvent extends BaseEvent {
  taskName: string;
  timeTaken: number;
  successful: boolean;
}

const TaskCompletionEvent = BaseEventModel.discriminator<TaskCompletionEvent>(
  "TaskCompletionEvent",
  new mongoose.Schema({
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
  })

  );


interface DragAndDropAttempt {
    question: string;
    answer: string;
    status: boolean;
}

// DragAndDropItem
const DragAndDropAttemptEvent = BaseEventModel.discriminator  <DragAndDropAttempt>(
    "DragAndDropItem",
    new mongoose.Schema({
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
    })
);
            





export default BaseEventModel;

export { ScoreEvent, TaskCompletionEvent, DragAndDropAttemptEvent }; // Exporting interfaces