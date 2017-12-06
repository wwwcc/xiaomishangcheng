$(function () {

    /** 购物车 begin */
    $('#J_miniCartTrigger').hover(function () {
        $(this).addClass('topbar-cart-active');
        $(this).find('.cart-menu').slideDown('slow');
        $(this).find('.loading').html('购物车中还没有商品，赶紧选购吧！');
    }, function () {
        $(this).removeClass('topbar-cart-active');
        $(this).find('.cart-menu').slideUp('slow');
        $(this).find('.loading').html('<div class="loader"></div>');
    })
    /** 购物车 end */

    /** 导航 begin */
    var $box = $('<div id="J_navMenu" class="header-nav-menu" style="display: none;"><div class="container"></div></div>');
    $('.nav-item').hover(function () {
        $(this).addClass('nav-item-active');
        var hasChild = $(this).find('.children-list').length;
        if (hasChild) {
            var newChild = $(this).find('.children-list').clone();
            newChild.find("img").each(function () { $(this).attr("src", $(this).attr("data-src")) })
            $box.find('.container').html(newChild);
            $box.addClass('header-nav-menu-active');
            $box.css({ display: 'block' })
            $('.site-header').append($box)
        } else {
            $box.removeClass('header-nav-menu-active');
            $box.css({ display: 'none' })
        }
    }, function () {
        $(this).removeClass('nav-item-active');
        $box.css({ display: 'none' })
    })

    $box.on({
        mouseenter: function () {
            $box.css({ display: 'block' })
        },
        mouseleave: function () {
            $box.css({ display: 'none' })
        }
    })

    $('.category-item').hover(function () {
        $(this).addClass('category-item-active');
    }, function () {
        $(this).removeClass('category-item-active');
    })
    /** 导航 end */

    /** 轮播图 begin */
    function show(index) {
        $('.ui-pager a').removeClass('active');
        $('.ui-pager a').eq(index).addClass('active');

        $('#J_homeSlider div').fadeOut();
        $('#J_homeSlider div').eq(index).fadeIn('slow')
    }

    var max_index = $('.ui-pager a').length - 1;
    var index = parseInt($('.ui-pager a.active').attr('data-slide-index'));
    $('.ui-prev').on('click', function () {
        index = index - 1;
        if (index < 0) index = max_index
        show(index);
    })
    $('.ui-next').on('click', function () {
        index = index + 1;
        if (index > max_index) index = 0;
        show(index);
    })

    $('.ui-pager a').on('click', function () {
        index = parseInt($(this).attr('data-slide-index'));
        show(index);
    })

    var timer = null;
    function autoPlay() {
        timer = setInterval(function () {
            index = index + 1;
            if (index > max_index) index = 0;
            show(index);
        }, 5000);
    }

    autoPlay();

    $('.home-hero-slider').mouseenter(function () {
        if (timer) {
            clearInterval(timer);
        }
    }).mouseleave(function () {
        autoPlay();
    })
    /** 轮播图 end */

    /** 明星单品 begin */
    var max_size = $('.J_carouselList li').length;
    var pager_size = 5; // 固定死了
    var max_pager = Math.ceil(max_size / pager_size);
    var pager = 1;
    var ml = parseInt($('.J_carouselList').css('margin-left'));
    $('.control-prev').on('click', function () {
        if (pager > 1) {
            ml = ml + 1240;
            pager = pager - 1;
            $('.J_carouselList').animate({ width: 2480, 'margin-left': ml }, 1000);
            if (pager <= 1) {
                $(this).addClass('control-disabled');
                $('.control-next').removeClass('control-disabled');
            }
        }
    })
    $('.control-next').on('click', function () {
        if (pager < max_pager) {
            pager = pager + 1;
            ml = ml - 1240;
            $('.J_carouselList').animate({ width: 2480, 'margin-left': ml }, 1000);
            if (pager >= max_pager) {
                $(this).addClass('control-disabled');
                $('.control-prev').removeClass('control-disabled');
            }
        }
    })

    var timer2 = null;
    function autoPlay2() {
        timer2 = setInterval(function () {
            if (pager > 1)
                $('.control-prev').trigger('click');
            else 
                $('.control-next').trigger('click');
        }, 5000);
    }

    autoPlay2();

    $('.control-prev').mouseenter(function () {
        if (timer) {
            clearInterval(timer2);
        }
    }).mouseleave(function () {
        autoPlay2();
    })

    $('.control-next').mouseenter(function () {
        if (timer) {
            clearInterval(timer2);
        }
    }).mouseleave(function () {
        autoPlay2();
    })
    /** 明星单品 end */


})