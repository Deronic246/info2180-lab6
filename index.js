window.onload = function() {
    
    var searchButton = document.getElementById("button");
    var searchAllButton = document.getElementById("getallbutton");
    
    searchButton.onclick = printDefn;
    searchAllButton.onclick = printAllDefn;
    
};


function printDefn(){
    
    var searchWord = document.getElementById("textbox").value;
    var httpRequest = new XMLHttpRequest();
    var url = "https://info2180-lab6-deronic246.c9users.io/request.php?q=" + searchWord;
    
    httpRequest.onreadystatechange = function(){
        
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            
            if (httpRequest.status === 200) {
                
                var response = httpRequest.responseXML;
                
                for(var i = 0; i < response.getElementsByTagName("definition").length; i++){
                    
                    if(response.getElementsByTagName("definition")[i].getAttribute("name") === searchWord){
                        
                        var tempIndex = i;
                    }
                }
                
                var tempName = "<h3>" + response.getElementsByTagName("definition")[tempIndex].getAttribute("name").toUpperCase() + "</h3>";
                var tempAuthor = "<p>- " + response.getElementsByTagName("definition")[tempIndex].getAttribute("author") + "</p>";
                var tempDefn = "<p>" + response.getElementsByTagName("definition")[tempIndex].innerHTML + "</p>";
                
                document.getElementById("result").innerHTML = tempName + tempDefn + tempAuthor;
                
            } else {
                
                alert('There was a problem with the request.');
            }
        }
        
    };
    
    httpRequest.open('GET', url, true);
    httpRequest.send();
    
}

function printAllDefn(){
    
    var httpRequest = new XMLHttpRequest();
    var url = "https://info2180-lab6-deronic246.c9users.io/request.php?q=&all=true";
    
    httpRequest.onreadystatechange = function(){
        
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            
            if (httpRequest.status === 200) {
                
                var response = httpRequest.responseXML;
                
                var ans = "";
                
                for(var i = 0; i < response.getElementsByTagName("definition").length; i++){
                    
                    ans += "<li><h3>" + response.getElementsByTagName("definition")[i].getAttribute("name").toUpperCase() + "</h3></li>";
                    ans += "<p>" + response.getElementsByTagName("definition")[i].innerHTML + "</p>";
                    ans += "<p>- " + response.getElementsByTagName("definition")[i].getAttribute("author") + "</p>";
                }
                
                document.getElementById("result").innerHTML = "<ol>" + ans + "</ol>";
                
            } else {
                
                alert('There was a problem with the request.');
            }
        }
        
    };
    
    httpRequest.open('GET', url, true);
    httpRequest.send();
    
    
}