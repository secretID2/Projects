var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
//var canvas = document.getElementById('imageCanvas');
var image_averege=document.getElementById("canvas");
image_averege.addEventListener('click',Process,false);
var str;
var canvas_index=1;
var image_index=0;
var image_array=[];

//$("#Page").append("<button id="+str+">"+name[i]+"</button>");


function Process(){
    var i=7;
    var s="c"+i;
    var c=document.getElementById(s);
    var context=c.getContext('2d');
    var imageData1 = context.getImageData(0, 0, canvas.width, canvas.height);
    var data1 = imageData1.data;
    i++;
    s="c"+i;
    c=document.getElementById(s);
    context=c.getContext('2d');
    var imageData2 = context.getImageData(0, 0, canvas.width, canvas.height);
    var data2 = imageData2.data;
     i++;
    s="c"+i;
    c=document.getElementById(s);
    context=c.getContext('2d');
    var imageData3 = context.getImageData(0, 0, canvas.width, canvas.height);
    var data3 = imageData3.data;
    
    
    var imgdata=imageData1;
    var data=data1;
    
    
                
        for (var i = 0; i < data1.length; i += 4) {
              data[i]     = (data1[i]+data2[i]+data3[i])/3;     // red
              data[i + 1] = (data1[i+1]+data2[i+1]+data3[i+1])/3; // green
              data[i + 2] = (data1[i+2]+data2[i+2]+data3[i+2])/3; // blue
//              data[i]     = (0.1*data1[i]+0.1*data2[i]+0.9*data3[i])/3;     // red
//              data[i + 1] = (0.1*data1[i+1]+0.1*data2[i+1]+0.9*data3[i+1])/3; // green
//              data[i + 2] = (0.1*data1[i+2]+0.1*data2[i+2]+0.9*data3[i+2])/3; // blue
                                        
         }
    
    context=image_averege.getContext('2d');
    image_averege.width=imgdata.width;
    image_averege.height=imgdata.height;
    
    context.putImageData(imgdata,0,0);
    
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