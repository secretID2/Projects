

var i=0;
window.onload = function init() {
	var submitButton=document.getElementById("submit");
	submitButton.addEventListener("click",CreateStorage,false);
	var clearButton=document.getElementById("clear");
	clearButton.addEventListener("click", ClearStorage,false);
	var qrButton=document.getElementById("qr");
	qrButton.addEventListener("click", QRgenerate,false);
    
    
    ShowCurrentStore();
	
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
	 //alert(price+"   "+name);
	if(price=="" || name==""){
        alert("You need to fill the form! to submit");
    }else{
        
        //localStorage.clear();
	   var str="Store"+i;
	   //alert(str);
	
        localStorage.setItem(str,name+","+price);
	   //alert(localStorage.getItem(str));
        i++;
    
        //inserir novo produto na lista de items inseridos
        createItemList(name,price);
        
    }
}

function createItemList(name,price){
    
    $("#item_list").append("<option id=\"item\">"+name+" - "+price+"</option>");
}

function clearItemList(){
    $("#item_list").empty();
}

function ShowCurrentStore(){
    var name=[];
    var price=[];
    name=getName();
    price=getPrice();
    
    for(var i=0;i<name.length;i++){
        createItemList(name[i],price[i]);
    }
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



function ClearStorage(){
	localStorage.clear();
    clearItemList();
}

function QRgenerate(){
	var name,price;
	name=getName();	
	price= getPrice();
	var i=0;
	var urlStr="http://secretid2.github.io/Projects/Local_store/GeneratedStore.html?";
	while (i<price.length){
		urlStr+= name[i]+","+price[i]+";";
		i++;
	}
	$("#qr_img").attr("src","https://api.qrserver.com/v1/create-qr-code/?data="+urlStr+"&amp;size=100x100");
	$("#qr_img").attr("style","");
	console.log(document.getElementById("qr_img").getAttribute("src"));
	$("#output").html(urlStr);
	
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
//http://secretid2.github.io/SecretID_Projects_007/Local_store/GeneratedStore.html
//https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100