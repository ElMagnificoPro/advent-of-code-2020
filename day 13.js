let timestamp0 = 939;
let timestamp = 1008169;
let x = "x";
let input0 = [67,7,59,61];
let input = [
  29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,653,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,823,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19
];


function indexOfSmallest(a) {
  return a.indexOf(Math.min.apply(Math, a));
 }

let arr = input.filter(Number);
let a = arr.map((e)=> Math.abs(timestamp%e - e)).sort((a,b)=>a-b )[0];
let b = indexOfSmallest(arr.map((e)=> Math.abs(timestamp%e - e)));

console.log("part one : ", a*arr[b]);


let incr = input[0];
let t= 0;

function findtime(){
  for (let i = 1; i < input.length; i++) {
    const element = input[i];
      if( !isNaN(element)){
        while( (t + i) % element !== 0 && isFinite(t) && isFinite(incr)){
          t+=incr;
        }
        incr = incr * element;
      }

  }
return t;
}




console.log("part two : ",findtime());


