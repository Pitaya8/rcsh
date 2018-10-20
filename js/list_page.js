//点击“全部商品”，该模块隐显示
$('#header_nav_left').click(function(){
	if($('#header_nav_left_show').css('display')=='block'){
		$('#header_nav_left_show').css('display','none');
	}else{
		$('#header_nav_left_show').css('display','block');
	}
})
//导航栏，鼠标滑过背景颜色改变
$('#header_nav_right').on('mouseover','li',function(){
	$(this).css('background','#0068b6');
})
$('#header_nav_right').on('mouseout','li',function(){
	$(this).css('background','#00A3DC');
});

//滑过主体的li，商品信息框变色
$('#list_page_body_content ul').on('mouseover','li',function(){
	$(this).css('border','2px solid #37A0DB');
});
$('#list_page_body_content ul').on('mouseout','li',function(){
	$(this).css('border','1px solid lightgray');
});

//鼠标滑过右边购物车情况时右上角的×，该元素变色，并删除所选的商品
$('#header #header_header #header_right_cartShow ol').on('mouseenter','li',function(){
	console.log(this.children)
	console.log('到了')
	$(this).css('color','orange');
})


//通过cookie获取查询商品的关键字
var string1=getCookie('goods');

//var string1='格力';
var lis=document.querySelectorAll('#list_page_body_bottom_left li'); //主页数据上方的排序
var type='默认';
var z=1;
var datas=0; //临时数据
var date_page_num=0; //总页数
var all_data=0; //总数据
var all_data1=0;
var page_num=document.querySelector('#list_page_body_bottom_right li:nth-of-type(2)'); //右上角显示页面的元素
var mudi=document.querySelector('#list_page_body_content ul'); //主体元素
var list_page_body_bottom_right_li=document.querySelector('#list_page_body_bottom_right li:nth-of-type(1)');
//上面这个是页面右上角的商品总数模块

//函数：ajax获取数据，数据渲染
function datas_fn(string1,type){
	ajax('GET','api/database/search_goods1.php','keyword='+string1+'&type='+type,function(str){
		all_data=JSON.parse(str);
		all_data1=JSON.parse(str);
		//设置每页多少数据
		date_page_num=Math.ceil(all_data.length/15);
		page_num.innerHTML=`
			<span>${z}</span>/${date_page_num}页
		`;
		all_data1=calc_data(1)
		Render(all_data1);		
	});
}

//函数：页面主体+身体右上角的“上一页下一页”,底部页面提示渲染
function Render(dataa){
	//页面主体显示
	let html='';
	mudi.innerHTML='';
	for(let i=0;i<dataa.length;i++){
		html+=`
			<li name='${dataa[i].goodsid}'>
				<img src="${dataa[i].imgsrc}"/>
				<p class="list_page_body_content_p1">${dataa[i].title}</p>
				<p class="list_page_body_content_p2">${dataa[i].describe}</p>
				<span>￥${dataa[i].price}</span><br>
				<i>${dataa[i].store}</i><br>
				<input type="button" value="加入购物车">
				<input type="button" value="关注商品">
			</li>
		`
	};
	mudi.innerHTML=html;
	
	//右上角的“上一页”，“下一页”数据渲染
	page_num.innerHTML=`
		<span>${z}</span>/${date_page_num}页
	`;
	
	//右上角商品总数数据渲染
	let html2='';
	list_page_body_bottom_right_li.innerHTML='';
	list_page_body_bottom_right_li.innerHTML=`
		共<span>${all_data.length}</span>个商品
	`;
}

//函数：输入页数，得到每页的结果
function calc_data(mudi_page){
	let datas=0;
	datas=all_data.slice(15*(mudi_page-1),(15*mudi_page));
	return datas;
}


datas_fn(string1,type);
$('#list_page_body_bottom').on('click','li',function(){
	//点击左上角排序，格子变色
	for(let i=0;i<lis.length;i++){
		lis[i].className='';
	}
	if(this.parentNode.nodeName=='UL'){
		this.setAttribute('class','seleced');
	}
	
	//点击，排序
	if($(this).html()=='价格'){
		type='price';
		mudi.innerHTML='';
		datas_fn(string1,type);
	}else if($(this).html()=='默认'){
		type='默认';
		mudi.innerHTML='';
		datas_fn(string1,type);
	}
	
	
	//点击上一页/下一页
	if(this.children[0].value=='上一页'){
		if(z<=1){z=1;}else{z--;};
		datas=calc_data(z);
		Render(datas);
	}else if(this.children[0].value=='下一页'){
		if(z>=date_page_num){z=date_page_num;}else{z++;};
		datas=calc_data(z);
		Render(datas);
	}
});
var target_elem=$('#header #header_right .header_right_two div span').eq(0);

