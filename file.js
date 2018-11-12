// JavaScript File
/*global $*/
window.onload =function(){

    var sbutton=document.getElementById("search");
    var nextbutton=document.getElementById("gdef");
    var result=document.getElementById('result');
    
    sbutton.addEventListener("click", function(){
        var word = document.querySelector("input").value;
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function(){
            if (xml.readyState === XMLHttpRequest.DONE){
                if (xml.status === 200){
                    result.innerHTML = xml.responseText;
                } else {
                    alert('There was a problem with the request.');
                }
            }
            
        };
        
        xml.open('GET', "/request.php?q=" + word + "&all = false", true);
        xml.send();
    });
    nextbutton.addEventListener("click", function(){
        var xml2 = new XMLHttpRequest();
        xml2.onreadystatechange = function(){
            if (xml2.readyState === XMLHttpRequest.DONE){
                if (xml2.status === 200){
                    var xmlData = xml2.responseXML;
                    var olist = document.createElement("ol");
                    var parent = document.getElementById("result");
                    result.innerHTML = "";
                    parent.appendChild(olist);
                    var xmlNodes = xmlData.getElementsByTagName("definition");
            
                    for(var i = 0; i < xmlNodes.length; i++){
                        var l_item = document.createElement("li");
                        var txt = "<h3>" + xmlNodes[i].getAttribute("name") + "</h3>" + 
                        "<br>" + "<p>" + xmlNodes[i].childNodes[0].nodeValue + "</p>" +
                        "<br>" + "<p>" + "- " + xmlNodes[i].getAttribute("author") + "</p>";
                        l_item.innerHTML = txt;
                        olist.appendChild(l_item);
                    }
                }else {
                    alert('There was a problem with the request.');
                }
            }
        };
        xml2.open('GET', "/request.php?q=&all=true", true);
        xml2.send();
    });
};




