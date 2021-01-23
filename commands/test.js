import { copyDirectoryRecursiveReplace, readJson, writeJson, isDirEmpty } from "../utilities/fs-util.js";
import { dirname } from "../utilities/path-utils.js";

export async function run() {
	await createTestFiles();
	await installDeps();
	await updateScripts();
};

async function createTestFiles(){
	//should just skip any file that already exists
	if (await isDirEmpty(`${Deno.cwd()}/tests`)) {
		console.log("Test directory already exists!");
	}

	const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
	await copyDirectoryRecursiveReplace(
		`${basedir}/templates/test`,
		Deno.cwd()
	);
}

async function installDeps(){
	const packageJson = await readJson(`${Deno.cwd()}/package.json`);
	const deps = [
		"karma",
		"karma-chrome-launcher",
		"karma-cli",
		"karma-jasmine",
		"jasmine-core"
	];
	for(let dep of deps){
		await installIfMissing(dep, packageJson);
	}
}

async function installIfMissing(dep, packageJson){
	if((packageJson.devDependencies && packageJson.devDependencies[dep]) || (packageJson.dependencies && packageJson.dependencies[dep])){
		return;
	}
	const process = Deno.run({ cmd: ["npm", "install", dep, "--save-dev"] });
	const { code } = await process.status();
	if(code === 1){
		process.close();
	}
}

async function updateScripts(){
	const packageJson = await readJson(`${Deno.cwd()}/package.json`);
	packageJson.scripts = { 
		...packageJson.scripts,
		test: "npx karma start ./karma.conf.js",
		"test:debug": "npx karma start ./karma.conf.js --no-single-run --auto-watch"
	};
	await writeJson(`${Deno.cwd()}/package.json`, packageJson);
}

export const args = [{}];