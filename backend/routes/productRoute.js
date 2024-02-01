const { getAllProducts, createProduct, updateProduct, deleteProducts, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController")

const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProducts);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
router.route("/product/:id").get(getProductDetails);
module.exports = router
