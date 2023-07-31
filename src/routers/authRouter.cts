import express, { Application } from "express";


import { loginController, signupController } from "../controllers/authControllers.cjs";
const authRouter = express.Router();


authRouter.get("/ping", async (_req, res) => {
    res.send({
        message: "pong",
    });
});
//create login route
authRouter.post("/login",loginController );



authRouter.post("/register", signupController );

    

export default authRouter;