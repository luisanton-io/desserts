import { Dessert } from "../interfaces";
import fs from "fs"
import path from "path"

export default function getDesserts(): Promise<Dessert[]> {
    return new Promise<Dessert[]>((resolve, reject) => {
        fs.readFile(path.resolve("data/desserts.json"), (err, data) => {
            try {
                if (err) throw err;
                resolve(JSON.parse(data.toString()))
            } catch (error) {
                reject(error)
            }
        })
    })
}
