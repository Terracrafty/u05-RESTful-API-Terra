import express, { Express } from "express";
import mongoose from "mongoose";
import { load } from "ts-dotenv";
import { mainRouter } from "./routes/MainRoutes";
import cors from "cors";

const env = load({
    PORT:Number,
    MONGOSH_PORT:Number,
    LOCAL:Boolean,
    DB_USER:String,
    DB_PASSWORD:String,
    DB_CLUSTER:String,
    DB_APPNAME:String,
    CORS_ORIGIN:String,
});

const app:Express = express();

const corsOptions = {
    origin: env.CORS_ORIGIN,
    methods: "GET",

};

app.use("/api", mainRouter);
app.use(cors(corsOptions));

async function main() {
    const connstring:string = env.LOCAL ? `mongodb://localhost:${env.MONGOSH_PORT}/${env.DB_APPNAME}` : `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.mongodb.net/${env.DB_APPNAME}?retryWrites=true&w=majority&appName=${env.DB_APPNAME}`
    await mongoose.connect(connstring);
    console.log(env.LOCAL ? `Connected to local MongoDB at port ${env.MONGOSH_PORT}` : "Successfully connected to MongoDB");
    
    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT}`);
    });
}

main().catch(err => console.log(err));