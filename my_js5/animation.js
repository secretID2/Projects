var ch=0;
var ctr=0;
window.onload = function init() {
	var button1=document.getElementById("b1");
	button1.addEventListener("click",my_function,false);
	var b2=document.getElementById("b2");
	b2.addEventListener("click",attack1_animation,false);
	//while (true);
}
function my_function(event){
	
	var label=document.getElementById("label_1");
		if(ch==0){
			label.innerHTML = 'Mudei o texto baby';
			ch=1;
		}
		else{
			label.innerHTML = ' Animation Canvas right below!!!';
			ch=0;
		}
}
function attack1_animation(event){
	var image = document.getElementById('animation');
	var i=1;
    if (image.src.match("idle.gif")) {
		image.src = "attack1.gif";		
    }
		setTimeout(function(){ change_to_idle(); }, 700);
	
}
    

function change_to_idle(){
	var image = document.getElementById('animation');
	image.src = "idle.gif";
}