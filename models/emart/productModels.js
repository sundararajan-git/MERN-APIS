import { Schema } from "mongoose"
import { getDB } from "../../config/db.js"

const productSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    unit: { type: String },
    stock: { type: Number },
    category: { type: String },
    discountPrice: { type: Number },
    totalReviews: { type: Number },
    rating: { type: Number },
    images: [
        { type: String }
    ]
})

const db = getDB("emart")
const Product = db.model("Product", productSchema)

export default Product