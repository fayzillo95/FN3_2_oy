import fs from "fs";
import path from 'path'

// ### 1. Fayl mavjudligini tekshirish

function checkFileExists(getFileName) {
    return fs.existsSync(getFileName)
}
// console.log(checkFileExists('package.json'))

function createDirectory(params) {
    try {
         return !(checkFileExists(params)) ?  `Yaratildi ${fs.mkdirSync(params)}` : `Yaratilgan !`
    } catch (error) {
        return 'Error !'
    }
}
// console.log(createDirectory('test'))
// ### 3. Faylga ma'lumot yozish
// fs.appendFileSync('test/test.txt','\n3 - misol')
// fs.appendFileSync('test/test2.txt','\n3 - misol')

// ### 4. Fayldan ma'lumot o'qish

// console.log(fs.readFileSync('test/test.txt','utf-8'))

// ### 5. Fayl nomini ajratish
// console.log(path.basename('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars\\main.js'))

// ### 6. Fayl kengaytmasini olish

// console.log(path.extname('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars\\main.js'))

// ### 7. Direktoriyadagi fayllar ro'yxati

// console.log(fs.readdirSync('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars'))

// ### 8. Fayl o'chirish

// fs.unlinkSync('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars\\test\\test.txt')

// ### 9. Path qismlarini birlashtirish
// console.log(path.join(process.cwd(),'data'));

// ### 10. Path ni normallashtirish

// console.log(path.normalize('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\\\\\\\3_dars\\test\\test.txt'))

// ### 1. Katalog tuzilishini rekursiv o'qish

function readPath(params) {
    console.log(params);
    
    const pathList = fs.readdirSync(params)
    pathList.forEach((item) =>{
        fs.stat(`${params}\\${item}`,(error,link)=>{
            if(link.isDirectory()){
                readPath(`${params}\\${item}`)
            }
        })    
    })
}
// readPath('c:\\Users\\user\\Desktop\\full_Stack_2_oy')

function copyDirectory(source, destination) {
    try {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }

        const items = fs.readdirSync(source);
        items.forEach((item) => {
            const sourcePath = path.join(source, item);
            const destinationPath = path.join(destination, item);
            console.log('\n src\n',sourcePath,"\n destination\n", destinationPath)
            if (fs.statSync(sourcePath).isDirectory()) {
                copyDirectory(sourcePath, destinationPath);
            } else {
                fs.copyFileSync(sourcePath, destinationPath);
            }
        });

        console.log("Katalog nusxalandi");
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

copyDirectory('c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars\\test', 'c:\\Users\\user\\Desktop\\full_Stack_2_oy\\3_dars\\test_copy');