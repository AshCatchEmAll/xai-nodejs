"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_cjs_1 = require("../controllers/authControllers.cjs");
const authRouter = express_1.default.Router();
authRouter.get("/ping", async (_req, res) => {
    res.send({
        message: "pong",
    });
});
//create login route
authRouter.post("/login", authControllers_cjs_1.loginController);
authRouter.post("/register", authControllers_cjs_1.signupController);
exports.default = authRouter;
//# sourceMappingURL=authRouter.cjs.map