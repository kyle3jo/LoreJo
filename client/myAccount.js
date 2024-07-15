$(document).ready(function ()
{
	var yes_login_window = document.getElementById("yes_login");
	var yes_login_staff_window = document.getElementById("yes_login_staff");
	var no_login_window = document.getElementById("no_login");

	// hide all
	/* yes_login_window.style.display = "none";
	yes_login_staff_window.style.display = "none";
	no_login_window.style.display = "none"; */
	$("#yes_login").hide();
	$("#yes_login_staff").hide();
	$("#no_login").hide();

	// check if someone is logged in
	var username = getUsername();
	var type = getAccountType();
	console.log("Username: "+username+"| Type: "+type);
	
	// registed
	if (username != "" && type == 1) {
		console.log("Showing user page");
		$("#yes_login").show()
		document.getElementById("yl_defaultTab").click();
	} 
	// staffs
	else if (username !== "" && type == 2) {
		console.log("Showing staff page");
		$("#yes_login_staff").show();
		document.getElementById("yl_defaultTab_staff").click();
	}
	// guests
	else {
		console.log("Showing login page");
		$("#no_login").show();
		document.getElementById("nl_defaultTab").click();
		
	}

});


function Login()
{
	var accountIn;
	var json_str;
	var account = new Object();

	//Retreive from text boxes
	const username = $("#username").val();
	const password = $("#password").val();

	//Check if it is in database
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			//Get response
			var response = this.responseText;

			//If response valid parse it
			console.log("Response: " + response);
			if (response !== "")
			{
				accountIn = JSON.parse(response);

				//If password valid store login in cookie / Update cookie if it exists
				if (password == accountIn.password)
				{
					// update login cookie
					account.username = accountIn.username;
					account.type = accountIn.type;
					json_str = JSON.stringify(account);
					createCookie("login", json_str, 1); //it also overwrites/updates cookie that has login as the key

					// add guest cart (if not empty) to log-in account's cart cookie
					var cookieGuest = getCookie("guest");
					if (cookieGuest) {
						createCookie(username, cookieGuest, 1);
						//Murder that stupid guest cart. rip
						createCookie("guest", "", 0);
					}
					return true;

				} else
				{ //if invalid tell the user off
					document.getElementById("loginAlert").innerText = "Incorrect password";
					return false;
				}
			}
			else
			{ //if invalid tell the user off
				document.getElementById("loginAlert").innerText = "No Account Found";
				return false;
			}
		}
	}

	var url = "server/GetLoginDetails.php?username=" + username;
	console.log("Requesting login: " + url);
	xhr.open("GET", url);
	xhr.send();


}

function Signup()
{
	var accountIn;

	//Retreive from text boxes
	const username = $("#signup_username").val();
	const password = $("#signup_password").val();
	const email = $("#signup_email").val();

	//Check if account it is in database
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			//Get response
			var response = this.responseText;

			//If response valid parse it
			console.log("Response: " + response);
			if (response !== "")
			{
				document.getElementById("signUpAlert").innerText = "account already exists!";
				return false;
			}
			else
			{ // proceed to create account
				return true;
			}
		}
	}

	var url = "server/SignUp.php?username=" + username;
	console.log("Requesting login: " + url);
	xhr.open("GET", url);
	xhr.send();

	// if not add a new account to the database


}

function LogOut(){
	createCookie("login","",0);
	location.reload();
	console.log("Logged out");
}

function openTab(event, process) {
	var tablinks = document.getElementsByClassName("tablinks");
	var tabcontent = document.getElementsByClassName("tabcontent");

	// hide tab content
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// remove active class
	for (var i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// show current tab
	document.getElementById(process).style.display = "block";
	event.currentTarget.className += " active";

}

function LoadCartHistory() {
	
}

function createCookie(key, value, expireDays)
{
	// set expirate date
	const d = new Date();
	d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();

	// make cookie
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
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

function getUsername() {
    var json_str = getCookie("login");
	if (json_str) {
		var account = JSON.parse(json_str);
		return account.username;
	}

	return "";
}

function getAccountType() {
    var json_str = getCookie("login");
	if (json_str) {
		var account = JSON.parse(json_str);
		return account.type;
	}

	return "";
}