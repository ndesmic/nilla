import { ensureDir } from "https://deno.land/std@0.84.0/fs/ensure_dir.ts"
import { exists } from "https://deno.land/std@0.84.0/fs/exists.ts"
import { join } from "./path-utils.js";

export async function isDirEmpty(path){
	if(await exists(path)){
		const files = Deno.readDir(path);
		for await(const file of files){
			return false;
		}
	} else {
		return true;
	}
}

export async function copyDirectoryRecursiveReplace(src, dest, regex, replaceFunc) {
	const files = Deno.readDir(src);
	await ensureDir(dest);
	for await(const file of files) {
		const pathToCopy = join(src, file.name);
		const copyDestination = join(dest, file.name);
		const stats = await Deno.stat(pathToCopy);
		if (stats.isDirectory) {
			await copyDirectoryRecursiveReplace(pathToCopy, copyDestination, regex, replaceFunc)
		} else {
			await copyReplace(pathToCopy, copyDestination, regex, replaceFunc);
		}
	}
}

export async function copyReplace(src, dest, regex = null, replaceFunc = x => x){
	const file = await Deno.readTextFile(src);
	const altered = file.replace(regex, replaceFunc);
	await Deno.writeTextFile(dest, altered);
}

export const ensureCopyReplace = async (src, dest, regex, replaceFunc) => {
	const destSplit = dest.split("/");
	let currentPath = destSplit[0];
	for await (let part of destSplit.slice(1, destSplit.length - 1)) {
		currentPath = currentPath + "/" + part;
		await ensureDir(currentPath);
	}
	await copyReplace(src, dest, regex, replaceFunc);
};

export const readJson = async path => {
	const text = await Deno.readTextFile(path);
	const json = JSON.parse(text);
	return json;
}

export const writeJson = async (path, data) => {
	const json = JSON.stringify(data, null, 4);
	await Deno.writeTextFile(path, json);
}