/**
 * Setup
 */
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var down = false;
var animationImg = [];
var startTime;
var width, height;
var mouse;
var fps = 25;
var time = 0;
var numOfFrames = 9;
var x=0,y=0,pos=[],positivey=1,positivex=1;
/**
*  Utils
**/
function loadImage(src) {
        var img = new Image();
        img.src = src;
        img.isReady = false;
        img.onload = function() {
            img.isReady = true;
        };
        return img;
}

function init() {
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("keydown", keyDown, false);
    var address = "canvasTest/attack1/p";
    for(var i = 0; i < numOfFrames; i++) {
        var finalAddress = address+(i+1)+".png";
        animationImg[i] = loadImage(finalAddress);
    }
    startTime = new Date().getTime();
    width = canvas.width;
    height = canvas.height;
    mouse = [0,0];
}

function keyDown(e) {
    if (e.keyCode == 87) {
    }

    if (e.keyCode == 83) {
    }

    if (e.keyCode == 65) {
    }

    if (e.keyCode == 68) {
    }
}

function mouseDown(e) {
    var rect = canvas.getBoundingClientRect();
    mouse[0] = e.clientY - rect.top;
    mouse[1] = e.clientX - rect.left;
    down = true;
}

function mouseUp() {
    down = false;
}

function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left), my = (e.clientY - rect.top);
    if (!down || mx == mouse[0] && my == mouse[1])
        return;
    mouse[0] = my;
    mouse[1] = mx;
};

function draw() {
    var tx=0,ty=0;
    var dt = 1E-3 * (new Date().getTime() - startTime);
    startTime = new Date().getTime();
    time += dt;
    //put canvas with white color
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    //put an image over other
    //ctx.globalCompositeOperation = 'source-over';
    //draw a rect in position 0,0 with canvas with and height
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     //ctx.fillRect(0, 0, 100,100);
    /**
     * drawing and animation
     **/
    var t = (time % (numOfFrames / fps));
    var animationIndex = Math.floor(fps * t);
    var animationFrame = animationImg[animationIndex];
    if(animationFrame.isReady) {
        //ctx.drawImage(animationFrame,mouse[1]-100,mouse[0]-100,200,200);
		pos=Follow(dt);
        x=pos[0];
        y=pos[1];
		//console.log("x: "+x+"  y: "+y)
        console.log(window.innerWidth);
        tx=200/window.innerWidth;
        ty=200/window.innerHeight;
		ctx.drawImage(animationFrame,x-100,y-100,window.innerWidth*tx,window.innerHeight*ty);
    }
    /**
    *
    **/
    //ctx.drawImage(animationFrame,0,0);
    ctx.fillStyle = "black";
     ctx.font = "bold 16px Arial";
    ctx.fillText("x : " + mouse[1] +  " y: " + mouse[0], mouse[1], mouse[0]);
//     var myRectangle = {
//        x: 0,
//        y: 75,
//        width: 100,
//        height: 50,
//        borderWidth: 5
//    };
    //drawRectangle(myRectangle, ctx);
    requestAnimationFrame(draw);
}

function Nextpos(){
			var inc_x =2;
			var inc_y =2; 
			
			if(x>=canvas.width ){ inc_x=-10;positivex=0}
			if(x<=  0 ) {inc_x=+10;positivex=1}
			if(y>=canvas.height ) {inc_y=-10;positivey=0}
			if(y<=  0 ) {inc_y=+10;positivey=1}
			console.log("incx0: "+inc_x);
			console.log("incy0: "+inc_y);
			if(positivex==1){
				if(inc_x<0)
					inc_x=-inc_x;
			}
			if(positivey==1){
				if(inc_y<0)
					inc_y=-inc_y;
			}
			if(positivex==0){
				if(inc_x>0)
					inc_x=-inc_x;
			}
			if(positivey==0){
				if(inc_y>0)
					inc_y=-inc_y;
			}
			console.log("incx: "+inc_x);
			console.log("incy: "+inc_y);
			x+=inc_x;
			y+=inc_y;
			 pos[0]=x;
			 pos[1]=y;
			// console.log(pos[0]);
			return pos;
		}

function Follow(dt){
    var inc_x =2;
    var inc_y =2; 
    var dirx=0,diry=0;
    dirx=mouse[1]-x;
    diry=mouse[0]-y;
//    if(diry<0)
//        inc_y=-inc_y;
//    if(diry==0)
//        inc_y=0;
//    if(dirx<0)
//        inc_x=-inc_x;
//    if(dirx==0)
//        inc_x=0;
    
//    x+=inc_x;
//    y+=inc_y;
    x+=Math.floor(dirx*0.1);
    y+=Math.floor(diry*0.1);
    pos[0]=x;
    pos[1]=y;
    // console.log(pos[0]);
	return pos;
    
}
function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        //context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
}
function fullscreen(){
           var el = document.getElementById('c');
            el.width=window.innerWidth;
            el.height=window.innerHeight;
 
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }            
}
/**
*  Main
**/

init()
canvas.addEventListener("click",fullscreen);      
requestAnimationFrame(draw);
