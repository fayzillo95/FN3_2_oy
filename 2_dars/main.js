import { Calc } from "./modules.js";

// ### 1. Spread operator bilan massivni ko‘paytirish

// - **Shart**: `[1, 2, 3]` massivini spread operator yordamida ikki marta takrorlang va yangi massiv hosil qiling. Natija: `[1, 2, 3, 1, 2, 3]`.
// - **Yo‘nalish**: Spread operator (`...`) massiv elementlarini ochib, yangi massiv ichiga joylashtirish uchun ishlatiladi.

let arr = [1, 2, 3]
// console.log([...arr,...arr]);

// ### 2. Rest operator bilan argumentlarni yig‘ish

// - **Shart**: Funksiyaga bir nechta argument kiritiladi 
// (masalan, 1, 2, 3, 4, 5), 
// faqat birinchisini alohida olib, 
// qolganlarini massiv sifatida qaytaring.
// - **Yo‘nalish**: Rest operator (`...`) 
// funksiyada qolgan argumentlarni massivga yig‘adi.

function misol_1(a,...params) {
    console.log(a,"\n",params);
}

// ### 3. Spread bilan obyektni nusxalash

// - **Shart**: `{ name: "Ali", age: 20 }` 
// obyektini spread operator yordamida nusxalang va yangi obyektga `city: "Toshkent"` qo‘shing.
// - **Yo‘nalish**: Spread operator obyektni ochib, yangi obyekt ichiga eski ma’lumotlarni joylashtiradi.

let obj_3 = {...{ name: "Ali", age: 20 },city:"Toshkent"}
// console.log(obj_3);

// ### 4. Rest bilan massivni qismlarga ajratish
// - **Shart**: `[10, 20, 30, 40, 50]` massividan birinchi ikkita elementni alohida oling,
// - qolganlarini rest operator yordamida massiv sifatida saqlang.
// - **Yo‘nalish**: Destructuring bilan rest operator birgalikda ishlatiladi.

let [a_4,b_4,...arr_4] = [10, 20, 30, 40, 50]
// console.log(arr_4);

// ### 5. Spread bilan massivlarni birlashtirish

// - **Shart**: `[1, 2]` va `[3, 4]` massivlarini spread operator yordamida bitta massivga birlashtiring.
// - **Yo‘nalish**: Ikkala massivni yangi massiv ichida spread qilib yozing.

console.log([...[1,2],...[3,4]]);

// ### 6. ES Module bilan oddiy eksport

// - **Shart**: `math.js` nomli faylda `add` funksiyasini (ikki sonni qo‘shadi) eksport qiling va uni boshqa faylda import qilib ishlatib ko‘ring.
// - **Yo‘nalish**: `export` va `import` kalit so‘zlaridan foydalaning.

let calc = new Calc()
console.log(calc.add(10,5))


// ### 7. Spread bilan funksiya argumentlari

// - **Shart**: `[5, 10, 15]` massivini spread operator yordamida 
// `Math.max()` funksiyasiga argument sifatida yuboring va eng katta sonni toping.
// - **Yo‘nalish**: Spread operator massivni alohida elementlarga ajratadi.

let numbers = [5, 10, 15];
console.log(Math.max(...numbers));

// ### 8. Named export bilan bir nechta funksiya

// - **Shart**: `utils.js` faylida `multiply` (ko‘paytirish) va `subtract` (ayirish) funksiyalarini nomli eksport qiling va ularni boshqa faylda import qiling.
// - **Yo‘nalish**: `{}` bilan nomli eksport va import qilinadi.

console.log(calc.multiply(6, 7)); 
console.log(calc.subtract(10, 4)); 

// ### 9. Rest bilan ortiqcha argumentlarni hisoblash

// - **Shart**: Funksiyaga 3 ta argument kerak, lekin foydalanuvchi undan ko‘p bersa, qo‘shimcha argumentlar sonini hisoblang.
// - **Yo‘nalish**: Rest operator yordamida qo‘shimcha argumentlarni massiv sifatida oling va uzunligini hisoblang.

function ExtraArgCount(a,b,...params) {
    return `Ortiqcha elementlar soni ${params.length - 1}`
}
console.log(ExtraArgCount(1,2,3,4,5,6))

// ### 10. Default export bilan obyekt

// - **Shart**: `'utils.js'` faylida `{ name: "Olim", age: 25 }` obyektini default eksport qiling va uni boshqa faylda import qilib konsolga chiqaring.
// - **Yo‘nalish**: `export default` va `import` bilan default eksport qilinadi.

import obj from './utils.js';
console.log(obj);


// ### 11. Spread va Rest bilan massivlarni qayta ishlash

// - **Shart**: `[1, 2, 3, 4, 5, 6]` massividan birinchi ikkita elementni olib,
//  qolganlarini spread operator yordamida yangi massivga birlashtirib,
//  har bir elementni 2 ga ko‘paytiring. Natija: `[3, 4, 5, 6]` → `[6, 8, 10, 12]`.
// - **Yo‘nalish**: Birinchi qismlar uchun destructuring va rest, keyin spread va `map` ishlatiladi.

let [, , ...rest] = [1, 2, 3, 4, 5, 6];
let result = rest.map(num => num * 2);
console.log(result);

// ### 12. ES Module bilan kalkulyator

// - **Shart**: `calculator.js` faylida `add`, `subtract`, `multiply` 
// funksiyalarini eksport qiling (bittasi default, qolganlari named). 
// Boshqa faylda ularni import qilib, 10, 5 sonlari bilan sinab ko‘ring.
// - **Yo‘nalish**: Default va named eksportlarni aralashtirib ishlatishni o‘rganing.
console.log(calc.add(10, 5));
console.log(calc.subtract(10, 5));
console.log(calc.multiply(10, 5));

// ### 13. Spread bilan murakkab obyekt birlashtirish

// - **Shart**: `{ person: { name: "Ali" } }` va `{ person: { age: 20 } }` 
// obyektlarini spread operator yordamida birlashtiring, lekin `person` ichidagi ma’lumotlar to‘g‘ri birlashsin. 
// Natija: `{ person: { name: "Ali", age: 20 } }`.
// - **Yo‘nalish**: Ichki obyektlarni birlashtirish uchun spreadni ikki darajada ishlatish kerak.

let obj1 = { person: { name: "Ali" } };
let obj2 = { person: { age: 20 } };

let mergedObj = { person: { ...obj1.person, ...obj2.person } };
console.log(mergedObj);