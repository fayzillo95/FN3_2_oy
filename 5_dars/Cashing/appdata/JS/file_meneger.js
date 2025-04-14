import fs from "fs";
import path from "path";

const pathName = path.join(process.cwd(),'appdata','database')

function readerJson(fileName) {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(pathName,fileName)))
        return data    
    } catch (error) {
        return [undefined]
    }
}
function writeJson(fileName, data) {
    try {
        fs.writeFileSync(path.join(pathName,fileName),JSON.stringify(data,'utf-8',4))
        return data.at(-1)
    } catch (error) {
        return {
            status:'Error !',
            code:400,
        }        
    }
}
export {
    readerJson,
    writeJson
}