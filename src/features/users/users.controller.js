import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserRepository from "./users.repository.js";


export default class UserController{
    constructor(){
        this.userRepository=new UserRepository()
    }

    async signUp(req,res){
        try {
            const userDetails = req.body
            const hashedPassword = await bcrypt.hash(userDetails.password,12)
            userDetails.password = hashedPassword
            const userCreate = await this.userRepository.signUp(userDetails)
            res.status(200).send("user created usccesfully")
        } catch (error) {
            res.status(500).send("server error")
        }
    }

    async signIn(req,res){
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await this.userRepository.signIn(email)
            if(!user){
                res.status(400).send("user not found")
            }
            const validUser = await bcrypt.compare(password,user.password)
            if(!validUser){
                res.status(400).send("incorrect username or password")
            } else {
                const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"2h"})
                res.status(200).send(token)
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}