import { Schema, Types } from "mongoose";
import { getDB } from "../../config/db.js";

const cartSchema = Schema({
    user: { type: Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            addedAt: { type: Date, default: Date.now },
        }
    ],
    updatedAt: { type: Date, default: Date.now },
});


const db = getDB("emart")
const Cart = db.model("Cart", cartSchema)

export default Cart