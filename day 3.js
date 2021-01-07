let input = require('fs').readFileSync("./day 3.txt", {
  encoding: "utf-8"
}).split("\r\n");

function traverse(right,down) {
  let position = 0,count = 0;

for (let i = 0; i < input.length; i+=down) {
  if(input[i].charAt(position) === "#") count++;
  position += right;
  position = position % input[i].length;
}
return count;
}



console.log("part one : "+ traverse(3,1));
console.log("part two : "+ traverse(1,1)*traverse(3,1)*traverse(5,1)*traverse(7,1)*traverse(1,2));