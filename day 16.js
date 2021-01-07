const data = require("fs").readFileSync("day 16.txt", { encoding: "utf-8" });
const input = data.split("\r\n\r\n");
let rules = input[0].split("\r\n");
let myTicket = input[1].split("\r\n")[1].split(",");
input[2] = input[2].split("\r\n");
let tickets =[];

for (let i = 1; i < input[2].length; i++) {
  const element = input[2][i];
  tickets.push(element.split(","));
}

// get rules
let ruleNames = [];

for (let i = 0; i < rules.length; i++) {
  let x = {a:0,b:0,c:0,d:0};
  let elem = rules[i].split(": ")[1].split(" or ");
  
  x.a = parseInt(elem[0].split("-")[0]);
  x.b = parseInt(elem[0].split("-")[1]);
  x.c = parseInt(elem[1].split("-")[0]);
  x.d = parseInt(elem[1].split("-")[1]);

  ruleNames.push(rules[i].split(": ")[0]);
  rules[i] = x;
}

function isValid(field) {
  let valid = false;
  let i = 0;
  while (i < rules.length && !valid) {
    valid = (field >= rules[i].a && field <= rules[i].b) || (field >= rules[i].c && field <= rules[i].d);
    i++;
  }
  return valid;
}

function ValidFields(field) {
  let valid = [];
  let i = 0;
  while (i < rules.length) {
    if((field >= rules[i].a && field <= rules[i].b) || (field >= rules[i].c && field <= rules[i].d))
      valid.push(i);
    i++;
  }
  return valid;
}

let errors = [];


for (let i = 0; i < tickets.length; i++) {
  for (let j = 0; j < tickets[i].length; j++) {
    if(!isValid(parseInt(tickets[i][j]))){
      errors.push(parseInt(tickets[i][j]));
    } 
  }
}

console.log("part one : ",errors.reduce((a,b)=>a+b));


tickets = tickets.filter(arr=>{
  let i = 0;
  let valid = true;
  while(i<arr.length && valid){
    valid = isValid(arr[i]);
    i++;
  }
  return valid;
});

//console.log(tickets,errors.reduce((a,b)=> a+b));
function getMatch(a, b) {
  var matches = [];

  for ( var i = 0; i < a.length; i++ ) {
      for ( var e = 0; e < b.length; e++ ) {
          if ( a[i] === b[e] ) matches.push( a[i] );
      }
  }
  return matches;
}

function findFieldsIndexes() {
  let possible = [];
  for (let i = 0; i < tickets[1].length; i++) {
    possible.push(Array.from(Array(rules.length).keys()));
  }

  for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < tickets[i].length; j++) {
      let valid = ValidFields(parseInt(tickets[i][j]));
      possible[j] = getMatch(possible[j],valid);
    }
  }

  let pass = 0;

  while (possible.filter(a=> a.length !== 1).length !== 0 && pass <100) {
    for (let j = 0; j < possible.length; j++) {
      if(possible[j].length === 1){
        for (let k = 0; k < possible.length; k++) {
          if(k!==j)
           possible[k]=possible[k].filter(a => a !==  possible[j][0]);
      }
      }
      
    }
  }


  return possible;
}

let result = findFieldsIndexes();
let acc = 1;
for (let i = 0; i < result.length; i++) {
  //console.log(ruleNames[result[i][0]], " : ",myTicket[i]);
  if(ruleNames[result[i][0]].includes("departure")){
    acc*=myTicket[i];
  } 
}


console.log("part two : ",acc);