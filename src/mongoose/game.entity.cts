    //Create a Game model
    
    import { model, Schema, Types } from 'mongoose'

    export interface IGame {
        title: string;
        gameNumber: number;
    }

    export const GameSchema = new Schema<IGame>(
        {
            title: { type: 'String', required: true },
            gameNumber: { type: 'Number', required: true },
        },
        { timestamps: true },
    )


    export const Game = model<IGame>('Game', GameSchema);