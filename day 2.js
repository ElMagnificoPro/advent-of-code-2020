let input = require('fs').readFileSync("./day 2.txt", {
  encoding: "utf-8"
}).split("\r\n");

for (let i = 0; i < input.length; i++) {
  const element = input[i];
  input[i] = {};
  input[i].min = parseInt(element.split(' ')[0].split("-")[0]);
  input[i].max = parseInt(element.split(' ')[0].split("-")[1]);
  input[i].char = element.split(' ')[1].charAt(0);
  input[i].pass = element.split(": ")[1];
}

function partOne() {
  let valid = 0;
  for (let i = 0; i < input.length; i++) {
    let check = (input[i].pass.match(new RegExp(input[i].char, "g")) || []).length;
    if (check >= input[i].min && check <= input[i].max) valid++;
  }
  return valid;
}

function xor(a,b) {
  return ((a && !b)||(!a && b)) ;
}

function partTwo() {
  let valid = 0;
  for (let i = 0; i < input.length; i++) {
    let a = input[i].pass.charAt(input[i].min - 1)=== input[i].char;
    let b = input[i].pass.charAt(input[i].max - 1)=== input[i].char;

    if (xor(a,b))
    valid++;
  }
  return valid;
}

//console.log(partOne());
console.log(partTwo());