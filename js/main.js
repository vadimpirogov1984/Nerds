function adaptive_header(e,o){var i=$(".header-menu"),s=$(".header__nav-list"),t=$(".header__bascket");e<=765?s.hasClass("done")||(s.addClass("done").appendTo(i),t.addClass("done").appendTo(i)):s.hasClass("done")&&(s.removeClass("done").prependTo($(".header__menu")),t.removeClass("done").prependTo($(".buy")))}function adaptive_function(){adaptive_header($(window).outerWidth(),$(window).outerHeight())}function ibg(){$.each($(".ibg"),function(e,o){0<$(this).find("img").length&&$(this).css("background-image",'url("'+$(this).find("img").attr("src")+'")')})}$(window).resize(function(e){adaptive_function()}),adaptive_function(),$(".menu__icon").click(function(e){$(this).toggleClass("active"),$(".header-menu").toggleClass("active"),$(this).hasClass("active")&&$("body").data("scroll",$(window).scrollTop()),$("body").toggleClass("lock"),$(this).hasClass("active")||$("body,html").scrollTop(parseInt($("body").data("scroll")))}),ibg(),$(".filter__item").click(function(e){var o=$(this).data("filter");1==o?$(".portfolio__column").show():($(".portfolio__column").hide(),$(".portfolio__column.f_"+o).show()),$(".filter__item").removeClass("active"),$(this).addClass("active")}),$(document).ready(function(){$(function(){$(".slider__body").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,arrows:!1,dots:!0,autoplay:!1,autoplaySpeed:2e3,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}},{breakpoint:800,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!1,dots:!0}}]})})});