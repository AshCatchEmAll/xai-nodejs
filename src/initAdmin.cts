import { Category } from "./mongoose/category.entity.cjs";
import { Game } from "./mongoose/game.entity.cjs";
import { DragAndDropAttemptLog, ScoreLog, TaskCompletionLog } from "./mongoose/gameEvent.entity.cjs";
import { User } from "./mongoose/user.entity.cjs";


export const initAdmin =  () => {
    return {
       
        resources: [
            Category,
            User,
            Game,
            ScoreLog,
            TaskCompletionLog,
            DragAndDropAttemptLog
        ]
    };
}


module.exports.initAdmin = initAdmin;