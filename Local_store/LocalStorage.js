

var i=0;
window.onload = function init() {
	var submitButton=document.getElementById("submit");
	submitButton.addEventListener("click",CreateStorage,false);
	var clearButton=document.getElementById("clear");
	clearButton.addEventListener("click", ClearStorage,false);
	
	
}


function CreateStorage(){
	
	var name= $("#usr").val();
	var price=$("#pwd").val();
	// var store=[]; 
	// store.push({name:name,price:price});
	// if(localStorage.e1=="NaN" || localStorage.Salgados==undefined){
			// localStorage.setItem(e1,JSON.stringify(store));
	// }
	
	// $("#output").html("You have clicked the button " + localStorage.e1 + " time(s).");
	 //document.cookie=name+","+price+";";
	// document.cookie = "username=John Doe";
	//var name1= document.cookie.split(",");
	// alert(document.cookie);
	
	
	//localStorage.clear();
	var str="Store"+i;
	//alert(str);
	
	localStorage.setItem(str,name+","+price);
	//alert(localStorage.getItem(str));
	i++;
	
}

function ClearStorage(){
	localStorage.clear();
}