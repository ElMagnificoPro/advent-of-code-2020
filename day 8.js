let input = require("fs").readFileSync("./day 8.txt", {
    encoding: "utf-8"
}).split("\r\n");

let instructions = [];
let accum = 0;

for (let i = 0; i < input.length; i++) {
    const element = input[i];

    let instruction = {
        op: "",
        arg: 0,
        run: false
    };
    instruction.op = element.split(" ")[0];
    instruction.arg = parseInt(element.split(" ")[1]);
    instructions.push(instruction);
}

function runCode(arr) {
    let acc = 0;

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (!element.run) {

            switch (element.op) {
                case "acc":
                    arr[i].run = true;
                    acc += element.arg;

                    break;
                case "jmp":
                    arr[i].run = true;
                    i += element.arg - 1;

                    break;

                default:
                    break;
            }

        } else {
            break;
        }
    }
    return acc;
}

for (let i = 0; i < instructions.length; i++) {
    instructions[i].run = false;
}

let testArr = JSON.parse(JSON.stringify(instructions));
let finished = false;
let switchIndex = 0;
let runTimes = 0;
let partTwo = 0;

while (!finished && switchIndex < instructions.length - 1 && runTimes < 666) {

    testArr = JSON.parse(JSON.stringify(instructions));
    runTimes++;

    for (let i = switchIndex + 1; i < testArr.length; i++) {
        if (testArr[i].op === "nop") {

            testArr[i].op = "jmp";
            switchIndex = i;
            i = testArr.length;

        } else if (testArr[i].op === "jmp") {

            testArr[i].op = "nop";
            switchIndex = i;
            i = testArr.length;

        }
        //console.log("switch index = " + switchIndex);
    }

    partTwo = runCode(testArr);
    finished = testArr[testArr.length -1].run;
}

console.log("part one : ", runCode(instructions));
console.log("part two : ", partTwo);