import mongoose from "mongoose";
import { getDB } from "../../config/db.js";

const homepageSchema = new mongoose.Schema({
    bestSellers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],
    topOffers: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
    ],
    productSearchQuery: [
        { type: String }
    ]
}, { timestamps: true });

const db = getDB("emart")
const Homepage = db.model("Others", homepageSchema);

export default Homepage;
