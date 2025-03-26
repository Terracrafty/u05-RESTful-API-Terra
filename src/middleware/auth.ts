import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { load } from "ts-dotenv";
import { handleHttpError } from "../HttpError";

const env = load({
    JWT_SECRET:String,
});

const authorize = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            res.status(401).end();
            return;
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (decoded.sub == req.params.id) {
            next();
        } else {
            res.status(403).end();
            return;
        }
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {authorize};