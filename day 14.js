let input = require('fs').readFileSync('./day 14.txt', {
  encoding: "utf-8"
}).split("\r\n").map((e) => {
  let x = e.split(" = ");
  return {
    com: x[0],
    adr: parseInt(x[0].slice(4, -1)),
    val: (x[0] === "mask") ? x[1] : parseInt(x[1])
  };
});

let mem = partOne(input).filter(Boolean).map(v=>parseInt(v,2));
console.log("part one : ",mem.reduce((a, b) => a + b));
mem = {};
mem = partTwo(input);

console.log("part two : ",Object.values(mem).reduce((a, b) => a + b));


function writeBitwise(val, mask) {
  let res = "";

  while (val.length < mask.length) {
    val = "0" + val;
  }
  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask.charAt(i) === "X") {
      res = (val[i]) ? val[i] + res : "0" + res;
    } else {
      res = mask[i] + res;
    }
  }

  return res;
}

function writeBitwise2(val, mask) {
  let res = "";

  while (val.length < mask.length) {
    val = "0" + val;
  }
  for (let i = mask.length - 1; i >= 0; i--) {
    if (mask.charAt(i) === "0") {
      res = (val[i]) ? val[i] + res : "0" + res;
    } else {
      res = mask[i] + res;
    }

  }

  return res;
}

function partOne(arr) {
  let mask;
  let mem = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].com === "mask") {
      mask = arr[i].val;
    } else {
      mem[arr[i].adr] = writeBitwise(Number(arr[i].val).toString(2), mask);
    }
  }
  return mem;
}

function partTwo(arr) {
  let mask;
  let mem = {};

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].com === "mask") {
      mask = arr[i].val;
    } else {
      let res = writeBitwise2(Number(arr[i].adr).toString(2), mask);

      let vars = getVars(res, []);

      for (let j = 0; j < vars.length; j++) {
        let adr = parseInt(vars[j], 2);
        mem[adr] = arr[i].val;

      }

    }
  }
  return mem;
}

function getVars(str, arr) {

  if (arr.indexOf(str) !== -1) {
    return arr;
  } else {

    i = str.indexOf("X");
    if (i !== -1) {
      let a = str.substring(0, i) + "0" + str.substring(i + 1);
      let b = str.substring(0, i) + "1" + str.substring(i + 1);
      getVars(a, arr);
      getVars(b, arr);
    }
  }
  if (str.indexOf("X") === -1) arr.push(str);

  return arr;
}