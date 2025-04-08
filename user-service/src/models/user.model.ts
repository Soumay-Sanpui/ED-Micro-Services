import mongoose from "mongoose";
import { Schema, Types} from "mongoose"

interface IUser {
    username: string;
    email: string;
    password: string;
    age: number;
    address: string;
    phoneNumber: string;
    previousOrders?: Types.ObjectId[];
    active_coupons?: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    previousOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    active_coupons: [{ type: Schema.Types.ObjectId, ref: "Coupon" }]
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
