var divHTML = document.getElementById("centerdiv");

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function getPosts()
{
	var mainuserData
	var usersRequest = new XMLHttpRequest();
	usersRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
	usersRequest.onload = function(){

		mainuserData = JSON.parse(usersRequest.responseText);
	};
	usersRequest.send();
	
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/posts');
	ourRequest.onload = function(){
		//for better navigation
		if(postnum == 0)
			clearBox("centerdiv");
		usernum = 0;
		photonum = 0;
		
		var userData = JSON.parse(ourRequest.responseText);
		renderpostHTML(userData, mainuserData);
		
	};
	ourRequest.send();
}

window.onload = getPosts;

var postButton = document.getElementById("posts");
postButton.addEventListener("click",getPosts);

//to check if button has been clicked
var postnum = 0;
function renderpostHTML(data, userData){
	var htmlString = "";
	postnum+= 1;
	
	for(i = data.length-1; i >= 0; i--) {
		var userid;
		for(y = 0; y < userData.length; y++){
			if(data[i].userId == userData[y].id)
				userid = y;
			var num = userid +1;
			}
			
			htmlString += "<div class="+'"'+"post"+'"'+"><header><a id="+'"'+ "userbutt"+num+'"'+ " onclick="+ '"'+"userfunc("+num+")"+'"'+ ">" + userData[userid].name + "</header></a><p class = " + '"'+"postTitle"+'"'+ ">" + data[i].title + "</p><p class = " + '"'+"postBody"+'"'+ ">" + data[i].body+"</p></div><br>";
		
		//if((i+1) % 6 == 0 && i != 0)
		//	htmlString += "<br>";
	}
	if(postnum == 1)
		divHTML.insertAdjacentHTML('beforeend', htmlString);
	//userButton.remove();
}

var photoButton = document.getElementById("photo");
photoButton.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/photos');
	ourRequest.onload = function(){
		//for better navigation
		if(photonum == 0)
			clearBox("centerdiv");
		usernum = 0;
		postnum = 0;
		
		var userData = JSON.parse(ourRequest.responseText);
		renderphotoHTML(userData);
		
	};
	ourRequest.send();
});

//to check if button has been clicked
var photonum = 0;
function renderphotoHTML(data){
	var htmlString = "";
	photonum+= 1;
	for(i = 0; i < 15; i++) {
		//<img src="url" alt="some_text" style="width:width;height:height;">
		htmlString += "<img class="+'"'+"resize"+'"'+" src=" +'"'+ data[i].url +'"'+ "alt="+'"'+data[i].albumId+'"'+"/>";
		
		if((i+1) % 6 == 0 && i != 0)
			htmlString += "<br>";
	}
	if(photonum == 1)
		divHTML.insertAdjacentHTML('beforeend', htmlString);
	//userButton.remove();
}


var userButton = document.getElementById("users");
userButton.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
	ourRequest.onload = function(){
		//for better navigation
		if(usernum == 0)
			clearBox("centerdiv");
		photonum = 0;
		postnum = 0;
		
		var userData = JSON.parse(ourRequest.responseText);
		renderusersHTML(userData);
	};
	ourRequest.send();
});

//to check if button has been clicked
var usernum = 0;
function renderusersHTML(data){
	var htmlString = "";
	usernum+= 1;
	for(i = 0; i < data.length; i++) {
		var num = i+1;
		htmlString += "<p><a id="+'"'+ "userbutt"+num+'"'+ " onclick="+ '"'+"userfunc("+num+")"+'"'+ ">" + data[i].name + "</a></p>";
	}
	if(usernum == 1)
		divHTML.insertAdjacentHTML('beforeend', htmlString);
	//userButton.remove();
}

function userfunc(num) {
    var x = document.getElementById("userbutt"+num);
    alert(x.innerHTML);  
}










