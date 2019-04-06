const { copyDirectoryRecursive } = require("../utilities/fs-util.js");

module.exports = async function(name){
    if(!name){
        return console.log("Please enter a project name");
    }
    await copyDirectoryRecursive(`${__dirname}/templates/projects/web`, `${process.cwd()}/${name}`);
};