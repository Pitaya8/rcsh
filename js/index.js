document.write("<srcipt language=javascript src='js/index_nav/index_nav_info.js'>")

var header_left=['品牌推荐','服饰鞋帽','食品酒水','母婴玩具','日用百货','智能电配','个护化妆','鞋包饰品','户外运动'];
var header_left1=['&#xe64a;','&#xe657;','&#xe60b;','&#xe503;','&#xe624;','&#xe613;','&#x3441;','&#xe618;','&#xe604;'];

$('#header_left ul').on('mouseover','li',function(){
	$(this).children().html(header_left[$(this).index()])
			.css('font-size','12px');
			
	$(this).mouseout(function(){
		$(this).children().html(header_left1[$(this).index()])
			.css('font-size','22px');
	})
});
$('#header_top ul li').click(function(){
	$('#header_top ul li ul').css('display','none');
	$(this).children().eq(1).css('display','block');
});
	

//搜索框
$('#search_btn').click(function(){
	if(search_input.value){
		setCookie('goods',search_input.value,7);
		window.location.href='list_page.html';
	}
})
//搜索框中，按回车跳转页面
search_input.onkeydown=function(e){
	 if(e.keyCode==13){
 		if(search_input.value){
			setCookie('goods',search_input.value,7);
			window.location.href='list_page.html';
			
		}
	} 
}



//banner
//function getScreenW(){
//	var screenW=$(window).width();
////	$('#rcsh_banner').css('width',screenW);
//	$('#rcsh_banner ul').css('width',screenW*5);
//	$('#rcsh_banner ul li img').css('width',screenW);
//}
//getScreenW()
//$(window).resize(function(){
//	getScreenW()
//});

	//banner的轮播图
var div=document.querySelector('#rcsh_body #rcsh_banner');
var ul=document.querySelector('#rcsh_body #rcsh_banner ul');
var btns=document.querySelectorAll('#rcsh_body #rcsh_banner ol li span');
var len=btns.length;
var now = 0;
var tab = ()=>{
	if( now == len ){
		now = 0;
		startMove(ul, {"left":-1200*len}, function(){
			
			ul.style.left = "0px";
		});
	}else{
		startMove(ul, {"left":-1200*now});
	}
	for( var j=0; j<len; j++ ){
		btns[j].className = "";
	}
	btns[now].className = "selected";
}
for( let i=0; i<len; i++ ){
	btns[i].onclick = ()=>{
		now = i;
		tab();
	}
}
var next = ()=>{
	now++;
	tab();
}
var timer = setInterval(next, 2000);
div.onmouseover = ()=>{
	clearInterval(timer);
}
div.onmouseout = ()=>{
	timer = setInterval(next, 2000);
}




//nav数据渲染
$('#header_nav_left_show ol').css('display','none');
$('#header_nav_left_show').on('mouseover','li',function(){
	$(this).css('background','white')
			.css('color','black');
	if($(this).index()>=0){
		$('#header_nav_left_show ol').css('display','block');
		for(let i=0;i<11;i++){
			$('#header_nav_left_show ol li').eq(i).css('display','none');
		}
		$('#header_nav_left_show ol li').eq($(this).index()).css('display','block');
	}
});
$('#header_nav_left ul').on('mouseout','li',function(){
	$(this).css('background','#ff4c7b')
			.css('color','white');
	$('#header_nav_left_show ol').css('display','none');
})
$('#header_nav_left_show').mouseleave(function(){
	$(this).css('display','none')
})
$('#header_nav_left').mouseenter(function(){
	$('#header_nav_left_show').css('display','block')
})


var header_nav_left_show_ul=document.querySelector('#header_nav_left_show ul');
var header_nav_left_show_ol=document.querySelector('#header_nav_left_show ol');
var header_nav_left_show_ul_html='';
var header_nav_left_show_ol_html='';

for(let i=0;i<navData.length;i++){
	header_nav_left_show_ul_html+=`
		<li><span>${navData[i].title}</span></li>
	`;
	header_nav_left_show_ol_html+=`
		<li>
			<dl>
				<dt>${navData[i].title}</dt>
				<dd>男装</dd>
				<dd>男装</dd>
				<dd>男装</dd>
			</dl>
		</li>
	`
}
header_nav_left_show_ul.innerHTML=header_nav_left_show_ul_html;
header_nav_left_show_ol.innerHTML=header_nav_left_show_ol_html;



//rcsh_brand_festival 品牌盛典数据渲染
var rcsh_brand_festival_ul=document.querySelector('#rcsh_brand_festival ul');
ajax("GET","api/database/search_goods.php","",function(str){
	var data=JSON.parse(str);
	var rcsh_brand_festival_ul_html=`
		<li><a><img src="${data[0].imgsrc}" title='${data[0].title}'/></a></li>
	`;
	for(let i=1;i<7;i++){
		rcsh_brand_festival_ul_html+=`
			<li><a><img src="${data[i].imgsrc}" title='${data[i].title}'/></a></li>
		`;
	}
	rcsh_brand_festival_ul.innerHTML=rcsh_brand_festival_ul_html;
});

$(rcsh_brand_festival_ul).on('mouseover','img',function(){
	if($(this).parent().parent().index()!=0){
		$(this).css('left','-5px');
	}
	
})
$(rcsh_brand_festival_ul).on('mouseout','img',function(){
	$(this).css('left','0px');
})


//图片移动函数
function PicMove(elemParent,elem){
	$(elemParent).on('mouseover',elem,function(){
		$(this).css('left','-5px');
	})
	$(elemParent).on('mouseout',elem,function(){
		$(this).css('left','0px');
	})
}

