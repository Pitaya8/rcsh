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
}
$('#header #header_header #header_top .log_username').click(function(){
	if($('#header #header_header #header_top .log_username').html()=='退出'){
		setCookie('username','321',-1);
	}
})

//置顶功能
$('.icon-dingbu').click(function(){
	document.body.scrollTop=0;
	document.documentElement.scrollTop=0;
})

//函数：主页右边购物车数量的变化
function body_right_cart_num_change(elem){
	var user=getCookie('username');
	if(user!=''){
		ajax('POST','api/database/search_user.php','username='+user,function(str){
			var data=JSON.parse(str);
			if(data.length!=0){
				data=JSON.parse(str)[0].shop_cart_goodsnum;
				var num=0;
				if(data!=null){
					data=data.split(',');
					for(var i=0;i<data.length;i++){
						num+=Number(data[i]);
					}
					elem.html(num);
					}
			}
		})
	}
}
body_right_cart_num_change($('#header #header_right .header_right_two div span'));

//点击右边信息栏的购物车按钮，该页面显示当前购物车情况
function body_right_cart_show(elem){
	var user=getCookie('username');
	var htmlss='';
	if(user!=''){
		ajax('POST','api/database/search_user.php','username='+user,function(str){
			var data=JSON.parse(str);
			if(data.length!=0){
				var shop_cart_goodsid=data[0].shop_cart_goodsid;
				if(shop_cart_goodsid!=null){
					shop_cart_goodsid=(data[0].shop_cart_goodsid).split(',');
					var shop_cart_goodsnum=(data[0].shop_cart_goodsnum).split(',');
					for(let i=0;i<shop_cart_goodsid.length;i++){
						ajax('GET','api/database/search_goods1.php',
						  'keyword='+shop_cart_goodsid[i]+'&type='+'search',
							function(str){
								var data1=JSON.parse(str);
								
								htmlss+=`
									<li names='${data1[0].goodsid}'>
										<img src="${data1[0].imgsrc}"/>
										<p>${data1[0].title}</p>
										<p>数量为<span>${shop_cart_goodsnum[i]}</span>件</p>
										<p>￥${data1[0].price*shop_cart_goodsnum[i]}</p>
										<input type="button" class="cart_dele_one" value='×'>
									</li>
								`;
								elem.innerHTML=htmlss;
							}
						)
					}
				}
				
			
		}
	});
}
}
body_right_cart_show(document.querySelector('#header #header_header #header_right_cartShow ol'))

//右边购物车显示的功能
$('#header #header_right .header_right_two div').eq(0).click(function(){
	if($('#header #header_header #header_right_cartShow').css('display')=='block'){
		$('#header #header_header #header_right_cartShow').css('display','none');
	}else{
		$('#header #header_header #header_right_cartShow').css('display','block');
	}
	var user_now_cart=getCookie('username');
//	if(getCookie('username'))
	if(user_now_cart==undefined){
		$('#header #header_header #header_right_cartShow ol').css('display','none');
		$('#header #header_header #header_right_cartShow h6').html('你还没有加入商品，可以先逛逛哦！')
		$('#header #header_header #header_right_cartShow #goto_cart').css('display','none')
	}
});

//点击右边信息栏的‘去购物车结算’，跳转页面到购物车
$('#goto_cart').click(function(){
	window.location.href='shop_cart.html';
})

//鼠标滑过右边购物车情况时右上角的×，该元素变色，并删除所选的商品
$('#header_right_cartShow').on('mouseover','.cart_dele_one',function(){
	$(this).css('color','orange');
});
$('#header_right_cartShow').on('mouseout','.cart_dele_one',function(){
	$(this).css('color','black');
});
$('#header_right_cartShow').on('click','.cart_dele_one',function(){
	var res=confirm('确定删除吗');
	if(res){
		var this_id=$(this).parent().attr('names');
		//数据库的更新
		update_data('1',this_id,'delet');
		//移除该节点
		$(this).parent().remove();
	}

});


//点击加号，增加数量
$('#details_info_other').on('click','.addnum',function(){
	var values=$(this).prev().html();
	values++;
	$(this).prev().html(values);
	
});

//点击减号，增加数量
$('#details_info_other').on('click','.cutnum',function(){
	var values=$(this).next().html();
	values--;
	if(values<=1){
		values=1;
	}
	$(this).next().html(values);
});

//点击'加入购物车'，添加到购物车里
//$('#add_shop_cart').click(function(){
//	var valuess=document.querySelector('.number');
//	ajax('')
//})
