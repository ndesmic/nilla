#!/usr/bin/env node

const commands = new Set([
    "web",
    "component",
    "cli",
    "page",
    "test"
]);

(async () => {
    const command = process.argv[2];
    if(commands.has(command)){
        const cmd = await import(`./commands/${command}.js`);
        try {
            await cmd.run(process.argv[3]);
            console.log(`${command} completed successfully!`);
        } catch(ex){
            console.log("[ERROR]", ex);
        }
    } else {
        console.log(`no command ${process.argv[2]} exists in nilla`);
        console.log(`Accepts ${[...commands].join(", ")}`);
    } 
})();