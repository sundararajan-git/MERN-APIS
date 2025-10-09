import asyncHandler from "express-async-handler"
import Products from "../../models/emart/productModels.js"
import Homepage from "../../models/emart/homePageModels.js"
import Categories from "../../models/emart/categoriesModels.js"
import { AppError } from "../../utils/AppError.js"
import Cart from "../../models/emart/cartModels.js"
import User from "../../models/auth/userModels.js"

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find()
    return res.status(200).json({ products, status: "FETCHED" })
})

export const getBestSellersProducts = asyncHandler(async (req, res) => {
    const userId = req.userId
    const homepage = await Homepage.findOne().populate("bestSellers");

    const bestSellers = homepage?.bestSellers || [];

    let cartItems = [];
    if (userId) {
        const userCart = await Cart.findOne({ user: userId }).select("items.product items.quantity items._id").lean()
        if (userCart) {
            cartItems = userCart.items.map((item) => {
                return {
                    productId: item.product?.toString(),
                    quantity: item.quantity,
                    id: item._id?.toString()
                }
            })
        }
    }

    const productsWithCart = bestSellers.map((product) => {
        const cartItem = cartItems.find((item) => item.productId?.toString() === product?._id?.toString())
        return {
            ...product._doc,
            inCart: !!cartItem,
            quantity: cartItem?.quantity || 0
        }
    })

    return res.status(200).json({
        products: productsWithCart,
        status: "FETCHED"
    });
});

export const getTopOffersProducts = asyncHandler(async (req, res) => {
    const userId = req.userId
    const homepage = await Homepage.findOne().populate("topOffers");
    const topOffers = homepage?.topOffers || [];

    let cartItems = [];
    if (userId) {
        const userCart = await Cart.findOne({ user: userId }).select("items.product items.quantity items._id").lean()
        if (userCart) {
            cartItems = userCart.items.map((item) => {
                return {
                    productId: item.product?.toString(),
                    quantity: item.quantity,
                    id: item._id?.toString()
                }
            })
        }
    }

    const productsWithCart = topOffers.map((product) => {
        const cartItem = cartItems.find((item) => item.productId?.toString() === product?._id?.toString())
        return {
            ...product._doc,
            inCart: !!cartItem,
            quantity: cartItem?.quantity || 0
        }
    })

    return res.status(200).json({
        products: productsWithCart,
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
    const userId = req.userId
    const { q, page, limit } = req.query
    if (!q?.trim() || !page || !limit) {
        throw new AppError("Query |  page |  limit  is required", 400)
    }

    const currentPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * pageLimit

    const searchQuery = {
        $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
        ]
    };

    const totalProducts = await Products.countDocuments(searchQuery)

    const products = await Products.find(searchQuery).skip(skip).limit(pageLimit).sort({ createdAt: -1, _id: -1 });

    let cartItems = [];
    if (userId) {
        const userCart = await Cart.findOne({ user: userId }).select("items.product items.quantity items._id").lean()
        if (userCart) {
            cartItems = userCart.items.map((item) => {
                return {
                    productId: item.product?.toString(),
                    quantity: item.quantity,
                    id: item._id?.toString()
                }
            })
        }
    }


    const productsWithCart = products.map((product) => {
        const cartItem = cartItems.find((item) => item.productId?.toString() === product?._id?.toString())
        return {
            ...product._doc,
            inCart: !!cartItem,
            quantity: cartItem?.quantity || 0
        }
    })


    return res.status(200).json({ products: productsWithCart, currentPage, totalPages: Math.ceil(totalProducts / pageLimit), status: "FETCHED" })
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
    const userId = req.userId
    if (!id?.trim()) {
        throw new AppError("Id is required", 400)
    }
    const product = await Products.findOne({ _id: id })


    let cartItems = [];
    if (userId) {
        const userCart = await Cart.findOne({ user: userId }).select("items.product items.quantity items._id").lean()
        if (userCart) {
            cartItems = userCart.items.map((item) => {
                return {
                    productId: item.product?.toString(),
                    quantity: item.quantity,
                    id: item._id?.toString()
                }
            })
        }
    }

    const cartItem = cartItems.find((item) => item.productId?.toString() === product?._id?.toString())

    const productsWithCart = {
        ...product._doc,
        inCart: !!cartItem,
        quantity: cartItem?.quantity || 0
    }


    return res.status(200).json({
        product: productsWithCart,
        status: "FETCHED"
    })
})

export const getSimilarProducts = asyncHandler(async (req, res) => {
    const userId = req.userId
    const { category, id } = req.query
    if (!category?.trim() || !id?.trim()) {
        throw new AppError("Category or id is required", 400)
    }

    const products = await Products.find({ category, _id: { $ne: id } }).limit(4)


    let cartItems = [];
    if (userId) {
        const userCart = await Cart.findOne({ user: userId }).select("items.product items.quantity items._id").lean()
        if (userCart) {
            cartItems = userCart.items.map((item) => {
                return {
                    productId: item.product?.toString(),
                    quantity: item.quantity,
                    id: item._id?.toString()
                }
            })
        }
    }

    const productsWithCart = products.map((product) => {
        const cartItem = cartItems.find((item) => item.productId?.toString() === product?._id?.toString())
        return {
            ...product._doc,
            inCart: !!cartItem,
            quantity: cartItem?.quantity || 0
        }
    })

    return res.status(200).json({
        products: productsWithCart,
        status: "FETCHED"
    })
})

export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.userId
    const { productId, quantity } = req.body;

    if (!userId) {
        throw new AppError("userId is required", 400)
    }

    if (!productId || !quantity) {
        throw new AppError("productId |  quantity is required", 400)
    }

    const userExits = await User.findById({ _id: userId })

    if (!userExits) {
        throw new AppError("User not found", 400)
    }

    const product = await Products.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { items: { product: productId, quantity } } },
        { new: true, upsert: true }
    );

    return res.status(200).json({ cart, status: "UPDATED", message: "Added successfully" });
});


export const updateQuantity = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { productId, action } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
        (i) => i?.product?.toString() === productId
    );

    if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];

    if (action === "INC") item.quantity += 1;
    if (action === "DEC") item.quantity -= 1;

    if (item.quantity <= 0) {
        cart.items.splice(itemIndex, 1);
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ cart, status: "UPDATED", message: item.quantity <= 0 ? "Removed from cart" : null });
});

export const getCartCounts = asyncHandler(async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(200).json({ cartCount: 0, status: "FETCHED" });
    }

    const cart = await Cart.findOne({ user: userId }).select("items").lean();

    if (!cart) {
        return res.status(200).json({ cartCount: 0, status: "FETCHED" });
    }

    const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({ cartCount, status: "FETCHED" });
});


export const getCartProducts = asyncHandler(async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(200).json({ cartProducts: [], cartCount: 0, status: "FETCHED" });
    }

    const cart = await Cart.findOne({ user: userId })
        .populate("items.product")
        .lean();

    if (!cart) {
        return res.status(200).json({ cartProducts: [], cartCount: 0, status: "FETCHED" });
    }

    const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    return res.status(200).json({ cartProducts: cart.items, cartCount, status: "FETCHED" });
});


export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized", status: "FAILED" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found", status: "FAILED" });
    }

    const updatedItems = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    if (updatedItems.length === cart.items.length) {
        return res
            .status(404)
            .json({ message: "Product not found in cart", status: "FAILED" });
    }

    cart.items = updatedItems;
    await cart.save();

    return res.status(200).json({
        message: "Product removed successfully",
        status: "REMOVED",
        cart,
    });
});
