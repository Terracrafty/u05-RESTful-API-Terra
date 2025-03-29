import { Request, Response } from "express";
import { Decoration } from "../models/Decoration";
import { handleHttpError, HttpError } from "../HttpError";

const indexDecoration = async (req:Request, res:Response) => {
    try {
        const decorations = await Decoration.find({});
        res.status(200).json(decorations).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

const viewDecoration = async (req:Request, res:Response) => {
    try {
        const decoration = await Decoration.findById(req.params.id).orFail(new HttpError(404, "Not Found"));
        res.status(200).json(decoration).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {indexDecoration, viewDecoration};