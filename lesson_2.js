const EventEmitter = require('events');
const { red, green } = require('colors/safe');

const eventEmitter = new EventEmitter();
const item = process.argv.slice(2);

let timer = {};

const timeToDate = (reportime) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;

    const years = Math.floor(reportime / year);
    reportime -= years * year;

    const months = Math.floor(reportime / month);
    reportime -= months * month;

    const days = Math.floor(reportime / day);
    reportime -= days * day;

    const hours = Math.floor(reportime / hour);
    reportime -= hours * hour;

    const minutes = Math.floor(reportime / minute);
    reportime -= minutes * minute;

    const seconds = Math.floor(reportime / second);
    reportime -= seconds * second;

    let date = "";

    if (year) {
        date += year + "Років яскравих";
    }
    if (month) {
        date += month + "місяців гарних";
    }
    if (day) {
        date += day + "Днів мирних";
    }
    if (hour) {
        date += hour + "часів приємних";
    }
    if (minutes) {
        date += minute + "хвлин надійних";
    }
    if (second) {
        date += second + "секунд великих";
    };
    return date;
};

for (const arg of item) {
    const parsedDate = arg.split("-");
    const isNumbers = !parsedDate.some((date) => !isFinite(+date));

    if (parsedDate.length !== 4 || !isNumbers) {
        console.log(red("Не можу причитати, херня яка", arg));
        continue;
    }

    const timerDate = new Date(
        Date.UTC(parsedDate[3], parsedDate[2] - 1, parsedDate[1], parsedDate[0])
    );
    const realDate = new Date();
    const realUTCDate = Date.UTC(
        realDate.getFullYear(),
        realDate.getMonth(),
        realDate.getDate(),
        realDate.getHours(),
        realDate.getMinutes(),
        realDate.getSeconds()
    );



    const counter = timerDate - realUTCDate;

    if (counter <= 0) {
        console.log(
            red("Лічильника не буде, хтось сало впустив: ", arg)
        );
        continue;
    }

    const standartDate = timerDate
        .toISOString()
        .replace(".000", "");

    timer[standartDate] = counter;
}

if (!Object.keys(timer).length) {
    console.log(red("\nВи мабудь забули, що треба писати?"));
    process.exit(1);
}

console.log(
    green(`О це так козак, все пійшло і запустилось ${Object.keys(timer).length} тікаючих клацалок: \n`)
);
Object.keys(timer).map((onetimer) => console.log(green(onetimer)));
console.log("");

setInterval(() => {
    const newTimer = {};

    Object.keys(timer).map((onetimer) => {
        const counter = timer[onetimer] - 1000;
        let message = green(`Я порахував ${onetimer} зроблено`);

        if (counter) {
            newTimer[onetimer] = counter;
            message = green(
                `Ще стільки треба часу ${onetimer} щоб воно.... ${timeToDate(counter)}`
            );
        }
        eventEmitter.emit("timer", message);
    });

    if (!Object.keys(newTimer).length) {
        console.log(green("\nНу ми всьо зробили хлопці!!!"));
        process.exit(0);
    }

    timer = newTimer;

    console.log("");
},
    1000);

eventEmitter.on("timer", console.log);

