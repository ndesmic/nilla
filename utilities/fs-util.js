const fs = require("fs")
const path = require("path");

const exists = async (path) =>
    fs.promises.access(path).then(() => true).catch(() => false);

const ensure = async (path) =>
    (await exists(path))
        ? Promise.resolve()
        : fs.promises.mkdir(path);

async function copyDirectoryRecursive(src, dest){
    const files = await fs.promises.readdir(src);
    await ensure(dest);
    for(const filename of files){
        const pathToCopy = path.join(src, filename);
        const copyDestination =  path.join(dest, filename);
        const stats = await fs.promises.lstat(pathToCopy);
        if(stats.isDirectory()){ 
            await copyDirectoryRecursive(pathToCopy, copyDestination)
        } else {
            await copy(pathToCopy, copyDestination);
        }
    }
}

const copy = (src, dest) =>
    new Promise((res,rej) => 
        fs.createReadStream(src).pipe(fs.createWriteStream(dest))
            .on("close", res)
            .on("error", rej));

const ensureCopy = async (src, dest) => {
    const destSplit = dest.split("/");
    let currentPath = destSplit[0];
    for await(let part of destSplit.slice(1, destSplit.length - 1)){
        currentPath = currentPath + "/" + part;
        console.log(currentPath);
        await ensure(currentPath); 
    }
    await copy(src, dest);
};

module.exports = {
    exists,
    ensure,
    copyDirectoryRecursive,
    copy,
    ensureCopy
};