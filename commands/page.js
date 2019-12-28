import { ensureCopyReplace } from "../utilities/fs-util.js";
import { substitute } from "../utilities/name-substituter.js";
import { dirname } from "path";

export async function run(name){
    if(!name){
        return console.log("Please enter a page name");
    }
    name = name.replace(/\.html$/, "");
    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
    await ensureCopyReplace(
        `${basedir}/templates/projects/web/index.html`, 
        `${process.cwd()}/${name}.html`,
        /\$(.*?)\$/g,
        substitute(name)
    );
};

export const args = [
    {
        "name" : "name",
        "description" : "The name of the page"
    }
];