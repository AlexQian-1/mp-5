"use server";
import connectDB from "@/lib/config/db";

export async function read(urlPath: string) {
    return await connectDB()
        .then(db => db.db(process.env.DB_NAME).collection('urls').findOne({urlPath: urlPath}))
        .then(data => data?.originalUrl);
}