//给主体的每个li绑定事件，点击后跳转或加入购物车
$('#list_page_body_content').on('click','li',function(){
	var user_infos_cart=0;
	body_right_cart_num_change(target_elem);
	this.onclick=function(e){
		if(e.target.value=='加入购物车'){
			var user_now=getCookie('username'); //当前用户名
			if(user_now){
				//主页右边导航栏的购物车数量变化
				
				
				
				var span_content=target_elem.html();
				target_elem.html(++span_content);
				var cart_goodsid=$(this).attr('name'); //取得点击的商品的id
				var myArr1=new Array();
				var myArr2=new Array();
				//点击加入购物车后，存入数据库
				//先查找数据中用户的购物车情况
				ajax('POST','api/database/search_user.php',
					'username='+user_now,
					function(str){
						//得到用户的所有信息
						var user_infos=JSON.parse(str);
						//得到用户购物车的信息
						user_infos_cart=user_infos[0];
						
						//获得到数据库中购物车商品的所有id
						var shop_cart=user_infos_cart.shop_cart_goodsid;
						var cart_goodsid_index=0;
						//获得数据库中购物车商品的数量
						var shop_cart_num=user_infos_cart.shop_cart_goodsnum;
						
						if(shop_cart!=''){
							
							//获得到数据库中购物车商品的各数量
							shop_cart=shop_cart.split(',');
							shop_cart_num=shop_cart_num.split(',');
							cart_goodsid_index=shop_cart.indexOf(cart_goodsid);
							if(cart_goodsid_index==-1){
								myArr1.push(','+cart_goodsid);
								myArr2.push(',1');
								shop_cart+=myArr1;
								shop_cart_num+=myArr2;
								
							}else{
								var shop_cart_nums=1+Number(shop_cart_num[cart_goodsid_index]);
								shop_cart_num[cart_goodsid_index]=shop_cart_nums;
							}
						}else{
							myArr1.push(cart_goodsid);
							myArr2.push(1);
							shop_cart=myArr1;
							shop_cart_num=myArr2;
						}
						//将处理好的数据存入数据库
						ajax('POST','api/database/update_user.php',
							'username='+user_now+'&shop_cart='+shop_cart+'&shop_cart_num='+shop_cart_num,
							function(str){
							}
						)
					}
				)
			}else{
				alert('您还未登陆');
			}
		}else{
			window.location.href='details.html';
			setCookie('goodsid',$(this).attr('name'),7);
		}
	}
});

//函数：主页右边购物车数量的变化
function body_right_cart_num_change(elem){
	var user=getCookie('username');
	if(user){
		ajax('POST','api/database/search_user.php','username='+user,function(str){
			var data=JSON.parse(str)[0].shop_cart_goodsnum;
			data=data.split(',');
			var num=0;
			for(var i=0;i<data.length;i++){
				num+=Number(data[i]);
			}
			elem.html(num);
		})
	}
}
body_right_cart_num_change(target_elem);

//点击右边信息栏的购物车按钮，该页面显示当前购物车情况
function body_right_cart_show(elem){
	var user=getCookie('username');
	var htmlss='';
	if(user){
		ajax('POST','api/database/search_user.php','username='+user,function(str){
			var data=JSON.parse(str);
			var shop_cart_goodsid=(data[0].shop_cart_goodsid).split(',');
			var shop_cart_goodsnum=(data[0].shop_cart_goodsnum).split(',');

			for(let i=0;i<shop_cart_goodsid.length;i++){
				console.log(shop_cart_goodsid[i])
				ajax('GET','api/database/search_goods1.php',
				  'keyword='+shop_cart_goodsid[i]+'&type='+'search',
					function(str){
						var data1=JSON.parse(str);
						htmlss+=`
							<li>
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
	});
}
}
body_right_cart_show(document.querySelector('#header #header_header #header_right_cartShow ol'))



//cookie的用户名处理
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


//右边购物车显示的功能
$('#header #header_right .header_right_two div').eq(0).click(function(){
	if($('#header #header_header #header_right_cartShow').css('display')=='block'){
		$('#header #header_header #header_right_cartShow').css('display','none');
	}else{
		$('#header #header_header #header_right_cartShow').css('display','block');
	}
	var user_now_cart=getCookie('username');
	if(user_now_cart==undefined){
		$('#header #header_header #header_right_cartShow ol').css('display','none');
		$('#header #header_header #header_right_cartShow h6').html('你还没有加入商品，可以先逛逛哦！')
		$('#header #header_header #header_right_cartShow #goto_cart').css('display','none')
	}
});
