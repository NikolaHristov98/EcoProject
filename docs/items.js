let pos = [0.0, 0.0];
let rgb = [1.0, .5, 0.25];
let speed = 1, time_spawn = 10;
let trash_count = 0;
let latest_added = 0;
let spawnSpeed = 2000;

let mult = 1;

let currCanvasW, currCanvasH;
let currPlayerW, currPlayerH, currTrashW, currTrashH, scoreH,scoreW;

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
  spawnSpeed += 50;
  speed += 0.01;

  return ({ pos: { x: _new_pos, y: 0, w: 25, h: 25 }, type: _type, img: _img});
}

function ItemIsInTrash(arrTrash) {
  var centerPlayerX = player.pos.x ;
  var centerPlayerY = player.pos.y;

  for (var i = 0; i < arrTrash.length; i++) {
    var centerItemX = arrTrash[i].x + currTrashW / 2;
    var centerItemY = arrTrash[i].y + currTrashH / 2;
    var isItemInTrash = Math.sqrt(Math.pow(centerPlayerX - centerItemX, 2) + Math.pow(centerPlayerY - centerItemY, 2))
    //console.log(isItemInTrash);

    if (Math.abs(isItemInTrash) < currTrashW/3) {
      if (arrTrash[i].id == player.currImage) {
        
        mult + 0.01;
        player.score += Math.ceil(mult * 10);
      }
      else {
        player.lives--;
      }
      arrTrash.splice(i, 1);
    }
  }
}