import mongoose from "mongoose";
import { productSchema } from "./products.schema.js";

const ProductModel = mongoose.model("Product",productSchema)

export default class ProductRepository{
    constructor(){

    }

    async addProduct(productDetails){
        try {
            const newProduct = new ProductModel(productDetails)
            await newProduct.save()
            return newProduct
        } catch (error) {
            throw new Error("server error")
        }
    }

    async getAllProducts(){
        try {
            const products = await ProductModel.find()
            
            if(products.length==0){
                return {products:"no products yet"}
            }
            return products
        } catch (error) {
            throw new Error("server error")
        }
    }

    async deletProduct(productId){
        try {
            const isProductPresent = await ProductModel.findById(productId)
            if(!isProductPresent){
                return "product not found"
            }
            await ProductModel.findByIdAndDelete(productId)
            return "product deleted"
        } catch (error) {
            throw new Error("server error")
        }
    }

    async updateQuantity(productId, quantityChange) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productId,
                { $inc: { quantity: quantityChange } }, 
                { new: true }
            );
    
            if (!updatedProduct) {
                console.log("no product")
            }
    
            if (updatedProduct.quantity < 0) {
                updatedProduct.quantity = 0;
                await updatedProduct.save();
                console.log("cannot be negative so resseted to 0")
            }
    
            return updatedProduct;
        } catch (error) {
            console.error("Error updating quantity:", error.message);
            throw error;
        }
    }
}