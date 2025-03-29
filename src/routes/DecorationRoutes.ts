import { Router } from "express";
import { indexDecoration, viewDecoration } from "../controllers/DecorationController";

const decorationRouter = Router();

decorationRouter.get("/", indexDecoration);

decorationRouter.get("/:id", viewDecoration);

export {decorationRouter};