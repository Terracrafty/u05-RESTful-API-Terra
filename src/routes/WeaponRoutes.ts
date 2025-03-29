import { Router } from "express";
import { indexWeapon, viewWeapon } from "../controllers/WeaponController";

const weaponRouter = Router();

weaponRouter.get("/", indexWeapon);

weaponRouter.get("/:id", viewWeapon);

export {weaponRouter};