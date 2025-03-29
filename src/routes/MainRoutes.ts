import { Router } from "express";
import { userRouter } from "./UserRoutes";
import { weaponRouter } from "./WeaponRoutes";
import { armorRouter } from "./ArmorRoutes";
import { skillRouter } from "./SkillRoutes";
import { decorationRouter } from "./DecorationRoutes";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/weapons", weaponRouter);
mainRouter.use("/armors", armorRouter);
mainRouter.use("/skills", skillRouter);
mainRouter.use("/decorations", decorationRouter);

export {mainRouter};