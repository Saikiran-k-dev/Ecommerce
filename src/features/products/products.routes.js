import express from "express"
import ProductController from "./products.controller.js"
import jwtAuth from "../../middlewares/jwt.middleware.js"

const productRouter = express.Router()

const productController = new ProductController()
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product
 *         quantity:
 *           type: integer
 *           description: Quantity of the product
 *       required:
 *         - name
 *         - quantity
 *       example:
 *         name: "Laptop"
 *         quantity: 10
 */

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */
productRouter.post("/create",jwtAuth,(req,res)=>{
    productController.addProduct(req,res)
})
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Unauthorized
 */

productRouter.get("/",jwtAuth,(req,res)=>{
    productController.getAllProducts(req,res)
})
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
productRouter.delete("/:id",jwtAuth,(req,res)=>{
    productController.deleteProduct(req,res)
})
/**
 * @swagger
 * /products/{id}/update_quantity:
 *   post:
 *     summary: Update the quantity of a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *       - name: quantity
 *         in: query
 *         required: true
 *         description: The new quantity for the product
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid quantity provided
 *       500:
 *         description: Internal Server Error
 */

productRouter.post("/:id/update_quantity",jwtAuth,(req,res)=>{
    productController.updateQuantity(req,res)
})

export default productRouter