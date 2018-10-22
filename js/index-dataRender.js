

//1F 2F 3F 4F 5F you_like数据渲染
var one_f_right_ul=document.querySelector('#one_f  #one_f_right ul');
var two_f_right_ul=document.querySelector('#two_f  #two_f_right ul');
var three_f_right_ul=document.querySelector('#three_f  #three_f_right ul');
var four_f_right_ul=document.querySelector('#four_f  #four_f_right ul');
var five_f_right_ul=document.querySelector('#five_f  #five_f_right ul');
var you_like_ul=document.querySelector('#you_like>ul');
ajax('GET','api/database/search_goods.php','',function(str){
	//1F
	var data=JSON.parse(str).splice(36,8);
	
	//2F
	var data1=JSON.parse(str).splice(44,8);
	
	//3F
	var data2=JSON.parse(str).splice(52,6);
	
	//4F
	var data3=JSON.parse(str).splice(58,8);
	
	//5F
	var data4=JSON.parse(str).splice(66,8);
	
	
	//you like
	var data5=JSON.parse(str).splice(74,5);
	
	var parent_one=("one_f_right_ul").slice(0,5);
	var parent_two=("two_f_right_ul").slice(0,5);
	var parent_three=("three_f_right_ul").slice(0,7);
	var parent_four=("four_f_right_ul").slice(0,6);
	var parent_five=("five_f_right_ul").slice(0,6);
	var you_like=("you_like_ul").slice(0,7);
	
	dataRender(two_f_right_ul,parent_one,data1);
	dataRender(one_f_right_ul,parent_two,data);
	dataRender(three_f_right_ul,parent_three,data2);
	dataRender(four_f_right_ul,parent_four,data3);
	dataRender(five_f_right_ul,parent_five,data4);
	
	//渲染you like模块
	var ul_li_html='';
	for(let i=0;i<data5.length;i++){
		ul_li_html+=`
			<li>
				<ul>
					<li><img src="${data5[i].imgsrc}"/></li>
					<li><p>${data5[i].describe}</p>
					</li>
					<li>
						￥${data5[i].price}
					</li>
					<li>
						<span>
							我要购买
						</span>
					</li>
				</ul>
			</li>
		`
	}
	you_like_ul.innerHTML=ul_li_html;
	
});
PicMove(one_f_right_ul,'img');
PicMove(two_f_right_ul,'img');
PicMove(three_f_right_ul,'img');
PicMove(four_f_right_ul,'img');
PicMove(five_f_right_ul,'img');
function dataRender(elem,parenta,data){
	var html='';
	var imgg=document.createElement('img');
	var parentaa=document.getElementById(parenta);
	parentaa.appendChild(imgg);
	for(let i=0;i<data.length-1;i++){
		html+=`
			<li><a><img src="${data[i].imgsrc}" title='${data[i].title}'/></a></li>
		`
	}
	elem.innerHTML=html;
	imgg.outerHTML=`
		<img name='imgg' src="${data[data.length-1].imgsrc}" title='${data[data.length-1].title}'>
	`
}
