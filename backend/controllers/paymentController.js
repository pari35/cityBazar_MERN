const catchAsyncError = require("../middleware/catchAsycError")

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: 'pk_test_51OeF6eSI0p1RUjaM2HieOHmRD4nuEyETOuNKIsf80Q8irwzr27J811M2BZPLhZsn8zz5IFFvj9ysgl0DLPrkykO500piqob7FV' });
});