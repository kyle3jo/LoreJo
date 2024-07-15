
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

function addToCart(id) {
	// get username from login cookie
	var username = getUsername();

	// check if theres an account is logged in. proceed to add to cart
	if (username) {
		console.log("Adding to existing login's cart")
		fillCart(id,username);
		CheckCartCount();
		return;
	}

	// else make a guest cookie login. then use guest cookie to add to cart
	console.log("Creating guest and adding to cart");
	var account = new Object();
	account.username = "guest";
	account.type = 0;
	var json_str = JSON.stringify(account);
	createCookie("login", json_str, 1);;
	fillCart(id,"guest");
	CheckCartCount();
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

function fillCart(id, username) {
	var cart = [];
	let product = new Object();
	var cookie; 
	var json_str = "";

	//Get product ID and quantity
	const params = new URLSearchParams(document.location.search);
	const quantity = 1;
	
	// user has no cookie. create a new cookie
	cookie = getCookie(username);
	if (cookie === "") { 	 

		// make a new product object to the cart
		product.id = id;
		product.quantity = Number(quantity);
		cart.push(product);

		// create cookie
		json_str = JSON.stringify(cart);
		createCookie(username, json_str, 1);
	}
	else { 	// append cookie

		json_str = cookie;
		cart = JSON.parse(json_str);

		// check if id already exists
		for (var i = 0; i < cart.length; i++) {

			if (cart[i].id == id) {
				// calculate the new quantity
				cart[i].quantity = Number(cart[i].quantity) + Number(quantity); 

				// create cookie
				json_str = JSON.stringify(cart);
				createCookie(username, json_str, 1);

				//debug
				//var cookie = getCookie(username);
				//alert(cookie);
				return;
			}
		}

		// id does not exist. make a new product object to the cart
		product.id = id;
		product.quantity = Number(quantity);
		cart.push(product);
		
		// create cookie
		json_str = JSON.stringify(cart);
		createCookie(username, json_str, 1);

	}

	//debug
	//var cookie = getCookie(username);
	//alert(cookie);
}

function createCookie(key, value, expireDays) {
	// set expirate date
	const d = new Date();
	d.setTime(d.getTime() + (expireDays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();

	// make cookie
	document.cookie = key + "=" + value + ";" + expires + ";path=/";
}

function getCookie(key) {
	// key=
	const prefix = key + "=";
	// retrieve cookies
	const cookiesDecoded = decodeURIComponent(document.cookie);
	// split cookies
	const cookiesArr = cookiesDecoded.split('; ');

	// find cookie
	for (let i = 0; i < cookiesArr.length; i++) {
		let cookie = cookiesArr[i];
		
		// skip spaces
		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1);
		}

		// grab specified cookie name
		if (cookie.indexOf(prefix) == 0) {
			return cookie.substring(prefix.length, cookie.length);
		}
	}

	//cookie not found
	return "";
}