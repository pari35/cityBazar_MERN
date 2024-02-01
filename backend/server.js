const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
dotenv.config({ path: "backend/config/config.env" })
const cloudinary = require('cloudinary')

connectDatabase()
//handling uncaught exception
process.on("uncaught error exception", (err) => {
    console.log("errr", err.message);
    console.log("Shutting down the due to unhandled promise rejection");
    server.close(() => {
        process.exit(0)
    })
})

const server = app.listen(4000, () => {
    console.log('server is working on port');
})

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.API_SECRET_KEY
// })

cloudinary.config({
    cloud_name: 'dtlba5n7r',
    api_key: '981158783885228',
    api_secret: 'KVTpNSjfnPHxFNJDZvf3LyUx1HM'
})

//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log("errr", err.message);
    console.log("Shutting down the server");
    server.close(() => {
        process.exit(0)
    })
})
