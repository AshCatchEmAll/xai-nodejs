import express, { Application } from "express";
import AdminJS from "adminjs";
import * as AdminJSExpress from "@adminjs/express";
import { initAdmin } from "./initAdmin.cjs";
import { Schema, model, connect } from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import cors from "cors";
import "dotenv/config";
const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors);

app.get("/ping", async (_req, res) => {
  res.send({
    message: "pong",
  });
});

const start = async () => {
  const app = express();



  connect(process.env.MONGO_URL!)
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
        console.log(
          `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
        );
      });
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};

start();
