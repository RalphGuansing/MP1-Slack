var divHTML = document.getElementById("centerdiv");
var imgdivHTML = document.getElementById("imgdiv");
var albumnum = 0;
var photoData;
function getAlbums()
{
	var albumData;
	var albumRequest = new XMLHttpRequest();
	albumRequest.open('GET', 'https://jsonplaceholder.typicode.com/albums');
	albumRequest.onload = function(){
		
		if(albumRequest.status >= 200 && albumRequest.status < 400){
			albumData = JSON.parse(albumRequest.responseText);
			albumData2 = JSON.parse(albumRequest.responseText);
		}else {
			console.log("Something went wrong D:");
		}
	};
	albumRequest.send();
	
	var userRequest = new XMLHttpRequest();
	userRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');	
	userRequest.onload = function(){	
		if(userRequest.status >= 200 && userRequest.status < 400){
			userData2 = JSON.parse(userRequest.responseText);
		}else {
			console.log("Something went wrong D:");
		}
			
	};
	userRequest.send();
	
	var photoRequest = new XMLHttpRequest();
	photoRequest.open('GET', 'https://jsonplaceholder.typicode.com/photos');
	clearBox("centerdiv")
	photoRequest.onload = function(){
		//for better navigation
		if(albumnum == 0)
			clearBox("centerdiv");
		usernum = 0;
		photonum = 0;
		postnum = 0;
		
		if(photoRequest.status >= 200 && photoRequest.status < 400){
			photoData = JSON.parse(photoRequest.responseText);
			renderalbumHTML(photoData, albumData);
		}else {
			console.log("Something went wrong D:");
		}
		
		
	};
	photoRequest.send();
}
function albumfunc(num){
	var htmlString = "";
	var albumdivHTML = document.getElementById("album"+num);
	var photocount=0;
	for(i = 0; i < photoData.length; i++){
		
		if(num == photoData[i].albumId && photocount != 16){
			htmlString += "<img class="+'"'+"albumTN"+'"'+" src=" +'"'+ photoData[i].thumbnailUrl +'"'+ "alt="+'"'+photoData[i].albumId+'"'+"/>";
			photocount++;
		}
		
	}
		htmlString+="<br>";
		htmlString+= "<a class+"+'"'+"phototext"+'"'+">"+albumData2[num-1].title+"</a>";	
	
	albumdivHTML.insertAdjacentHTML('beforeend', htmlString);
}


function albumClickfunc(num){
	var ii = num;
		clearBox("centerdiv");
		var photosRequest = new XMLHttpRequest();
		photosRequest.open('GET', 'https://jsonplaceholder.typicode.com/photos');
		
		photosRequest.onload = function(){
			
			if(photosRequest.status >= 200 && photosRequest.status < 400){
				var photosData = JSON.parse(photosRequest.responseText);
				renderAlbumPhotos(photosData,ii);
			} else {
				console.log("Something went wrong D:");
			}
			
		};
		
		photosRequest.onerror = function(){
			console.log("Connection Error");
		};
		
		photosRequest.send();
}

function renderAlbumPhotos(photosData,x){
	var htmlString="";
	albumnum = 0;
	
	for(i = 0; i < photosData.length; i++) {
		if(x == photosData[i].albumId){
			htmlString += "<div class="+'"'+"content-wrapper"+'"';
			htmlString += " onclick="+ '"'+"photoClick("+photosData[i].id+")"+'"'+">";
			htmlString += "<img class="+'"'+"resize"+'"'+" src="+'"'+photosData[i].thumbnailUrl+'"'+ ">";
			htmlString += "<a class="+ '"'+"phototext"+'"'+">"+photosData[i].title+"</a></div>";
		}
		
		if((i+1) % 5 == 0 && i != 0 && x == photosData[i].albumId)
			htmlString += "<br>";
	}
		imgdivHTML.insertAdjacentHTML('beforeend', htmlString);
	
}



var photoData3;
var albumData3;
var albumindex;
var morealbumButton;
function renderalbumHTML(photoData, albumData)
{
	
	var htmlString = "";
	albumnum += 1;
	var photoData3 = photoData;
	var albumData3 = albumData;
	for(i = 0; i < 15; i++) {
		var albumID;
		var num = albumID + 1;
			
		htmlString += "<div class="+'"'+"album"+'"'+" id="+'"album'+albumData[i].id+'"'+" onclick="+ '"'+"albumClickfunc("+albumData[i].id+")"+'"'+"></div>";
		
		//if((i+1)%6 == 0)
		//	htmlString += "<br>"
		if((i+1)%5 == 0)
			htmlString += "<br>"
	}
	
	htmlString += "<br><br><div id="+'"'+"albumButton"+'"'+"><p>I want more albums</p></div><br>";
	
	if(albumnum == 1){
		imgdivHTML.insertAdjacentHTML('beforeend', htmlString);
	
		for(ii = 0; ii < 15; ii++) {
			var num = ii+1;
			albumfunc(num);
		}
		albumindex = 15;
	}
	
	morealbumButton = document.getElementById("albumButton");
	if(morealbumButton){
		morealbumButton.addEventListener("click", moreAlbums);
	}
	
}

