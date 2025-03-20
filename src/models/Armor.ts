import mongoose, { Schema, model } from "mongoose";

interface IArmor {
    name:string;
    type:string;
    defense:number;
    fire_resist:number;
    water_resist:number;
    lightning_resist:number;
    ice_resist:number;
    dragon_resist:number;
    slots_1:number;
    slots_2:number;
    slots_3:number;
    skills: Array<{
        name:string;
        level:number;
    }>
}

type ArmorHydratedDocument = mongoose.HydratedDocument<
    IArmor,
    { skills: mongoose.HydratedArraySubdocument<{ name:string, level:number }> }
>;

type ArmorModelType = mongoose.Model<
    IArmor,
    {},
    {},
    {},
    ArmorHydratedDocument
>

const armorSchema = new Schema<
    IArmor,
    ArmorModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    IArmor,
    ArmorHydratedDocument
>({
    name: { type:String, required:true },
    type: { type:String, required:true },
    defense: { type:Number, required:true },
    fire_resist: { type:Number, required:true },
    water_resist: { type:Number, required:true },
    lightning_resist: { type:Number, required:true },
    ice_resist: { type:Number, required:true },
    dragon_resist: { type:Number, required:true },
    slots_1: { type:Number, required:true },
    slots_2: { type:Number, required:true },
    slots_3: { type:Number, required:true },
    skills: [{
        name: { type:String, required:true },
        level: { type:Number, required:true }
    }],
});
