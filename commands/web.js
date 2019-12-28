import { copyDirectoryRecursiveReplace } from "../utilities/fs-util.js";
import { substitute } from "../utilities/name-substituter.js";
import { dirname } from "path";

export async function run(name){
    if(!name){
        return console.log("Please enter a project name");
    }
    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
    await copyDirectoryRecursiveReplace(
        `${basedir}/templates/projects/web`, 
        `${process.cwd()}/${name}`,
        /\$(.*?)\$/g,
        substitute(name)
    );
};

export const args = [
    {
        "name" : "name",
        "description" : "The name of the project"
    }
];