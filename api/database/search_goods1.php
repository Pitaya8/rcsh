<?php
	include "connect.php";
	header("content-type:text/html;charset=utf-8");
	$keyword1=isset($_GET['keyword']) ? $_GET['keyword'] :'';
	$type1=isset($_GET['type'])? $_GET['type'] :'' ;
	if($type1=='默认'){
		$sql="select * from info where title like '%$keyword1%' order by goodsid asc";
	}else if($type1=='price'){
		$sql="select * from info where title like '%$keyword1%' order by price desc ";
	}else if($type1=='search'){
		$sql="select * from info where goodsid=$keyword1";
	}
	
	$res=$conn->query($sql);
	$conn->query("SET NAMES utf8");
	$arr=$res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>