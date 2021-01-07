let input = require("fs").readFileSync("./day 19.txt", {
  encoding: "utf-8"
}).split("\r\n\r\n");

input[0] = input[0].split("\r\n").sort((a, b) => parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]));
let rules = [];
for (let i = 0; i < input[0].length; i++) {
  rule = input[0][i].split(": ")[1]
  if (rule.charAt(0) === '"') {
    rule = rule.charAt(1);
  } else {
    rule = rule.split(' | ').map(x => x.split(" ").map(y => parseInt(y)));
  }

  rules[parseInt(input[0][i].split(": ")[0])] = rule;
}
/*
rules[8] = [[42] , [42,8]];
rules[11] = [[42,31] , [42,11,31]];
*/
let messages = input[1].split("\r\n");
let part = 1;


let regex = "^";

function buildRegex(rule) {

  // rule 8 => 42{1,}
  // rule 11 => (42{x} 31{x}) (palindrome ???)

  if (typeof (rule) === "string") {
    regex += rule;
  } else if (typeof (rule) === "number") {


    if (rule === 8 && part === 2) {
      buildRegex(rules[42]);
      regex += "{1,}";
    } else if (rule === 11 && part === 2) {
      regex += "(";
      for (let i = 1; i < 5; i++) {
        regex += "(";
        buildRegex(rules[42]);
        regex += "{" + i + "}";
        buildRegex(rules[31]);
        regex += "{" + i + "}";
        regex += ")";
        regex += "|";
      }
      regex = regex.slice(0, -1);
      regex += ")";

    } else {
      buildRegex(rules[rule]);
    }
  } else if (rule.length === 1) {
    regex += "(";
    for (let i = 0; i < rule[0].length; i++) {
      buildRegex(rule[0][i]);
    }
    regex += ")";
  } else {
    regex += "(";
    for (let i = 0; i < rule.length; i++) {
      for (let j = 0; j < rule[0].length; j++) {
        buildRegex(rule[i][j]);
      }
      regex += "|";
    }
    regex = regex.slice(0, -1);
    regex += ")";
  }
}


buildRegex(rules[0]);
regex += "$";

let count = 0;
for (let i = 0; i < messages.length; i++) {

  if (RegExp(regex).test(messages[i])) count++;

}

console.log("part one : ", count);


part = 2;

count = 0;
regex = "^";
buildRegex(rules[0]);
regex += "$";

for (let i = 0; i < messages.length; i++) {

  if (RegExp(regex).test(messages[i])) count++;

}

console.log("part two : ", count);