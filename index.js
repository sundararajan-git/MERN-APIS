import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv"
import path from "path"
import fs from "fs"


config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




async function uploadImage() {
    try {
        const folderName = "EMART";

        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"))

        console.log("Uploading Start....... 📄")

        let count = 1;

        const outCome = await Promise.all(data.map(async (item, index) => {
            const obj = { ...item }
            if (item.category === "Flavors & Spices") {
                const imageUrl = obj.images[1];
                const result = await cloudinary.uploader.upload(imageUrl, {
                    folder: folderName,
                });
                console.log(count, "  Uploaded Image URL:", result.secure_url);
                obj.images[1] = result.secure_url
                count++;
            }
            return obj
        }))
        fs.writeFileSync("./db.json", JSON.stringify(outCome, null, 2))
        console.log("Uploading End....... ✅")
    } catch (err) {
        console.error("Upload failed:", err);
    }
}

async function deleteOne() {
    const urls = [
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475587/EMART/itsln5dpzlpddbdnq14r.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475606/EMART/gmwxyec2cdqijhp4395f.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475627/EMART/mw8zmwj7ovcmtwubtmcf.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475633/EMART/lwwnk5ezpe3dpuhjl0cl.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475636/EMART/egv9n7frs1237kf0nlq2.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475646/EMART/lvb1xcfdw2yjuvcm0ej6.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475648/EMART/ywlbgsouvrbtr8uelg0a.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475656/EMART/pbybdduuqeedktg6hp8b.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475657/EMART/gh8nboakejz74lpqdcoi.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475661/EMART/j9fsxzz8w95g4dcaclrw.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475660/EMART/celqnovvqd3l2qv9aqbd.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475666/EMART/q8dxmbotownjwfjsepjm.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475669/EMART/wrkcaez1aq9iu7qaingf.png",
        "https://res.cloudinary.com/dlwe2wlwl/image/upload/v1759475670/EMART/ifabqwv3qx3pddf6gisl.png"]

    try {
        const deletePromises = urls.map((url) => {
            if (!url) return null;

            // Extract public_id
            const parts = url.split("/upload/")[1]; // EMART/Bell Pepper1.png
            if (!parts) return null;

            // Remove version and extension
            const noVersion = parts.replace(/^v[0-9]+\//, ""); // remove v1759475670/
            const publicId = noVersion.substring(0, noVersion.lastIndexOf("."));

            return cloudinary.uploader.destroy(publicId);
        });

        const results = await Promise.all(deletePromises);
        console.log("Deletion results:", results);
    } catch (err) {
        console.error(err)
    }

}

// deleteOne()

// uploadImage();

// ---------------------------------------------------------------------------------------------------------

import mongoose from "mongoose";

const localUri = "mongodb://localhost:27017/EMART";
const atlasUri = process.env.MONGO_URI_EMART;

async function migrateCollection(collectionName) {
    const localConn = await mongoose.createConnection(localUri);
    const atlasConn = await mongoose.createConnection(atlasUri);

    const LocalModel = localConn.model(collectionName, new mongoose.Schema({}, { strict: false }));
    const AtlasModel = atlasConn.model(collectionName, new mongoose.Schema({}, { strict: false }));

    const docs = await LocalModel.find({});
    await AtlasModel.insertMany(docs);

    console.log(`${collectionName} migrated`);
}

migrateCollection("products");

