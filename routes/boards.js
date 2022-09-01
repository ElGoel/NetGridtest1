import _ from "lodash";
import express from "express";
import mongoose from "mongoose";
import connectDb from "../middleWare/db.js";
import { validateBoard, BoardModel } from "../models/board.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateBoard(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const board = new BoardModel(req.body);

  const validateError = await BoardModel.validate(board);

  if (validateError) {
    validateError;
  }

  connectDb()
    .then(async () => {
      const result = await board.save();
      mongoose.disconnect();
    })
    .catch((ex) => {
      mongoose.disconnect();
      if (ex) {
        ex;
      }
    });
  res.status(201).send(board);
});

router.put("/:id", async (req, res) => {
  connectDb()
    .then(async () => {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const board = await BoardModel.findById(req.params.id);

        if (!board) {
          res.status(400).send(`Board with id ${req.params.id} not found`);
        } else {
          board.set(req.body);
          const result = await board.save();
          res.send(result);
        }
      } else {
        res.status(400).send(`Board id not valid`);
      }
      mongoose.disconnect();
    })
    .catch((ex) => {
      mongoose.disconnect();
      if (ex) {
         ex;
      }
    });
});

export default router;
