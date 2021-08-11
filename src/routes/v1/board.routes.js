import express from "express";
import { BoardController } from "*/controllers/board.controller";
import { BoardValidation } from "*/validations/board.validation";
var router = express.Router();

router
    .route("/")
    // .get((req, res) => {
    //     console.log("Get Boards");
    // })
    .post(BoardValidation.createNew, BoardController.createNew);

router.route("/:id").get(BoardController.getFullBoard);

export const boardsRoutes = router;
