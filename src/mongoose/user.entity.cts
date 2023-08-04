// Create a User model

import { model, Schema, Types } from 'mongoose'

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['super-admin','researcher','admin', 'user'],
        default: 'user',
    },
    avatar: String,
}, {
    timestamps: true,
})

export const User = model<IUser>('User', UserSchema)