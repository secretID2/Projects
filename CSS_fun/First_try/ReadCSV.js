

//main
var fileInput,fileDisplay;
var Alltext;
window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('display');

		fileInput.addEventListener('change', ReadToTable); 
                                   
       function ReadCSV(e){
            var file = fileInput.files[0];
            var textType = /text.*/;

            //if (file.type.match(textType)|| file.type.match("csv")) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    fileDisplayArea.innerText = reader.result;
                    console.log(reader.result);
                }

                reader.readAsText(file);	
            //} else {
            //    fileDisplayArea.innerText = "File not supported!"
            //}
    }
    
    function ReadToTable(e){
         var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
           CSVToTable(reader.result);
        }
        reader.readAsText(file);	
    }
    function CSVToTable(text){
        console.log(text);
        var lines=text.split("\n");
        var str;
        createTable2(lines);
    }
    function createTable(lines){
        var table = document.createElement('table');
        table.border="2ptx";
        for (var i = 1; i < 4; i++){
            var tr = document.createElement('tr');   

            var td1 = document.createElement('td');
            var td2 = document.createElement('td');

            var text1 = document.createTextNode('Text1');
            var text2 = document.createTextNode('Text2');

            td1.appendChild(text1);
            td2.appendChild(text2);
            tr.appendChild(td1);
            tr.appendChild(td2);

            table.appendChild(tr);
        }
        document.body.appendChild(table);
    }
    function createTable2(lines){
        var str;
        str="<table class=\"table\" id=\"trainingTable\" border=\"2ptx\"  >";
        
        for(var i=0;i<lines.length;i++){
            var values=lines[i].split(",");
            if(i==0){
                str+="<tr>";
                for(var j=0;j<values.length;j++){
                    str+="<th>"+values[j]+"</th>"
                }
                str+="</tr>";
            }
            else{
                 str+="<tr>";
                for(var j=0;j<values.length;j++){
                    str+="<td>"+values[j]+"</td>"
                }
                str+="</tr>";
            }
        }
        str+="</table>";
        
        $("#training_table").append(str);
    }
}


