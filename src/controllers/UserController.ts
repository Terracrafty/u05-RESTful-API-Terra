import { Request, Response } from "express";
import { User } from "../models/User";
import { Hash, createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
import mongoose from "mongoose";

const env = load({
    JWT_SECRET:String,
});

const createUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const salt = randomBytes(128).toString("base64");
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        await newUser.save();
        res.status(201).json(newUser).end();
    } catch(e) {
        const error = (e as Error);
        if (e instanceof mongoose.Error.ValidationError) {
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

const indexUser = async (req:Request, res:Response) => {
    try {
        const users = await User.find({}, "_id name");
        res.status(200).json({ users }).end();
    } catch(e) {
        const error = (e as Error);
        res.status(500).json({ error: error.message }).end();
    }
};

const viewUser = async (req:Request, res:Response) => {
    res.status(501).json({ error: "not implemented, sorry" }).end();
};

const editUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findById(req.params.id).orFail(new Error("User not found"));
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        await user.save();
        res.status(200).json(user).end();
    } catch (e) {
        const error = (e as Error);
        if (error.message == "User not found") {
            res.status(404).json({ error: error.message }).end();
        } else if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ error: error.message }).end();
        } else {
            res.status(500).json({ error: error.message }).end();
        }
    }
};

const deleteUser = async (req:Request, res:Response) => {
    try {
        await User.findById(req.params.id).deleteOne().orFail(new Error ("User not found"));
        res.status(200).json({ message: "User successfully deleted" }).end();
    } catch (e) {
        const error = (e as Error);
        if (error.message == "User not found") {
            res.status(404).json({ error: error.message }).end();
        } else {
            res.status(500).json({ error: error.message }).end();
        }
    }
};

export {createUser, login, indexUser, viewUser, editUser, deleteUser};