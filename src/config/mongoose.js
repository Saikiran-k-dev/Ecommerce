import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const url = process.env.DB_URL

const connectToDb = async() =>{
    try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
            process.exit(1);
}
}

export default connectToDb