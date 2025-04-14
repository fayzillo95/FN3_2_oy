import fs from 'fs'
import path from 'path'

let fileMap = {
    views: ["index.html", "login.html", "dashboard.html"],
    config: ["db.config.js", "app.config.js"],
    "server.js": "",
    ".env": "",
    "README.md": "",
    src: {
        modules: ["auth.js", "db.js"],
        controller: ["userController.js", "productController.js"],
        router: ["userRouter.js", "productRouter.js"],
        utils: ["validator.js", "logger.js"],
    },
    public: {
        css: ["style.css"],
        js: ["main.js"],
        images: [],
    }
};
function createPath(params, basePath = './appdata') {
    if(Array.isArray(params)){
        params.forEach(el => createPath(el, basePath))
    }else if(typeof params =='object'){
        for(let f in params){
            let fl = path.join(basePath,f)
            if(typeof params[f] == 'string' && !f.startsWith('.')){
                if(!fs.existsSync(fl)){
                    fs.writeFileSync(fl,"// BU fayil")
                }
            }else{
                if(!fs.existsSync(fl)){
                    fs.mkdirSync(fl,{recursive:true})
                }
            }
            createPath(params[f],fl)
        }
    }else if(typeof params == 'string'){
        let fl = path.join(basePath,params)
            if(!fs.existsSync(fl)){
                fs.writeFileSync(fl,"// BU fayil",{recursive:true})
            }
    }   
}
createPath(fileMap)