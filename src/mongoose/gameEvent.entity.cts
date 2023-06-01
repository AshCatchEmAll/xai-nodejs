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

BaseEventModel.discriminator<ScoreEvent>(
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

BaseEventModel.discriminator<TaskCompletionEvent>(
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




// Create a GameEvent for DragAndDrop events where the user drags an item from one container to another. 
// Record correct attempts and incorrect attempts. Also record what the wronmg answer was.

interface DragAndDropEvent extends BaseEvent {
    taskName: string;
    timeTaken: number;
    successful: boolean;
    wrongAnswer: string;
}

BaseEventModel.discriminator<DragAndDropEvent>(
    "DragAndDropEvent",
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
        wrongAnswers: {
            type: String,
            ref: "DragAndDropItem",
            required: true,
        },
    })
);


export default BaseEventModel;
