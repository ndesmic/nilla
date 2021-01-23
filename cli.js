#!/usr/bin/env deno

const commands = new Set([
	"web",
	"dweb",
	"component",
	"cli",
	"page",
	"test"
]);

const command = Deno.args[0];
if (commands.has(command)) {
	const cmd = await import(`./commands/${command}.js`);
	try {
		await cmd.run(...Deno.args.slice(1));
		console.log(`${command} completed successfully!`);
	} catch (ex) {
		console.log("[ERROR]", ex);
	}
} else {
	console.log(`no command ${command} exists in nilla`);
	console.log(`Accepts ${[...commands].join(", ")}`);
}