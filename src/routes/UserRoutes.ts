import { Router } from "express";
import bodyParser from "body-parser";
import {createUser, login, indexUser, editUser, deleteUser, viewUser} from "../controllers/UserController"

const userRouter = Router();

userRouter.post("/", bodyParser.json(), createUser);

userRouter.post("/login", bodyParser.json(), login);

userRouter.get("/", indexUser);

userRouter.get("/:id", viewUser);

userRouter.patch("/:id", bodyParser.json(), editUser);

userRouter.delete("/:id", deleteUser);

export {userRouter};