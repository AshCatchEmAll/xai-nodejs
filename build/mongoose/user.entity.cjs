"use strict";
// Create a User model
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
        enum: ['super-admin', 'researcher', 'admin', 'user'],
        default: 'user',
    },
    avatar: String,
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.entity.cjs.map