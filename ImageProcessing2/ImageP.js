

		// Put event listeners into place
		
			// Grab elements, create settings, etc.
			var canvas=document.getElementById("canvas"), context=canvas.getContext("2d"),video = document.getElementById("video"),videoObj = { "video": true },errBack = function(error) {
					console.log("Video capture error: ", error.code); 
				};
            var color = document.getElementById('color');
var canvas2=document.getElementById("canvas2"), context2=canvas2.getContext("2d")
            
            function init (){
                

                    // Put video listeners into place
                    if(navigator.getUserMedia) { // Standard
                        navigator.getUserMedia(videoObj, function(stream) {
                            video.src = stream;
                            video.play();
                        }, errBack);
                    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
                        navigator.webkitGetUserMedia(videoObj, function(stream){
                            video.src = window.webkitURL.createObjectURL(stream);
                            video.play();
                        }, errBack);
                    } else if(navigator.mozGetUserMedia) { // WebKit-prefixed
                        navigator.mozGetUserMedia(videoObj, function(stream){
                            video.src = window.URL.createObjectURL(stream);
                            video.play();
                        }, errBack);
                    }
                }


function invert_color(){
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    
                
        for (var i = 0; i < data.length; i += 4) {
              data[i]     = 255 - data[i];     // red
              data[i + 1] = 255 - data[i + 1]; // green
              data[i + 2] = 255 - data[i + 2]; // blue
                    
                    
             }
    return imageData;
}
function light_up(){
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    
                
        for (var i = 0; i < data.length; i += 4) {
              data[i]     +=40;     // red
              data[i + 1] += 20 ; // green
              data[i + 2] += 20 ; // blue
                    
                    
             }
    return imageData;
}

function grayscale(){
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    return imageData;
  }


function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = context2.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + data[3] + ')';
  color.style.background =  rgba;
  color.textContent = rgba;
}

function detect_change(){
    var imageData = context.getImageData(0,0,canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
//      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
//      data[i]     = avg; // red
//      data[i + 1] = avg; // green
//      data[i + 2] = avg; // blue
        if(data[i]<data[i+1] && data[i+2]>data[i+1] && data[i+2]>200 && data[i]<160){
            data[i+1]=255;
            data[i]=0;
            data[i+2]=0;
        }
        else{
            
           data[i]=0;
            data[i+2]=0;
            
        }
    }
    return imageData;
}


function draw(){
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          var imageData =invert_color();
            //var imageData=detect_change();    
        //var imageData=light_up();    
        context.putImageData(imageData, 0, 0);
          requestAnimationFrame(draw);   
 }
      
function draw2(){
          context2.drawImage(video, 0, 0, canvas.width, canvas.height);
          //var imageData =grayscale();
//            var imageData=detect_change();    
//            context.putImageData(imageData, 0, 0);
          requestAnimationFrame(draw2);   
 }

            
//Main
init();
canvas2.addEventListener('mousemove', pick);
//video.addEventListener("mousedown",function(){context.drawImage(video, 0, 0, canvas.width, canvas.height);});
requestAnimationFrame(draw);   
requestAnimationFrame(draw2);   
   