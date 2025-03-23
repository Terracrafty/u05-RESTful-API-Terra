import { Schema, model } from "mongoose";
import { Hash, createHash, randomBytes } from "node:crypto";


interface IUser {
    name:string;
    email:string;
    password:string;
    salt:string;
}

const userSchema = new Schema<IUser>({
    name: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    salt: { type:String, required:false }
});

userSchema.pre("save", function(next) { //password hashing
    console.log("one");
    if (this.isModified("password") || this.isNew) {
        console.log("two");
        const salt = randomBytes(128).toString("base64");
        const hashedPassword = createHash("sha256")
            .update(this.password + salt)
            .digest("hex");
        this.salt = salt;
        this.password = hashedPassword;
    }
    next();
});

const User = model<IUser>('User', userSchema);

userSchema.path("email").validate(async function(value) { //unique email validation
    if (!this.isNew && !this.isModified("email")) {
        return true;
    }
    try {
        const count = await User.countDocuments({ "email": value });
        return (count == 0);
    } catch {
        return false;
    }
}, "Email already in use");

export {User};