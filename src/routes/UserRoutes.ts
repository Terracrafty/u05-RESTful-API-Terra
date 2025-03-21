import { Router } from "express";
import bodyParser from "body-parser";
import {createUser, login} from "../controllers/UserController"

const userRouter = Router();

userRouter.post("/", bodyParser.json(), createUser);

userRouter.post("/login", bodyParser.json(), login);

export {userRouter};