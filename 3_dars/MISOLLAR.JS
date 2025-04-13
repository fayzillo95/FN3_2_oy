// # Node.js Path va FS modullariga oid mashqlar

// ## Oddiy darajadagi mashqlar

// ### 1. Fayl mavjudligini tekshirish

// ```javascript
// /* Masala: Berilgan fayl mavjudligini tekshiring
// Vazifa:
// 1. fs modulidan foydalaning
// 2. existsSync() metodini qo'llang
// 3. Natijani chiqaring

// Namuna:
// checkFileExists('example.txt'); // true yoki false
// */
// ```  

// ### 2. Katalog yaratish

// ```javascript
// /* Masala: Yangi katalog yarating
// Vazifa:
// 1. fs modulidan foydalaning
// 2. mkdir() yoki mkdirSync() metodini qo'llang
// 3. "test-folder" nomli katalog yarating

// Namuna:
// createDirectory('test-folder'); // "Katalog yaratildi"
// */
// ```

// ### 3. Faylga ma'lumot yozish

// ```javascript
// /* Masala: Faylga matn yozing
// Vazifa:
// 1. fs modulidan foydalaning
// 2. writeFile() yoki writeFileSync() metodini qo'llang
// 3. "example.txt" fayliga "Hello World" yozing

// Namuna:
// writeToFile('example.txt', 'Hello World'); // "Faylga yozildi"
// */
// ```

// ### 4. Fayldan ma'lumot o'qish

// ```javascript
// /* Masala: Fayldan matnni o'qing
// Vazifa:
// 1. fs modulidan foydalaning
// 2. readFile() yoki readFileSync() metodini qo'llang
// 3. "example.txt" faylidan ma'lumot o'qing

// Namuna:
// readFromFile('example.txt'); // "Hello World"
// */
// ```

// ### 5. Fayl nomini ajratish

// ```javascript
// /* Masala: Path dan fayl nomini ajratib oling
// Vazifa:
// 1. path modulidan foydalaning
// 2. basename() metodini qo'llang
// 3. "/home/user/documents/file.txt" dan fayl nomini oling

// Namuna:
// getFileName('/home/user/documents/file.txt'); // "file.txt"
// */
// ```

// ### 6. Fayl kengaytmasini olish

// ```javascript
// /* Masala: Fayl kengaytmasini ajratib oling
// Vazifa:
// 1. path modulidan foydalaning
// 2. extname() metodini qo'llang
// 3. "document.pdf" faylining kengaytmasini oling

// Namuna:
// getFileExtension('document.pdf'); // ".pdf"
// */
// ```

// ### 7. Direktoriyadagi fayllar ro'yxati

// ```javascript
// /* Masala: Berilgan direktoriyadagi fayllar ro'yxatini oling
// Vazifa:
// 1. fs modulidan foydalaning
// 2. readdirSync() yoki readdir() metodini qo'llang
// 3. "./documents" katalogidagi fayllarni ko'rsating

// Namuna:
// listFiles('./documents'); // ["file1.txt", "file2.pdf", ...]
// */
// ```

// ### 8. Fayl o'chirish

// ```javascript
// /* Masala: Berilgan faylni o'chiring
// Vazifa:
// 1. fs modulidan foydalaning
// 2. unlinkSync() yoki unlink() metodini qo'llang
// 3. "temp.txt" faylini o'chiring

// Namuna:
// deleteFile('temp.txt'); // "Fayl o'chirildi"
// */
// ```

// ### 9. Path qismlarini birlashtirish

// ```javascript
// /* Masala: Path segmentlarini birlashtiring
// Vazifa:
// 1. path modulidan foydalaning
// 2. join() metodidan foydalaning
// 3. "users", "john", "documents" va "report.pdf" qismlarni birlashtiring

// Namuna:
// joinPaths('users', 'john', 'documents', 'report.pdf'); // "users/john/documents/report.pdf"
// */
// ```

// ### 10. Path ni normallashtirish

// ```javascript
// /* Masala: Path ni normallashtiring
// Vazifa:
// 1. path modulidan foydalaning
// 2. normalize() metodini qo'llang
// 3. "/home/user/../documents/./file.txt" ni normallashtiring

// Namuna:
// normalizePath('/home/user/../documents/./file.txt'); // "/home/documents/file.txt"
// */
// ```

// ## O'rta darajadagi mashqlar

// ### 1. Katalog tuzilishini rekursiv o'qish

// ```javascript
// /* Masala: Katalog va uning ichidagi barcha fayllarni rekursiv o'qish
// Vazifa:
// 1. fs va path modullaridan foydalaning
// 2. Berilgan katalogdagi barcha fayllarni rekursiv ravishda topish
// 3. Har bir faylning to'liq path ini qaytaring

// Namuna:
// listFilesRecursively('./project'); // ["./project/file.js", "./project/lib/utils.js", ...]
// */
// ```

// ### 2. Fayl statistikasi

// ```javascript
// /* Masala: Fayl haqida statistika ma'lumotlarini oling
// Vazifa:
// 1. fs modulidan foydalaning
// 2. statSync() yoki stat() metodini qo'llang
// 3. Fayl hajmi, yaratilgan vaqti, o'zgartirilgan vaqtini ko'rsating

// Namuna:
// getFileStats('example.txt'); 
// // {
// //   size: 1024,
// //   created: "2023-05-15T10:30:00Z",
// //   modified: "2023-05-16T15:20:00Z",
// //   isDirectory: false
// // }
// */
// ```

// ### 3. Katalogni nusxalash

// ```javascript
// /* Masala: Bir katalogni boshqa joyga nusxalash
// Vazifa:
// 1. fs modulidan foydalaning
// 2. Berilgan katalogni va uning ichidagi barcha fayllarni nusxalash
// 3. copyFile() va mkdir() metodlaridan foydalaning

// Namuna:
// copyDirectory('source', 'destination'); // "Katalog nusxalandi"
// */
// ```

// ## Eslatmalar:

// - Barcha mashqlar uchun kutubxonalarni to'g'ri import qiling: `const fs = require('fs');` va `const path = require('path');`
// - Metodlarni asynchronous (callback yoki promises) yoki synchronous ko'rinishida yozishingiz mumkin
