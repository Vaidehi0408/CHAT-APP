import mongoose from 'mongoose'

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connect to mongoDB")
    } catch (error) {
        console.log("error Connection in mongoDb ",error)
    }
}

export default connectToMongoDB;