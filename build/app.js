import express from "express";
import AdminJS from "adminjs";
import * as AdminJSExpress from "@adminjs/express";
import { initAdmin } from "./initAdmin.cjs";
import { connect } from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import GameEventRouter from "./routers/gameLogger.cjs";
import AuthRouter from "./routers/authRouter.cjs";
import cors from "cors";
import "dotenv/config";
const PORT = process.env.PORT || 3000;
const app = express();
if (process.env.STAGE !== "dev") {
    app.use(cors);
}
app.use(express.json());
//Health check route
app.get("/ping", async (_req, res) => {
    res.send({
        message: "pong",
    });
});
app.use("/auth", AuthRouter.default);
app.use("/logger", GameEventRouter.default);
const start = async () => {
    connect(process.env.MONGO_URL)
        .then(() => {
        console.log("Connected to MongoDB");
        AdminJS.registerAdapter({
            Resource: AdminJSMongoose.Resource,
            Database: AdminJSMongoose.Database,
        });
        const admin = new AdminJS(initAdmin());
        const adminRouter = AdminJSExpress.default.buildRouter(admin);
        app.use(admin.options.rootPath, adminRouter);
        app.listen(PORT, () => {
            console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
        });
    })
        .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
};
start();
//# sourceMappingURL=app.js.map