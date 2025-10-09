import express from "express"
import { addToCart, getBestSellersProducts, getCartCounts, getCartProducts, getCategories, getProduct, getProductList, getProducts, getSimilarProducts, getTopOffersProducts, removeFromCart, searchProducts, updateQuantity } from "../../controllers/emart/productsController.js"
import { setUserId, validUser } from "../../middlewares/validUser.js"


const router = express.Router()

router.get("/products", getProducts)
router.get("/product/:id", setUserId, getProduct)
router.get("/search", setUserId, searchProducts)
router.get("/product-lists", getProductList)
router.get("/best-sellers", setUserId, getBestSellersProducts)
router.get("/top-offers", setUserId, getTopOffersProducts)
router.get("/categories", getCategories)
router.get("/products/smilar-products", setUserId, getSimilarProducts)
router.put("/add-to-cart", validUser, addToCart)
router.put("/up-quantity", validUser, updateQuantity)
router.get("/cart/products", setUserId, getCartProducts)
router.get("/cart-counts", setUserId, getCartCounts)
router.put("/cart/remove/:productId", validUser, removeFromCart)
// router.put("/place-order", validUser, addToCart)


export default router