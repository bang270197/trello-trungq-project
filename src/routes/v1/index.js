import express from "express";
var router = express.Router();
import { HttpStatusCode } from "*/utilities/constants";
import { boardsRoutes } from "./board.routes";
import { columnRoutes } from "./column.routes";
import { cardRoutes } from "./card.routes";
router.get("/status", (req, res) => {
    res.status(HttpStatusCode.OK).json({ status: "OK" });
});

router.use("/boards", boardsRoutes);

router.use("/columns", columnRoutes);

router.use("/cards", cardRoutes);
export const apiV1 = router;
