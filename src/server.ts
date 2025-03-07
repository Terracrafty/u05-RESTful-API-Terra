import express, {Express, Request, Response} from "express";
import mongoose, {Schema, model, connect} from "mongoose";
import {load} from "ts-dotenv";

const env = load({
    PORT:Number,
    DB_USER:String,
    DB_PASSWORD:String,
    DB_CLUSTER:String,
    DB_APPNAME:String,
});

const app:Express = express();

app.get("/", (req:Request, res:Response) => {
    res.send("Hello World!");
});

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});

async function main() {
    await mongoose.connect(`mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority&appName=${env.DB_APPNAME}`);
}

main().catch(err => console.log(err));