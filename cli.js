#!/usr/bin/env node --experimental-modules

(async () => {
    switch(process.argv[2]){
        case "project":
            {
                const cmd = await import("./commands/project.js");
                cmd.run(process.argv[3]);
                break;
            }
        case "component":
            {
                const cmd = await import("./commands/component.js");
                cmd.run(process.argv[3]);
                break;
            }
        case "cli":
            {
                const cmd = await import("./commands/cli.js");
                cmd.run(process.argv[3]);
                break;
            }
        case "page":
            {
                const cmd = await import("./commands/page.js");
                cmd.run(process.argv[3]);
                break;
            }
        default:
            console.log(`no command ${process.argv[2]} exists in nilla`);
            console.log(`Accepts "project", "component", "cli" or "page" + name`);
    }
        
})();