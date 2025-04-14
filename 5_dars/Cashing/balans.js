import { readerJson ,writeJson} from "./appdata/JS/file_meneger.js";
let [,TYPING,COMMAND,...query] = process.argv
console.log(COMMAND)
function getAll() {
    let incoming = readerJson("incoming.json")
    let expense = readerJson("expense.json")
    let in_sum = incoming.reduce((sum,el) => sum+=parseInt(el.amout),0)
    let out_sum = expense.reduce((sum,el) => sum+=parseInt(el.amout),0)
    let leng = (incoming.length > expense.length) ? incoming.length : expense.length
    let sqlJoin_ = []
    for(let i = 0; i < leng; i++){
        if(incoming[i] && expense[i]){
            sqlJoin_.push({
                incomingId:incoming[i].id,
                incomingPurpase:incoming[i].purpase,
                incomingamout:incoming[i].amout,
                expenseId:expense[i].id,
                expensePurpase:expense[i].purpase,
                expenseAmout:expense[i].amout
            })
        }else if(incoming[i]){
            sqlJoin_.push({
                incomingId:incoming[i].id,
                incomingPurpase:incoming[i].purpase,
                incomingamout:incoming[i].amout,
                expenseId:null,
                expensePurpase:null,
                expenseAmout:null                
            })
        }else if(expense[i]){
            sqlJoin_.push({
                incomingId:null,
                incomingPurpase:null,
                incomingamout:null,
                expenseId:expense[i].id,
                expensePurpase:expense[i].purpase,
                expenseAmout:expense[i].amout
            })
        }
    }
    sqlJoin_.push({
        incomingId:'All',
        incomingPurpase:'Summa',
        incomingamout:in_sum,
        expenseId:0,
        expensePurpase:'Summa',
        expenseAmout:out_sum
    })
    console.table(sqlJoin_)
}
if(COMMAND=='--more'){
    getAll()
}else if(COMMAND==undefined){
    let incoming = readerJson("incoming.json")
    let expense = readerJson("expense.json")
    let in_sum = incoming.reduce((sum,el) => sum+=parseInt(el.amout),0)
    let out_sum = expense.reduce((sum,el) => sum+=parseInt(el.amout),0)

    console.table([{inComing:in_sum,exPense:out_sum,summa:(in_sum - out_sum)}])
}
