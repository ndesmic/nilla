import { promises as fs, createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { PassThrough } from "stream";
import { replaceStream } from "./stream-utils.js";

export const exists = async (path) =>
    fs.access(path).then(() => true).catch(() => false);

export const ensure = async (path) =>
    (await exists(path))
        ? Promise.resolve()
        : fs.mkdir(path);

export async function copyDirectoryRecursiveReplace(src, dest, regex, replaceFunc) {
    const files = await fs.readdir(src);
    await ensure(dest);
    for (const filename of files) {
        const pathToCopy = join(src, filename);
        const copyDestination = join(dest, filename);
        const stats = await fs.lstat(pathToCopy);
        if (stats.isDirectory()) {
            await copyDirectoryRecursiveReplace(pathToCopy, copyDestination, regex, replaceFunc)
        } else {
            await copyReplace(pathToCopy, copyDestination, regex, replaceFunc);
        }
    }
}

export const copyReplace = (src, dest, regex = null, replaceFunc = x => x) =>
    new Promise((res, rej) =>
        createReadStream(src)
            .pipe(regex != null ? replaceStream(regex, replaceFunc) : new PassThrough())
            .pipe(createWriteStream(dest))
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

export const ensureCopyReplace = async (src, dest, regex, replaceFunc) => {
    const destSplit = dest.split("/");
    let currentPath = destSplit[0];
    for await(let part of destSplit.slice(1, destSplit.length - 1)){
        currentPath = currentPath + "/" + part;
        await ensure(currentPath); 
    }
    await copyReplace(src, dest, regex, replaceFunc);
};

export const readJson = async path => {
    const text = await fs.readFile(path, "utf-8");
    const json = JSON.parse(text);
    return json;
}

export const writeJson = async (path, data) => {
    const json = JSON.stringify(data, null, 4);
    await fs.writeFile(path, json, "utf-8");
}