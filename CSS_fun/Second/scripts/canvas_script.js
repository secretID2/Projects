var mouse;
function touchMove(e){
    
    mouse[0]=e.touches[0].clientY;
	mouse[1]=e.touches[0].clientX;
    console.log(mouse[0]+","+mouse[1]);
}

/*function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left), my = (e.clientY - rect.top);
    if (!down || mx == mouse[0] && my == mouse[1])
        return;
    mouse[0] = my;
    mouse[1] = mx;
    console.log(mouse[1]);
	 
}*/
//________________Main___________________________________________________
var c = document.createElement('canvas'),        
    ctx = c.getContext('2d'),
    cw = c.width = 200,
    ch = c.height = 200;
    c.id="canvas";

for( var x = 0; x < cw; x++ ){
    for( var y = 0; y < ch; y++ ){
        //ctx.fillStyle = 'hsl(0, 0%, ' + ( 100 - ( Math.random() * 15 ) ) + '%)';
        ctx.fillStyle='hsl(60,80%,70%)';
        ctx.fillRect(x, y, 1, 1);
    }
}

/*var imageObj = new Image();

      imageObj.onload = function() {
        ctx.drawImage(imageObj, 0  , 0);
      };
      imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
*/
var body=document.getElementById("body");
document.body.style.background = 'url(' + c.toDataURL() + ')';
document.addEventListener("touchmove", touchMove,false);
//document.body.addEventListener("mousemove", mouseMove,false);
console.log("Ola");