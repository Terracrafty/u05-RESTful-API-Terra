import { Router } from "express";
import bodyParser from "body-parser";
import {createUser, login, indexUser, editUser, deleteUser, viewUser} from "../controllers/UserController"
import { authorize } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/", bodyParser.json(), createUser);

userRouter.post("/login", bodyParser.json(), login);

userRouter.get("/", indexUser);

userRouter.get("/:id", authorize, viewUser);

userRouter.patch("/:id", bodyParser.json(), authorize, editUser);

userRouter.delete("/:id", authorize, deleteUser);

export {userRouter};