//rcsh_brand_recommend 品牌推荐数据渲染
var rcsh_brand_recommend_ul=document.querySelector('#rcsh_brand_recommend ul');
var rcsh_brand_recommend_ul1=document.querySelectorAll('#rcsh_brand_recommend ul')[1];
ajax('GET','api/database/search_goods.php','',function(str){
	var data=JSON.parse(str)
	var rcsh_brand_recommend_ul_html=`
		<li><a><img src="${data[7].imgsrc}" title='${data[7].title}'/></a></li>
	`
	var rcsh_brand_recommend_ul_html1=`
		<li><a><img src="${data[33].imgsrc}" title='${data[33].title}'/></a></li>
	`
	for(let i=8;i<33;i++){
		rcsh_brand_recommend_ul_html+=`
			<li><a><img src="${data[i].imgsrc}" title='${data[i].title}'/></a></li>
		`
	}
	for(let i=33;i<34;i++){
		rcsh_brand_recommend_ul_html1+=`
			<li><a><img src="${data[i].imgsrc}" title='${data[i].title}'/></a></li>
		`
	}
	rcsh_brand_recommend_ul.innerHTML=rcsh_brand_recommend_ul_html;
	rcsh_brand_recommend_ul1.innerHTML=rcsh_brand_recommend_ul_html1;
	var imgg=document.createElement('img');
	rcsh_brand_recommend.appendChild(imgg);
	imgg.outerHTML=`<img name='imgg' src="${data[35].imgsrc}" title='${data[35].title}'>`
});
PicMove(rcsh_brand_recommend_ul,'img');
PicMove(rcsh_brand_recommend_ul1,'img');



//cookie
if(getCookie('username')!=undefined){
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


//右边购物车显示的功能
$('#header .header_right_two div').eq(0).click(function(){
	if($('#header #header_right_cartShow').css('display')=='block'){
		$('#header #header_right_cartShow').css('display','none');
	}else{
		$('#header #header_right_cartShow').css('display','block');
	}
	var user_now_cart=getCookie('username');
	var html22='';
	console.log('user_now_cart',user_now_cart)
	ajax('POST','api/database/search_user.php','username='+user_now_cart,function(str){
		var data=JSON.parse(str);
		console.log('data',data)
		if(data.length!=0){
			var shop_cart_goodsid=data.shop_cart_goodsid;
			shop_cart_goodsid=(data.shop_cart_goodsid).split(',');
			var shop_cart_goodsnum=data.shop_cart_goodsnum.split(',');
			if(shop_cart_goodsid.length!=0){
				for(let i=0;i<shop_cart_goodsid.length;i++){
					ajax('GET','api/database/search_goods1.php',
				    'keyword='+shop_cart_goodsid[i]+'&type='+'search',
					function(str){
						var data1=JSON.parse(str);
						html22+=`
							<li names='${data1[0].goodsid}'>
								<img src="${data1[0].imgsrc}"/>
								<p>${data1[0].title}</p>
								<p>数量为<span>${shop_cart_goodsnum[i]}</span>件</p>
								<p>￥${data1[0].price*shop_cart_goodsnum[i]}</p>
								<input type="button" class="cart_dele_one" value='×'>
							</li>
						`;
						document.querySelector('#header_right_cartShow ol').innerHTML=html22;
					})
				}
			}else{
				$('#header #header_right_cartShow ol').css('display','none');
				$('#header #header_right_cartShow h6').html('你还没有加入商品，可以先逛逛哦！')
				$('#header #header_right_cartShow #goto_cart').css('display','none')
			}
		}
	});
})


//点击右边信息栏的‘去购物车结算’，跳转页面到购物车
$('#goto_cart').click(function(){
	window.location.href='shop_cart.html';
})
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
body_right_cart_show(document.querySelector('#header #header_right_cartShow ol'))


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
body_right_cart_num_change($('#header_right .header_right_two div span'));


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

//数据库更新函数
function update_data(val,this_id,deal_type){
	var now_user=getCookie('username');
	ajax('POST','api/database/search_user.php',
		'username='+now_user,function(str){
			var data=JSON.parse(str);
			//将从数据库中调出的商品id+商品数量信息进行处理
			var shop_cart_goodsid=(data[0].shop_cart_goodsid).split(',');
			var shop_cart_goodsnum=(data[0].shop_cart_goodsnum).split(',');
			
			if(deal_type=='update'){
				var shop_vart_num=val;
				var shop_cart=this_id;
				var indexs=shop_cart_goodsid.indexOf(shop_cart);
				shop_cart_goodsnum[indexs]=String(shop_vart_num);
			}else if(deal_type=='delet'){
				var indexs=shop_cart_goodsid.indexOf(this_id);  //找到数据库中对应的商品ID的所引致
				shop_cart_goodsid.splice(indexs,1);//删除数组中的该id商品
				shop_cart_goodsnum.splice(indexs,1);
				console.log('shop_cart_goodsid',shop_cart_goodsid)
				console.log('shop_cart_goodsnum',shop_cart_goodsnum)
			}
			//更新到数据库中
			ajax('POST','api/database/update_user.php','username='+now_user+'&shop_cart='+shop_cart_goodsid+'&shop_cart_num='+shop_cart_goodsnum)
		}
	)
}

//置顶功能
$('.icon-dingbu').click(function(){
	document.body.scrollTop=0;
	document.documentElement.scrollTop=0;
})
