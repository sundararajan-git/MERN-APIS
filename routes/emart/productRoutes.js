import express from "express"
import { getBestSellersProducts, getCategories, getProduct, getProductList, getProducts, getTopOffersProducts, searchProducts } from "../../controllers/emart/productsController.js"


const router = express.Router()

router.get("/products", getProducts)
router.get("/product/:id", getProduct)
router.get("/search", searchProducts)
router.get("/product-lists", getProductList)
router.get("/best-sellers", getBestSellersProducts)
router.get("/top-offers", getTopOffersProducts)
router.get("/categories", getCategories)

export default router