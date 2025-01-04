import ProductRepository from "./products.repository.js";

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository()
    }

    async getAllProducts(req,res){
        try {
            const products = await this.productRepository.getAllProducts()
            res.status(200).send({data:{products}})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async addProduct(req,res){
        try {
            const productDetails = req.body
            const product = await this.productRepository.addProduct(productDetails)
            res.status(200).send({data:{product}})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async deleteProduct(req,res){
        try {
            const productId = req.params.id
            const deletedProduct = await this.productRepository.deletProduct(productId)
            res.status(202).send({data:{message:"product deleted"}})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }

    async updateQuantity(req,res){
        try {
            const productId = req.params.id
            const quantity = req.query.number
            const product = await this.productRepository.updateQuantity(productId,quantity)
            res.status(201).send({data:{product},message:"updated successfully"})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}