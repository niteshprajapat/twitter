import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB is connected Successfully.');
    } catch (error) {
        console.log("Unable to connect MongoDB ", error);
        process.exit(1);
    }
}

export default connectDB;