const {
  parse
} = require('path');

let input = require('fs').readFileSync("./day 7.txt", {
  encoding: "utf-8"
}).split("\r\n");

// create rules

let bags = {};

for (let i = 0; i < input.length; i++) {
  let key = input[i].split(" bags contain ")[0];
  let value = input[i].split(" bags contain ")[1].split(", ").filter(a => a !== "no other bags.").map(v => v.split(" "));
  value = value.map(v => {
    return {
      number: parseInt(v[0]),
      color: v[1] + ' ' + v[2]
    }
  });
  let obj = {
    [key]: value
  };
  bags[[key]] = value;
}

function hasShiny(bagName) {
  let count = 0;
  if (bags[bagName].length === 0) {
    return;
  }

  for (const bag in bags) {
    if (Object.hasOwnProperty.call(bags, bag)) {
      const element = bags[bag];
      if (element.find(e => e.color === bagName)) {
        res.add(bag);
        hasShiny(bag);
      }
    }
  }
  return count;
}

function fromShiny(bagName) {
  let count = 1;
  if (bags[bagName].length === 0) return count;

  for (let i = 0; i < bags[bagName].length; i++) {
    count += bags[bagName][i].number * fromShiny(bags[bagName][i].color);
  }
  return count;
}


let res = new Set();

hasShiny("shiny gold");


console.log("part one : ", res.size);

console.log("part two : ",fromShiny("shiny gold")-1);