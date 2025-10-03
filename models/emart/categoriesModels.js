import { Schema } from "mongoose"
import { getDB } from "../../config/db.js"

const CategoriesSchema = new Schema({
    name: { type: String },
    imageUrl: { type: String }
})

const db = getDB("emart")
const Categories = db.model("categories", CategoriesSchema)

export default Categories;