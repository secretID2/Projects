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
var x=0,y=0,pos=[],positivey=1,positivex=1;
var animationLib=[];
var buttonList=[];
var menu1;
var swipe_left=false;
var b1;
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
//    var address = "canvasTest/idle/p0.txt";var finalAddress=address;
//    numOfFrames=readTextFile(address);
//    address="canvasTest/idle/p";
//    for(var i = 0; i<numOfFrames; i++) {
//         finalAddress = address+(i+1)+".png";
//        animationImg[i] = loadImage(finalAddress);
//    }
//    animationLib.push(animationImg);
//    animationImg=[];
//     address = "canvasTest/attack1/p0.txt"; finalAddress=address;
//        numOfFrames=readTextFile(address);
//        address="canvasTest/attack1/p";
//        for(var i = 0; i<numOfFrames; i++) {
//            finalAddress = address+(i+1)+".png";
//            animationImg[i] = loadImage(finalAddress);
//     }
//    animationLib.push(animationImg);
//     animationImg=[];
    get_all_animations();
    
    
    
    
    startTime = new Date().getTime();
    width = canvas.width;
    height = canvas.height;
    mouse = [0,0];
    
    
    var f = new Function('name', 'console.log("Entrei no butao 1")');
    var f2=new Function('name', 'console.log("Entrei no butao 22")');
    var f3=new Function('name', ' for(var i = 0; i<numOfFrames; i++) {animationImg[i] = animationLib[1][i];ctx.drawImage(animationImg[i],0,0,200,200);}');
    var f5=new Function('','swipe_left=true');
    //var ani=new animation(animationLib[0],25,ctx);
    var f6=new Function('','var ani=new animation(animationLib[0],25,ctx);ani.draw();');
    buttonList.push(new Button(50,50,"red","blue",2,f,0,0,ctx, "Ola","black",false,true));
    buttonList.push(new Button(50,50,"green","blue",2,f2,400,200,ctx, "Ola1","black",false,false));
     buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola2","red",false,false));
    buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola3","red",false,false));
    buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola4","red",false,false));
    buttonList.push(new Button(50,50,"orange","red",2,f3,300,200,ctx, "Ola5","grey",false,false));
    buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola6","purple",false,false));
    buttonList.push(new Button(50,50,"purple","red",2,f3,300,200,ctx, "Ola7","yellow",false,false));
    buttonList.push(new Button(50,50,"red","red",2,f3,300,200,ctx, "Ola8","green",false,false));
    buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola9","green",false,false));
     buttonList.push(new Button(50,50,"blue","red",2,f3,300,200,ctx, "Ola10","green",false,false));
    buttonList.push(new Button(50,50,"yellow","red",2,f6,300,200,ctx, "Ola11","green",false,true));
    b1=new Button(50,50,"purple","green",2,f5,100,100,ctx,"swipe","green",true,false);
//    
//    //var menu1=menu(200,200,"red","green",500,500,2,buttonList);
//    //var f4=new Function("buttonList", 'menu(200,200,"red","green",500,500,2,buttonList)');
    var f4=function(){menu(200,200,"red","green",700,500,2,buttonList)};
   //menu1=new Button(50,50,"grey","purple",2,f4,600,600,ctx,"menu","green",true);
    menu1=new menu3(buttonList);
//    menu1.drawButton();
    
    //buttonList[0].drawButton();
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


function menu(x,y,color,borderColor,width,height,borderWidth,buttonList){
    var firstline=false; 
    var width2=(width*0.8)/5;
    var height2=(height*0.6)/2;
    var myRectangle = {
        x: x,
        y: y,
        width: width,
        height:height ,
        borderWidth: borderWidth,
        borderColor:borderColor,
        backColor: color
    };
    //
    
    var triangleup={
        p1: [x+width-0.1*width,y],
        p2: [x+width-0.2*width,y+0.9*height2],
        p3: [x+width,y+0.9*height2],
        borderWidth: borderWidth
    };
    
    var triangled={
        p1: [x+width-0.1*width,y+2*height2],
        p2: [x+width-0.2*width,y+1.10*height2],
        p3: [x+width,y+1.10*height2],
        borderWidth: borderWidth
    };
    var aux=[];
    var slice_index=0;
    if(buttonList.length>10){
        aux=buttonList.slice(0,9);
        slice_index=8;
    }
    
     //triangleup contact
//     if(mouse[1]>=x+width2 && mouse[1]<=x+width && mouse[0]>=y && mouse[0]<=y+0.9*height2 && buttonList>10){
//        for(var a=0;a<buttonList)
//     }
    
    
    
    
    drawRectangle(myRectangle,ctx);
    
    drawTriangle(triangleup,ctx);
    drawTriangle(triangled,ctx);
    
    ctx.rotate(Math.PI/(2));
     ctx.fillStyle = "black";
     ctx.font = "bold "+Math.round(Math.min(width,height)*0.1)+"px Arial";
     //ctx.fillText("Exit",y+0.8*height,-x+width-0.1*width);
    ctx.fillText("Exit",y+height*0.7,-x-width*0.88);
    ctx.rotate(-Math.PI/(2));
    

       
            for(var j=0;j<buttonList.length &&j<10 ;j++){
                if(j==5){
                    firstline=true;
                }
                if(!firstline){
                   
                    
                        var button=buttonList[j];
                        button.posx=myRectangle.x+width2*j;
                        button.posy=myRectangle.y;
                        button.width=width2;
                        button.height=height2;
                        ctx.globalCompositeOperation = 'source-over';
                        button.drawButton();
                       
                }
                
                else{
                    
                    var button=buttonList[j];
                    button.posx=myRectangle.x+width2*(j-5);
                    button.posy=myRectangle.y+height2;
                    button.width=width2;
                    button.height=height2;
                    ctx.globalCompositeOperation = 'source-over';
                    button.drawButton();
                    if((j-5)==5){
                        
                        break;
                    }

                }
                
            }
        

}
    
    
    
