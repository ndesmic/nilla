export function dirname(str){
	const split = str.split("/")
	return split.slice(0, split.length - 1).join("/");
}

export function join(...parts){
	return parts
			.map(p => p.trim())
			.map(p => p.replace(/\/\\/g, ""))
			.join("/");
}