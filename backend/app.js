const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const errorMiddleWare = require("./middleware/error")
const Order = require("./routes/orderRoute")
const cors = require("cors")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require("path");

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.get('/about', (req, resp) => {
    resp.send("welcome to home page")
})

// route imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const payment = require("./routes/paymentRoute");
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", Order)
app.use("/api/v1", payment);
//error middleware
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
app.use(errorMiddleWare)
module.exports = app