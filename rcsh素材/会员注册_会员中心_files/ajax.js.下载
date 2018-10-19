
//要不要参数:要
/*
	参数一:请求方式  get和post
	参数二:接口
	参数三:参数  (可选)   username='malin'&psw='123456'
	参数四:成功的回调 (可选)  jquery ajax  vuejs ajax xx ajax
	
*/
function ajax(mechod,url,data,success){
	
	var xhr=new XMLHttpRequest();
	
	if(mechod=='GET' && data){
		//如果是get方式，把data拼接url里面
		url+='?'+data;
	}
	
	xhr.open(mechod,url,true);
	
	if(mechod=='GET'){
		//get方式
		xhr.send();
	}else{
		//post方式
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				//正确的数据返回了
				if(success){
					//如果有回调，就用回调函数返回数据
					success(xhr.responseText);
				}
			}
			else{
				alert('出错了，错误码是:'+xhr.status);//404
			}
		}
	}
}
