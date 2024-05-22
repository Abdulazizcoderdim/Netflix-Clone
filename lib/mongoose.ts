import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL) {
        throw new Error("DBga ulanmadiiiiii");
    }

    if(isConnected) {
        return;
    }

    try {
        const options: ConnectOptions = {
            dbName: "netflix",
            autoIndex: true,
        }

        await mongoose.connect(process.env.MONGODB_URL, options);

        isConnected = true;
        console.log("MongoDB ulandi ✅");
    } catch (error) {
        console.log('DBga ulanmadiiiiii');
    }
}