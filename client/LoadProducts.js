export function LoadProducts(URL, target, suppress = false){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			
			//get json back
			var response = this.responseText;
			//Parse
			try {
				var results = JSON.parse(response);
			} catch (error) {
				if(!suppress)
					$(target).html("<h1>No ebooks found...</h1>");
				return;
			}
			if(results.length == 0){
				if(!suppress)
					$(target).html("<h1>No ebooks found...</h1>");
				return;
			}

			//Iterate through and fill rated
			for (let i = 0; i < results.length; i++){
				var element = "<div class=productItem>"
					+ "<img src='"+( !results[i].image ? "img/placeholder.jpg" : results[i].image )+"'/>"
					+ "<h2>"+results[i].title+"</h2>"
					+ "<p>Volume: "+results[i].volume+"</p>"
					+ "<p>Revision: "+results[i].revision+"</p>"
					+ "<button onclick=\"location.href='product.html?productId="+results[i].id+"'\">View</button>"
					+ "<button onclick=\"addToCart("+results[i].id+")\">Add to Cart</button>"
					+ "</div>";
				$(target).append(element);
			}
		}
	}

	xhr.open("GET", URL, true);
	xhr.send();
}