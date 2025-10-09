import { Schema, Types } from "mongoose";
import { getDB } from "../../config/db.js";

const homepageSchema = Schema({
    bestSellers: [
        { type: Types.ObjectId, ref: "Product" }
    ],
    topOffers: [
        { type: Types.ObjectId, ref: "Product" }
    ],
    productSearchQuery: [
        { type: String }
    ]
}, { timestamps: true });

const db = getDB("emart")
const Homepage = db.model("Others", homepageSchema);

export default Homepage;
