import mongoose, { Schema, model, Types } from "mongoose";
import { ISkill, Skill } from "./Skill";

interface IDecoration {
    name:string;
    size:number;
    skills: Array<{ skill:Types.ObjectId, level: number }>;
}

type DecorationHydratedDocument = mongoose.HydratedDocument<
    IDecoration,
    { skills: mongoose.HydratedArraySubdocument<{ skill:Types.ObjectId, level:number }> }
>;

type DecorationModelType = mongoose.Model<
    IDecoration,
    {},
    {},
    {},
    DecorationHydratedDocument
>

const decorationSchema = new Schema<
    IDecoration,
    DecorationModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    IDecoration,
    DecorationHydratedDocument
>({
    name: { type:String, required:true},
    size: { type:Number, required:true},
    skills: [{ skill: { type: Schema.Types.ObjectId, ref: Skill }, level: Number }]
});

decorationSchema.pre(["find", "findOne"], function(next) {
    this.populate<{ skill: ISkill }>("skills.skill");
    next();
});

const Decoration = model<IDecoration, DecorationModelType>("Decoration", decorationSchema);

export {Decoration};