function moreAlbums(){
	morealbumButton.remove();
	var htmlString = "";
	//albumnum += 1;
	endindex = albumindex + 15;
	if(endindex >99)
		endindex = 100;
	for(i = albumindex; i < endindex; i++) {
		var albumID;
		var num = albumID + 1;
			
		htmlString += "<div class="+'"'+"album"+'"'+" id="+'"album'+albumData2[i].id+'"'+" onclick="+ '"'+"albumClickfunc("+albumData2[i].id+")"+'"'+"></div>";
		
		//if((i+1)%6 == 0)
		//	htmlString += "<br>"
		if((i+1)%5 == 0)
			htmlString += "<br>"
	}	
		morealbumButton.remove();
		htmlString += "<div id="+'"'+"albumButton"+'"'+"><p>I want more albums</p></div>";
		imgdivHTML.insertAdjacentHTML('beforeend', htmlString);
	
		for(ii = albumindex; ii < endindex; ii++) {
			var num = ii+1;
			albumfunc(num);
		}
		albumindex += 15;
	
	morealbumButton = document.getElementById("albumButton");
	if(morealbumButton){
		morealbumButton.addEventListener("click", moreAlbums);
	}
	
	if(albumindex > 99)
		morealbumButton.remove();
	
}

var albumButton = document.getElementById("album");
albumButton.addEventListener("click",getAlbums);

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
	document.getElementById("imgdiv").innerHTML = "";
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
		albumnum= 0;
		
		if(ourRequest.status >= 200 && ourRequest.status < 400){
			var userData = JSON.parse(ourRequest.responseText);
			renderpostHTML(userData, mainuserData);
		}else {
			console.log("Something went wrong D:");
		}
		
		
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
		currentpostnum = i-1;
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
			currentpostnum = i-1;
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
	
	var userRequest = new XMLHttpRequest();
	userRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');	
	userRequest.onload = function(){	
		userData2 = JSON.parse(userRequest.responseText);	
	};
	userRequest.send();
	
	var albumRequest = new XMLHttpRequest();
	albumRequest.open('GET', 'https://jsonplaceholder.typicode.com/albums');
	albumRequest.onload = function(){
		albumData2 = JSON.parse(albumRequest.responseText);
	};
	albumRequest.send();
	
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/photos');
	ourRequest.onload = function(){
		//for better navigation
		if(photonum == 0)
			clearBox("centerdiv");
		usernum = 0;
		postnum = 0;
		albumnum = 0;
		
		photoData = JSON.parse(ourRequest.responseText);
		renderphotoHTML(photoData);
		
	};
	ourRequest.send();
});

//to check if button has been clicked
var photonum = 0;
var totalphotos;
var endnum;
var currentphotonum;
var morephotoButton;
var photoData2;
function renderphotoHTML(data){
	var htmlString = "";
	photonum+= 1;
	totalphotos = data.length-1;
	endnum = totalphotos - 15;
	photoData2 = data;
	for(i = totalphotos; i > endnum; i--) {	
		htmlString += "<div class="+'"'+"content-wrapper"+'"';
		htmlString += " onclick="+ '"'+"photoClick("+data[i].id+")"+'"'+">";
		htmlString += "<img class="+'"'+"resize"+'"'+" src="+'"'+data[i].thumbnailUrl+'"'+ ">";
		htmlString += "<a class="+ '"'+"phototext"+'"'+">"+data[i].title+"</a></div>";
		
		
		if((i) % 5 == 0)
			htmlString += "<br>";
	
		currentphotonum = i;
	}
	
	htmlString += "<br><br><div id="+'"'+"photoButton"+'"'+"><p>I want more photos</p></div><br>";
	
	
	if(photonum == 1)
		imgdivHTML.insertAdjacentHTML('beforeend', htmlString);
	
	morephotoButton = document.getElementById("photoButton");
	if(morephotoButton){
		morephotoButton.addEventListener("click", morePhotos);
	}
}

