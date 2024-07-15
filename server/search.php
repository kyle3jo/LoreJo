<?php

	//Require a database connection
	ob_start();
	require 'connection.php';
	ob_end_clean();
	require 'product.php';

	//SQL prep
	$target = $_GET['search'];
	$count = $_GET['count'];

	$sql = "SELECT * FROM `ebook` WHERE title LIKE \"%$target%\" OR franchise like \"%$target%\" LIMIT $count;";

	//Run Query
	$result = mysqli_query($conn, $sql);

	//Make sure result isnt false
	if(!$result) {
		//echo "No data in table";
		exit();
	}

	//Iterate through results
	$products = array();
	$i = 0;
	while($row = mysqli_fetch_array($result)){
		$products[$i] = new Product(
			$row['ID'],
			$row['Title'],
			$row['Volume'],
			$row['Revision'],
			$row['Franchise'],
			$row['Rating'],
			$row['Year'],
			$row['Price'],
			$row['SalePrice'],
			$row['ImageUrl']);
		$i++;
	}

	echo json_encode($products);
?>