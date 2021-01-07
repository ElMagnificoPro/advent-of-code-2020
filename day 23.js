let input1 =  "389125467".split("").map(Number);
let input = "962713854".split("").map(Number);

let cups = input;

let steps = 10000000;

for (let i = 0; i < cups.length; i++) {
  cups[i] = { val : cups[i]};
}

for (let i = 10; i <= 1000000; i++) {
  cups.push({ val : i});
}

cups.forEach((e, i) => {
  cups[i].next =  (i < cups.length - 1) ? cups[i + 1] : cups[0];
});

let vMap = new Map(cups.map((item) => [item.val, item]));

let head = cups[0];

for (let i = 0; i < steps; i++) {
  let extract = [head.next.val, head.next.next.val, head.next.next.next.val];
  let extractHead = head.next;
  head.next = head.next.next.next.next;

  let cur = head.val - 1;
  while (true) {
    while (extract.includes(cur)) cur--;
    if (cur === 0) cur += cups.length;
    while (extract.includes(cur)) cur--;

    let pos = vMap.get(cur);
    if (pos) {
      extractHead.next.next.next = pos.next;
      pos.next = extractHead;
      break;
    }

    cur--;
  }

  head = head.next;
}

let posOne = vMap.get(1);
console.log( posOne.next.val * posOne.next.next.val);
