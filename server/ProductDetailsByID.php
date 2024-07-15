<?php

	//Require a database connection
	ob_start();
	require 'connection.php';
	ob_end_clean();
	require 'product.php';

	//SQL prep
	$id = $_GET['productId'];
	$sql = "SELECT * FROM `ebook` WHERE id=$id;";

	//Run Query
	$result = mysqli_query($conn, $sql);

	//Make sure result isnt false
	if(!$result) {
		echo "No data in table";
		exit();
	}

	//Iterate through results
	$product;
	$row = mysqli_fetch_array($result);
	$product = new Product(
		$row['ID'],
		$row['Title'],
		$row['Volume'],
		$row['Revision'],
		$row['Franchise'],
		$row['Rating'],
		$row['Year'],
		$row['Price'],
		$row['SalePrice'],
		$row['ImageUrl']
	);

	echo json_encode($product);
?>