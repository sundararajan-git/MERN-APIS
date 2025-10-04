import asyncHandler from "express-async-handler"
import Products from "../../models/emart/productModels.js"
import Homepage from "../../models/emart/homePageModels.js"
import Categories from "../../models/emart/categoriesModels.js"
import { AppError } from "../../utils/AppError.js"

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()
    return res.status(200).json({ products, status: "FETCHED" })
})

export const getBestSellersProducts = asyncHandler(async (req, res) => {
    const homepage = await Homepage.findOne().populate("bestSellers");
    return res.status(200).json({
        products: homepage?.bestSellers || [],
        status: "FETCHED"
    });
});

export const getTopOffersProducts = asyncHandler(async (req, res) => {
    const homepage = await Homepage.findOne().populate("topOffers");
    return res.status(200).json({
        products: homepage?.topOffers || [],
        status: "FETCHED"
    });
})

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Categories.find()
    return res.status(200).json({
        categories: categories || [],
        status: "FETCHED"
    });
})

export const searchProducts = asyncHandler(async (req, res) => {
    const { q } = req.query
    if (!q.trim()) {
        throw new AppError("Query is required", 400)
    }
    const products = await Products.find({
        $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
        ]
    })
    return res.status(200).json({ products, status: "FETCHED" })
})

export const getProductList = asyncHandler(async (req, res) => {
    const productList = await Homepage.findOne({}, "productSearchQuery");
    return res.status(200).json({
        productsList: productList || [],
        status: "FETCHED"
    });
})

export const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!id.trim()) {
        throw new AppError("Id is required", 400)
    }
    const product = await Products.findOne({ _id: id })
    return res.status(200).json({
        product,
        status: "FETCHED"
    })
})