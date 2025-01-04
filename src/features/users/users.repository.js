import mongoose from "mongoose";
import userSchema from "./users.schema.js";

const UserModel = mongoose.model("User",userSchema)

export default class UserRepository{
    constructor(){

    }

    async signUp(userDetails){
        try {
            const newUser = new UserModel(userDetails)
            await newUser.save()
        } catch (error) {
            throw new Error("Server issue")
        }
    }

    async signIn(email){
        try {
            const isValidUser = await UserModel.findOne({email:email})
            if(isValidUser){
                return isValidUser
            }
            throw new Error("user not found")
        } catch (error) {
            throw new Error("server issue")
        }
    }
}