var goodsid=getCookie('goodsid');

ajax('GET','api/database/search_goods1.php','keyword='+goodsid+'&type=search',function(str){
	var data=JSON.parse(str);
	
	//标题渲染
	document.querySelector('#details_body h4').innerHTML=`
		如此生活 》${data[0].store} 》${data[0].title}
	`;
	
	//放大镜右边商品信息的渲染
	document.querySelector('#details_info_title').innerHTML=`
		${data[0].title}
	`;
	document.querySelector('#details_info_price').innerHTML=`
		<span>￥</span>${data[0].price} <span>如此生活价</span>
	`;
	document.querySelectorAll('#details_body_imgbody_right ul li')[3].innerHTML=`
		卖家：<a>${data[0].store}</a>
	`;
	var imgsrcs=data[0].describe_img.split('&');
	for(let i=0;i<imgsrcs.length;i++){
		document.querySelector('#details_body_imgbody_body').innerHTML+=`
			<img src="${imgsrcs[i]}"/>
		`;
	}
})

//cookie 用户名的处理
if(getCookie('username')){
	var nowlog_username=getCookie('username');
	var nowlog_username1=nowlog_username.split('');
	  //用户名处理
	for(let i=3;i<nowlog_username1.length;i++){
		nowlog_username1[i]='*';
		if(i>=nowlog_username1.length-4){
			nowlog_username1=nowlog_username1.join('');
			break;
		}
	}
	show_username.innerHTML='Hi,'+nowlog_username1;
	$('#header #header_header #header_top .log_register').css('display','none');
	$('#header #header_header #header_top .log_username').html('退出');
	$('#header #header_header #header_top .log_username').parent().attr('href','index.html');
		
	if($('#header #header_header #header_top .log_username').html()=='退出'){
		$('#header #header_header #header_top .log_username').click(function(){
			setCookie('username','321',-1)
		})
	}
}