function morePhotos(){
	var htmlString ="";
	endnum -= 15;
	currentphotonum -=1;
	for(i = currentphotonum; i > endnum; i--) {	
		htmlString += "<div class="+'"'+"content-wrapper"+'"';
		htmlString += " onclick="+ '"'+"photoClick("+photoData[i].id+")"+'"'+">";
		htmlString += "<img class="+'"'+"resize"+'"'+" src="+'"'+photoData[i].thumbnailUrl+'"'+ ">";
		htmlString += "<a class="+ '"'+"phototext"+'"'+">"+photoData[i].title+"</a></div>";
		
		
		if((i) % 5 == 0 && i != 0)
			htmlString += "<br>";
	}
	currentphotonum -= 14;
	
	
	htmlString += "<br><br><div id="+'"'+"photoButton"+'"'+"><p>I want more photos</p></div><br>";
	
	morephotoButton.remove();
	imgdivHTML.insertAdjacentHTML('beforeend', htmlString);

	morephotoButton = document.getElementById("photoButton");
	if(morephotoButton){
		morephotoButton.addEventListener("click", morePhotos);
	}
	if(endnum < 0){
		morephotoButton.remove();
	}
}
var albumData2;
var userData2;
function photoClick(id){
	photonum = 0;
	clearBox("centerdiv");
	var htmlString ="";
	var i = id -1;
	
	htmlString += "<div class="+'"'+"content-wrapperphoto"+'"';
	htmlString += " onclick="+ '"'+"photoClick("+photoData[i].id+")"+'"'+">";
	htmlString += "<img class="+'"'+"resize2"+'"'+" src="+'"'+photoData[i].url+'"'+ ">";
	htmlString += "<header class="+'"'+"photoheader"+'"'+"><a class="+ '"'+"phototext2"+'"'+">"+photoData[i].title+"</a></header></div>";
	
	if(albumData2 != null)
		for(n = 0; n < albumData2.length; n++)
			if(photoData[i].albumId == albumData2[n].id){
				htmlString += "<p id="+'"'+"clickable"+'"'+" onclick="+ '"'+"albumClickfunc("+albumData2[n].id+")"+'"'+"><a>Album: </a>" + albumData2[n].title + "<p>";
				j = 0;
				while( j < userData2.length){
					if(albumData2[n].userId == userData2[j].id)
						htmlString += "<p "+"id="+'"'+"clickable"+'"'+" onclick="+ '"'+"userfunc("+(j+1)+")"+'"'+"><a>By: </a>" + userData2[j].name + "<p>";
					j++;
				}
			}	
			
	imgdivHTML.insertAdjacentHTML('beforeend', htmlString);
	
	
	
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
}

function userfunc(num) {
    //var x = document.getElementById("userbutt"+num);
	var i = num;
	
	//x.addEventListener("click", function(){
		clearBox("centerdiv");
		usernum = 0;
		postnum = 0;
		photonum = 0;
		albumnum = 0;
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/users');
		
		ourRequest.onload = function(){
		

			
			var userData = JSON.parse(ourRequest.responseText);
			renderProfile(userData,i);
			
		};
		
		ourRequest.send();
	//});
}

var lat;
var lng;
var script;
function renderProfile(data,i){
	var htmlString = "";
	var index = i-1;
	htmlString += "<div id="+'"'+"profileInfo"+'"'+">"+"<h1>" + data[index].name +"</h1>"+data[index].username+"<p><a>ID: "+ data[index].id +"<br>Street: "+data[index].address.street +"<br>Suite: "+data[index].address.suite +"<br>City: "+data[index].address.city +"<br>Zipcode: "+data[index].address.zipcode +"<br>"+ "</a></p></div>";
	htmlString += "<div id="+'"'+"googleMap"+'"'+"style="+'"'+"width:400px;height:400px;"+'"'+"></div>";
	
	divHTML.insertAdjacentHTML('beforeend', htmlString);
	
	lat = data[index].address.geo.lat;
	lng = data[index].address.geo.lng;
	//alert("lat: "+lat+"  lng: "+lng)
	
		script = document.createElement("script");
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyApcfxWkE3UtK7Wb5vAFTTtbk19zxWlutw&callback=myMap"; 
		document.getElementsByTagName("head")[0].appendChild(script);

	
			

}

function myMap() {
	var myCenter = new google.maps.LatLng(lat,lng); 
	var mapProp= {
		center:myCenter,
		zoom:5,
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	var marker = new google.maps.Marker({
		position: myCenter,
		animation: google.maps.Animation.BOUNCE
	});
	marker.setMap(map);
}