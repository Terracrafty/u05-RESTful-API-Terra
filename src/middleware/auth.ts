import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";

const env = load({
    JWT_SECRET:String,
});

const authorize:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    try {
        const decoded = jwt.verify(req.body.token, env.JWT_SECRET);
        req.body.UserId = decoded.UserId;
    } catch (e) {

    }
};