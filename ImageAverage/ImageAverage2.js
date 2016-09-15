var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
//var canvas = document.getElementById('imageCanvas');
var image_averege = document.getElementById("canvas");
image_averege.addEventListener('click',Process,false);
var str;
var canvas_index=1;
var image_index=0;
var image_array=[];
//$("#Page").append("<button id="+str+">"+name[i]+"</button>");


function Process(){
    var dataImages = [];
    for(var i = 1; i < canvas_index; i++) {
        var s= "c" + i;
        var c=document.getElementById(s);
        var context=c.getContext('2d');
        var imageData = context.getImageData(0,0,canvas.width, canvas.height);
        dataImages[i-1] = imageData;
    } 
    
    var imgdata = dataImages[0];
    var data = dataImages[0].data;
                
    for (var i = 0; i < data.length; i += 4) {
        var color = [0, 0 ,0];
        for(var j = 0 ; j < canvas_index - 1; j++) {
          color[0] += dataImages[j].data[i];     // red
          color[1] += dataImages[j].data[i + 1]; // green
          color[2] += dataImages[j].data[i + 2]; // blue
        }
        imgdata.data[i] = color[0] / ((canvas_index - 1) == 0 ? 1 : canvas_index - 1);
        imgdata.data[i + 1] =color[1] / ((canvas_index - 1) == 0 ? 1 : canvas_index - 1);
        imgdata.data[i + 2] = 1.0 * color[2] / ((canvas_index - 1) == 0 ? 1 : canvas_index - 1);
     }
    
    image_averege.width=imgdata.width;
    image_averege.height=imgdata.height;
    context = image_averege.getContext('2d');
    context.putImageData(imgdata, 0, 0);
}

function handleImage(e){
    str="c"+canvas_index;
    $("#Page").append("<canvas id="+str+"></canvas>");
    //$("#Page").append("<button id="+str+">Ola</button>");
    //$("#"+str+"").attr("class","btn btn-default btn-lg");
    var canvas= document.getElementById(str);
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
        image_array.push(img);
        image_index++;
    }
    reader.readAsDataURL(e.target.files[0]);
    canvas_index++;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(e) {
//    ev.preventDefault();
//    var data = ev.dataTransfer.getData("text");
//    ev.target.appendChild(document.getElementById(data));
   
    
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}