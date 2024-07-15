<?php

	include 'RetrieveProducts.php';

	//SQL prep
	$offset = $_GET['offset'];
	$count = $_GET['count'];

	$sql = "SELECT * FROM `ebook` LIMIT $offset, $count;";

	echo json_encode(RetrieveProducts($sql));
?>