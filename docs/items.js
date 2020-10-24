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
  { type: "plastic", id : 0, imgs: ["assets/glasses.svg", "assets/glasses.svg", "assets/glasses.svg"] },
  { type: "paper", id : 1 ,imgs: ["assets/glasses.svg", "assets/glasses.svg", "assets/glasses.svg"] },
  { type: "metal", id : 2 ,imgs: ["assets/glasses.svg", "assets/glasses.svg", "assets/glasses.svg"] }
]

let player = {
  pos: { x: 100, y: 100 },
  lives: 3,
  score: 0,
  image: [],
  currImage: -1
};

let arrTrash = []


function generateItem() {
  _type = Math.floor(Math.random() * 3);
  _img = Math.floor(Math.random() * 3);
  _new_pos = Math.floor(Math.random() * (currCanvasW + 1));
  latest_added = Date.now();

  return ({ pos: { x: _new_pos, y: 0, w: 25, h: 25 }, type: _type, img: _img  });
}

