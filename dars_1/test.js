let readLine = require('readline')
function input(str){
    const reader = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
    return new Promise(resolve => {
        reader.question(str,(res) =>{
            reader.close()
            resolve(res)
        })
    })  
}

async function  getName(params){
    const savollar = [ ["17 + 8 ", 25], ["25 + 36", 61], ["49 + 13", 62], ["72 + 19", 91], ["58 + 41", 99], ["64 - 29", 35], ["91 - 47", 44], ["55 - 18", 37], ["83 - 22", 61], ["100 - 39", 61]];
    let jadval = {}
    let id = 1;
    let [name, fname, age] = [await input('ismingizni kiriting : '), await input('Familyangiz : '), await input('Yoshingizni kiriting : ')]
    for(let savol_in of savollar){
        let javob = await input(`${savol_in[0]} = `)
        jadval[id] = {name, lastanme:fname, age, savol:savol_in[0], javob:savol_in[1], javob_bingiz:javob, result:(savol_in[1] == +javob) ? '✅' : "❌"}
        id++
    }
        console.table(jadval)
}
getName()
