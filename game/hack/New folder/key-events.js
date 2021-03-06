function getStyleSize(style, propName) {
    return parseInt(style.getPropertyValue(propName));
  }

function getRelativeMousePosition(event, target) {
    target = target || event.target;
    var rect = target.getBoundingClientRect();
  
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

function getCanvasRelativeMousePosition(event, target) {
    target = target || event.target;
    var pos = getRelativeMousePosition(event, target);
  
    // you can remove this if padding is 0. 
    // I hope this always returns "px"
    var style = window.getComputedStyle(target);
    var nonContentWidthLeft   = getStyleSize(style, "padding-left") +
                                getStyleSize(style, "border-left");
    var nonContentWidthTop    = getStyleSize(style, "padding-top") +
                                getStyleSize(style, "border-top");
    var nonContentWidthRight  = getStyleSize(style, "padding-right") +
                                getStyleSize(style, "border-right");
    var nonContentWidthBottom = getStyleSize(style, "padding-bottom") +
                                getStyleSize(style, "border-bottom");
  
    var rect = target.getBoundingClientRect();
    var contentDisplayWidth  = rect.width  - nonContentWidthLeft - nonContentWidthRight;
    var contentDisplayHeight = rect.height - nonContentWidthTop  - nonContentWidthBottom;
  
    pos.x = (pos.x - nonContentWidthLeft) * target.width  / contentDisplayWidth;
    pos.y = (pos.y - nonContentWidthTop ) * target.height / contentDisplayHeight;
  
    return pos;  
}

function keyEvents(){
    let canvas;

    canvas = document.getElementById("canvas");
    
      //report the mouse position on click
      canvas.addEventListener("mousemove", function (evt) {
          let p  = getCanvasRelativeMousePosition(evt, canvas)
          pos[0] = p.x/320 -1;
          pos[1] = -p.y/320 +1;
      }, false);
    
    window.onclick = function(event){
      temp = rgb[0];
    
      rgb[0] = rgb[1]
      rgb[1] = rgb[2]
      rgb[2] = temp
    }
    
    
    
    window.onkeypress = function(event){
        this.console.log(event)
    
        switch(event.key){
            case 'a' :{
                pos[0] -= 0.01;
    
                if(pos[0] < -0.25 ){
                     pos[0] = -0.25;
                }
                
                console.log(pos[0])
            };break
        }
    }
    
}


keyEvents();