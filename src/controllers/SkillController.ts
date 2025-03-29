import { Request, Response } from "express";
import { Skill } from "../models/Skill";
import { handleHttpError, HttpError } from "../HttpError";

const indexSkill = async (req:Request, res:Response) => {
    try {
        const skills = await Skill.find({});
        res.status(200).json(skills).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

const viewSkill = async (req:Request, res:Response) => {
    try {
        const skill = await Skill.findById(req.params.id).orFail(new HttpError(404, "Not Found"));
        res.status(200).json(skill).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {indexSkill, viewSkill};