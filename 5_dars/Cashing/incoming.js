import { readerJson ,writeJson} from "./appdata/JS/file_meneger.js";
let incoming = readerJson('incoming.json')
let obj_inc = {}
let [,TYPING,COMMAND,...query] = process.argv


function createIncom(params) {
    let id = incoming.reduce((max, obj) => max < obj.id ? max = obj.id : max, 1) + 1;
    obj_inc.id = id
    for (let querys of params) {
        if(querys.includes('==') || !querys.split('=')[1]) {
            console.log(`Query invalid ${querys}`)
            return
        }        
        let [key, value] = querys.split('=');
        key = key.toLowerCase();
        obj_inc[key] = (key == 'amout') ? parseInt(value) : (key == 'id') ? id : value;
        }
    
    incoming.push(obj_inc);
    console.table(writeJson('incoming.json', incoming));
}
function deleteIncoming() {
    let id = parseInt(query[0])
    if(!id) {
        console.log(query[0] , "Error !\nType Error ",query[0]," Not id!")
        return
    }
    let incom = {}
    let leng = incoming.length
    incoming = incoming.filter((el) => {
        if(el.id !== parseInt(id)){
            return el
        }else{
            incom = el
        }
    })
    if(leng==incoming.length){
        console.log(id," Topilmadi")
        return
    }else{
        writeJson('incoming.json',incoming)
        console.table(incom)
    }
}
function putIncoming(params) {
    
    for (let querys of params) {
        if(querys.includes('==') || !querys.split('=')[1]) {
            console.log(`Query invalid ${querys}`)
            return
        }        let [key, value] = querys.split('=');
        key = key.toLowerCase();
        obj_inc[key] = (key == 'amout') ? parseInt(value) : (key == 'id') ? id : value;
    }

    console.log(obj_inc)
    let id = parseInt(query[0]);
    if (!id) {
        console.log(query[0], "Type Error", query[0], "Not id!");
        return;
    }
    let id_test = false;
    incoming = incoming.map((el) => {
        if (el.id === id) {
            id_test = true;
            return { ...el, ...obj_inc };
        }
        return el;
    });
    if (!id_test) {
        console.log(id, "Not Found");
        return;
    } else {
        writeJson('incoming.json', incoming);
        console.log("Updated successfully");
    }
}

((params) => {
    if(!COMMAND) {
    COMMAND = COMMAND.toLocaleUpperCase() 

        switch (COMMAND) {
            case 'GET':
                try {
                    incoming = readerJson('incoming.json')
                    console.table(incoming)
                } catch (error) {
                    console.log(error.message)
                }
                break;
            case 'POST':
                incoming = readerJson('incoming.json')
                createIncom(query)
                break;
            case 'DELETE':
                incoming = readerJson('incoming.json')
                deleteIncoming()
                break;
            case 'PUT':
                putIncoming(query.slice(1))
                break;
            default:
                console.log(`${COMMAND}  Command NOT defined !`)
                console.table({
                      Coomads: ["node incoming get", 
                        "node incoming post",
                        "node incoming delte",
                        "node incoming put"],
                      options:  ["GEt all incom",
                        'Add incom',
                        'dremove incom in id!',
                        'update incom in id']
                })
                break;
        }
    }
})()

// (key == 'id') ? id_list.includes(parseInt(value)) ? id_test = true : null : null;
        
// (id_test) ? console.log('ID unique Error enter id!') : null;