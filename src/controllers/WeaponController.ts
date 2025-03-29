import { Request, Response } from "express";
import { Weapon } from "../models/Weapon";
import { handleHttpError, HttpError } from "../HttpError";

const indexWeapon = async (req:Request, res:Response) => {
    try {
        const weapons = await Weapon.find({});
        res.status(200).json(weapons).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

const viewWeapon = async (req:Request, res:Response) => {
    try {
        const weapon = await Weapon.findById(req.params.id).orFail(new HttpError(404, "Not Found"));
        // .catch(() => {
        //     Weapon.findOne({ name: req.params.id.replaceAll("-", "") }).orFail(new HttpError(404, "Not Found"));
        // });
        res.status(200).json(weapon).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {indexWeapon, viewWeapon};