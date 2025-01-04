import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"
import express from "express"
import path from "path"
import swaggerUi from "swagger-ui-express";

import connectToDb from "./src/config/mongoose.js"
import userRouter from "./src/features/users/users.routes.js"
import productRouter from "./src/features/products/products.routes.js"
import swaggerDocs from "./src/config/swagger.js"

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(path.resolve("public"))))

app.use("/users",userRouter)
app.use("/products",productRouter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
    res.status(404).json({
        message: "The requested API does not exist, you can check available API's in /api-docs path",
    });
});

app.use((error, req, res, next) => {
    console.error(error.stack);

    res.status(error.status || 500).json({
        message: error.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : {}
    });
});
app.listen(3000,async ()=>{
    await connectToDb(),
    console.log("server is listening at port 3000")
})