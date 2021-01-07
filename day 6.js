let input = require('fs').readFileSync("./day 6.txt", {
  encoding: "utf-8"
}).split("\r\n\r\n");



function partOne() {
  let sum = 0;

  let arr = input.map(v => v.split("\r\n").join(""));

  for (let i = 0; i < arr.length; i++) {
    let set = new Set();
    for (let j = 0; j < arr[i].length; j++) {
      set.add(arr[i].charAt(j));
    }
    sum += set.size;
  }
  return sum;
}

function partTwo() {
  let sum = 0;
  let arr = input.map(v => v.split("\r\n").map(v=>v.split('')));
  for (let i = 0; i < arr.length; i++) {
    sum+= arr[i].reduce((p,c) => p.filter(e => c.includes(e))).length;
  }
  return sum;
}

console.log("part one : ", partOne());
console.log("part two : ", partTwo());