const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsycError")
const ApiFeatures = require("../utils/apiFeature")

exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 5
    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await apiFeature.query

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage
    })
})

//update product admin
exports.updateProduct = catchAsyncError(async (req, res) => {
    let product = Product.findById(req.params.id)
    if (!product) {
        return res.status(500).json({
            success: "false",
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: "true",
        product
    })
})

// delete products
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
    let product = Product.findById(req.params.id)
    if (!product) {
        return res.status(500).json({
            success: "false",
            message: "Product not found"
        })
    }
    await product.deleteOne()
    res.status(200).json({
        success: "true",
        message: "Product deleted succesfully"
    })
})

// get product details
exports.getProductDetails = catchAsyncError(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        res.status(200).json({
            success: "true",
            product
        })
    }
)

// create new review or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }
    const review = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
    let avg = 0;

    review.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = avg / reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        review, ratings, numOfReviews
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    res.status(200).json({
        success: true
    })
})