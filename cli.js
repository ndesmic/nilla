#!/usr/bin/env node

global.__basedir = __dirname;

(async () => {
    switch(process.argv[2]){
        case "project":
            await require("./commands/project.js")(process.argv[3]);
            break;
        case "component":
            await require("./commands/component.js")(process.argv[3]);
            break;
        default:
            console.log(`no command ${process.argv[2]} exists in nilla`);
    }
        
})();