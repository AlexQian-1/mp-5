import {MongoClient} from "mongodb";

const uri = process.env.MONGODB_URL;
let CLIENT: MongoClient | null = null;
export default async function connectDB() {
    if (CLIENT)
        return CLIENT;

    else {
        CLIENT = await MongoClient.connect(uri as string);
        return CLIENT;
    }
}

