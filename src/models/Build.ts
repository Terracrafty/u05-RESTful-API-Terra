import mongoose, { Schema, model, Types } from "mongoose";

interface IBuild {
    name:string;
    weapon:Types.ObjectId;
    author:Types.ObjectId;
    head:Types.ObjectId;
    chest:Types.ObjectId;
    arms:Types.ObjectId;
    waist:Types.ObjectId;
    legs:Types.ObjectId;
    decorations: Array<{ decoration:Types.ObjectId }>;
}

type BuildHydratedDocument = mongoose.HydratedDocument<
    IBuild,
    { decorations: mongoose.HydratedArraySubdocument<{ decoration: Types.ObjectId }>}
>;

type BuildModelType = mongoose.Model<
    IBuild,
    {},
    {},
    {},
    BuildHydratedDocument
>;

const buildSchema = new Schema<
    IBuild,
    BuildModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    IBuild,
    BuildHydratedDocument
>({
    name: { type: String, required:true },
    weapon: { type: Schema.Types.ObjectId, ref: "Weapon", required:true },
    author: { type: Schema.Types.ObjectId, ref: "User", required:true },
    head: { type: Schema.Types.ObjectId, ref: "Armor", required:true },
    chest: { type: Schema.Types.ObjectId, ref: "Armor", required:true },
    arms: { type: Schema.Types.ObjectId, ref: "Armor", required:true },
    waist: { type: Schema.Types.ObjectId, ref: "Armor", required:true },
    legs: { type: Schema.Types.ObjectId, ref: "Armor", required:true },
    decorations: [{ type: Schema.Types.ObjectId, ref: "Decoration"}]
});

const Build = model<IBuild, BuildModelType>("Build", buildSchema);

export {Build};