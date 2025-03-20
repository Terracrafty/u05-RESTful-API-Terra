import { Schema, model } from "mongoose";

interface ISkill {
    name:string;
    max_level:number;
}

const skillSchema = new Schema<ISkill>({
    name: { type:String, required:true},
    max_level: { type:Number, required:true},
});

const Skill = model<ISkill>("Skill", skillSchema);

export {Skill};