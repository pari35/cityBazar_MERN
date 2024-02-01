const catchAsycError = require("./catchAsycError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsycError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("req.cookies", req.cookies)
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, 'lksdjfyusbj');

    req.user = await User.findById(decodedData.id);

    next();
});

// logout user
exports.logout = catchAsycError(async (req, res, next) => {
    req.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
});

//
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource `, 403
                )
            )
        }
        next()
    }

}