const { ensureCopy } = require("../utilities/fs-util.js");

module.exports = async function(name){
    if(!name){
        return console.log("Please enter a component name");
    }
    await ensureCopy(`${__basedir}/templates/components/web-component/web-component.js`, `${process.cwd()}/js/components/${name}.js`);
};