function menu2(buttonList){
    var aux=[];
    var start_index=0;
    var final_index;
    var quotient,remainder
    var swipe_counter;
    quotient=buttonList.length/10;
    remainder=buttonList.length%10;
    swipe_counter=quotient;
    if(quotient>0){
        final_index=9;
    }
    else{
        final_index=remainder-1;
    }
    if(swipe_left){
        
//        if(quotient>1){
//            if(final_index<buttonList.length-1){
//                start_index=final_index+1;
//                final_index+=remainder-1;
//            }
//            else{
//                
//            }
        
            if(swipe_counter>1){
                start_index=final_index+1;
                final_index+=10;
                swipe_counter--;
                
            }
            if(swipe_counter==1){
                start_index=final_index+1;
                final_index+=remainder-1;
                swipe_counter--;
            }
            if(swipe_counter==0){
                start_index=0;
                 if(quotient>0){
                    final_index=9;
                }
                else{
                    final_index=remainder-1;
                }
            }
            
        
        }
            
        
    }



    


function menu3(buttonList){
   
    this.numOfVisibleButtons = 5;
    this.start_index = 0;
    this.final_index = (this.start_index + this.numOfVisibleButtons) % buttonList.length;
    this.x = 0;
    this.y = Math.round(window.innerHeight * 0.9);
    this.width = Math.round(window.innerWidth / 10);
    this.height = Math.round(0.1 * window.innerHeight);
    
    this.drawMenu=function() {
        for(var j = 0; j < this.numOfVisibleButtons; j++) {
            var button = buttonList[(this.start_index + j) % buttonList.length];
            button.posx = this.x + this.width * j;
            button.posy = this.y;
            button.width = this.width;
            button.height = this.height;
            button.drawButton();
        }
    }
    
    
    this.checkSwipe = function() {
        if(swipe_left) {
            this.start_index = (this.start_index + this.numOfVisibleButtons) % buttonList.length;
            this.final_index = (this.final_index + this.numOfVisibleButtons) % buttonList.length;
        }        
    }
}
    
function animation(imgSeq,fps,context){
    this.startTime=0;
    this.fps=fps;
    this.ctx=context;
    this.time=0;
    this.sequence=[];
    this.sequence=imgSeq;
    this.dt=0;
    this.index=0;
    
    
    
    this.draw=function(){
        
        
        //this.startTime = new Date().getTime();
        
            this.dt = 1E-3 * (new Date().getTime() - this.startTime);
            this.startTime = new Date().getTime();
            this.time += this.dt;
            this.index=Math.floor((this.time*this.fps))%this.sequence.length;
            
            var frame = this.sequence[this.index];
            if(frame.isReady){
                this.ctx.drawImage(frame,window.innerWidth*0.5,window.innerHeight*0.5,200,200); 
            }
            
        
        
        this.time=0;
        this.dt=0;
        this.index=0;
        this.startTime=0;
    
    
}
}    
    

function draw() {
    
    
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    console.log(swipe_left);
    if(down == true && (mouse[1] == 0 ||(mouse[1] < canvas.width - 0.85 * canvas.width))) {
        var address = "canvasTest/attack1/p0.txt";var finalAddress=address;
        numOfFrames=readTextFile(address);
        address="canvasTest/attack1/p";
        for(var i = 0; i<numOfFrames; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
             ctx.fillRect(0, 0, canvas.width, canvas.height);
            animationImg[i] = animationLib[1][i];
            ctx.drawImage(animationImg[i],0,0,200,200);
        }
    } else {
        var address = "canvasTest/idle/p0.txt";
        var finalAddress = address;
        numOfFrames = readTextFile(address);
        address = "canvasTest/idle/p";
        for(var i = 0; i < numOfFrames; i++) {
            animationImg[i] = animationLib[0][i];
        }
    }

    var tx = 0,ty = 0;
    var dt = 1E-3 * (new Date().getTime() - startTime);
    startTime = new Date().getTime();
    time += dt;
    
    //put canvas with white color
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    //put an image over other
    //ctx.globalCompositeOperation = 'source-over';
    //draw a rect in position 0,0 with canvas with and height
    ctx.fillRect(0, 0, canvas.width, canvas.height);
     //ctx.fillRect(0, 0, 100,100);
    //buttonList[0].drawButton();
    b1.drawButton();
    menu1.checkSwipe();
    menu1.drawMenu();
    swipe_left=false;
    
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
    x+=Math.floor(dirx*dt);
    y+=Math.floor(diry*dt);
    pos[0]=x;
    pos[1]=y;
    // console.log(pos[0]);
	return pos;
    
}

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
