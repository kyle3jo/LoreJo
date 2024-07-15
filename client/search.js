import { LoadProducts } from "./LoadProducts.js";

const LoadCount = 12;

$(document).ready(function(){

	//Bind search function
	$("#mainSearch").on('keypress',function(e){
		if(e.which == 13){
			window.location.href = "../search.html?search="+$("#mainSearch").val();
		}
	});
	GetResults();
});

function GetResults(){
	
	//Check if there are search parameters
	const params = new URLSearchParams(document.location.search);
	const target = params.get("search");

	var url;
	if(target){
		console.log("Parameters found");
		url = "server/search.php?search="+target+"&count="+LoadCount;
		$("#mainSearch").val(target);
	}//Else get top rated
	else{
		console.log("No parameters")
		url = "server/GetRatedProducts.php?count="+LoadCount;
	}

	LoadProducts(url, "#searchResults")
}