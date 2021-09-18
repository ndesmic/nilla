import { copyDirectoryRecursiveReplace } from "../utilities/fs-util.js";
import { substitute } from "../utilities/name-substituter.js";
import { dirname } from "../utilities/path-utils.js";

export async function run(name, user){
    if(!name){
        throw new Error("Please enter a project name.");
    }
    if(!user){
        throw new Error("Please enter a user for the project.");
    }

    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");

    try{
        await copyDirectoryRecursiveReplace(
            `${basedir}/templates/projects/web`, 
            `${Deno.cwd()}/${name}`,
            /\$(.*?)\$/g,
            substitute(name)
        );
    } catch(ex) {
        throw new Error("Did not complete task", ex);
    }
};

export const args = [
    {
        "name" : "name",
        "user" : "user",
        "description" : "The name of the project"
    }
];