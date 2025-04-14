import { readerJson ,writeJson} from "./appdata/JS/file_meneger.js";
let Expense = []
let obj_exp = {}
let [,TYPING,COMMAND,...query] = process.argv

COMMAND = COMMAND.toLocaleUpperCase()

function createExpense(params) {
    let id = Expense.reduce((max, obj) => max < obj.id ? max = obj.id : max, 1) + 1;
    obj_exp.id = id
    for (let querys of params) {
        if(querys.includes('==') || !querys.split('=')[1]) {
            console.log(`Query invalid ${querys}`)
            return
        }   
        let [key, value] = querys.split('=');
        key = key.toLowerCase();
        obj_exp[key] = (key == 'amout') ? parseInt(value) : (key == 'id') ? id : value;
        }
    
    Expense.push(obj_exp);
    console.table(writeJson('expense.json', Expense));
}
function deleteExpense() {
    let id = parseInt(query[0])
    if(!id) {
        console.log(query[0] , "Error !\nType Error ",query[0]," Not id!")
        return
    }
    let incom = {}
    let leng = Expense.length
    Expense = Expense.filter((el) => {
        if(el.id !== parseInt(id)){
            return el
        }else{
            incom = el
        }
    })
    if(leng==Expense.length){
        console.log(id," Topilmadi")
        return
    }else{
        writeJson('expense.json',Expense)
        console.table(incom)
    }
}
function putExpense() {
    
    for (let querys of query.slice(1)) {
        if(querys.includes('==') || !querys.split('=')[1]) {
            console.log(`Query invalid ${querys}`)
            return
        }
        let [key, value] = querys.split('=');
        key = key.toLowerCase();
        obj_exp[key] = (key == 'amout') ? parseInt(value) : (key == 'id') ? id : value;
    }

    console.log(obj_exp)
    let id = parseInt(query[0]);
    if (!id) {
        console.log(query[0], "Type Error", query[0], "Not id!");
        return;
    }
    let id_test = false;
    Expense = Expense.map((el) => {
        console.log(el)
        if (el.id === id) {
            id_test = true;
            return { ...el, ...obj_exp };
        }
        return el;
    });
    if (!id_test) {
        console.log(id, "Not Found");
        return;
    } else {
        writeJson('expense.json', Expense);
        console.log("Updated successfully");
    }
}


switch (COMMAND) {
    case 'GET':
        try {
            Expense = readerJson('expense.json')
            console.table(Expense)
        } catch (error) {
            console.log(error.message)
        }
        break;
    case 'POST':
        if(query.length < 2) break;
        Expense = readerJson('expense.json')
        createExpense(query)
        break;
    case 'DELETE':
        Expense = readerJson('expense.json')
        deleteExpense()
        break;
    case 'PUT':
        Expense = readerJson('expense.json')
        putExpense()
        break;
    default:
        console.log(`${COMMAND}  Command NOT defined !`)
        console.table({
              Coomads: ["node Expense get", 
                "node Expense post",
                "node Expense delte",
                "node Expense put"],
              options:  ["GEt all incom",
                'Add incom',
                'dremove incom in id!',
                'update incom in id']
        })
        break;
}
