import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection Error", error)
        process.exit(1);
    }
}

export default connectDB