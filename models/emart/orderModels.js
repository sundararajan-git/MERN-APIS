import { Schema } from "mongoose";

const orderSchema = Schema({
    user: { type: Types.ObjectId, ref: "User" },
    items: [
        {
            product: { type: Types.ObjectId, ref: "Product" },
            quantity: Number,
            price: Number,
        }
    ],
    totalAmount: Number,
    status: { type: String, default: "pending" },
    paymentMethod: String,
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});

const db = getDB("emart")
const Order = db.model("Order", orderSchema)

export default Order