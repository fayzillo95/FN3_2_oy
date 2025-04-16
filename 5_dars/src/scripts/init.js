import User from "./users.js";
import Post from "./posts.js";

class Sql {
    constructor(req, res) {
        this.users = new User(req, res)
        this.posts = new Post(req, res)
    }

}
function setStatus(req, res) {
    const sql = new Sql(res, req)
    let s = req.url.split('/')
    
    if(['users','posts'].includes(s[1]) && s.length == 2){
        sql[s[1]][req.method]()
    }else{
        if(req.url=='/'){
            res.end('HOME')
        }
        else if(['users','posts'].includes(s[1])){
            console.log(req.url)
            sql[s[1]].getQuery()
        }

    }
}
export default setStatus