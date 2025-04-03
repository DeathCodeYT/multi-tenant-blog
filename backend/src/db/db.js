import mongoose from "mongoose";

export async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(error)
        console.log("DB Connection Error...")
    }
}
