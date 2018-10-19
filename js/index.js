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

//侧边栏滑过显示小滑块
$('#header_right .header_right_two ul').on('mousemove','li',function(){
	$(this).children()[1].css('display','block')
})
	

//搜索框
$('#search_btn').click(function(){
	if(search_input.value){
		console.log('123')
		setCookie('goods',search_input.value,7);
		window.location.href='list_page.html';
	}
})





//banner
function getScreenW(){
	var screenW=$(window).width();
	$('#rcsh_banner').css('width',screenW);
	$('#rcsh_banner ul').css('width',screenW*5);
	$('#rcsh_banner ul li img').css('width',screenW);
}
getScreenW()
$(window).resize(function(){
	getScreenW()
});

	//banner的轮播图
var div=document.querySelector('#rcsh_body #rcsh_banner');
var ul=document.querySelector('#rcsh_body #rcsh_banner ul');
var btns=document.querySelectorAll('#rcsh_body #rcsh_banner ol li span');
var len=btns.length;
var now = 0;
var tab = ()=>{
	if( now == len ){
		now = 0;
		startMove(ul, {"left":-$(window).width()*len}, function(){
			ul.style.left = "0px";
		});
	}else{
		startMove(ul, {"left":-$(window).width()*now});
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
	var data=JSON.parse(str)
	var rcsh_brand_festival_ul_html=`
		<li><a><img src="${data[0].imgsrc}" title='${data[0].title}'/></a></li>
	`
	for(let i=1;i<7;i++){
		rcsh_brand_festival_ul_html+=`
			<li><a><img src="${data[i].imgsrc}" title='${data[i].title}'/></a></li>
		`
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

