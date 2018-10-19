$('#header_nav_left').click(function(){
	if($('#header_nav_left_show').css('display')=='block'){
		$('#header_nav_left_show').css('display','none');
	}else{
		$('#header_nav_left_show').css('display','block');
	}
})

$('#header_nav_right').on('mouseover','li',function(){
	$(this).css('background','#0068b6');
})
$('#header_nav_right').on('mouseout','li',function(){
	$(this).css('background','#00A3DC');
})


//排列、渲染数据
var mudi=document.querySelector('#list_page_body_content ul');
var string1='格力';
var type='默认';
var data=0; //临时数据
var lis=document.querySelectorAll('#list_page_body_bottom_left li');

var datass=0;
var all_data=0;
var date_page_num=0;
datas(string1,type);
var z=1;
var page_num=document.querySelector('#list_page_body_bottom_right li:nth-of-type(2)');

$('#list_page_body_bottom').on('click','li',function(){

	for(let i=0;i<lis.length;i++){
		lis[i].className='';
	}
	if(this.parentNode.nodeName=='UL'){
		this.setAttribute('class','seleced');
		
	}
	
	if($(this).html()=='价格'){
		type='price';
		mudi.innerHTML='';
		datas(string1,type);
	}else if($(this).html()=='默认'){
		type='默认';
		mudi.innerHTML='';
		datas(string1,type);
	}
	
	//点击上一页/下一页
	if(this.children[0].value=='上一页'){
		if(z<=1){z=1;}else{z--;};
		data=calc_data(all_data,z);
		console.log(data)
		page_num.innerHTML='';
		page_num.innerHTML=`
			<span>${z}</span>/${date_page_num}页
		`;
		mudi.innerHTML='';
		
		Render(data);
//		for(let i=0;i<data.length;i++){
//			html1+=`
//				<li>
//					<img src="${data[i].imgsrc}"/>
//					<p class="list_page_body_content_p1">${data[i].title}</p>
//					<p class="list_page_body_content_p2">${data[i].describe}</p>
//					<span>￥${data[i].price}</span><br>
//					<i>${data[i].store}</i><br>
//					<input type="button" value="加入购物车">
//					<input type="button" value="关注商品">
//				</li>
//			`
//		}
//		mudi.innerHTML=html1;
		
	}else if(this.children[0].value=='下一页'){
		z++;
		if(z>=date_page_num){z=date_page_num};
		page_num.innerHTML='';
		page_num.innerHTML=`
			<span>${z}</span>/${date_page_num}页
		`;
		
		data=calc_data(all_data,z);
		Render(data);
	}
})




//函数：ajax获取数据，数据渲染
function datas(string1,type){
	ajax('GET','api/database/search_goods1.php','keyword='+string1+'&type='+type,function(str){
		all_data=JSON.parse(str);
		console.log('all_data',all_data,'str',str);
		//设置每页多少数据
		date_page_num=Math.ceil(all_data.length/15);
		page_num.innerHTML=`
			<span>${z}</span>/${date_page_num}页
		`
		
		data=JSON.parse(str);
		//数据渲染
		var html='';
		var list_page_body_bottom_right_li=document.querySelector('#list_page_body_bottom_right li:nth-of-type(1)');
		list_page_body_bottom_right_li.innerHTML='';
		list_page_body_bottom_right_li.innerHTML=`
			共<span>${data.length}</span>个商品
		`;
		datass=data.splice(0,15);
		Render(datass);
	});
}



//函数：页面主体+身体右上角的“上一页下一页”,底部页面提示渲染
function Render(data){
	//页面主体显示
	let html='';
	mudi.innerHTML='';
	for(let i=0;i<data.length;i++){
		html+=`
			<li>
				<img src="${datass[i].imgsrc}"/>
				<p class="list_page_body_content_p1">${datass[i].title}</p>
				<p class="list_page_body_content_p2">${datass[i].describe}</p>
				<span>￥${datass[i].price}</span><br>
				<i>${datass[i].store}</i><br>
				<input type="button" value="加入购物车">
				<input type="button" value="关注商品">
			</li>
		`
	};
	mudi.innerHTML=html;
	
	//右上角“上一页”，“下一页”数据渲染
	date_page_num=Math.ceil(all_data.length/15);
	console.log(data)
	page_num.innerHTML=`
		<span>${z}</span>/${date_page_num}页
	`;
}




//函数：输入页数，得到每页的结果
function calc_data(data,mudi_page){
	let datas=0;
	datass=data.splice(15*(mudi_page-1),(15*mudi_page));
	return datass;
}
