/**
 * Setup
 */
var canvas = document.getElementById('c');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var ctx = canvas.getContext('2d');
var down = false;
var animationImg = [];
var animationV=[];
var startTime;
var width, height;
var mouse;
var fps = 25;
var time = 0;
var numOfFrames = 0;
//var x=0,y=0,pos=[],positivey=1,positivex=1;
var animationLib=[];
var buttonList=[];
var menu1;
var swipe_left=false;
var b1;
var ani;
var aniSeq;
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

    get_all_animations();
    
    
//    ani=new animation(animationLib[1],2,ctx);
//    animationV.push(ani);
    ani=new animation(animationLib[0],25,ctx);
    animationV.push(ani);
    ani=new animation(animationLib[3],25,ctx);
    animationV.push(ani);
    ani=new animation(animationLib[2],25,ctx);
    animationV.push(ani);
    var timeTable=[];
//    timeTable.push(1);
//    timeTable.push(1);
    timeTable.push(2);
    timeTable.push(1/*(1/animationV[1].fps)*animationV[1].sequence.length*/);
    timeTable.push(((1/animationV[2].fps)*animationV[2].sequence.length));
    var sizeVec=[];
    var size=[];
    size[0]=300;
    size[1]=300;
    sizeVec.push([200,200]);
    sizeVec.push([200,200]);
