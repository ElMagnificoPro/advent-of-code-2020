const data = require("fs").readFileSync("day 21.txt", {
  encoding: "utf-8"
});

let input = data.split("\r\n");

let allergies = {};
let ingredients = [];

input.forEach(line => {
  let x = line.slice(0, line.indexOf('(') - 1).split(" ");
  let y = line.slice(line.indexOf('(') + 10, line.length - 1).split(", ");
  ingredients = ingredients.concat(x);

  y.forEach(allergie => {
    if (allergies[allergie] === undefined) {
      allergies[allergie] = [...x];
    } else {
      allergies[allergie] = allergies[allergie].filter(a => x.includes(a));
    }
  });

});

valid = false;
pass = 0;
while (!valid && pass< 10) {
  valid = true;pass++;
  for (let i = 0; i < Object.values(allergies).length; i++) {
    const element = Object.values(allergies)[i];
    if (element.length === 1) {
      for (let j = 0; j < Object.values(allergies).length; j++) {
        if (i !== j) {
          allergies[Object.keys(allergies)[j]] = allergies[Object.keys(allergies)[j]].filter(a => a !== element[0]);
          valid = false;
        }
      }
    }

  }
}

for (const a in allergies) {
  if (Object.hasOwnProperty.call(allergies, a)) {
    allergies[a] = allergies[a][0];
  }
}

let sum = 0;
for (let i = 0; i < ingredients.length; i++) {
  if (!Object.values(allergies).includes(ingredients[i])) {
    sum++;
  }
}

console.log("part one : ",sum);


let answer = "";
Object.keys(allergies).sort().forEach((key) => {
  answer += allergies[key] + ",";
});
console.log("part two : ",answer.substr(0,answer.length -1));