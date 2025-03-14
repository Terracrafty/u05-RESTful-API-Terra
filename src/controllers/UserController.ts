import { Request, Response } from "express";
import { User } from "../models/User";
import { Hash, createHash } from "node:crypto";

const createUser = async (req:Request, res:Response) => {
    try {
        const hashedPassword = createHash("sha256")
            .update(req.body.password)
            .digest("hex");
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error) {
        console.log(error);
        res.status(500).json({err: error});
    }
};

export {createUser};