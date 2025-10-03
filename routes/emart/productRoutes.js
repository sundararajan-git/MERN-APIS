import express from "express"
import { getBestSellersProducts, getProducts, getTopOffersProducts } from "../../controllers/emart/productsController.js"


const router = express.Router()

router.get("/products", getProducts)
router.get("/best-sellers", getBestSellersProducts)
router.get("/top-offers", getTopOffersProducts)
router.get("/categories", getTopOffersProducts)

export default router