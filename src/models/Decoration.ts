import mongoose, { Schema, model } from "mongoose";

interface IDecoration {
    name:string,
    size:number,
    skills: Array<{
        name:string,
        level:number
    }>
}

type DecorationHydratedDocument = mongoose.HydratedDocument<
    IDecoration,
    { skills: mongoose.HydratedArraySubdocument<{ name:string, level:number }> }
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
    skills: [{
        name: { type:String, required:true },
        level: { type:Number, required:true }
    }]
});

const Decoration = model<IDecoration, DecorationModelType>("Decoration", decorationSchema);

export {Decoration};
