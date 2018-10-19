<?php
	header("content-type:text/html;charset=utf-8");
	include 'connect.php';
	$phone_num1=isset($_POST['phonea']) ? $_POST['phonea'] :'';
	$register_passw=isset($_POST['register_password']) ? $_POST['register_password'] :'';
	
//	echo $phone_num1.$register_passw;
	
	$sql="insert into user(phone_number,password) values('$phone_num1','$register_passw')";
//	echo $sql;
	$res=$conn->query($sql);
	$conn->query("SET NAMES utf8");
	if($res){
		echo '注册成功';
	}else{
		echo '注册失败';
	}

//	$row=$res->fetch_all(MYSQLI_ASSOC);
	$conn->close();
?>