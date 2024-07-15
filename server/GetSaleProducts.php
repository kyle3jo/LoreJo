<?php

	include 'RetrieveProducts.php';

	//SQL prep
	$count = $_GET['count'];
	$sql = "SELECT * FROM `ebook` WHERE SalePrice IS NOT NULL LIMIT $count;";

	echo json_encode(RetrieveProducts($sql));
?>