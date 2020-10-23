let pos = [0.0, 0.0];
let rgb = [1.0, .5 ,0.25];
let speed = 0.5, time_spawn = 10;
let trash_count = 0;
latest_added = 0;

let player = {
  pos : {x:0, y:0, w:0.5, h:0.5},
  lives : 3,
  score : 0,
  image : null
};

function updateItems(player, arrItem, deltaTime){
    if(arrItem.length !== undefined && arrItem.length != 0){
      if(Date.now() - arrItem[arrItem.length -1].time >= time_spawn){
        generateItem(arrItem);
        trash_count++;
        if(trash_count % 2 == 0){
            speed += 0.01;
            //if(time_spawn >100)
            time_spawn -= 10;

            console.log({speed_: speed, time_spawn_: time_spawn});
        }
      }

      if(arrItem[0].pos[2].y <= -1){
          arrItem.shift();
      }

      arrItem.forEach(element => {
        element.pos.forEach( point =>{
            point.y -= speed*deltaTime;
            
        });
      });
    }else{
        generateItem(arrItem);
        trash_count++;
    }
    
  
    return arrItem;
  }
  
  function generateItem(arrItem){
     new_pos = 2*Math.random() - 1;
     latest_added = Date.now();
      arrItem.push({pos : {x :new_pos-0.05, y:1.05, w: 0.1, h: 0.1}})
    
  }

  function generateRandom(){
    return {}

  }