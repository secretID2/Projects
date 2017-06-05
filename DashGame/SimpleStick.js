/**
 * Setup
 */
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var down = false;
var animationImg = [];
var startTime;
var startScore;
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
var state=0;
var score=0;
var lives=100,last_live=lives;
var first_time=0;
if(localStorage.getItem("DashGame")==null){
    localStorage.setItem("DashGame",score);
}
var choose_enemies=1,choose_lives=1;
var visible=true;
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
	canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchmove", mouseMove,false);
    document.addEventListener("keydown", keyDown, false);
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
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
    var audio = new Audio('NieR_Automata_Boss_Battle_Theme.mp3');
    audio.play();
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

function touchMove(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = (e.touches[0].clientX - rect.left), my = (e.touches[0].clientY - rect.top);
    if (!down || mx == mouse[0] && my == mouse[1])
        return;
    mouse[0] = my;
    mouse[1] = mx;
}


function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left), my = (e.clientY - rect.top);
    if (!down || mx == mouse[0] && my == mouse[1])
        return;
    mouse[0] = my;
    mouse[1] = mx;
	 
	 
}

function draw() {
    
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
   if(state==1){
       first_time++;
    var dt = 1E-3 * (new Date().getTime() - startTime);
    startTime = new Date().getTime();
    time+=dt; 
    
       if(first_time==1){
           //startScore=new Date().getTime();
           time=0;
       }
     
       var text_size=Math.min(canvas.width,canvas.height)*0.025;
        ctx.font = "bold "+text_size+"px Arial";  
      //score=Math.round(time);
       ctx.fillStyle="black";
       ctx.fillText("Score: "+Math.round(time),0.9*canvas.width,0.1*canvas.height);
       //GenerateNumberEnemies(time);
       
//       if(!visible){   
//            console.log("Escondido!");
//            score+=Math.round(new Date().getTime() - startScore);
//        }
//       else{
//            console.log("Visivel!");
//            startScore=new Date().getTime();
//       }
//    if(isHidden()!=false){   
//        console.log("Escondido!");
//       
//    }
//       else{
//            console.log("Visivel!");
//            time += dt;
//       }
//    if (typeof document.webkitHidden !== "undefined") {
//        console.log("Escondido!");
//    }
//    else{
//           console.log("Visivel!");
//            time += dt;
//    }
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
    if(x>canvas.width || x<0 || y>canvas.height || y<0){            
            mouse[0]=0;
            mouse[1]=0;    
            x=0;
            y=0;
        }
    else{
        pos=Follow(dt);
        x=pos[0];
        y=pos[1];
    }
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
        //ctx.drawImage(animationFrame,x-size*canvas.width/2,y-size*canvas.height/2,size*canvas.width,size*canvas.height);
        ctx.drawImage(animationFrame,x-size*canvas.width/2,y-size*canvas.height/2,size*canvas.width,size*canvas.height);
        //ctx.drawImage(animationFrame,x,y,size*canvas.width,size*canvas.height);
        
    }
    /**
    *
    **/
    //ctx.drawImage(animationFrame,0,0);
    //MakeEnemy();
//    ctx.fillStyle = "black";
//     ctx.font = "bold 16px Arial";
//    ctx.fillText("x : " + x +  " y: " + y, mouse[1], mouse[0]);
//    var myrect={
//            x:500,
//            y:500,
//            with:size*canvas.width,
//            height:size*canvas.height
//            
//        }
//       drawRectangle(myrect,ctx);
//    var maxwh=Math.max(canvas.width,canvas.height);
//    var enemywidth=maxwh*0.03;
//    
//    var enemyheight=maxwh*0.03; 
//    ctx.rect(x-enemywidth/2, y-enemyheight/2, enemywidth,enemyheight);
//    ctx.stroke();
//    ctx.beginPath();
//        ctx.rect(myrect.x, myrect.y, myrect.width, myrect.height);
//        //context.fillStyle = '#8ED6FF';
//        ctx.fill();
    MoveEnemies();
   }
    else{Menu();}
     //debug
//     ctx.fillStyle = "black";
//    ctx.font = "bold 16px Arial";
//    ctx.fillText("tempo: "+time, 0.9*canvas.width, 0.9*canvas.height);
//    ctx.fillText("dt: "+dt, 0.8*canvas.width, 0.9*canvas.height);
    requestAnimationFrame(draw);
    
}

