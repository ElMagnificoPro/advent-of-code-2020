let cardPK = 9717666; let doorPK = 20089533;
//let cardPK = 5764801;let doorPK = 17807724;

function getLoopSize(key) {
  let val = 1;
  loopSize = 0;
  while (val !== key && loopSize < 1000000000) {
    val = (val * 7) % 20201227;
    loopSize += 1;
  }
  return loopSize;
}

function partOne() {
  let loopSizeCard = getLoopSize(cardPK);
  let loopSizeDoor = getLoopSize(doorPK);
  let encryptionKey = 1;
  console.log(loopSizeCard, loopSizeDoor);


  for (let i = 0; i < Math.min(loopSizeCard,loopSizeDoor); i++) {
    encryptionKey = (encryptionKey * doorPK) % 20201227;
  }

  return encryptionKey;
}

console.log(partOne());