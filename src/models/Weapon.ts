import mongoose, { Schema, model, Types } from "mongoose";

interface IWeapon {
    name:string;
    type:string;
    raw:number;
    element:number;
    element_type?:string;
    affinity:number;
    defense:number;
    slots_1:number;
    slots_2:number;
    slots_3:number;
    skills: Array<{ skill: Types.ObjectId, level: number }>;
    max_sharpness?: string;
}

type WeaponHydratedDocument = mongoose.HydratedDocument<
    IWeapon,
    { skills: mongoose.HydratedArraySubdocument<{ skill: Types.ObjectId, level: number }> }
>;

type WeaponModelType = mongoose.Model<
    IWeapon,
    {},
    {},
    {},
    WeaponHydratedDocument
>;

const weaponSchema = new Schema<
    IWeapon,
    WeaponModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    IWeapon,
    WeaponHydratedDocument
>({
    name: { type:String, required:true },
    type: { type:String, required:true },
    raw: { type:Number, required:true},
    element: { type:Number, required:true},
    element_type: { type:String, required:false},
    affinity: { type:Number, required:true},
    defense: { type:Number, required:true},
    slots_1: { type:Number, required:true},
    slots_2: { type:Number, required:true},
    slots_3: { type:Number, required:true},
    skills: [{ skill: { type: Schema.Types.ObjectId, ref: "Skill" }, level: Number }],
    max_sharpness: { type:String, required:false }
});

const Weapon = model<IWeapon, WeaponModelType>("Weapon", weaponSchema);

export {Weapon};