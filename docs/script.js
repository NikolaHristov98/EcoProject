"use strict";


function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  currCanvasW = canvas.getBoundingClientRect().width;
  currCanvasH = canvas.getBoundingClientRect().height;

  if (currCanvasW <= 769) {
    currPlayerH = currPlayerW = 0.09 * currCanvasW;
    currTrashH = currTrashW = 0.07 * currCanvasW;
  } else if (currCanvasW <= 1200) {
    currPlayerH = currPlayerW = 0.07 * currCanvasW;
    currTrashH = currTrashW = 0.055 * currCanvasW;
  } else {
    currPlayerH = currPlayerW = 0.09 * currCanvasW;
    currTrashH = currTrashW = 0.08 * currCanvasW;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromScripts(gl, ["drawImage-vertex-shader", "drawImage-fragment-shader"]);

  // look up where the vertex data needs to go.
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

  // lookup uniforms
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var textureLocation = gl.getUniformLocation(program, "u_texture");

  // Create a buffer.
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Put a unit quad in the buffer
  var positions = [
    0, 0,
    0, 1,
    1, 0,
    1, 0,
    0, 1,
    1, 1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Create a buffer for texture coords
  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Put texcoords in the buffer
  var texcoords = [
    0, 0,
    0, 1,
    1, 0,
    1, 0,
    0, 1,
    1, 1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

  // creates a texture info { width: w, height: h, texture: tex }
  // The texture will start with 1x1 pixels and be updated
  // when the image has loaded
  function loadImageAndCreateTextureInfo(url) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));

    // let's assume all images are not a power of 2
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    var textureInfo = {
      width: 1,   // we don't know the size until it loads
      height: 1,
      texture: tex,
    };
    var img = new Image();
    img.addEventListener('load', function() {
      textureInfo.width = img.width;
      textureInfo.height = img.height;

      gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    });
    img.src = url;

    return textureInfo;
  }

///'assets/blue_container.svg','assets/green_container.svg','assets/yellow_container.svg'

let nums = [];

for(let i = 0; i<10; i++){
  nums.push(loadImageAndCreateTextureInfo("assets/nums/" + i + ".svg"));
}

  player.image.push(loadImageAndCreateTextureInfo('assets/blue_container.svg'));
  player.image.push(loadImageAndCreateTextureInfo('assets/green_container.svg'));
  player.image.push(loadImageAndCreateTextureInfo('assets/yellow_container.svg'));
  player.currImage = 2;

  var drawInfos = [];
  var speed = 100;

  let background = loadImageAndCreateTextureInfo('assets/background-colours.jpg');

  currScrollPos = -6000 + currCanvasH;

  function update(deltaTime) {

    if(Date.now() - latest_added >= spawnSpeed){
      let res = generateItem();

      drawInfos.push({
        textureInfo : loadImageAndCreateTextureInfo(type_trash[res.type].imgs[res.img]),
        x : res.pos.x,
        y : res.pos.y,
        h : res.pos.h,
        w : res.pos.w,
        id: res.type
      })
    }

    
    ItemIsInTrash(drawInfos);

    currScrollPos+=deltaTime*speed;
    

    let didMiss = false;
    drawInfos.forEach(function(drawInfo) {
      drawInfo.y +=  speed * deltaTime;
      if (drawInfo.y + drawInfo.h >= gl.canvas.height) {
        player.lives--;
        didMiss = true;
        mult = 1;
      }
    });

    if(didMiss){
      drawInfos.shift();
    }
  }

 

  function draw() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT);

   // drawImage(background.texture, background.width, background.height, 0, currScrollPos);

    drawImage(player.image[player.currImage].texture, player.image.width, player.image.height, player.pos.x - currPlayerW/2, player.pos.y-currPlayerH/2, currPlayerW, currPlayerH)

    drawInfos.forEach(function(drawInfo) {
      drawImage(
        drawInfo.textureInfo.texture,
        drawInfo.textureInfo.width,
        drawInfo.textureInfo.height,
        drawInfo.x, drawInfo.y, currTrashW, currTrashH);
    });

    let copy = player.score;
    let topX = 0;
    let topY = currCanvasH - scoreH;
    let str = "";

    for(let i = 0; i <5; i++){
      str = Math.abs(copy%10) + str;
      //drawImage(nums[Math.abs(copy%10)].texture, nums[Math.abs(copy%10)].width,nums[Math.abs(copy%10)].height, topX, topY);
     
      copy = Math.floor(copy/10);
    }

    for(let i = 0; i< 5; i++){
      drawImage(nums[parseInt(str[i],10)].texture, nums[parseInt(str[i],10)].width,nums[parseInt(str[i],10)].height, topX, topY)
      topX += 50;
    }
  }

  var then = 0;
  function render(time) {
    var now = time * 0.001;
    var deltaTime = Math.min(0.1, now - then);
    then = now;

    if(!pause){
      update(deltaTime);
      draw();
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Unlike images, textures do not have a width and height associated
  // with them so we'll pass in the width and height of the texture
  function drawImage(
      tex, texWidth, texHeight,
      dstX, dstY, dstWidth, dstHeight) {
    if (dstWidth === undefined) {
      dstWidth = texWidth;
    }

    if (dstHeight === undefined) {
      dstHeight = texHeight;
    }

    gl.bindTexture(gl.TEXTURE_2D, tex);

    // Tell WebGL to use our shader program pair
    gl.useProgram(program);

    // Setup the attributes to pull data from our buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // this matrix will convert from pixels to clip space
    var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

    // this matrix will translate our quad to dstX, dstY
    matrix = m4.translate(matrix, dstX, dstY, 0);

    // this matrix will scale our 1 unit quad
    // from 1 unit to texWidth, texHeight units
    matrix = m4.scale(matrix, dstWidth, dstHeight, 1);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

}

window.onload = main();
