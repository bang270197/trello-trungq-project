import express from "express";
var router = express.Router();
import { HttpStatusCode } from "*/utilities/constants";
import { boardsRoutes } from "./board.routes";

router.get("/status", (req, res) => {
    res.status(HttpStatusCode.OK).json({ status: "OK" });
});

router.use("/board", boardsRoutes);

export const apiV1 = router;