function Menu(){
    first_time=0;
    var rectx,recty,rect_width,rect_height;
    var best_score=localStorage.getItem("DashGame");
    rectx=0.5*canvas.width;
    recty=0.5*canvas.height;
    rect_width=0.2*canvas.width;
    rect_height=0.1*canvas.height;
    //ctx.strokeStyle("black");
  ctx.rect(rectx-rect_width/2, recty-rect_height/2, rect_width,rect_height);
    ctx.stroke();
    ctx.fillStyle = "black";
    var text_size=Math.min(canvas.width,canvas.height)*0.025;
    ctx.font = "bold "+text_size+"px Arial";
    ctx.fillText("Touch Here to play", rectx-rect_width/2+rect_width/100, recty-rect_height/2+rect_height/2);
//   console.log("rectx: "+rectx);
//        console.log("recty: "+recty);
//        console.log("rectwidth: "+rect_width);
//        console.log("rect height: "+rect_height);
//        console.log("x: "+mouse[1]);
//        console.log("y: "+mouse[0]);
//    if(down)
//        console.log("down=true");
//    if( mouse[1]<=rect_width )
//        console.log("Entrou no quadrado X");
//    if(mouse[0]>=recty && mouse[0]<=rect_height)
//        console.log("Entrou no quadrado YY");
    if( mouse[1]>=rectx-rect_width/2 && mouse[1]<=rect_width+rectx-rect_width/2 && mouse[0]>=recty-rect_height/2 && mouse[0]<=rect_height+recty-rect_height/2){
        state=1;
        //lives=100;
        time=0;
        
        
    }
    ctx.fillStyle = "black";
    ctx.font = "bold "+text_size+"px Arial";
    ctx.fillText("Score: "+score, 0.5*canvas.width, 0.65*canvas.height);
       
    ctx.fillText("Best Score: "+best_score, 0.5*canvas.width, 0.70*canvas.height);
    //ctx.fillStyle = "black";
     //ctx.font = "bold 16px Arial";
    //ctx.fillText("x : " + mouse[1] +  " y: " + mouse[0]+ " mousedown: "+ down, mouse[1], mouse[0]);
    
    ctx.rect(0.1*rectx,0.1*recty,rect_width,rect_height);
    ctx.stroke();
    ctx.fillText("Lives: "+lives, 0.1*rectx, 0.2*recty);
    if( mouse[1]>=0.1*rectx && mouse[1]<=0.1*rectx+rect_width && mouse[0]>=0.1*recty && mouse[0]<=0.1*recty+rect_height){
        choose_lives++;
        choose_lives%=4;
        lives=5*Math.pow(choose_lives,2)-65*choose_lives+160;
        mouse[0]=0.9*canvas.height;
        last_live=lives;
        console.log(choose_lives);
        console.log(lives);
        
    }
    ctx.rect(0.1*rectx,0.4*recty,rect_width,rect_height);
    ctx.stroke();
    
    ctx.fillText("Number of enemies: "+num_ememies, 0.1*rectx, 0.5*recty);
    if( mouse[1]>=0.1*rectx && mouse[1]<=0.1*rectx+rect_width && mouse[0]>=0.4*recty && mouse[0]<=0.4*recty+rect_height){
        choose_enemies++;
        choose_enemies%=21;
        //num_ememies=-0.5*Math.pow(choose_enemies,2)+4.5*choose_enemies+1;
		if(choose_enemies==0){
			choose_enemies=1;
		}
		num_ememies=choose_enemies;   

        clearEnemies();
        mouse[0]=0.9*canvas.height;
    }
    
    
    
     ctx.rect(0.1*rectx,0.7*recty,rect_width,rect_height);
    ctx.stroke();
    
    ctx.fillText("Reset best Score ", 0.1*rectx, 0.8*recty);
    if( mouse[1]>=0.1*rectx && mouse[1]<=0.1*rectx+rect_width && mouse[0]>=0.7*recty && mouse[0]<=0.7*recty+rect_height){
        localStorage.setItem("DashGame",0);
        mouse[0]=0.9*canvas.height;
    }
    
    
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
//           enemies[i].x+=0.1;
//           enemies[i].y+=0.1;
           drawRectangle(enemies[i],ctx);
           
           if(enemies[i].x<=0 || enemies[i].x>=canvas.width || enemies[i].y<=0 || enemies[i].y>=canvas.height){
               enemies[i].active=false;
           }
           if(DetectColision(enemies[i])){
               PrintCanvas(lives);
               lives--;
               if(lives==0){
                   //end game
                   clearEnemies();
                   mouse[0]=0.9*canvas.height;
                   state=0;
                   score=Math.round(time);
                   lives=last_live;
                   //startTime=0;
                   //score+=Math.round(new Date().getTime() - startScore);
                   var best_score=localStorage.getItem("DashGame");
                   if (score>best_score){
                       best_score=score;
                       localStorage.setItem("DashGame",best_score);
                   }
                   time=0;
               }
           }
           else{}//PrintCanvas("0");}
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
    var maxwh=Math.max(canvas.width,canvas.height);
    this.width=maxwh*0.03;
    this.height=maxwh*0.03; 
    this.active=true;    
    
}
function DetectColision(enemy){
//        var stick_centrex=Math.abs(size*canvas.width-x)/2;
//        var stick_centrey=Math.abs(size*canvas.height-y)/2;
        var enemy_centrex=enemy.x+enemy.width/2;
        var enemy_centrey=enemy.y+enemy.height/2;
        var stick_centrex=x;
        var stick_centrey=y;
        var stick_width=size*canvas.width;
        var stick_height=size*canvas.height;
//        ctx.fillStyle = "gray";
//     ctx.font = "bold 16px Arial";
//    ctx.fillText("x : " + enemy_centrex +  " y: " +enemy_centrey , enemy_centrex, enemy_centrey);
//    
//     ctx.fillStyle = "red";
//     ctx.font = "bold 16px Arial";
//    ctx.fillText("x : " + Math.round(Math.abs(stick_centrex-enemy_centrex)) +  " y: " +Math.round(Math.abs(stick_centrey-enemy_centrey)), stick_centrex, stick_centrey);
     
//        ctx.beginPath();
//        //ctx.moveTo(enemy_centrex,enemy_centrey);
//        ctx.moveTo(stick_centrex,stick_centrey);
//        ctx.lineTo(enemy_centrex,enemy_centrey);
//     ctx.strokeStyle='red';
//        ctx.stroke();
    
    
        
//        if(Math.abs(stick_centrex-enemy_centrex)<(enemy.width/2+stick_width/2) && Math.abs(stick_centrey-enemy_centrey)<(enemy.height/2+stick_height/2) ){
     if(Math.abs(stick_centrex-enemy_centrex) < enemy.width && Math.abs(stick_centrey-enemy_centrey)< enemy.height*1.8){
             //PrintCanvas(0.9*canvas.with,0.9*canvas.height,"1");
            //console.log(enemy.width/2);
            return true;
        }
        else{
            //PrintCanvas(0.9*canvas.with,0.9*canvas.height,"0");
            return false;
        }
    
}
function clearEnemies(){
    for(var i=0;i<num_ememies;i++){
        delete enemies[i];
        enemies[i]= new createEnemy();
    }
}


