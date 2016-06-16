

var total_price=0;
var payment=0;
// var name=[];
// var price=[];
window.onload = function init() {
	// var element = document.Page.createElement("canvas");
	// element.html("This is a paragraph.");
	// element.setAttribute("name", "Ola");
	// element.setAttribute("class", "btn btn-default btn-lg");
	//var name= document.cookie.split(",");
	var clearButton=document.getElementById("clear");
	clearButton.addEventListener("click", Reset,false);
	 
	 var name=getName();	
	 var price= getPrice();
	var i=0;
	var str="b"+i;
	while(i<name.length){
		
		$("#Page").append("<button id="+str+">"+name[i]+"</button>");
	
		$("#"+str+"").attr("class","btn btn-default btn-lg");
		i++;
		str="b"+i;
	}
	// ButtonControl(price);
	// i=0;
	// str="b"+i;
	// var Button=document.getElementById(str);
	// var f= new Function('price','total_price+=price;$("#totalPricePay").html(total_price);');
		
		// Button.addEventListener("click",f(price[i]),false);
		
	i=0;	
	var Button;
	var f;
	 while(i<price.length){
		 str="b"+i;
		Button=document.getElementById(str);
		 f= new Function('','total_price+='+price[i]+';$("#totalPricePay").html(total_price);$("#totalPricePay").attr({"value":total_price});Change();');
		
		Button.addEventListener("click",f,false);
		i++;
	 }	
	 
	 i=1;
	 str="m"+i;
	 while(i<16){
		
		
		Button=document.getElementById(str);
		var Text=$("#"+str+"").text();
		// var num=parseInt(Text);
		f= new Function('','payment+='+parseFloat(Text)+';$("#payment").html(payment);$("#payment").attr({"value":payment});Change();');
		Button.addEventListener("click",f,false);
		i++;
		str="m"+i;
	}
	 
		
	
}
function Reset(){
	total_price=0;
	payment=0;
	$("#totalPricePay").html(total_price);
	$("#payment").html(payment);
	$("#change").html(0);
	
}

function getName(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localname=[];
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localname.push(str_aux[0]);
		//alert(str);
	}
	return localname;
}
function getPrice(){
	var i=0;
	var str="Store"+i;
	var str_aux;
	var localprice=[];
	for (i=0;localStorage.getItem(str)!=null;i++,str="Store"+i){
		str_aux=localStorage.getItem(str).split(",");
		localprice.push(str_aux[1]);
		//alert(str);
	}
	return localprice;
}

// var f = new Function('name', 'return alert("hello, " + name + "!");');
// f('erick');

function ButtonControl(price){
	 var i=0;
	 var str;
	 var Button;
	 while(i<price.length){
		 str="b"+i;
		Button=document.getElementById(str);
		// var f= new Function('price','total_price+=price;');
		// f(price[i]);
		Button.addEventListener("click",AddPrice(price[i]),false);
		i++;
	 }
}

function Change(){
	var change=0;
	 change=payment-total_price;
	 
	//change = Math.abs(parseFloat($("#totalPricePay").val())-parseFloat($("#payment").val()));
	$("#change").html(change);	
}

