const data = require("fs").readFileSync("./day 20.txt", {
  encoding: "utf-8"
});

let tiles = [];

let input = data.split("\r\n\r\n");
for (let i = 0; i < input.length; i++) {
  let tile = {};
  tile.id = parseInt(input[i].slice(5, 9));
  tile.img = input[i].split("\r\n");
  tile.img.shift();
  tile.flipped = 0;
  tile.rotation = 0;
  tile.flip = function (dir) {
    if (dir === 1) {
      this.img = this.img.reverse();
    } else if (dir === 2) {
      for (let i = 0; i < this.img.length; i++) {
        const element = this.img[i];
        this.img[i] = element.split("").reverse().join("");
      }
    }
    this.flipped = dir;
  };
  tile.rotate = function () {
    let x = this.img;

    for (let i = 0; i < x.length; i++) {
      x[i] = x[i].split("");
    }
    x = x[0].map((val, index) => x.map(row => row[index]).reverse());
    for (let i = 0; i < x.length; i++) {
      this.img[i] = x[i].join('');
    }

    this.rotation = (this.rotation + 1) % 4;
  };
  tile.getEdge = function (dir) {
    switch (dir) {
      case "down":
        return this.img[this.img.length - 1];
      case "left":
        return this.img.map((e) => e[0]).join("");
      case "right":
        return this.img.map((e) => e[e.length - 1]).join("");
      case "up":
        return this.img[0];
      default:
        console.log("getting edge failed", dir);
        break;
    }
  };
  tile.link = {
    up: null,
    down: null,
    left: null,
    right: null
  };
  tile.x = null;
  tile.y = null;

  tiles.push(tile);
}

let grid = {};

grid["0,0"] = tiles[0];
grid["0,0"].x = 0;
grid["0,0"].y = 0;


function linkTile(tile) {
  let res = false;
  for (const element in grid) {
    if (Object.hasOwnProperty.call(grid, element)) {
      if (!grid[element].link.down) {
        if (grid[element].getEdge("down") === tile.getEdge("up")) {
          grid[element].link.down = tile;
          tile.x = grid[element].x + 1;
          tile.y = grid[element].y;
          grid[`${grid[element].x+1},${grid[element].y}`] = tile;
          res = true;
        }
      }
      if (!grid[element].link.up) {
        if (grid[element].getEdge("up") === tile.getEdge("down")) {
          grid[element].link.up = tile;
          tile.x = grid[element].x - 1;
          tile.y = grid[element].y;
          grid[`${grid[element].x-1},${grid[element].y}`] = tile;
          res = true;
        }
      }
      if (!grid[element].link.right) {
        if (grid[element].getEdge("right") === tile.getEdge("left")) {
          grid[element].link.right = tile;
          tile.x = grid[element].x;
          tile.y = grid[element].y + 1;
          grid[`${grid[element].x},${grid[element].y+1}`] = tile;
          res = true;
        }
      }
      if (!grid[element].link.left) {
        if (grid[element].getEdge("left") === tile.getEdge("right")) {
          grid[element].link.left = tile;
          tile.x = grid[element].x;
          tile.y = grid[element].y - 1;
          grid[`${grid[element].x},${grid[element].y-1}`] = tile;
          res = true;
        }
      }
    }
  }
  return res;
}

//link tiles

let pass = 0;
let remains = [];
do {
  remains = [];
  pass++;
  for (let tile of tiles) {
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    tile.flip(1);
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    tile.flip(1);
    tile.flip(2);
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    if (linkTile(tile)) continue;
    tile.rotate();
    tile.flip(2);
    if (tile.x !== 0 && tile.y !== 0) {
      remains.push(tile);
    }
  }
  tiles = remains;
} while (remains.length !== 0 && pass < 1000);


let minX = Math.min(...Object.values(grid).map(o => o.x));
let minY = Math.min(...Object.values(grid).map(o => o.y));

let maxX = Math.max(...Object.values(grid).map(o => o.x));
let maxY = Math.max(...Object.values(grid).map(o => o.y));

console.log("part One : "+ grid[`${minX},${minY}`].id *grid[`${minX},${maxY}`].id *grid[`${maxX},${minY}`].id *grid[`${maxX},${maxY}`].id);

// build image

let image = [];
let lines = [];
for (let i = minX; i <= maxX; i++) {
  lines = [];
  for (let j = minY; j <= maxY; j++) {
    for (let k = 1; k < grid[`${i},${j}`].img.length - 1; k++) {
      if (!lines[k - 1]) lines[k - 1] = "";
      lines[k - 1] += grid[`${i},${j}`].img[k].slice(1, -1);
    }
  }
  image.push(...lines);

}



//find monster

let monster = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   "
];
let monsterCount = 0;
// convert monster to indexes

for (let i = 0; i < monster.length; i++) {
  monster[i] = monster[i].split('').map((v, i) => {
    return (v === '#') ? i : -1;
  }).filter(v => v !== -1);
}

function findMonster() {
  let oldImage = JSON.parse(JSON.stringify(image));
  for (let i = 0; i < image.length -  3 ; i++) {
    for (let j = 0; j < image[i].length - 19; j++) {
      let found = false;
      if (image[i][j +monster[0][0]] !== ".") {
        found = true;
        for (let k = 0; k < monster[1].length; k++) {
          if (image[i + 1].charAt(j + monster[1][k]) === ".") {
            found = false;
            break;
          }
        }
        if (found) {

          for (let k = 0; k < monster[2].length; k++) {
            if (image[i + 2].charAt(j + monster[2][k])=== ".") {
              found = false;
              break;
            }
          }
        }
      }

      if (found) {

        image[i] = image[i].slice(0,j + monster[0][0]) + 'O' + image[i].slice(j + monster[0][0] + 1, image[0].length);
        for (let k = 0; k < monster[1].length; k++) {
          image[i + 1] = image[i + 1].slice(0, j+ monster[1][k]) + 'O' + image[i + 1].slice(j+ monster[1][k] + 1, image[0].length);
        }
        for (let k = 0; k < monster[2].length; k++) {
          image[i + 2] = image[i + 2].slice(0, j+ monster[2][k]) + 'O' + image[i + 2].slice(j+ monster[2][k] + 1, image[0].length);
        }
      }
    }
  }

  let count = 0;
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] === '#') count++;
    }
  }
  //console.log(count);
  if (count < monsterCount || monsterCount ===0) {
    monsterCount = count;
  }
  image = JSON.parse(JSON.stringify(oldImage));
}


function flipImage(dir) {
  if (dir === 1) {
    image = image.reverse();
  } else if (dir === 2) {
    for (let i = 0; i < image.length; i++) {
      const element = image[i];
      image[i] = element.split("").reverse().join("");
    }
  }
}

function rotateImage() {
  let x = image;

  for (let i = 0; i < x.length; i++) {
    x[i] = x[i].split("");
  }
  x = x[0].map((val, index) => x.map(row => row[index]).reverse());
  for (let i = 0; i < x.length; i++) {
    image[i] = x[i].join('');
  }
}




findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();

flipImage(1);

findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();

flipImage(1);
flipImage(2);

findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();
findMonster();
rotateImage();

console.log("part Two : ",monsterCount);