export function substitute(name){
	const nameTitle = name.split(/[\s-]/g).map(w => w[0].toUpperCase() + w.substr(1)).join(" ");

	return capture => {
		switch (capture) {
			case "$NAME$": return name;
			case "$NAME_TITLE$": return nameTitle
		}
	}
}