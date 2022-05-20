
// const colors = require("colors/safe");

// const isPrime = (number) => {
//     if (number < 2) return false;
//     for (let i = 2; i <= number / 2; i++) {
//         if (number % i === 0) return false;
//     }
//     return true;
// }

// let count = 1;

// const from = process.argv[2];
// const to = process.argv[3];

// function Number(number) {
//     if (Number(number).toString() === "NaN") {
//     }
//     console.log(Number + 'Нужно писать число!');
// }



// // if (typeof (number) === NaN) {
// //     console.log(isPrime() + 'Нужно писать число!');
// // } else {
// //     console.log(isPrime() + '!!!!!');
// // }


// for (let number = from; number <= to; number++) {

//     let colorer = colors.green;

//     if (isPrime(number)) {
//         if (count % 2 === 0) {
//             colorer = colors.yellow;
//             count += 1;
//         } else if (count % 3 === 0) {
//             colorer = colors.red;
//             count = 1;
//         } else {
//             count += 1;
//         }

//         console.log(colorer(number));
//     }
// }

const colors = require("colors/safe");


const from = parseInt(process.argv[2]);
const to = parseInt(process.argv[3]);
let colorer = colors.red;
let err = "";


// if (from.toString() === "NaN") {
//     err += `\n Ошибка первое число ${from}. Typeof is ${from}`;
// }

// else if (to.toString() === "NaN") {
//     err += `\n Ошибка второе число ${to}. Typeof is ${to}`;
// }

if (err) {
    colorer = colors.red;
    console.log(colorer(`\n Шляпа, а не числа \n`));
}

else if (!err) {
    colorer = colors.green;
    console.log(colorer(`\n Нормальные числа \n`));
}

let simples = [];
for (let i = from; i < to; i++) {

    if (i > 2 && i % 2 > 0) {
        for (let j = 3; j <= i; j++) {


            if (i % j === 0 && i !== j) {
                break;
            }

            if (i % j === 0 && i === j) {

                simples.push(i);
            }
        }
    }
}


if (simples.length < 1) {
    colorer = colors.red;
    console.log(colorer(`Нет простых чисел ${from} и ${to}\n`))
}
else {
    console.log(colorer(`Простые числа между ${from} и ${to} следующие:\n` + simples + '\n'));
}