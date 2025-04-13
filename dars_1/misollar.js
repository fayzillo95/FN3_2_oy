class Person {
    constructor(name, age) {
        this.name = name
        this.age = age        
    }
}
"__________________________________________________________________________________________________"

/* Talaba haqida ma'lumotlarni saqlash va ular bilan ishlash
Namuna:
const student = new Student("Ali", 20, 2);
student.getInfo();      // "Ali, 20 yosh, 2-kurs"
student.nextCourse();   // Keyingi kursga o'tkazish
student.getInfo();      // "Ali, 20 yosh, 3-kurs"
*/
class Studet extends Person{
    constructor(name, age, course) {
        super(name, age)
        this.course = course
    }
    getInfo(){
        console.log(this);
    }
    nextCourse(num=1){
        if(this.course > 4){
            console.log(this.name , " Bitirgan")
            return
        }
        if(this.course < 4){
            this.course+=1
            console.log(this.name, " ",this.course," - cursga ga o'tdi ! ")
        }else{
            this.course+=1
            console.log(this.name, " Bitirdi ! ")
        }
    }
}

// let user1 = new Studet('Ali', 25, 2)
// user1.getInfo()
// user1.nextCourse()
// user1.getInfo()
"__________________________________________________________________________________________________"

class Calculator {
    constructor() {
        this.result = 0
    }
    add(a,b){
        console.log("Add function : => ",a + b)
        return a+b
    }
    multiply(a,b){
        console.log("mUltiply function => ",a * b)
        return a * b
    }
    divide(a,b){
        console.log("Divide function => ",a / b)
        return a / b
    }
}
// const calc = new Calculator();
// calc.add(5, 3);      // 8
// calc.multiply(4, 2); // 8
// calc.divide(10, 2);  // 5

"__________________________________________________________________________________________________"

class BankAccount extends Person{
    constructor(id,name, age) {
        super(name, age)
        this.id = id
        this.balans = 0
    }
    deposit(summa){
        this.balans += summa
    }
    withdraw(summa){
        if(this.balans > summa){
            this.balans -= summa
            console.log(`${summa} miqdor yechib olindi Balans : ${this.balans}`)
        }else{
            console.log('Balansda mablag\' yetarli emas Balans : ',this.balans)
        }
    }
    getBalance(){
        console.log("Balansingiz : ",this.balans)
    }
}

// const account = new BankAccount("1234", 1000);
// account.deposit(500);    // 1500
// account.withdraw(200);   // 1300
// account.withdraw(200);   // 1300
// account.withdraw(200);   // 1300
// account.getBalance();    // 1300


"__________________________________________________________________________________________________"
/* Kitob haqidagi ma'lumotlarni saqlash
Namuna:
const book = new Book("O'tgan kunlar", "A.Qodiriy", 50000);
book.getInfo();        // "O'tgan kunlar - A.Qodiriy, 50000 so'm"
book.applyDiscount(10); // 10% chegirma

*/
class Book {
    constructor(name,auhtor, price) {
        this.name = name;
        this.auhtor = auhtor
        this.price = price
    }
    getInfo(){
        console.log(this);
    }
    setPrice(new_price){
        this.price = new_price
    }
    applyDiscount(cash){
        this.price -= (this.price * (1 * (cash/100)))
    }
}
// const book = new Book("O'tgan kunlar", "A.Qodiriy", 50000);
// book.getInfo();        // "O'tgan kunlar - A.Qodiriy, 50000 so'm"
// book.applyDiscount(20); // 10% chegirma
// book.getInfo();        // "O'tgan kunlar - A.Qodiriy, 50000 so'm"

"__________________________________________________________________________________________________"

// Namuna:
// const timer = new Timer(60);
// timer.start();
// timer.getTime();  // Joriy vaqt
// timer.stop();     // To'xtatish
// */
class Timer{
    constructor(target){
        this.res = 0
        this.target = target
    }
    start(){

        this.interval = setInterval(()=>{
            this.res++
            console.log(this.res);
        },1000)

        this.end = setTimeout(() =>{
            clearInterval(this.interval)
        }, (this.target + 1) * 1000)
    }
    stop(){
        clearInterval(this.interval)
        clearTimeout(this.end)
    }
    getTime(){
        console.log(this.res)
        return this.res
    }
}
// const timer = new Timer(60);
// timer.start();
// setTimeout(() => {
//     timer.stop()
// }, 6010);
"__________________________________________________________________________________________________"

