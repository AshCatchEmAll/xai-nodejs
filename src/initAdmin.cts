import { Category } from "./mongoose/category.entity.cjs";
import BaseEventModel, { DragAndDropAttemptEvent, ScoreEvent, TaskCompletionEvent } from "./mongoose/gameEvent.entity.cjs";
import { User } from "./mongoose/user.entity.cjs";


export const initAdmin =  () => {
    return {
        resources: [
            Category,
            User,
            ScoreEvent,
            TaskCompletionEvent,
            DragAndDropAttemptEvent
        ]
    };
}


    module.exports.initAdmin = initAdmin;