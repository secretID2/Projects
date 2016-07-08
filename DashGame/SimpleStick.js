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
var size=0.17;
var finalindex=0;
var num_ememies=5;
var enemies=[];


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
   var address = "img/p0.txt";
    numOfFrames=readTextFile(address);
    address="img/p";
    for(var i = 0; i < numOfFrames; i++) {
        var finalAddress = address+(i+1)+".png";
        animationImg[i] = loadImage(finalAddress);
    }
    startTime = new Date().getTime();
    width = canvas.width;
    height = canvas.height;
    mouse = [0,0];
    
    for(var i=0;i<num_ememies;i++){
        enemies[i]=new createEnemy();
    }
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
    
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
   
    var dt = 1E-3 * (new Date().getTime() - startTime);
    startTime = new Date().getTime();
    time += dt;
   
    //put canvas with white color
    //ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    //put an image over other
    //ctx.globalCompositeOperation = 'source-over';
    //draw a rect in position 0,0 with canvas with and height
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
     //ctx.fillRect(0, 0, 100,100);
    /**
     * drawing and animation
     **/
    var t = (time % (numOfFrames / fps));
    var animationIndex = Math.floor(fps * t);
    var animationFrame = animationImg[animationIndex];
    pos=Follow(dt);
        x=pos[0];
        y=pos[1];
        animationFrame = animationImg[pos[2]];
    if(animationFrame.isReady) {
        //ctx.drawImage(animationFrame,mouse[1]-100,mouse[0]-100,200,200);
		
		//console.log("x: "+x+"  y: "+y)
        //console.log(window.innerWidth);
        if(pos[2]==4  || pos[2]==8 || pos[2]==6 || pos[2]==5){
            ctx.globalAlpha = 0.5;
            ctx.drawImage(animationFrame,(x-size*canvas.width/2)-pos[3],(y-size*canvas.height/2)-pos[4],size*canvas.width,size*canvas.height);
		    ctx.globalAlpha = 0.3;
            ctx.drawImage(animationFrame,(x-size*canvas.width/2)-pos[3]*2,(y-size*canvas.height/2)-pos[4]*2,size*canvas.width,size*canvas.height);
            ctx.globalAlpha = 0.2;
            ctx.drawImage(animationFrame,(x-size*canvas.width/2)-pos[3]*2.5,(y-size*canvas.height/2)-pos[4]*2.5,size*canvas.width,size*canvas.height);
		    ctx.globalAlpha = 0.1;
            ctx.drawImage(animationFrame,(x-size*canvas.width/2)-pos[3]*3,(y-size*canvas.height/2)-pos[4]*3,size*canvas.width,size*canvas.height);
            
        }
        ctx.globalAlpha = 1.0;
        ctx.drawImage(animationFrame,x-size*canvas.width/2,y-size*canvas.height/2,size*canvas.width,size*canvas.height);
        
    }
    /**
    *
    **/
    //ctx.drawImage(animationFrame,0,0);
    //MakeEnemy();
//    ctx.fillStyle = "black";
//     ctx.font = "bold 16px Arial";
//    ctx.fillText("x : " + mouse[1] +  " y: " + mouse[0], mouse[1], mouse[0]);
    MoveEnemies();
    requestAnimationFrame(draw);
}
function MoveEnemies(){
   for(var i=0;i<num_ememies;i++){
       if(!enemies[i].active){
           enemies[i]=new createEnemy();
           drawRectangle(enemies[i],ctx);
       }
       else{
           enemies[i].x+=enemies[i].dirx;
           enemies[i].y+=enemies[i].diry;
           drawRectangle(enemies[i],ctx);
           if(enemies[i].x<=0 || enemies[i].x>=canvas.width || enemies[i].y<=0 || enemies[i].y>=canvas.height){
               enemies[i].active=false;
           }
       }
   }
}
function  createEnemy(){
    var ran=Math.round(Math.random()*3);
    if(ran==0){
      this.x=0;
      this.y=Math.random()*canvas.height;   
      this.dirx=Math.random()*canvas.width*0.01;
      this.diry=Math.random()*canvas.height*0.01;
    }
    if(ran==1){
      this.x=canvas.width;
      this.y=Math.random()*canvas.height;   
      this.dirx=Math.random()*-canvas.width*0.01;
      this.diry=Math.random()*-canvas.height*0.01;
    }
    if(ran==2){
      this.x=Math.random()*canvas.width;
      this.y=canvas.height;   
        this.dirx=Math.random()*-canvas.width*0.01;
      this.diry=Math.random()*-canvas.height*0.01;
    }
    if(ran==3){
      this.x=Math.random()*canvas.width;
      this.y=0;    
        this.dirx=Math.random()*canvas.width*0.01;
      this.diry=Math.random()*canvas.height*0.01;
    }
    //this.x=Math.random()*canvas.width;
    //this.y=Math.random()*canvas.height;
    //this.dirx=Math.random()*10;
    //this.diry=Math.random()*10;
    this.width=canvas.width*0.03;
    this.height=canvas.width*0.03; 
    this.active=true;    
    
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
//    if(dirx>300 || diry>300 || dirx<-300 || diry<-300 ){
//        if(dirx>0)
//            dirx=300;
//        else
//            dirx=-300;
//        if(diry>0)
//            diry=300;
//        else
//            diry=-300;
//        
//    }
    x+=Math.floor(dirx*0.1)/2;
    y+=Math.floor(diry*0.1)/2;
    
    console.log("dirx:"+dirx);
    console.log("diry:"+diry);
    pos[0]=x;
    pos[1]=y;
    if(dirx>40 && (diry/dirx)<=1 && (diry/dirx)>=-1){
        pos[2]=4;
        finalindex=2;
        pos[3]=dirx/10;
        pos[4]=diry/10;
    }
     else if(dirx<-40 && (diry/dirx)<=1 && (diry/dirx)>=-1){
        pos[2]=5;
         finalindex=3;
         pos[3]=dirx/10;
         pos[4]=diry/10;
    }
    else if(diry>40){
        pos[2]=8;
        finalindex=0;
        pos[3]=dirx/10;
        pos[4]=diry/10;
    }
    else if(diry<-40){
        pos[2]=6;
        finalindex=1;
        pos[3]=dirx/10;
        pos[4]=diry/10;
    }
    else{
        
        pos[2]=finalindex;    
    }// console.log(pos[0]);
	return pos;
    
}
function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        //context.fillStyle = '#8ED6FF';
        context.fill();
//        context.lineWidth = myRectangle.borderWidth;
//        context.strokeStyle = 'black';
//        context.stroke();
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //alert(allText);
                //return parseInt(allText);
            }
        }
    }
    rawFile.send(null);
    return parseInt(rawFile.responseText);
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
