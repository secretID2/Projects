var ch=0;

window.onload = function init() {
	var button1=document.getElementById("b1");
	button1.addEventListener("click",my_function);
	//while (true);
}
function my_function(){
	
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