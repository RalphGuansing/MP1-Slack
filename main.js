var divHTML = document.getElementById("centerdiv");

var albumnum = 0;
var photoData;
function getAlbums()
{
	var albumData;
	var albumRequest = new XMLHttpRequest();
	albumRequest.open('GET', 'https://jsonplaceholder.typicode.com/albums');
	albumRequest.onload = function(){

		albumData = JSON.parse(albumRequest.responseText);
	};
	albumRequest.send();
	
	var photoRequest = new XMLHttpRequest();
	photoRequest.open('GET', 'https://jsonplaceholder.typicode.com/photos');
	photoRequest.onload = function(){
		//for better navigation
		if(albumnum == 0)
			clearBox("centerdiv");
		usernum = 0;
		photonum = 0;
		postnum = 0;
		
		photoData = JSON.parse(photoRequest.responseText);
		renderalbumHTML(photoData, albumData);
		
	};
	photoRequest.send();
}
function albumfunc(num){
	//alert("HELLO" + num);
	var htmlString = "";
	var albumdivHTML = document.getElementById("album"+num);
	var photocount=0;
	for(i = 0; i < photoData.length; i++){
		
		if(num == photoData[i].albumId && photocount != 16){
			htmlString += "<img class="+'"'+"albumTN"+'"'+" src=" +'"'+ photoData[i].url +'"'+ "alt="+'"'+photoData[i].albumId+'"'+"/>";
			photocount++;
		}
			
	}
		
	albumdivHTML.insertAdjacentHTML('beforeend', htmlString);
}

function albumClickfunc(num){
	alert("album number " + num);
}

function renderalbumHTML(photoData, albumData)
{
	var htmlString = "";
	albumnum += 1;
	for(i = 0; i < 15; i++) {
		var albumID;
		/*for(y = 0; y < photoData.length; y++){
			if(albumData[i].id == photoData[y].albumId)
			albumID = y;}*/
		var num = albumID + 1;
			
		htmlString += "<div class="+'"'+"album"+'"'+" id="+'"album'+albumData[i].id+'"'+" onclick="+ '"'+"albumClickfunc("+albumData[i].id+")"+'"'+"></div>";
		
		if((i+1)%6 == 0)
			htmlString += "<br>"
	}
	if(albumnum == 1)
		divHTML.insertAdjacentHTML('beforeend', htmlString);
	
	for(ii = 0; ii < 15; ii++) {
		var num = ii+1;
		albumfunc(num);
	}
	
}

var albumButton = document.getElementById("album");
albumButton.addEventListener("click",getAlbums);

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function getPosts()
{
	var mainuserData;
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
var currentpostnum;
var postCeiling;
var postData;
var postuserData;
var morepostButton;
function renderpostHTML(data, userData)
{
	var htmlString = "";
	postnum+= 1;
	postData = data;
	postuserData = userData;
	var totalposts = data.length-1
	for(i = totalposts; i >= totalposts-10; i--) {
		var userid;
		for(y = 0; y < userData.length; y++){
			if(data[i].userId == userData[y].id)
				userid = y;
			var num = userid +1;
			}
			
			htmlString += "<div class="+'"'+"post"+'"'+"><header><a id="+'"'+ "userbutt"+num+'"'+ " onclick="+ '"'+"userfunc("+num+")"+'"'+ ">" + userData[userid].name + "</header></a><p class = " + '"'+"postTitle"+'"'+ ">" + data[i].title + "</p><p class = " + '"'+"postBody"+'"'+ ">" + data[i].body+"</p></div><br>";
		currentpostnum = i;
		postCeiling = totalposts-10;
	}
	
	htmlString += "<div id="+'"'+"postButton"+'"'+"><p>I want more posts</p></div><br>";
	
	if(postnum == 1)
		divHTML.insertAdjacentHTML('beforeend', htmlString);
	
	morepostButton = document.getElementById("postButton");
	if(morepostButton){
		morepostButton.addEventListener("click", morePosts);
	}
}

function morePosts() 
{	var htmlString = "";
	totalposts = postData.length;
	postCeiling -= 10;
	for(i = currentpostnum; i >= postCeiling; i--) {
		var userid;
		if(i != -1){
			for(y = 0; y < postuserData.length; y++){
				if(postData[i].userId == postuserData[y].id)
					userid = y;
				var num = userid +1;
				}		
				htmlString += "<div class="+'"'+"post"+'"'+"><header><a id="+'"'+ "userbutt"+num+'"'+ " onclick="+ '"'+"userfunc("+num+")"+'"'+ ">" + postuserData[userid].name + "</header></a><p class = " + '"'+"postTitle"+'"'+ ">" + postData[i].title + "</p><p class = " + '"'+"postBody"+'"'+ ">" + postData[i].body+"</p></div><br>";
			currentpostnum = i;
		}
		
	}
	htmlString += "<div id="+'"'+"postButton"+'"'+"><p>I want more posts</p></div><br>";
	morepostButton.remove();
	divHTML.insertAdjacentHTML('beforeend', htmlString);

	morepostButton = document.getElementById("postButton");
	if(morepostButton){
		morepostButton.addEventListener("click", morePosts);
	}
	if(postCeiling == -1){
		morepostButton.remove();
	}
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
		albumnum = 0;
		
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
		albumnum = 0;
		
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










