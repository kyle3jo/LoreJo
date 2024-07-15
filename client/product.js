$(document).ready(function(){
	LoadProductDetails();

	// Add to cart alert
	$( "#btnAddToCart" ).click(function() {
		$("#btnAddToCart").text("Added!")
		setTimeout(function() { 
			$("#btnAddToCart").text("Add to cart");; 
		}, 2500);
		});
});

function LoadProductDetails() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			var product = JSON.parse(response);

			//Fill in details
			$("#productName").html(product.title);
			if(product.image != null)
				$("#productImage").attr("src", product.image);
			$("#productVol").append(product.volume);
			$("#productRev").append(product.revision);
			$("#productFran").append(product.franchise);
			$("#productYear").append(product.year);
			$("#productRating").append(product.rating+"/5");
			//Price
			var formatter = new Intl.NumberFormat('en-AU',{
				style: 'currency',
				currency: 'AUD'
			});
			if(product.salePrice != null){
				$("#productPrice").append("<del>"+formatter.format(product.price)+"</del>");
				$("#salePrice").html(formatter.format(product.salePrice));
			}
			else{
				$("#productPrice").append(formatter.format(product.price));
			}
		}
	}

	//Get ID
	const params = new URLSearchParams(document.location.search);
	const id = params.get("productId");

	//Build URL
	var url = "server/ProductDetailsByID.php?productId="+id;
	xhr.open("GET", url, true);
	xhr.send();
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

function addToCart() {
	// get username from login cookie
	var username = getUsername();

	// check if theres an account is logged in. proceed to add to cart
	if (username) {
		fillCart(username);
		CheckCartCount();
		return;
	}

	// else make a guest cookie login. then use guest cookie to add to cart
	var account = new Object();
	account.username = "guest";
	account.type = 0;
	var json_str = JSON.stringify(account);
	createCookie("login", json_str, 1);;
	fillCart("guest");
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

function fillCart(username) {
	var cart = [];
	let product = new Object();
	var cookie; 
	var json_str = "";

	//Get product ID and quantity
	const params = new URLSearchParams(document.location.search);
	const id = params.get("productId");
	const quantity = document.getElementById("quantity").value;
	
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
	// username=
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