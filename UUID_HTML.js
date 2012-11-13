//1,get a new UUID
var getUUID = new XMLHttpRequest();
getUUID.open("GET", "http://localhost:5984/_uuids", true);
getUUID.onreadystatechange = function() {
 	if (getUUID.readyState == 4) {
 		var obj = JSON.parse(getUUID.responseText)//parse returned JSON
 		//alert(obj.uuids);//print uuid
		
		//2,get HTML &other information and put into a JSON file
		var pagetitle = escape(document.getElementsByTagName("title")[0].innerHTML);//title:encoding, avoid invalid chars
		var pageurl = escape(window.location.href);//get link		
		var contena = "<html>" + document.getElementsByTagName("html")[0].innerHTML + "</html>";//content
		content_final = escape(contena); //encoding, avoiding illegal chars
		var content = '{"Title":"' + pagetitle + '","Link":"' + pageurl + '","content":"' + content_final + '"}'//JSON file
		
		//3,put into CouchDB
		var xhr = new XMLHttpRequest();
		xhr.open("PUT", "http://localhost:5984/albums/"+obj.uuids, true);
		xhr.setRequestHeader("Content-Length",content.lenght);
		xhr.setRequestHeader("Content-Type","application/json;");
		xhr.onreadystatechange = function() {
		 	if (xhr.readyState == 4) {
		 		var response = xhr.responseText;//return
				//4,response
				alert(response);
		  }
		}
		xhr.send(content);
  }
}
getUUID.send();