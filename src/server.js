import express from "express";
import { connectDB, getDB } from "./config/mongodb";
const app = express();
import { env } from "*/config/environment.js";
import { BoardModel } from "*/models/board.model";
import { apiV1 } from "./routes/v1";
connectDB()
    .then(() => {
        console.log("Connected successfully to DB server");
    })
    .then(() => {
        bootServer();
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/v1", apiV1);
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(
            `Connect server successfully ${env.APP_HOST}:${env.APP_PORT}/`
        );
    });
};