function GenerateNumberEnemies(time){
    //y = 0,0006x3 - 0,0258x2 + 0,5133x + 1
    if(time<=30){
        num_ememies=Math.floor(0.0006*Math.pow(time,3)-0.0258*Math.pow(time,2)+0.5133*time+1)
    }
    else{
        num_ememies=10;
    }
     for(var i=0;i<num_ememies;i++){
        if(enemies[i].active==undefined)
            enemies[i]=new createEnemy();
    }
    
}



function PrintCanvas(str){
   var posx=0.9*canvas.width;
    var posy=0.9*canvas.height;
    if(str=="1"){
        posx=0.8*canvas.width;
        posy=0.8*canvas.height;
    }
    ctx.fillStyle="red";
    ctx.font = "bold 100px Arial";
    ctx.fillText(str,x, y);
}
function Nextpos(){
			var inc_x =2;
			var inc_y =2; 
			
			if(x>=canvas.width ){ inc_x=-10;positivex=0}
			if(x<=  0 ) {inc_x=+10;positivex=1}
			if(y>=canvas.height ) {inc_y=-10;positivey=0}
			if(y<=  0 ) {inc_y=+10;positivey=1}
			
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
        context.fillStyle = 'rgba(0, 0, 0, 1)';
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
function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document) 
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}
    function visChange() {
        //var txtFld = document.getElementById('visChangeText');

		
			if (isHidden()) {
				//txtFld.value += "Tab Hidden!\n";
                
                visible=false;
                console.log("visible: " +visible);
                
                
            }
			else {
				//txtFld.value += "Tab Visible!\n";
                
                visible=true;
                console.log("visible: " +visible);
                startTime = new Date().getTime();
            }
		
    }

function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;
    
    return document[prop];
}
    

/**
*  Main
**/
//window.addEventListener("load", function simpleDemo() {
//  // use the property name to generate the prefixed event name
//  var visProp = getHiddenProp();
//  if (visProp) {
//    var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
//    document.addEventListener(evtname, visChange);
//  }
////  else {
////      var txtFld = document.getElementById('visChangeText');
////      txtFld.value += "PageVisibilityAPI not supported!"
////  }
//
//	function visChange() {
//		//var txtFld = document.getElementById('visChangeText');
//
//		
//			if (isHidden()) {
//				visible=false;
//            }
//			else {
//				visible=true;
//    
//		   }
//	}
//});
document.addEventListener('visibilitychange', visChange);
init();
canvas.addEventListener("click",fullscreen);      
requestAnimationFrame(draw);