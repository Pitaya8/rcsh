<?php
	include "connect.php";
	
	$log_username=isset($_POST['username']) ? $_POST['username'] :'';
	$log_password=isset($_POST['password']) ? $_POST['password'] :'';
	$sql="select * from user where phone_number='$log_username'";
	$res=$conn->query($sql);
	$conn->query("SET NAMES utf8");
	$arr=$res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
	
?>