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


//给主体的每个li绑定事件，点击后跳转
$('#list_page_body_content').on('click','li',function(){
	this.onclick=function(e){
		if(e.target.value=='加入购物车'){
//			var aa=document.querySelectorALL('#header_right_two div');
			console.log($('#header_right_two div'));
		}else{
			window.location.href='details.html';
			setCookie('goodsid',$(this).attr('name'),7);
		}
	}
});

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



//点击主体每个li的‘加入购物车’ 后加入购物车
//$('#list_page_body_content').on('click','input',function(){
//	console.log($(this))
//})
