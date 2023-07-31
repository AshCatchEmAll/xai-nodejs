"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// add a middleware to check if the user is authenticated: and has a valid token
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const isAuthenticated = async (req, res, next) => {
    if (process_1.env.STAGE === "dev") {
        console.log("Dev user");
        req.token = {
            email: "user4",
            id: "6491c79ea2d6811d4a245653",
        };
        next();
    }
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            message: "No token provided",
        });
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, "your-secret-key");
        req.token = decodedToken;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid token",
        });
    }
};
exports.default = isAuthenticated;
//# sourceMappingURL=checkAuth.cjs.map