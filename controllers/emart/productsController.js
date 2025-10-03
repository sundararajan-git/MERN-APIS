import asyncHandler from "express-async-handler"
import Products from "../../models/emart/productModels.js"
import Homepage from "../../models/emart/homePageModels.js"

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