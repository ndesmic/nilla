import { Transform } from "stream"

export function replaceStream(regex, value){
    const chunks = [];
    let length = 0;

    const transform = new Transform({
        transform: function(chunk, encoding, callback){
            chunks.push(chunk);
            length += chunk.length;

            callback(null);
        },
        flush(callback){
            if(chunks.length !== 0){
                this.push(Buffer.concat(chunks, length).toString().replace(regex, value));
            }
            callback(null);
        }
    });

    return transform;
}