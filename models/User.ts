import bcrypt from "bcryptjs";
import { model, models, Schema, Types } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    _id?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
)

UserSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

const User = models?.User || model<IUser>('User', UserSchema)

export default User;