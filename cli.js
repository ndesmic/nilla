#!/usr/bin/env node --experimental-modules

const commands = new Set([
    "project",
    "component",
    "cli",
    "page"
]);

(async () => {
    const command = process.argv[2];
    if(commands.has(command)){
        const cmd = await import(`./commands/${command}.js`);
        await cmd.run(process.argv[3]);
        console.log(`${command} completed successfully!`);
    } else {
        console.log(`no command ${process.argv[2]} exists in nilla`);
        console.log(`Accepts ${[...commands].join(", ")}`);
    }
        
})();