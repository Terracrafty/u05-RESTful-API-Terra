import { Request, Response } from "express";
import { User } from "../models/User";
import { Hash, createHash } from "node:crypto";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
import mongoose from "mongoose";
import {HttpError, handleHttpError} from "../HttpError";

const env = load({
    JWT_SECRET:String,
});

const createUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });
        await newUser.save();
        res.status(201).json(newUser).end();
    } catch(e) {
        handleHttpError(e, res);
    }
};

const login = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ "email": email }).orFail(new HttpError(400, "Incorrect credentials"));
        if (user.password == createHash("sha256").update(password + user.salt).digest("hex")) {
            const token = jwt.sign({ sub: user._id }, env.JWT_SECRET, { expiresIn: "8h"});
            res.status(200).json({ token: token }).end();
        } else {
            throw new Error("Incorrect credentials");
        }
    } catch(e) {
        handleHttpError(e, res);
    }
};

const indexUser = async (req:Request, res:Response) => {
    try {
        const users = await User.find({}, "_id name");
        res.status(200).json({ users }).end();
    } catch(e) {
        handleHttpError(e, res);
    }
};

const viewUser = async (req:Request, res:Response) => {
    res.status(501).json({ error: "not implemented, sorry" }).end();
};

const editUser = async (req:Request, res:Response) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findById(req.params.id).orFail(new HttpError(404, "User not found"));
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
        handleHttpError(e, res);
    }
};

const deleteUser = async (req:Request, res:Response) => {
    try {
        await User.findById(req.params.id).deleteOne().orFail(new HttpError(404, "User not found"));
        res.status(200).json({ message: "User successfully deleted" }).end();
    } catch (e) {
        handleHttpError(e, res);
    }
};

export {createUser, login, indexUser, viewUser, editUser, deleteUser};