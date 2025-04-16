import Io from "../database/fs_meneger.js";
const io = new Io();

class Isvalidation {
    constructor() {
        this.postSxema = ['id', 'userID', 'title', 'body'];
        this.userSxema = ['id', 'name', 'age', 'gender'];
                
    }    
    userValidadtion(params) {
        if(this.userSxema.slice(1).every(key => params.hasOwnProperty(key)) && Object.keys(params).length == 3){
            let age = +params.age
            return (((0 || age) && age <= 100 && params.age !== true) && 
                     /^[a-zA-Z ]{3,30}$/.test(params.name) && 
                     ['male','female'].includes(params.gender))
        }
        return false;
    }
    postValidation(object) {
        
        if(this.postSxema.slice(1).every(key => object.hasOwnProperty(key)) && Object.keys(object).length == 3){
            let user = false
            let id = parseInt(object.userID)
            io.jsonReader('/users').forEach(element => {
                if(element.id == id) {
                    user = element
                    console.log(id)
                }
            });
            return (object.title && object.body && user) ? user : false
        } 
        console.log('post invalid')
        return false;
    }
}
export default Isvalidation