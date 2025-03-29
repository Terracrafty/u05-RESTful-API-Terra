import { Router } from "express";
import { indexArmor, viewArmor } from "../controllers/ArmorController";

const armorRouter = Router();

armorRouter.get("/", indexArmor);

armorRouter.get("/:id", viewArmor);

export {armorRouter};