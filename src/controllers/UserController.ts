import { Request, Response } from "express";
import { User } from "../models/User";
import { Hash, createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";

const env = load({
    JWT_SECRET:String,
});

const createUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        if (await User.exists({ "email": email })) {
            throw new Error("Email already in use");
        }
        const salt = randomBytes(128).toString("base64");
        const hashedPassword = createHash("sha256")
            .update(password + salt)
            .digest("hex");
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            salt: salt,
        });
        await newUser.save();
        res.status(201).json(newUser).end();
    } catch(e) {
        const error = (e as Error);
        if (error.message == "Email already in use") {
            res.status(400).json({ error: error.message }).end();
        } else {
            res.status(500).json({ error: error.message }).end();
        }
    }
};

const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ "email": email }).orFail(new Error("Incorrect credentials"));
        if (user.password == createHash("sha256").update(password + user.salt).digest("hex")) {
            const token = jwt.sign({ UserId: user._id }, env.JWT_SECRET, { expiresIn: "8h"});
            res.status(200).json({ token: token }).end();
        } else {
            throw new Error("Incorrect credentials");
        }
    } catch(e) {
        const error = (e as Error);
        if (error.message == "Incorrect credentials") {
            res.status(400).json({ error: error.message }).end();
        } else {
            res.status(500).json({ error: error.message }).end();
        }
    }
};

export {createUser, login};