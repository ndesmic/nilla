import { copyDirectoryRecursiveReplace, exists, readJson, writeJson } from "../utilities/fs-util.js";
import { dirname } from "path";
import { promisify } from "util";
import { exec } from "child_process";

const execChildProcess = promisify(exec);

export async function run() {
	await createTestFiles();
	await installDeps();
	await updateScripts();
};

async function createTestFiles(){
	//should just skip any file that already exists
	if (await exists(`${process.cwd()}/tests`)) {
		console.log("Test directory already exists!");
	}

	const basedir = dirname(dirname(import.meta.url)).replace("file:///", "");
	await copyDirectoryRecursiveReplace(
		`${basedir}/templates/test`,
		process.cwd()
	);
}

async function installDeps(){
	const packageJson = await readJson(`${process.cwd()}/package.json`);
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
	await execChildProcess(`npm install ${dep} --save-dev`);
}

async function updateScripts(){
	const packageJson = await readJson(`${process.cwd()}/package.json`);
	packageJson.scripts = { 
		...packageJson.scripts,
		test: "karma start ./karma.conf.js",
		"test:debug": "karma start ./karma.conf.js --no-single-run --auto-watch"
	};
	await writeJson(`${process.cwd()}/package.json`, packageJson);
}

export const args = [{}];