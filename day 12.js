let input = require("fs").readFileSync("day 12.txt",{encoding:"utf-8"}).split("\r\n");

let input0 = [
  "F10", "N3", "F7", "R90", "F11"
];

let compass = ["N", "E", "S", "W"];

ship = {
  facing: "E",
  N: 0,
  E: 0,
  S: 0,
  W: 0
};

waypoint = {
  facing: "E",
  N: 1,
  E: 10,
  S: 0,
  W: 0
};

function turnLeft(n){
  for (let i = 0; i < n; i++) {
    let aux = waypoint.N;
    waypoint.N = waypoint.E;
    waypoint.E = waypoint.S;
    waypoint.S = waypoint.W;
    waypoint.W = aux;
  }
}

function turnRight(n){
  for (let i = 0; i < n; i++) {
    let aux = waypoint.N;
    waypoint.N = waypoint.W;
    waypoint.W = waypoint.S;
    waypoint.S = waypoint.E;
    waypoint.E = aux;
  }
}

function moveShip(dir, val) {
  if (compass.includes(dir)) {
    ship[dir] += val;
  } else if (dir === "F") {
    ship[ship.facing] += val;
  } else if (dir === "R") {
    let i = compass.indexOf(ship.facing);
    ship.facing = compass[(i + val / 90) % 4];
  } else if (dir === "L") {
    let i = compass.indexOf(ship.facing);
    ship.facing = compass[Math.abs((i - val / 90) + 4) % 4];
    
  }
 // console.log(ship, dir, val);
}

function moveShip2(dir,val) {

if(compass.includes(dir)){
  waypoint[dir] += val;
}else if(dir === "F"){
 ship.E += waypoint.E * val;
 ship.N += waypoint.N * val;
 ship.S += waypoint.S * val;
 ship.W += waypoint.W * val;

}else if (dir === "R") {
  let i = compass.indexOf(waypoint.facing);
  waypoint.facing = compass[ (i + val/90) % 4 ];
  turnRight(val / 90 % 4);
  
  
}else if (dir === "L"){
  let i = compass.indexOf(waypoint.facing);
  waypoint.facing = compass[ Math.abs((i - val/90) + 4) % 4 ];
  turnLeft(val / 90 % 4);
}
//console.log(waypoint,ship,dir,val);

}

for (let i = 0; i < input.length; i++) {
  const element = input[i];
  moveShip(element.slice(0, 1), parseInt(element.slice(1)));
}
console.log("part one : ",Math.abs(ship.N - ship.S) + Math.abs(ship.E - ship.W));
ship = {
  facing: "E",
  N: 0,
  E: 0,
  S: 0,
  W: 0
};

for (let i = 0; i < input.length; i++) {
  const element = input[i];
  
  moveShip2(element.slice(0, 1), parseInt(element.slice(1)));
}

console.log("part two : ",Math.abs(ship.N - ship.S) + Math.abs(ship.E - ship.W));
