let input = [
  "#...#...",
  "#..#...#",
  "..###..#",
  ".#..##..",
  "####...#",
  "######..",
  "...#..#.",
  "##.#.#.#"
];

let inputTest = [
  ".#.",
  "..#",
  "###"
];

function findNeighbours(x, y, z, cube) {
  let acc = 0;
  for (let zz = z - 1; zz <= z + 1; zz++) {
    for (let yy = y - 1; yy <= y + 1; yy++) {
      for (let xx = x - 1; xx <= x + 1; xx++) {
        if ((xx !== x || yy !== y || zz !== z) && cube[`${xx},${yy},${zz}`]) {
          acc++;
        }
      }
    }
  }
  return acc;
}

function findNeighbours2(x, y, z, w, cube) {
  let acc = 0;
  for (let zz = z - 1; zz <= z + 1; zz++) {
    for (let yy = y - 1; yy <= y + 1; yy++) {
      for (let xx = x - 1; xx <= x + 1; xx++) {
        for (let ww = w - 1; ww <= w + 1; ww++) {
          if ((xx !== x || yy !== y || zz !== z || ww !== w) && cube[`${xx},${yy},${zz},${ww}`]) {
            acc++;
          }
        }
      }
    }
  }
  return acc;
}

function partOne(input) {

  let cube = {};

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input.length; y++) {
      cube[`${x},${y},0`] = input[x][y] === "#";
    }
  }

  let sizeX = [0, input.length];
  let sizeY = [0, input[0].length];
  let sizeZ = [0, 1];


  for (let i = 0; i < 6; i++) {

    sizeX[0]--;
    sizeX[1]++;
    sizeY[0]--;
    sizeY[1]++;
    sizeZ[0]--;
    sizeZ[1]++;

    let cubeNext = {};

    for (let x = sizeX[0]; x < sizeX[1]; x++) {
      for (let y = sizeY[0]; y < sizeY[1]; y++) {
        for (let z = sizeZ[0]; z < sizeZ[1]; z++) {
          let neighbours = findNeighbours(x, y, z, cube);
          if (neighbours === 3 ||
            (neighbours === 2 && cube[`${x},${y},${z}`])) {
            cubeNext[`${x},${y},${z}`] = true;
          }
        }
      }
    }

    cube = cubeNext;
  }

  return cube;


}


function partTwo(input) {

  let cube = {};

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input.length; y++) {
      cube[`${x},${y},0,0`] = input[x][y] === "#";
    }
  }

  let sizeX = [0, input.length];
  let sizeY = [0, input[0].length];
  let sizeZ = [0, 1];
  let sizeW = [0, 1];


  for (let i = 0; i < 6; i++) {

    sizeX[0]--;
    sizeX[1]++;
    sizeY[0]--;
    sizeY[1]++;
    sizeZ[0]--;
    sizeZ[1]++;
    sizeW[0]--;
    sizeW[1]++;

    let cubeNext = {};

    for (let x = sizeX[0]; x < sizeX[1]; x++) {
      for (let y = sizeY[0]; y < sizeY[1]; y++) {
        for (let z = sizeZ[0]; z < sizeZ[1]; z++) {
          for (let w = sizeW[0]; w < sizeW[1]; w++) {

            let neighbours = findNeighbours2(x, y, z, w, cube);

            if (neighbours === 3 ||
              (neighbours === 2 && cube[`${x},${y},${z},${w}`])) {
              cubeNext[`${x},${y},${z},${w}`] = true;
            }

          }
        }
      }
    }

    cube = cubeNext;
  }

  return cube;


}



let p1 = partOne(input);
let p2 = partTwo(input);

console.log("part one : ",Object.keys(p1).length);
console.log("part two : ",Object.keys(p2).length);