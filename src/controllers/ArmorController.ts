import { Request, Response } from "express";
import { Armor } from "../models/Armor";
import { handleHttpError, HttpError } from "../HttpError";

const indexArmor = async (req:Request, res:Response) => {
    try {
        const armors = await Armor.find({});
        res.status(200).json(armors).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

const viewArmor = async (req:Request, res:Response) => {
    try {
        const armor = await Armor.findById(req.params.id).orFail(new HttpError(404, "Not Found"));
        res.status(200).json(armor).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {indexArmor, viewArmor};