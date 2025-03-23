import { Router } from "express";
import bodyParser from "body-parser";
import {createUser, login, indexUser, editUser} from "../controllers/UserController"

const userRouter = Router();

userRouter.post("/", bodyParser.json(), createUser);

userRouter.post("/login", bodyParser.json(), login);

userRouter.get("/", indexUser);

userRouter.patch("/:id", bodyParser.json(), editUser);

export {userRouter};