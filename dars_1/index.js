let readLine = require('readline')

function getInput(params) {
    let app = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise(resolve => {
        app.question(params, matn => {
            resolve(matn)
            app.close()
        })
    })
}

let input = async () => {
    let ism = await getInput("Ismingizni kiriting : ")
    console.log(ism);
    return ism
}
input()
