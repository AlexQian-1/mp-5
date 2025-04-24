"use server";

import connectDB from "@/lib/config/db";
import {read} from "@/lib/read";

export async function create(originalUrl: string, urlPath: string) {
    return await read(urlPath).then(data => {
        if (data) {
            return false;
        } else {
            connectDB().then(db => db.db(process.env.DB_NAME).collection('urls').insertOne({
                originalUrl,
                urlPath
            }));
            return true;
        }
    })
}