
	$(function() {
		var scrollTimer,
			html = '',
			$menu = $(".macth-dropdown-menu");



		$menu.menuAim({
			activate: activateSubmenu,
			deactivate: deactivateSubmenu,
			exitMenu: function() {
				$(".macth_popover").hide();
				$(".macth_xvh3_a a.maintainHover").removeClass("maintainHover");
				$('.macth_xvitem.macth_itemhover').removeClass('macth_itemhover');
				$('.macth_xvitem s').show();
			}
		});

		function activateSubmenu(row) {
			var $row = $(row),
				submenuId = $row.data("submenuId"),
				$submenu = $("#" + submenuId),
				// height = $menu.outerHeight(),
				width = $menu.outerWidth();
			$submenu.css({
				display: "block",
				top: -1,
				left: width + 5
			});
			$row.addClass('macth_itemhover');
			$row.find("h3 a").addClass("maintainHover");
			$row.find("h3 s").hide();
		}

		function deactivateSubmenu(row) {
			var $row = $(row),
				submenuId = $row.data("submenuId"),
				$submenu = $("#" + submenuId);
			$submenu.hide();
			$row.removeClass('macth_itemhover');
			$row.find("h3 a").removeClass("maintainHover");
			$row.find("h3 s").show();
		}


		function showhide(dom,child){
			$(dom).hover(function() {
				$(this).addClass('active').find(child).show();
				$(this).siblings().find('.show').hide();
				$(this).siblings().removeClass('active');
			}, function() {
			});
		}
	});