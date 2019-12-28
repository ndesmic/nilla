import { ensureCopyReplace } from "../utilities/fs-util.js";
import { substitute } from "../utilities/name-substituter.js";
import { dirname } from "path";

export async function run(name){
    if(!name){
        return console.log("Please enter a component name");
    }
    const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
    await ensureCopyReplace(
        `${basedir}/templates/components/web-component/web-component.js`, 
        `${process.cwd()}/js/components/${name}.js`,
        /\$(.*?)\$/g,
        substitute(name)
    );
};

export const args = [
    {
        "name" : "name",
        "description" : "The name of the component"
    }
];