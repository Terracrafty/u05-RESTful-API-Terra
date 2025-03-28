import { Request, Response } from "express";
import { Weapon } from "../models/Weapon";
import { ISkill } from "../models/Skill";
import { handleHttpError, HttpError } from "../HttpError";
import { Types } from "mongoose";

const indexWeapon = async (req:Request, res:Response) => {
    try {
        const weapons = await Weapon.find({}).populate<{ skill: ISkill }>("skill");
        res.status(200).json(weapons).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

const findWeapon = async (req:Request, res:Response) => {
    try {
        const query = Weapon.findById(req.params.id) Weapon.findOne({ name: req.params.id }); 
    } catch (e) {
        handleHttpError(e, res);
    }
}