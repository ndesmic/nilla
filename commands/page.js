import { ensureCopy } from "../utilities/fs-util.js";
import { dirname } from "path";

export async function run(name){
    if(!name){
        return console.log("Please enter a page name");
    }
    name = name.replace(/\.html$/, "");
    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
    await ensureCopy(`${basedir}/templates/projects/web/index.html`, `${process.cwd()}/${name}.html`);
};

export const args = [
    {
        "name" : "name",
        "description" : "The name of the page"
    }
];