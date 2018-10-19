//注册页面
$('#register_phone').blur(function(){
	if(/\d{11}/g.test(register_phone.value)){
		ajax('GET','api/database/insert_user.php','phone='+register_phone.value,
			function(str){
			phone_tip.innerText=str;
		});
	}else{
		phone_tip.innerText='请输入11位数字';
	}
})

$('#register_password1').focus(function(){
	if(register_password.value==''){
		register_password_tip.innerHTML='请输入密码';
	}else{
		if(register_password.value==register_password1.value){
			register_password1_tip.innerHTML='';
		}
		register_password_tip.innerHTML='';
	}
},function(){
	if(register_password.value!=''){
		if(register_password.value==register_password1.value){
			register_password1_tip.innerHTML='';
			register_password_tip.innerHTML='';
		}else{
			register_password1_tip.innerHTML='两次密码不一致';
			register_password_tip.innerHTML='';
		}
		
	}else{
		register_password_tip.innerHTML='请输入密码';
	}
})

//同意注册
register_btn.onclick=function(){
	if(register_checkbox.checked){
			register_checkbox_tip.innerHTML='';
			ajax('POST','api/database/insert_user1.php','phonea='+register_phone.value+'&register_password='+register_password1.value,
				function(str){
					let i=3;
					setInterval(function(){
						if(i==0){
							window.location.href = "log.html";
						}else{
							register_body_register.innerHTML='';
							register_body_register.innerHTML='注册成功！'+i+'秒后跳转登陆页面';
							register_body_register.style.fontSize='30px';
							i--;
						}
					},1000)
			});
		}else{
			register_checkbox_tip.innerHTML='必须同意《用户注册协议》 ！';
		}
}
