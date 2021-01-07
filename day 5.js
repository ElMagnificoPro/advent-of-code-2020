let input = require('fs').readFileSync("./day 5.txt", {
  encoding: "utf-8"
}).split("\r\n");


function getRow(str) {
  let min = 0,
    max = 127;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "F") max = Math.floor((min + max) / 2);
    if (str.charAt(i) === "B") min = Math.ceil((min + max) / 2);
  }
  return min;
}

function getCol(str) {
  let min = 0,
    max = 7;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "L") max = Math.floor((min + max) / 2);
    if (str.charAt(i) === "R") min = Math.ceil((min + max) / 2);
  }
  return min;
}

let ids = [];

for (let i = 0; i < input.length; i++) {
  ids.push(getRow(input[i].slice(0, -3)) * 8 + getCol(input[i].slice(-3)));
}




console.log("part one : ", Math.max(...ids));
console.log( "part two : ",
  ids.sort()
  .filter((v, i, a) => a[i + 1] - a[i - 1] === 3)
  .reduce((prev, curr) => (prev + curr) / 2)
);