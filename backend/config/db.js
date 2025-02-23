import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected: ', conn.connection.host);
    } catch (err) {
        console.error("MongoDB connection error: ",err);
        process.exit(1);
    }

}