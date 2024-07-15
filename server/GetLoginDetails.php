<?php

	class Account{
		public $username;
		public $password;
		public $email;
		public $type;
		
		function __construct($username, $password, $email, $type){
			$this->username=$username;
			$this->password=$password;
			$this->email=$email;
			$this->type=$type;
		}
	}

	//Get database connection
	ob_start();
	require 'connection.php';
	ob_end_clean();

	//SQL prep
	$username = $_GET['username'];
	$sql = "SELECT * FROM account WHERE Username = \"$username\";";

	//Run Query
	$result = mysqli_query($conn, $sql);

	//Make sure result isnt empty
	if(mysqli_num_rows($result) == 0) {
		echo null;
		exit();
	}

	$row = mysqli_fetch_array($result);
	
	$account = new Account($row['Username'],$row['Password'],$row['Email'],$row['Type']);

	echo json_encode($account);
?>