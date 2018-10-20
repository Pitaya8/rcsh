<?php
	header("content-type:text/html;charset=utf-8");
	include 'connect.php';
	$user=isset($_POST['username']) ? $_POST['username'] :'';
	$cart_goodsid=isset($_POST['shop_cart']) ? $_POST['shop_cart'] :'';
	$cart_goodsnum=isset($_POST['shop_cart_num']) ? $_POST['shop_cart_num'] :'';
	
	$sql="update user set shop_cart_goodsid='$cart_goodsid',shop_cart_goodsnum='$cart_goodsnum' where phone_number=$user";
	$res=$conn->query($sql);
	$conn->query("SET NAMES utf8");
	if($res){
		echo $cart_goodsnum.'插入成功';
	}else{
		echo '插入失败';
	}
	$conn->close();
?>