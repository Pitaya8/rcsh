<?php
	include "connect.php";
	$sql='select * from info';
	$res=$conn->query($sql);
	$conn->query("SET NAMES utf8");
	$arr=$res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>