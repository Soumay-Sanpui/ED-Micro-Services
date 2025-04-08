import mongoose from "mongoose";

interface IProduct {
    productName: string;
    productPrice: number;
    productDescription: string;
    productImage?: string;
    productCategory: string;
    productStock: number;
    isAvailable: boolean;
    boughtBy?: mongoose.Types.ObjectId[] | [];
    soldBy: string;
}

const productSchema = new mongoose.Schema<IProduct>({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: false },
    productCategory: { type: String, required: true },
    productStock: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
    boughtBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    soldBy: { type: String, required: true }
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
