export async function run(name){
    if(!name){
        return console.log("Please enter a name");
    }
    console.log(`Hello ${name}!`);
    await Promise.resolve(true);
};

export const args = [
    {
        "name" : "name",
        "description" : "The name to print"
    }
];