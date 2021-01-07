function play(input, turns) {
  //let input = [0,14,6,20,1,4];

  let game = new Map();
  let last = input[input.length - 1];

  for (let i = 0; i < input.length; i++) {
    game.set(input[i], i + 1);
  }
  for (let i = input.length; i < turns; i++) {

    if (game.has(last)) {
      let t = game.get(last);
      game.set(last, i);
      last = i - t;
    } else {
      game.set(last, i);
      last = 0;
    }
  }
  return last;

}
/*
console.log(play([1,3,2],2020));// 1.
console.log(play([2,1,3],2020));// 10.
console.log(play([1,2,3],2020));// 27.
console.log(play([2,3,1],2020));// 78.
console.log(play([3,2,1],2020));// 438.
console.log(play([3,1,2],2020));// 1836.
*/

/*
console.log(play([0,3,6],30000000));// 175594.
console.log(play([1,3,2],30000000));// 2578.
console.log(play([2,1,3],30000000));// 3544142.
console.log(play([1,2,3],30000000));// 261214.
console.log(play([2,3,1],30000000));// 6895259.
console.log(play([3,2,1],30000000));// 18.
console.log(play([3,1,2],30000000));// 362.
*/

console.log("part one : ", play([0,14,6,20,1,4],2020));
console.log("part two : ", play([0,14,6,20,1,4],30000000));