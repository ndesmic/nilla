#!/usr/bin/env node --experimental-modules

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.__basedir = __dirname;

(async () => {
    switch(process.argv[2]){
        case "my-command":
            {
                const cmd = await import("./commands/my-command.js");
                cmd.run(process.argv[3]);
                break;
            }
        default:
            console.log(`no command ${process.argv[2]} exists`);
            console.log(`Accepts "my-command"`);
    }
        
})();