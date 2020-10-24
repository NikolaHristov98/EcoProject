let pos = [0.0, 0.0];
let rgb = [1.0, .5, 0.25];
let speed = 0.5, time_spawn = 10;
let trash_count = 0;
let latest_added = 0;
let spawnSpeed = 2000;

let mult = 1;

let currCanvasW, currCanvasH;
let currPlayerW, currPlayerH, currTrashW, currTrashH;

let currScrollPos = 0;


let type_trash = [
  { type: "paper", id: 0, imgs: ["assets/paper/box.svg", "assets/paper/plane.svg", "assets/paper/box.svg"] },
  { type: "glass", id: 1, imgs: ["assets/glass/bottle1.svg", "assets/glass/glass1.svg", "assets/glass/dish1.svg"] },
  { type: "metal", id: 2, imgs:  ["assets/plastic/pbottle1.svg", "assets/plastic/pbottle1.svg", "assets/plastic/pbottle1.svg"]}
]

let player = {
  pos: { x: 100, y: 100 },
  lives: 3,
  score: 0,
  image: [],
  currImage: -1
};





function generateItem() {
  _type = Math.floor(Math.random() * 3);
  _img = Math.floor(Math.random() * 3);
  _new_pos = Math.floor(Math.random() * (currCanvasW + 1));
  latest_added = Date.now();

  return ({ pos: { x: _new_pos, y: 0, w: 25, h: 25 }, type: _type, img: _img});
}

function ItemIsInTrash(arrTrash) {
  var centerPlayerX = player.pos.x + currPlayerW / 2;
  var centerPlayerY = player.pos.y + currPlayerH / 2;

  for (var i = 0; i < arrTrash.length; i++) {
    var centerItemX = arrTrash[i].x + currTrashW / 2;
    var centerItemY = arrTrash[i].y + currTrashH / 2;
    var isItemInTrash = Math.sqrt(Math.pow(centerPlayerX - centerItemX, 2) + Math.pow(centerPlayerY - centerItemY, 2))

    if (Math.abs(isItemInTrash) < 100) {
      if (arrTrash[i].id == player.currImage) {
        
        mult + 0.01;
        player.score += mult * 10;
      }
      else {
        
        player.score = player.score - 50;
      }
      arrTrash.splice(i, 1);
    }
    else (Math.abs(isItemInTrash >= Number.EPSILON))
    {
      continue;
    }
  }
}