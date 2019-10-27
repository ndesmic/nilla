import { copyDirectoryRecursive } from "../utilities/fs-util.js";

export async function run(name){
    if(!name){
        return console.log("Please enter a project name");
    }
    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
    await copyDirectoryRecursive(`${basedir}/templates/cli/node-cli`, `${process.cwd()}/${name}`);
};

export const args = [
    {
        "name" : "name",
        "description" : "The name of the project"
    }
];