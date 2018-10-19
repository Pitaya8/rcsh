<?php
	
	//配置信息
	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'myproject_rcsh';
    
    //创建连接，实例化
   
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("SET NAMES utf8");
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }   
    
//  echo '连接成功'; 

?>