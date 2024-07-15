<?php

	function RetrieveProducts($sql){
		//Require a database connection
		ob_start();
		require 'connection.php';
		ob_end_clean();
		require 'product.php';

		//Run Query
		$result = mysqli_query($conn, $sql);

		//Make sure result isnt false
		if(mysqli_num_rows($result) == 0) {
			echo "No results Found";
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

		return($products);
	}

?>