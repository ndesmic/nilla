import { promises as fs, createReadStream, createWriteStream } from "fs";
import { join } from "path";

export const exists = async (path) =>
    fs.access(path).then(() => true).catch(() => false);

export const ensure = async (path) =>
    (await exists(path))
        ? Promise.resolve()
        : fs.mkdir(path);

export async function copyDirectoryRecursive(src, dest){
    const files = await fs.readdir(src);
    await ensure(dest);
    for(const filename of files){
        const pathToCopy = join(src, filename);
        const copyDestination =  join(dest, filename);
        const stats = await fs.lstat(pathToCopy);
        if(stats.isDirectory()){ 
            await copyDirectoryRecursive(pathToCopy, copyDestination)
        } else {
            await copy(pathToCopy, copyDestination);
        }
    }
}

export const copy = (src, dest) =>
    new Promise((res,rej) => 
        createReadStream(src).pipe(createWriteStream(dest))
            .on("close", res)
            .on("error", rej));

export const ensureCopy = async (src, dest) => {
    const destSplit = dest.split("/");
    let currentPath = destSplit[0];
    for await(let part of destSplit.slice(1, destSplit.length - 1)){
        currentPath = currentPath + "/" + part;
        await ensure(currentPath); 
    }
    await copy(src, dest);
};