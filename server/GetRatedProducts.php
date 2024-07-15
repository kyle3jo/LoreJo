<?php

	include 'RetrieveProducts.php';

	//SQL prep
	$count = $_GET['count'];
	$sql = "SELECT * FROM `ebook` ORDER BY Rating DESC LIMIT $count;";

	echo json_encode(RetrieveProducts($sql));
?>