import Io from "../database/fs_meneger.js";
import Isvalidation from "./isvalid.js";
import url from 'url'
import query from 'querystring'

class Post extends Io{
    constructor(res,req) {
        super()
        this.name = '/posts'
        this.data = this.jsonReader(this.name)
        this.req = req
        this.res = res
        this.io = new Io()
        this.valid = new Isvalidation()
        this.maxId = this.data.reduce((id,user) => user.id > id ? user.id : id, 0) + 1
    }
    GET = function(){
        this.res.setHeader('Content-Type','application/json')
        this.res.write(JSON.stringify(this.data,null,4))
        this.res.end()
    }
    POST(data){
        let users = this.io.jsonReader('/users')
        let found = users.find(user => user.id == data.userID)
        console.log(this.valid.postValidation(data))

        if(this.valid.postValidation(data) && found){
            data.id = this.maxId
            this.maxId++
            this.data.push(data)
            this.io.jsonWriter(this.name,this.data)
            delete data.userID
            found.posts.push(data)
            this.jsonWriter('/users',users)
            return [data, found]
        }
        return 'UserID Not Foud'
    }
    DELETE(id){
        this.io.deltepost(id)
    }
    PUT = async function(){
    }
    getQuery(){
        const url_u = url.parse(this.req.url)
        const qury = query.parse(url_u.query)
        console.log('Posts',Object.keys(qury))
    }
}
export default Post;
