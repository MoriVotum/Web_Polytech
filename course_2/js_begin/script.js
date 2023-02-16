let kmPerHour = 36;
let mPerSecond = 20;

// Task 1
console.log("---Задача №1 Конвертация скоростей---");
console.log(`${kmPerHour} км/ч соответствует ${(kmPerHour * 1000) / 3600} м/с`);
console.log(
  `${mPerSecond} м/с соответствует ${(mPerSecond * 3600) / 1000} км/ч`
);

// Task 2
console.log("---Задача №2 Прямоугольник---");
let a = 6;
let b = 10;
let c = 15;

if (a + b + c - Math.max(a, b, c) > Math.max(a, b, c)) {
  console.log("Треугольник существует");

  let p = a + b + c;
  let s = Math.sqrt((a + b + c) * (b + c) * (a + c) * (a + b));
  let r = p / s;

  console.log(`периметр = ${p}`);
  console.log(`Площадь  = ${s}`);
  console.log(`Соотношение ${r}`);
} else {
  console.log("Треугольник не существует");
}

// Task 3
console.log("---Задача №3 Fizz-Buzz---");
// let fizzBuzz = prompt("Fizz-Buzz: Введите число от 0 до 100");

let fizzBuzz = -1;

while (fizzBuzz < 0 || fizzBuzz > 100 || isNaN(fizzBuzz)) {
  fizzBuzz = prompt("Fizz-Buzz: Введите число от 0 до 100");
  intFizz = Number(fizzBuzz);
}

for (let i = 0; i <= intFizz; i++) {
  if (i % 2 == 0) {
    if (i % 5 == 0 && i != 0) {
      console.log(`${i} fizz buzz`);
    } else {
      console.log(`${i} buzz`);
    }
  } else {
    if (i % 5 == 0) {
      console.log(`${i} fizz buzz`);
    } else {
      console.log(`${i} fizz`);
    }
  }
}

// Task 4
console.log("---Задача №4 Елка к новому году---");

let i = 1;
let str = "";
while (i <= 12) {
  if (i % 2 != 0) str += "*".repeat(i) + "\n";
  else str += "#".repeat(i) + "\n";
  i++;
}
str += "||";
console.log(str);

// Task 5
console.log("---Задача №5 Угадай число---");

let randomNumber = Math.floor(Math.random() * 101);
console.log(`Случайное число ${randomNumber}`);
let userNumber = -1;

while (userNumber != randomNumber) {
  userNumber = prompt("Угадате число от 0 до 100");
  if (userNumber == randomNumber) {
    alert("угадано");
  } else if (userNumber < randomNumber) {
    alert("ваше число больше");
  } else {
    alert("ваше число меньше");
  }
}

// Task 6
console.log("---Задача №6 Деление---");

let n = 100;
let x = 5;
let y = 2;

if (n % x == 0 && n % y == 0) {
  console.log(`n = ${n}, x = ${x}, y = ${y} => true`);
} else {
  console.log(`n = ${n}, x = ${x}, y = ${y} => false`);
}

// Task 7
console.log("---Задача №7 Кварталы---");

let month = 10;

if (month >= 1 && month <= 3) {
  console.log(`месяц ${month} => 1 квартал`);
} else if (month >= 4 && month <= 6) {
  console.log(`месяц ${month} => 2 квартал`);
} else if (month >= 7 && month <= 9) {
  console.log(`месяц ${month} => 3 квартал`);
} else if (month >= 10 && month <= 12) {
  console.log(`месяц ${month} => 4 квартал`);
} else {
  console.log("Такого месяца не существует");
}