//    sizeVec.push([250,250]);
//   size[0]=100;
//    size[1]=100;
    sizeVec.push([200,200]);
    
    var moveVec=[];
    
    var move0=new move1([100,100],[100,100],2); 
    moveVec.push(move0);
    move0=new move1([100,100],[700,100],1);
    moveVec.push(move0);
    move0=new move1([700,100],[700,100],(1/animationV[1].fps)*animationV[2].sequence.length);
    moveVec.push(move0);
    aniSeq=new sequence(animationV,timeTable,sizeVec,moveVec);
    
    startTime = new Date().getTime();
    width = canvas.width;
    height = canvas.height;
    mouse = [0,0];
    x=0;y=0;
    
    
   
}
function get_all_animations(){
    var s=new String();
    var adress="canvasTest/p0.txt";
    s=readTextFile2(adress);
    var saux=s.split(";");
    var adressArray=[];
    var i=0,j=0;
    for (i=0;i<saux.length;i++){
        adressArray.push("canvasTest/"+saux[i]+"");
        
    }
    for(i=0;i<adressArray.length;i++){
        adress=adressArray[i]+"/p0.txt";
        var numOfFrames=readTextFile(adress);
        adress=adressArray[i]+"/p";
        var finalAdress=adress;
        for(var j = 0; j<numOfFrames; j++) {
            finalAdress = adress+(j+1)+".png";
            animationImg[j] = loadImage(finalAdress);
        }
         animationLib.push(animationImg);
         animationImg=[];
        
    }
}
function Button(width,height,backColor,borderColor,borderwidth,action,posx,posy,context,text,textColor,instant,
permanent){
    this.width=width;
    this.height=height;
    this.backColor=backColor
    var ctx=context;
    this.borderColor=borderColor;
    this.posx=posx;
    this.posy=posy;
    this.borderWidth=borderwidth;
    this.instant=instant;
    this.permanent=permanent;
    this.touch=0;
//   var myRectangle = {
//        x: this.posx,
//        y: this.posy,
//        width: this.width,
//        height:this.height ,
//        borderWidth: this.borderWidth,
//        borderColor:this.borderColor,
//        backColor: this.backColor
//    };
    //drawRectangle(myRectangle,ctx);
    
    
    //console.log(this.touch);
    
    
    
    
    
   this.drawButton= function () {
        context.beginPath();
        context.rect(this.posx, this.posy, this.width, this.height);
        context.fillStyle = this.backColor;
        context.fill();
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor;
        context.stroke();
  
        ctx.fillStyle = textColor;
        var text_size=Math.round(Math.min(this.width,this.height)*0.3);
        ctx.font = "bold "+text_size+"px Arial";
        ctx.fillText(text, this.posx+this.width/4, this.posy+this.height/2);
       
       
       if(this.permanent && this.touch==1){
           action();
           //console.log("Entrou onde Quero!!!!!!!");
       }
       
       
       
       if(mouse[1]>=this.posx/*-this.width/2*/ && mouse[1]<=this.width+this.posx/*-this.width/2*/ && mouse[0]>=this.posy/*-this.height/2*/ && mouse[0]<=this.height+this.posy/*-this.height/2*/){
            //action();
           if(this.permanent){
                this.touch=1-this.touch;
                mouse[0]=0;
                mouse[1]=0;
                //console.log(this.touch);
           }
           if(this.instant){
               action();
               mouse[0]=0;
               mouse[1]=0;
           }
           else{action();}
           
        }
          
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


    
function animation(imgSeq,fps,context){
    this.startTime=0;
    this.fps=fps;
    this.ctx=context;
    this.time=0;
    this.sequence=[];
    this.sequence=imgSeq;
    this.dt=0;
    this.index=0;
    this.first=0;
    this.finish=false;
    
    
    
    this.draw=function(x,y,sx,sy){
        
        
        //this.startTime = new Date().getTime();
            if(this.first==0){
                this.startTime=new Date().getTime();
                this.first=1;
            }
        
            this.dt = 1E-3 * (new Date().getTime() - this.startTime);
            this.startTime = new Date().getTime();
            this.time += this.dt;
            //console.log(this.time);
            this.index=Math.floor((this.time*this.fps))%(this.sequence.length);
            //console.log(this.index);
                       
             
            var frame = this.sequence[this.index];
            if(frame.isReady ){
                this.ctx.drawImage(frame,x,y,sx,sy); 
            }
            
//            if(this.time>=(1/this.fps)*this.sequence.length ){
//                     this.finish=true;
//                     //time=0;
//                     //setInterval(this.setFinish(true), 300);
//            }
       
    
}
    
    
    this.getTime=function(){
        return this.time;
    }
    this.init=function(){
        this.first=0;
        this.finish=false;
        this.time=0;
    }
    this.getFinish=function(){
        return this.finish;
    }
    this.setFinish=function(val){
        this.finish=val;
    }
    this.setFirst=function(val){
        this.first=val;
    }
    
}    

function sequence(animation_seq,time_table,size_vec,move_vec){
    this.index=0;
    this.animationSeq=animation_seq;
    this.timeTable=time_table;
    this.moveVec=move_vec;
    var i=0;
    this.setIndex=function(val){
        this.index=val;
    }
    this.x=0;
    this.y=0;
    this.pos=[];
//    this.pos[0]=this.x;
//    this.pos[1]=this.y;
    this.sx=0;
    this.sy=0;
    this.sizeVec=size_vec;
    this.size=[];//0=sx;1=sy;
     
    this.play=function(){
            this.size=this.sizeVec[this.index];
            //console.log(this.size[0]);
           this.pos=this.moveVec[this.index].nextPos(this.animationSeq[this.index].getTime());
            this.animationSeq[this.index].draw(this.pos[0],this.pos[1],this.size[0],this.size[1]);
            
            //this.animationSeq[this.index].draw(100,100,200,200);
//            if(this.timeTable[this.index]==0 ){
//                if(this.animationSeq[this.index].getFinish()){
//                    
////                    setInterval(function(){this.animationSeq[this.index].init();this.index++;this.index%=(this.animationSeq.length);alert("hello");},(1/this.animationSeq[this.index].fps)*1000);
//                        
//                    
//                    this.animationSeq[this.index].init();              
//                    this.index++;
//                    this.index%=(this.animationSeq.length);
//                }
//                
//            }
//            else{
                if(this.animationSeq[this.index].getTime()>=this.timeTable[this.index]/*-0.01*/-(1/this.animationSeq[this.index].fps)*0.25){
                    this.animationSeq[this.index].init();              
                    this.index++;
                    this.index%=(this.animationSeq.length);
                }
//            }
        }
    
    
}


//function move(position,calcFunction){
//    
////    0=x;1=y;
//    calcFunction(position[0],position[1]);
//    return position;
//}

//time in miliseconds. time the movement takes.
function move1(position,finalPos,time){
    this.disx,this.disy,this.x,this.y;
    this.x=position[0];
    this.y=position[1];
    this.disx=finalPos[0]-this.x;
    this.disy=finalPos[1]-this.y;
    this.beginingPos=[];
    this.beginingPos[0]=this.x;
    this.beginingPos[1]=this.y;
    
    this.position=position;
//    this.dontMove=false;
//    if(position[0]==finalPos[0] && position[1]==finalPos[1]){
//        this.dontMove=true;
//    }
        
            //this.mx=this.disx/time;
            this.mx=this.disx/time;
        
            this.my=this.disy/time;
    
    
   
    this.nextPos=function(actual_time){
            
            this.x=this.mx*actual_time+this.beginingPos[0];
            
            this.y=this.my*actual_time+this.beginingPos[1];
            
            this.position[0]=this.x;
            this.position[1]=this.y;
            return this.position;
        
            
    }
    
}

function draw() {
    
    
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    

    var tx = 0,ty = 0;
    var dt = 1E-3 * (new Date().getTime() - startTime);
    startTime = new Date().getTime();
    time += dt;
    //console.log(time)
    //put canvas with white color
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    //put an image over other
    //ctx.globalCompositeOperation = 'source-over';
    //draw a rect in position 0,0 with canvas with and height
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     //ctx.fillRect(0, 0, 100,100);
    //buttonList[0].drawButton();
//    Nextpos();
//    x=pos[0];
//    y=pos[1];
    //ani.draw(100,100);
    aniSeq.play();
    
    /**
     * drawing and animation
     **/
//     var myRectangle = {
//        x: 0,
//        y: canvas.height-(1/4)*canvas.height,
//        width: canvas.width,
//        height:(1/4)*canvas.height ,
//        borderWidth: 2
//    };
//    drawRectangle(myRectangle, ctx);
    //var t = (time % (numOfFrames / fps));
    //var animationIndex = Math.floor(fps * t);
//    var animationFrame = animationImg[animationIndex];
//    var animationFramv = animationV[animationIndex];
//    if(animationFrame.isReady) {
////       tx=200/window.innerWidth;
////        ty=200/window.innerHeight;
//        //console.log(window.innerWidth/200);
//		ctx.drawImage(animationFrame,(((0.3)*canvas.width)),((0.3)*canvas.height),(0.3)*canvas.width,(0.3)*canvas.height);
//
//    }
    
    /**
    *
    **/
    //ctx.drawImage(animationFrame,0,0);
    ctx.fillStyle = "black";
     ctx.font = "bold 16px Arial";
    ctx.fillText("x : " + mouse[1] +  " y: " + mouse[0], mouse[1], mouse[0]);
    
//   ctx.fillStyle = "white";
//    var textsize=((Math.min(canvas.height,canvas.width))*0.05);
//    
//     ctx.font = "bold "+textsize+"px Arial";
//    ctx.fillText("Attack1", canvas.width-0.98*canvas.width, canvas.height-0.1*canvas.height);
//    //console.log(canvas.width-0.9*canvas.width);
//     ctx.font = "bold "+textsize+"px Arial";
//    ctx.fillText("Attack2", canvas.width-0.85*canvas.width, canvas.height-0.1*canvas.height);
//    //console.log(canvas.width-0.9*canvas.width);
//    ctx.fillText("Attack3", canvas.width-0.72*canvas.width, canvas.height-0.1*canvas.height);
//    //console.log(canvas.width-0.9*canvas.width);
//    //ctx.fillText("Attack1", 146, 575);
//    var triangler={
//        p1:[canvas.width-((1/20)*canvas.width),canvas.height-((1/8)*canvas.height)],
//        p2: [canvas.width-((1/20)*canvas.width)-0.1*canvas.width,canvas.height-((1/8)*canvas.height)+0.1*canvas.height],//canvas.height-((1/4)*canvas.height),
//        p3: [canvas.width-((1/20)*canvas.width)-0.1*canvas.width,canvas.height-((1/8)*canvas.height)-0.1*canvas.height],//canvas.width,
//        borderWith:4
//    };
//    var trianglel={
//        p1:[canvas.width-((1/3)*canvas.width),canvas.height-((1/8)*canvas.height)],
//        p2: [canvas.width-((1/3)*canvas.width)+0.1*canvas.width,canvas.height-((1/8)*canvas.height)+0.1*canvas.height],//canvas.height-((1/4)*canvas.height),
//        p3: [canvas.width-((1/3)*canvas.width)+0.1*canvas.width,canvas.height-((1/8)*canvas.height)-0.1*canvas.height],//canvas.width,
//        borderWith:4
//    };
//    drawTriangle(triangler, ctx);
//    drawTriangle(trianglel, ctx);
    requestAnimationFrame(draw);
}

//function Nextpos(){
//			var inc_x =2;
//			var inc_y =2; 
//			
//			if(x>=canvas.width ){ inc_x=-10;positivex=0}
//			if(x<=  0 ) {inc_x=+10;positivex=1}
//			if(y>=canvas.height ) {inc_y=-10;positivey=0}
//			if(y<=  0 ) {inc_y=+10;positivey=1}
////			console.log("incx0: "+inc_x);
////			console.log("incy0: "+inc_y);
//			if(positivex==1){
//				if(inc_x<0)
//					inc_x=-inc_x;
//			}
//			if(positivey==1){
//				if(inc_y<0)
//					inc_y=-inc_y;
//			}
//			if(positivex==0){
//				if(inc_x>0)
//					inc_x=-inc_x;
//			}
//			if(positivey==0){
//				if(inc_y>0)
//					inc_y=-inc_y;
//			}
//			console.log("incx: "+inc_x);
//			console.log("incy: "+inc_y);
//			x+=inc_x;
//			y+=inc_y;
//			 pos[0]=x;
//			 pos[1]=y;
//			// console.log(pos[0]);
//			return pos;
//		}
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

function readTextFile2(file)
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
    return rawFile.responseText;
}

//function Follow(dt){
//    var inc_x =2;
//    var inc_y =2; 
//    var dirx=0,diry=0;
//    dirx=mouse[1]-x;
//    diry=mouse[0]-y;
////    if(diry<0)
////        inc_y=-inc_y;
////    if(diry==0)
////        inc_y=0;
////    if(dirx<0)
////        inc_x=-inc_x;
////    if(dirx==0)
////        inc_x=0;
//    
////    x+=inc_x;
////    y+=inc_y;
//    x+=Math.floor(dirx*dt);
//    y+=Math.floor(diry*dt);
//    pos[0]=x;
//    pos[1]=y;
//    // console.log(pos[0]);
//	return pos;
//    
//}

//function drawRectangle(myRectangle, context) {
//        context.beginPath();
//        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
//        context.fillStyle = '#8ED6FF';
//        context.fill();
//        context.lineWidth = myRectangle.borderWidth;
//        context.strokeStyle = 'black';
//        context.stroke();
//}
function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = myRectangle.backColor;
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = myRectangle.borderColor;
        context.stroke();
}
function drawTriangle(myTriangle, context){
    
    context.beginPath();
    context.moveTo(myTriangle.p1[0],myTriangle.p1[1]);
    context.lineTo(myTriangle.p2[0],myTriangle.p2[1]);
    context.lineTo(myTriangle.p3[0],myTriangle.p3[1]);
    context.fillStyle='white';
    context.fill();
    //context.lineWidth = myTriangle.borderWidth;
    //context.strokeStyle = 'white';
    //context.stroke();
    //context.globalCompositeOperation = 'source-over';
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
//canvas.addEventListener("click",fullscreen);      
requestAnimationFrame(draw);
