import fs from "fs";
import path from "path";

class Io {
    constructor(){
        this.root = process.cwd()
    }
     jsonReader(fileName) {
        let fl = path.join(this.root,"src","database", `${fileName}.json`);
        try {
            let data = fs.readFileSync(fl, 'utf-8');
            return JSON.parse(data)        
        } catch (error) {
            console.log("Xatolik:", error.message);
            console.log("Fayl manzili:", fl);
            return fl
        }
    }
    
     jsonWriter(fileName, newData) {
        let fl = path.join(this.root, "src", "database", `${fileName}.json`);
        try {
            fs.writeFileSync(fl, JSON.stringify(newData, null, 4), 'utf-8');
            return newData;
        } catch (error) {
            console.log("Xatolik:", error.message);
            console.log("Fayl manzili:", fl);
            return false;
        }
    }
    deltepost(id){
        let posts = this.jsonReader('/posts')
        let users = this.jsonReader('/users')

        users.forEach((user, i) => {
             users[i].posts = user.posts.filter((post,i) => {
                  if(post.id == id) return false
                  return true
             })   
        });
        this.jsonWriter('/posts',posts.filter(post => post.id != id))
        this.jsonWriter('/users',users)
    }
    delteuser(id){
        let posts = this.jsonReader('/posts')
        let users = this.jsonReader('/users')
        let found = [users.find(user => user.posts.some(pos => pos.id == id)), posts.filter(pos => pos.userID == id)]

        if(found == undefined) return 'Not found'
        this.jsonWriter('/posts',posts.filter(post => post.userID != id))
        this.jsonWriter('/users',users.filter(user => user.id != id))
        return found
    }

}

export default Io