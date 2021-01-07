let player1 = [
  41, 26, 29, 11, 50, 38, 42, 20, 13, 9, 40, 43, 10, 24, 35, 30, 23, 15, 31, 48, 27, 44, 16, 12, 14
];
let player2 = [
  18, 6, 32, 37, 25, 21, 33, 28, 7, 8, 45, 46, 49, 5, 19, 2, 39, 4, 17, 3, 22, 1, 34, 36, 47
];

let player10 = [9, 2, 6, 3, 1];
let player20 = [5, 8, 4, 7, 10];

let depth = 0;

function calcScore(arr) {
  let sum = 0;
  arr.reverse().map((val, index) => {
    sum += val * (index + 1);
  });
  return sum;
}
let pass = 0;

function game(p1, p2){

  while (p1.length !== 0 && p2.length !== 0 && pass < 10000000) {

    let card1 = p1.shift();
    let card2 = p2.shift();
       
      (card1 > card2) ? p1.push(card1, card2): p2.push(card2, card1);
  }
  
  return [p1,p2];
}

function game2(player1, player2) {
  let instaWin = {};
  while (player1.length !== 0 && player2.length !== 0 && pass < 10000000) {
    pass++;
    let set = player1.join('') + '|' + player2.join('');
    if (instaWin[set]) 
      return [[0,0,0],[]];
    
    instaWin[set]= true;

    let card1 = player1.shift();
    let card2 = player2.shift();
    
    
    if (card1 <= player1.length && card2 <= player2.length) {
      
      depth++;
      let winner = game2(player1.slice(0, card1), player2.slice(0, card2));
      (winner[1].length === 0) ? player1.push(card1, card2): player2.push(card2, card1);
    }else{
      (card1 > card2) ? player1.push(card1, card2): player2.push(card2, card1);
    }
  }
  
  return [player1,player2];
}
let arr1 = JSON.parse(JSON.stringify(player1));
let arr2 = JSON.parse(JSON.stringify(player2));
let g1 = game(arr1, arr2);

console.log("part one : ",g1[1].length === 0 ? calcScore(g1[0]) : calcScore(g1[1]));

let g2 = game2(player1, player2);

if (pass < 10000000) {
  console.log("part two : ",g2[1].length === 0 ? calcScore(g2[0]) : calcScore(g2[1]));
} else {
  console.log("pass reached");
}