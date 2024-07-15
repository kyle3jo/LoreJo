$(document).ready(function(){

	//Bind search function
	$("#searchBar").on('keypress',function(e){
		if(e.which == 13){
			window.location.href = "../search.html?search="+$("#searchBar").val();
		}
	});

	//See if someone is logged in
	CheckLogin();
	CheckCartCount();
});

function CheckLogin(){
	console.log("Checking for login");
	var json_str = getCookie("login");
    if(json_str !== ""){
		console.log("Login session found");
		var account = JSON.parse(json_str);
		if(account.type !=0){
			$("#loginText").html(account.username);
			console.log("Logged in as: "+account.username);
		}
		else
		console.log("Login is a guest account");
	} else{
		console.log("No login session found");
	}
}

function CheckCartCount(){
	const username = getUsername();
	var cart, total = 0;
	if(username !== ""){
		cart = JSON.parse(getCookie(username));
		for(let i = 0; i < cart.length; i++){
			total += cart[i].quantity;
		}
		$("#cartCount").html(total);
	}
	
}

function getUsername() {
    var json_str = getCookie("login");
	if (json_str) {
		var account = JSON.parse(json_str);
		return account.username;
	}

	return "";
}

function getCookie(key)
{
	// username=
	const prefix = key + "=";
	// retrieve cookies
	const cookiesDecoded = decodeURIComponent(document.cookie);
	// split cookies
	const cookiesArr = cookiesDecoded.split('; ');

	// find cookie
	for (let i = 0; i < cookiesArr.length; i++)
	{
		let cookie = cookiesArr[i];

		// skip spaces
		while (cookie.charAt(0) == ' ')
		{
			cookie = cookie.substring(1);
		}

		// grab specified cookie name
		if (cookie.indexOf(prefix) == 0)
		{
			return cookie.substring(prefix.length, cookie.length);
		}
	}

	//cookie not found
	return "";

}