import Io from "../database/fs_meneger.js";
import Isvalidation from "./isvalid.js";
import url from 'url'
import query from 'querystring'

class User extends Io{
    constructor(res,req) {
        super()
        this.name = '/users'
        this.data = this.jsonReader(this.name)
        this.maxId = this.data.reduce((id,user) => user.id > id ? user.id : id, 0) + 1
        this.req = req
        this.res = res
        this.valid = new Isvalidation()
        this.io = new Io()
    }
    GET(){
        this.res.setHeader('Content-Type','application/json')
        this.res.write(JSON.stringify(this.data,null,4))
        this.res.end()
        return this.data
    }
    POST(newData){
        if(this.valid.userValidadtion(newData)){
            newData.id = this.maxId
            newData.posts = []
            this.maxId++   
            this.data.push(newData)
            this.jsonWriter(this.name, this.data)
            return newData
        }
    }
    DELETE(){
        return this.io.delteuser(1)
    }
    PUT(){
    }
    getQuery(){
        this.qury = url.parse(this.req.url)
        console.log('User',query.parse(this.qury.query))
    }
}

export default User;
