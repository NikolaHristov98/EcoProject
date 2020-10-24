let pause = true;

function getStyleSize(style, propName) {
  return parseInt(style.getPropertyValue(propName));
}

function getRelativeMousePosition(event, target) {
  target = target || event.target;
  var rect = target.getBoundingClientRect();

  return {
    x: (event.clientX === undefined ? event.touches[0].pageX : event.clientX) - rect.left,
    y: (event.clientY === undefined ? event.touches[0].pageY : event.clientY) - rect.top,
  }
}

function getCanvasRelativeMousePosition(event, target) {
  target = target || event.target;
  var pos = getRelativeMousePosition(event, target);

  // you can remove this if padding is 0. 
  // I hope this always returns "px"
  var style = window.getComputedStyle(target);
  var nonContentWidthLeft = getStyleSize(style, "padding-left") +
    getStyleSize(style, "border-left");
  var nonContentWidthTop = getStyleSize(style, "padding-top") +
    getStyleSize(style, "border-top");
  var nonContentWidthRight = getStyleSize(style, "padding-right") +
    getStyleSize(style, "border-right");
  var nonContentWidthBottom = getStyleSize(style, "padding-bottom") +
    getStyleSize(style, "border-bottom");

  var rect = target.getBoundingClientRect();
  var contentDisplayWidth = rect.width - nonContentWidthLeft - nonContentWidthRight;
  var contentDisplayHeight = rect.height - nonContentWidthTop - nonContentWidthBottom;

  pos.x = (pos.x - nonContentWidthLeft) * target.width / contentDisplayWidth;
  pos.y = (pos.y - nonContentWidthTop) * target.height / contentDisplayHeight;

  return pos;
}

function keyEvents() {
  let canvas;


  window.oncontextmenu = function () {
    player.currImage--;
    if(player.currImage<0){
      player.currImage = 2;
    }
    return false;     // cancel default menu
    //return true;
  }

  canvas = document.getElementById("canvas");

  canvas.addEventListener('click', function (evt) {
    player.currImage++;
    if(player.currImage>2){
      player.currImage = 0;
    }

  }, false)

  canvas.addEventListener('touchcancel', function () {
   // evt.preventDefault()
  }, false);

  canvas.addEventListener('touchstart', function (evt) {
    //evt.preventDefault()
    pause = false;
  }, false);

  canvas.addEventListener('touchend', function (evt) {
    //evt.preventDefault()
    pause = true;
  }, false);

  canvas.addEventListener('touchmove', function (evt) {
   // evt.preventDefault()
    let p = getCanvasRelativeMousePosition(evt, canvas)
    player.pos.x = p.x;
    player.pos.y = p.y;
  }, false);

  window.addEventListener("resize", function (evt) {
    currCanvasW = canvas.getBoundingClientRect().width;
    currCanvasH = canvas.getBoundingClientRect().height;

    if (currCanvasW <= 769) {
       
      scoreW = scoreH = 0.1 * currCanvasW;
      currPlayerH = currPlayerW = 0.1 * currCanvasW;
      currTrashH = currTrashW = 0.09 * currCanvasW;
    } else if (currCanvasW <= 1200) {
      scoreW = scoreH = 0.09 * currCanvasW;
      currPlayerH = currPlayerW = 0.08 * currCanvasW;
      currTrashH = currTrashW = 0.065 * currCanvasW;
    } else {
      scoreW = scoreH = 0.1 * currCanvasW;
      currPlayerH = currPlayerW = 0.1 * currCanvasW;
      currTrashH = currTrashW = 0.09 * currCanvasW;
    }

  })


  //report the mouse position on click
  canvas.addEventListener("mousemove", function (evt) {
    let p = getCanvasRelativeMousePosition(evt, canvas)
    player.pos.x = p.x;
    player.pos.y = p.y;
    //console.log(player);
  }, false);

  window.onclick = function (event) {
    temp = rgb[0];

    rgb[0] = rgb[1]
    rgb[1] = rgb[2]
    rgb[2] = temp
  }

  canvas.addEventListener("mouseenter", function (evt) {
    pause = false;
  })
  canvas.addEventListener("mouseleave", function (evt) {
    pause = true;
  })

  window.onkeypress = function (event) {
    //this.console.log(event)

    switch (event.key) {
      case 'a': {
        pos[0] -= 0.01;

        if (pos[0] < -0.25) {
          pos[0] = -0.25;
        }

        console.log(pos[0])
      }; break
    }
  }

}


keyEvents();