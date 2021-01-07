let input = require("fs").readFileSync("day 11.txt",{encoding:"utf-8"}).split("\r\n");

let input0 = [
  "L.LL.LL.LL", "LLLLLLL.LL", "L.L.L..L..", "LLLL.LL.LL", "L.LL.LL.LL", "L.LLLLL.LL", "..L.L.....", "LLLLLLLLLL", "L.LLLLLL.L", "L.LLLLL.LL"
];

let nextGen = [];
let pass = 0;
let done = false;

function checkAdj(i, j) {
  let count = 0;

  let imax = input.length;
  let jmax = input[0].length;

  if (i - 1 >= 0) {
    if (input[i - 1][j] == "#")
      count++;
  }
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (input[i - 1][j - 1] == "#")
      count++;
  }
  if (i - 1 >= 0 && j + 1 < jmax) {
    if (input[i - 1][j + 1] == "#")
      count++;
  }
  if (j - 1 >= 0) {
    if (input[i][j - 1] == "#")
      count++;
  }
  if (j + 1 < jmax) {
    if (input[i][j + 1] == "#")
      count++;
  }
  if (i + 1 < imax && j - 1 >= 0) {
    if (input[i + 1][j - 1] == "#")
      count++;
  }
  if (i + 1 < imax && j + 1 < jmax) {
    if (input[i + 1][j + 1] == "#")
      count++;
  }

  if (i + 1 < imax) {
    if (input[i + 1][j] == "#")
      count++;
  }

  //console.log(count);
  return count;

}

function checkAdj2(x, y) {
  let count = 0;

  let i=x,j=y;

  let imax = input.length -1;
  let jmax = input[0].length -1;
  //console.log("start adj2");
  //dir right
  while(i<imax){
  if(input[i+1][j] === "#"){
    count++;
    break;
  }else if(input[i+1][j] === "L"){
    break;
  }else{
    i++;
  }
}
  i=x;j=y;
  //console.log("dir right");

  //dir left
  while(i>0){
  if(input[i-1][j] === "#"){
    count++;
    break;
  }else if(input[i-1][j] === "L"){
    break;
  }else{
    i--;
  }
}
  i=x;j=y;
  //console.log("dir left");
  //dir up
  while(j>0){
  if(input[i][j-1] === "#"){
    count++;
    break;
  }else if(input[i][j-1] === "L"){
    break;
  }else{
    j--;
  }
}
  i=x;j=y;
  //console.log("dir up");
  //dir down
  while(j<jmax){
  if(input[i][j+1] === "#"){
    count++;
    break;
  }else if(input[i][j+1] === "L"){
    break;
  }else{
    j++;
  }
}
  i=x;j=y;
  //console.log("dir down");
  //dir up left
  while(j>0 && i>0){
  if(input[i-1][j-1] === "#"){
    count++;
    break;
  }else if(input[i-1][j-1] === "L"){
    break;
  }else{
    j--;
    i--;
  }
}
  i=x;j=y;
  //console.log("dir upleft");
  //dir up right
  while(j<jmax && i>0){
    if(input[i-1][j+1] === "#"){
      count++;
      break;
    }else if(input[i-1][j+1] === "L"){
      break;
    }else{
      j++;
      i--;
    }
  }
    i=x;j=y;
    //console.log("dir upright");
  //dir down right
  while(j<jmax && i<imax){
    if(input[i+1][j+1] === "#"){
      count++;
      break;
    }else if(input[i+1][j+1] === "L"){
      break;
    }else{
      j++;
      i++;
    }
  }
    i=x;j=y;
    //console.log("dir down right");
      //dir down left
  while(j>0 && i<imax){
    if(input[i+1][j-1] === "#"){
      count++;
      break;
    }else if(input[i+1][j-1] === "L"){
      break;
    }else{
      j--;
      i++;
    }
  }
    i=x;j=y;
    //console.log("dir down left");
    return count;
}
while (pass < 100 && !done) {
  pass++;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    let row = "";
    for (let j = 0; j < element.length; j++) {
      row[j] = "";
      if (element[j] === ".") {
        row += ".";
      } else if (element[j] === "L") {
        if (checkAdj2(i, j) === 0) {
          row += "#";
        }else{
          row += "L";
        }
      } else if (element[j] === "#") {
        if (checkAdj2(i, j) >= 5) {
          row += "L";
        } else {
          row += "#";
        }
      }
    }
    nextGen.push(row);
  }
  if (JSON.stringify(input) !== JSON.stringify(nextGen)) {
    input = JSON.parse(JSON.stringify(nextGen));
    nextGen = [];
    //console.log(input);
  } else {
    input = JSON.parse(JSON.stringify(nextGen));
    done = true;
    //console.log(input);
    //break;
  }
}

//console.log(input,pass);

let seats = 0;
for (let i = 0; i < input.length; i++) {
  const element = input[i];
  for (let j = 0; j < element.length; j++) {
    if(element[j] === "#") seats++;
    
  }
}

console.log("seats :", seats);