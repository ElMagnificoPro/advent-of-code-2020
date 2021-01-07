let input = [
  153,17,45,57,16,147,39,121,75,70,85,134,128,115,51,139,44,65,119,168,122,72,105,31,103,89,154,114,55,25,48,38,132,157,84,71,113,143,83,64,109,129,120,100,151,79,125,22,161,167,19,26,118,142,4,158,11,35,56,18,40,7,150,99,54,152,60,27,164,78,47,82,63,46,91,32,135,3,108,10,159,127,69,110,126,133,28,15,104,138,160,98,90,144,1,2,92,41,86,66,95,12
];
let input1 = [
  28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3
];

let input0 = [
16,10,15,5,1,11,7,19,6,12,4
];

input = input.sort((a, b) => a - b);
input.unshift(0);
input.push(input[input.length - 1] + 3);

let diff1 = 0,diff3 = 0;

for (let i = 0; i < input.length -1 ; i++) {
  if(input[i+1] - input[i] === 1){
    diff1+=1;
  }else if(input[i+1] - input[i] === 3){
    diff3+=1;
  }else{ 
    console.log("haaaaaaa",i);
  }
}

// reddit helped ... dynamic programming

for (let i = input.length -1; i > 0; i--) {
  input[i] -= input[i-1];
}

function part2 (input) {
  let step = input;
  step.push(3);
  return step.reduce((acc, val) => {
    if (val === 1) {
      acc.count++;
    } else {
      if (acc.count > 1) {
        acc.out.push(acc.count);
      }
      acc.count = 0;
    }
    return acc;
  }, { count: 0, out: [] }).out.map(n => {
    if (n < 4) {
      return Math.pow(2, (n - 1));
    }
    return Math.pow(2, (n - 1)) - ((n - 3) * (n - 2) / 2);
  }).reduce((a, b) => a * b, 1);
  // 7 = 54 (10)
  // 6 = 26 (6)
  // 5 = 13 (3)
  // 4 = 7 (1)
  // 3 = 4
  // 2 = 2
  // 1 = 0
  // n * n ?( - (n - 3) * (n - 2) / 2 )
}


console.log("part one : ",diff1*diff3);
console.log("part two : ",part2(input));