import { Router } from "express";
import { userRouter } from "./UserRoutes";
import { weaponRouter } from "./WeaponRoutes";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/weapons", weaponRouter);

export {mainRouter};