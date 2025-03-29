import { Router } from "express";
import { indexSkill, viewSkill } from "../controllers/SkillController";

const skillRouter = Router();

skillRouter.get("/", indexSkill);

skillRouter.get("/:id", viewSkill);

export {skillRouter};