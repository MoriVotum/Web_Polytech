// Task 1

function convertSpeed(value, convertTo) {
  if (convertTo === "toMS") {
    return (value * 1000) / 3600 + " м/с";
  } else if (convertTo === "toKMH") {
    return (value * 3600) / 1000 + " км/ч";
  }
}

console.log(`convertSpeed(36, 'toMS') -> ` + convertSpeed(36, "toMS"));
console.log(`convertSpeed(36, 'toKMH') -> ` + convertSpeed(36, "toKMH"));

// Task 2

function absValue(x) {
  if (x < 0) {
    return -x;
  } else {
    return x;
  }
}

console.log(`absValue(-2) -> ` + absValue(-2));
console.log(`absValue(100) -> ` + absValue(100));
console.log(`absValue(0) -> ` + absValue(0));

// Task 3

let student = { group: 201, last_name: "Иванов", first_name: "Иван" };

let keys = Object.keys(student);
let properties = keys.join(", ");

console.log("Список свойств: " + properties);
console.log(
  `Студент ${student["first_name"]} ${student["last_name"]} учится в ${student["group"]} группе`
);

// Task 4

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(`randomNumber(0, 10) -> ` + randomNumber(0, 10));
console.log(`randomNumber(-10, 10) -> ` + randomNumber(-10, 10));

// Task 5

function sampleArray(arr, n) {
  let result = [];
  while (n > 0) {
    let randIdx = Math.floor(Math.random() * arr.length);
    result.push(arr[randIdx]);
    n--;
  }
  return result;
}

console.log(
  `sampleArray([1,2,3,4], 2) -> [${sampleArray([1, 2, 3, 4], 2).join(", ")}]`
);
console.log(
  `sampleArray([1,2,3,4], 3) -> [${sampleArray([1, 2, 3, 4], 3).join(", ")}]`
);
