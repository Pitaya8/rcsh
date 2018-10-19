<?php
	header("content-type:text/html;charset=utf-8");
	include 'connect.php';
	$phone_num=isset($_GET['phone']) ? $_GET['phone'] :'';
	$sql1="select phone_number from user where phone_number=$phone_num";
	$res=$conn->query($sql1);
	$conn->query("SET NAMES utf8");
	if($res->num_rows){
		echo '该号码已被使用，请输入其它号码';
	}else{
//		$sql="insert into user(phone_number,username,password) values('5','feifei','123456')";
		echo '该号码可以注册';
	}
	
	//执行查询语句
//	$res=$conn->query($sql);
//	if($res){
//		echo '插入成功';
//	}
	
	//关闭连接数据库
	
//  $conn->close();//关闭数据库的链接
?>