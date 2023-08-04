import mongoose, { Schema, Document } from "mongoose";



export enum GameEventTypes {
  SCORE = "ScoreEvent",
  TASK_COMPLETION = "TaskCompletionEvent",
  DRAG_AND_DROP_ATTEMPT = "DragAndDropAttemptEvent",
}





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
interface IScoreEvent extends BaseEvent {
  score: number;
}

const ScoreEvent = BaseEventModel.discriminator<IScoreEvent>(
   GameEventTypes.SCORE,
  new mongoose.Schema({
    score: {
      type: Number,
      required: true,
    },
  })
);

// TaskCompletionEvent
interface ITaskCompletionEvent extends BaseEvent {
  taskName: string;
  timeTaken: number;
  successful: boolean;
}

const TaskCompletionEvent = BaseEventModel.discriminator<ITaskCompletionEvent>(
  GameEventTypes.TASK_COMPLETION ,
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


interface IDragAndDropAttempt {
    question: string;
    answer: string;
    status: boolean;
}

// DragAndDropItem
const DragAndDropAttemptEvent = BaseEventModel.discriminator  <IDragAndDropAttempt>(
    GameEventTypes.DRAG_AND_DROP_ATTEMPT ,
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
            

export const ScoreLog = mongoose.model<IScoreEvent>(GameEventTypes.SCORE , ScoreEvent.schema);
export const TaskCompletionLog = mongoose.model<ITaskCompletionEvent>(GameEventTypes.TASK_COMPLETION , TaskCompletionEvent.schema);
export const DragAndDropAttemptLog = mongoose.model<IDragAndDropAttempt>(GameEventTypes.DRAG_AND_DROP_ATTEMPT , DragAndDropAttemptEvent.schema);




export default BaseEventModel;

