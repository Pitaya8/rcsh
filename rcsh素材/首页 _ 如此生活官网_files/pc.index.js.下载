$(function() {
	$('[data-toggle="tooltip"]').tooltip();

	$(".hkl_user").mouseenter(function() {
		$('#ec_cs_pannel').show();
		$('#ec_cs_pannel').mouseenter(function() {$('#ec_cs_pannel').show();});
		$('#ec_cs_pannel').mouseleave(function() {$('#ec_cs_pannel').hide();});
	});
	$(".hkl_user").mouseleave(function() {
		$('#ec_cs_pannel').mouseenter(function() {$('#ec_cs_pannel').show();});
		$('#ec_cs_pannel').mouseleave(function() {$('#ec_cs_pannel').hide();});
		$('#ec_cs_pannel').hide(); 
	});
	$(".hkl_user").mouseenter(function() {
		$('#hid_cs_pannel').show();
		$('#hid_cs_pannel').mouseenter(function() {$('#hid_cs_pannel').show();});
		$('#hid_cs_pannel').mouseleave(function() {$('#hid_cs_pannel').hide();});
	});
	$(".hkl_user").mouseleave(function() {
		$('#hid_cs_pannel').mouseenter(function() {$('#hid_cs_pannel').show();});
		$('#hid_cs_pannel').mouseleave(function() {$('#hid_cs_pannel').hide();});
		$('#hid_cs_pannel').hide(); 
	});
	$(".rtbar-rocket .rtbar-icon").mouseleave(function() {
		$(this).next().animate({
			right : '75px',
			opacity : '0'
		});
		$(this).next().children('.rtbar-arrow').animate({
			opacity : '0'
		});
		$(this).next().hide();
		$(this).next().children('.rtbar-arrow').fadeOut();
	});

	//TODO
	//
	$('.rtbar .rtbar-cart').click(function() {

	});

	$('.mini-cart-list i.icon-remove').click(function() {
		$(this).parents('li').hide();
	});

	$('#carousel-index').on('slide.bs.carousel', function (e) {
		var item = $(e.relatedTarget);
		var bgimage = item.attr('data-bgimage');
		var bgcolor = item.attr('data-bgcolor');
		$(".banner").attr('style',"background: "+ bgcolor +" url('"+ bgimage+"') no-repeat center center;");

		var img = item.children('img').eq(0);
		img.css({ "width": "850px", "height": "510px" });
		img.animate({
    		"width": "780px",
    		"height": "468px"
  		}, 4000 );
	});
	$('#carousel-index  img').eq(0).animate({
    		"width": "780px",
    		"height": "468px"
  	}, 4000 );

});
