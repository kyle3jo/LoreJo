var totalCost = 0;
var username = getUsername();
var type = getAccountType();

$(document).ready(function(){
	LoadCart();
});

function LoadCart() {	
	var cart = [];
	var cookie; 
	var json_str;

	//grab cart details from cookie
	cookie = getCookie(username);
	json_str = cookie;
	cart = JSON.parse(json_str);

	// Load Products
	for (let i = 0 ; i < cart.length; i++) {
		LoadCartProduct(cart[i].id, cart[i].quantity);
	}
}

function LoadCartProduct(id, quantity) {

	var html = "";

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200){

			// get json back
			var response = this.responseText;
			// parse
			var product = JSON.parse(response);

            // fill in details (only need title, image, volume, revision, price)
			html += "<tr>";
			html += "<th>"  + "<a href=\"product.html?productId=" + product.id + "\">" + "<img src=\"" + product.image + "\" id=\"cartImage\">" + "</a></th>";
			html += "<th>" + "<a href=\"product.html?productId=" + product.id + "\">" + product.title + " | vol." + product.volume + " rev." + product.revision +  "</a></th>";
			html += "<th>" + quantity + "</th>";
			//Price
			var formatter = new Intl.NumberFormat('en-AU',{
				style: 'currency',
				currency: 'AUD'
			});

			// sale
            if(product.salePrice != null){
				html += "<th>" + formatter.format(product.salePrice) + "</th>";
				var totalPrice = product.salePrice * Number(quantity);
				html += "<th>" + formatter.format(totalPrice) + "</th>";
				totalCost += parseFloat(totalPrice);
			}
			// not sale
			else{
				html += "<th>" + formatter.format(product.price) + "</th>";
				var totalPrice = product.price * Number(quantity);
				html += "<th>" + formatter.format(totalPrice) + "</th>";
				totalCost += parseFloat(totalPrice);
            }

			// remove + View buttons
			html += "<th>"
				+ "<button type=\"button\" id=\"" + product.id + "\" class=\"cartRemoveBtn\" onclick=\"removeProduct(this.id);\">Remove</button><br>"
				+ "<button class=\"cartViewBtn\" onclick=\"location.href='product.html?productId="+product.id+"'\">View</button>"
				+ "</th>";

			// append to table
			$("#cartTable").append(html);

			$("#totalCost").text(formatter.format(totalCost));
        }
    }

	//Build URL
	var url = "server/ProductDetailsByID.php?productId="+ id;
	xhr.open("GET", url, true);
	xhr.send();

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

function removeProduct(id) {

	if (confirm("Are you sure you want to remove this item from your cart?")) {
		var cart = [];
		var cookie; 
		var json_str;
	
		//grab cart details from cookie
		cookie = getCookie(username);
		json_str = cookie;
		cart = JSON.parse(json_str);
	
		for (let i = 0 ; i < cart.length; i++) {
			
			// remove the id
			if (cart[i].id == id) {
				cart.splice(i, 1);
			}
		}
	
		// rebuild cookie
		json_str = JSON.stringify(cart);
		createCookie(username, json_str, 1);
	
		// reload page
		location.reload();

	}

}

function clearCart() {

	if (confirm("Are you sure you want to clear your cart?")) {
		createCookie(username, "", 0);
		//reload page
		location.reload();
	}

}

function checkout() {	
	var cookie; 
	var json_str;

	//grab cart details from cookie
	cookieCart = getCookie(username);

	if (!cookieCart) {
		alert("Please add items to your cart before ordering.")
	}

	if (type > 0 && cookieCart) {

		if (confirm("Proceed to order?")) {
			createCookie(username, "", 0);
			alert("You've succesfully ordered!");
			//reload page
			location.reload();
		}
	}
	else {
		alert("Please make an account to continue to order.");
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

function getAccountType() {
    var json_str = getCookie("login");
	if (json_str) {
		var account = JSON.parse(json_str);
		return account.type;
	}

	return "";
}