/* Mahsulotlar ro'yxatini saqlash
Namuna:
const product = new Product("Olma", 5000, 10);
product.addQuantity(5);    // 15 ta
product.getTotal();        // 75000 so'm
*/
class Product {
    constructor(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }
    addQuantity(amout){
        this.count +=amout
        console.log(this.count)
    }
    getTotal(){
        console.log(this.price * this.count)
        return this.price * this.count
    }
}
const product = new Product("Olma", 5000, 10);
// product.addQuantity(5);    // 15 ta
// product.getTotal();        // 75000 so'm
"_______________________________________________________________________________________________"

/* Talabalar ro'yxatini boshqarish

Vazifa:
1. StudentList klassi yarating
2. Constructor bo'sh bo'lsin
3. Metodlar:
   - addStudent(name, age) - talaba qo'shish
   - removeStudent(name) - talabani o'chirish
   - getStudents() - barcha talabalar ro'yxati

Namuna:
const list = new StudentList();
list.addStudent("Ali", 20);
list.addStudent("Vali", 21);
list.getStudents();  // Talabalar ro'yxati
*/
class StudentList {
    constructor() {
        this.ls = []
    }
    addStudent(name, age){
        this.ls.push(
            new Person(name, age)
        )
    }
    getStudents(){
        console.log(this)
        return this
    }
}
// const list = new StudentList();
// list.addStudent("Ali", 20);
// list.addStudent("Vali", 21);
// list.getStudents();  // Talabalar ro'yxati

"________________________________________________________________________________________"

/* Geometrik shakllar bilan ishlash

Vazifa:
1. Shape klassi yarating
2. Constructor eni va bo'yini qabul qilsin
3. Metodlar:
   - getArea() - yuzani hisoblash
   - getPerimeter() - perimetrni hisoblash
   - scale(factor) - o'lchamlarni oshirish

Namuna:
const rect = new Shape(5, 3);
rect.getArea();      // 15
rect.scale(2);       // O'lchamlarni 2 ga ko'paytirish
rect.getArea();      // 60
*/
class Shape {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    getArea(){
        console.log(this.a * this.b)
        return this.a * this.b
    }
    scale(){
        this.a *= 2
        this.b *= 2
    }
}

"________________________________________________________________________________________"
// 9
/* Foydalanuvchi profili

Vazifa:
1. UserProfile klassi yarating
2. Constructor ism va emailni qabul qilsin
3. Metodlar:
- updateName(newName) - ismni yangilash
- updateEmail(newEmail) - emailni yangilash
- getInfo() - ma'lumotlarni olish

Namuna:
const user = new UserProfile("John", "john@mail.com");
user.updateName("Mike");
user.getInfo();  // Yangilangan ma'lumotlar
*/
class UserProfile {
    constructor(name, email) {
        this.email = email
        this.nmae - name
    }
    updateName(newName){
        this.name = newName
    }
    updateEmail(newEmail){
        this.email = newEmail
    }
    UserProfile(){
        console.log(this)
    }
}


"________________________________________________________________________________________"
// 10 
/* Ishchi ma'lumotlari bilan ishlash

Vazifa:
1. Employee klassi yarating
2. Constructor ism, lavozim va oylikni qabul qilsin
3. Metodlar:
   - promote(newPosition, raise) - lavozim va oylikni oshirish
   - getFinalSalary() - soliqlar bilan oylikni hisoblash (soliq 12%)
   - getInfo() - to'liq ma'lumot

*/

class Employee extends Person {
    constructor(name, position, solary,age =null) {
        super(name, age)
        this.position
        this.solary = solary
    }
    promote(newPosition, raise){
        this.position = newPosition
        this.solary+=raise
    }
    getInfo(){
        console.log(this)
    }
    getFinalSalary(){
        console.log(this.solary -= (this.solary * (1 * (12/100))))
    }
}


const employee = new Employee("Ali", "Developer", 1000);
employee.promote("Senior Developer", 500);
employee.getFinalSalary(); // Soliqlar bilan oylik
