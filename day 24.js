let input = require("fs").readFileSync("day 24.txt", {
  encoding: "utf-8"
}).split("\r\n");

let tiles = {};

for (let i = 0; i < input.length; i++) {
  let line = [];
  for (let j = 0; j < input[i].length; j++) {
    if (input[i].charAt(j) === "s" || input[i].charAt(j) === "n") {
      line.push(input[i].charAt(j) + input[i].charAt(j + 1));
      j++;
    } else {
      line.push(input[i].charAt(j));
    }
  }
  input[i] = line;
}

function flipTile(line) {
  let x = 0,
    y = 0;
  line.forEach(dir => {
    switch (dir) {
      case "ne":
        x += 1;
        y -= 1;
        break;
      case "nw":
        x -= 1;
        y -= 1;
        break;
      case "e":
        x += 2;
        break;
      case "w":
        x -= 2;
        break;
      case "se":
        x += 1;
        y += 1;
        break;
      case "sw":
        x -= 1;
        y += 1;
        break;
      default:
        break;
    }
  });

  if (typeof tiles[`${x},${y}`] !== "undefined") {
    tiles[`${x},${y}`] = !tiles[`${x},${y}`];
  } else {
    tiles[`${x},${y}`] = true;
  }
}

function getNeighbours(coordinates) {
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let count = 0;

  if (tiles[`${x+2},${y}`]) count++; else tiles[`${x+2},${y}`] = false;
  if (tiles[`${x-2},${y}`]) count++; else tiles[`${x-2},${y}`] = false;
  if (tiles[`${x+1},${y-1}`]) count++; else tiles[`${x+1},${y-1}`] = false;
  if (tiles[`${x-1},${y+1}`]) count++; else tiles[`${x-1},${y+1}`] = false;
  if (tiles[`${x-1},${y-1}`]) count++; else tiles[`${x-1},${y-1}`] = false;
  if (tiles[`${x+1},${y+1}`]) count++; else tiles[`${x+1},${y+1}`] = false;

  return count;

}

function partOne() {
  input.forEach(line => {
    flipTile(line);
  });

  let count = 0;
  for (const key in tiles) {
    if (Object.hasOwnProperty.call(tiles, key)) {
      if (tiles[key])
        count++;
    }
  }
  return count;
}

function partTwo() {

  let nextDay = {};
  for (const key in tiles) {
    if (Object.hasOwnProperty.call(tiles, key)) {
      getNeighbours(key.split(","));
    }}
  for (const key in tiles) {
    if (Object.hasOwnProperty.call(tiles, key)) {
      let neighbours = getNeighbours(key.split(","));
      if ((neighbours === 0 || neighbours > 2)&& tiles[key]) nextDay[key] = false;
      else if(neighbours === 2 && !tiles[key]) nextDay[key] = true;
      else nextDay[key] = tiles[key];
    }

  }
  return nextDay;
}

console.log("part one : ", partOne());

for (let i = 0; i < 100; i++) {
  tiles = partTwo();

}

let count = 0;
for (const key in tiles) {
  if (Object.hasOwnProperty.call(tiles, key)) {
    if (tiles[key])
      count++;
  }
}
console.log("part two : ",count);
