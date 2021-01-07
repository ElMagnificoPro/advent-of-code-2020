let input = require('fs').readFileSync("./day 4.txt", {
  encoding: "utf-8"
}).split("\r\n\r\n").map(x => x.split("\r\n").join(" "));

for (let i = 0; i < input.length; i++) {
  const element = input[i];

  input[i] = Object.assign(...element.split(" ").map((e) => {
    let key = e.split(":")[0];
    let val = e.split(":")[1];
    return {
      [key]: val
    };
  }));
}

function isValid(passport) {
  if (!passport.byr) return false;
  if (!passport.iyr) return false;
  if (!passport.eyr) return false;
  if (!passport.hgt) return false;
  if (!passport.hcl) return false;
  if (!passport.ecl) return false;
  if (!passport.pid) return false;
  //if (!passport.cid) return false;
  return true;
}

function isValid2(passport) {
  if (!passport.byr) return false;
  if(passport.byr.length !== 4 || parseInt(passport.byr)>2002 || parseInt(passport.byr)<1920) return false;

  if (!passport.iyr) return false;
  if(passport.iyr.length !== 4 || parseInt(passport.iyr)>2020 || parseInt(passport.iyr)<2010) return false;

  if (!passport.eyr) return false;
  if(passport.eyr.length !== 4 || parseInt(passport.eyr)>2030 || parseInt(passport.eyr)<2020) return false;

  if (!passport.hgt) return false;
  let unit = passport.hgt.slice(-2);
  if (!["cm","in"].includes(unit))return false;
  if(unit === "cm" && (parseInt(passport.hgt.slice(0,-2))>193 || parseInt(passport.hgt.slice(0,-2))<150)) return false;
  if(unit === "in" && (parseInt(passport.hgt.slice(0,-2))>76 || parseInt(passport.hgt.slice(0,-2))<59)) return false;

  if (!passport.hcl) return false;
  if (!passport.hcl.match(/^#[0-9a-f]{6}$/i)) return false;

  if (!passport.ecl) return false;
  if (!["amb","blu","brn","gry","grn","hzl","oth"].includes(passport.ecl))return false;

  if (!passport.pid) return false;
  if (passport.pid.length!==9) return false;
  //if (!passport.cid) return false;
  return true;
}


let count = 0;
for (let i = 0; i < input.length; i++) {
  if(isValid2(input[i]))count++;
}

console.log(count);