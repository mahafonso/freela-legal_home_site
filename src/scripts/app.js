$(document).ready(function() {
	'use strict';

	var headerHeight = $('header').outerHeight();

	/* EXIBIR ANIMACOES */
	$(window).scroll(function(e) {
		if ($(window).width() >= 960) {
			$('#itens .bloco').each(function(){
				if ($(window).scrollTop() >= ($(this).offset().top - headerHeight)) {
					$(this).children('div').addClass('active');
					
					if ($(window).scrollTop() + ($(this).offset().top-headerHeight) >= $(this).next().offset().top) {
						$(this).next().children('div').addClass('active');	
					}
				}
			});
		}

		if ($('.menu').hasClass('active')) {
			$('.menu').removeClass('active');
		}
	});

	/* EXIBIR MENU MOBILE */
	$('.link-menu-mobile').click(function(e){
		e.preventDefault();

		if ($('.menu').hasClass('active')) {
			$('.menu').removeClass('active');
		} else {
			$('.menu').addClass('active');
		}
	});

	/* CLIQUE ITENS DO MENU */
	$('header .menu a').click(function(e){
		e.preventDefault();

		$('html,body').animate({
			scrollTop: $( ( $(this).attr('href') || '').split('?')[0] ).offset().top-headerHeight + 'px'
		},'slow');
		$('.menu').removeClass('active');

		return false;
	});

	/* VALIDACAO DE FORMULARIO */
	$('form').each(function(){
		$(this).validate({
			errorPlacement : $.noop
		});
	});

	var enviarFormulario = function(formulario) {
		var formdata = $(formulario).serializeObject();
	};

	/* MODAL */
	$('.arquivo a').click(function(e){
		e.preventDefault();

		var $modal = $('.modal');

		$('.overlay-modal').add($modal).fadeIn();

		return false;
	});

	$('.overlay-modal, .modal .close').click(function(e){
		if(e.target == this) {
			$('.overlay-modal').add($('.modal')).fadeOut();

			return false;
		}
	});

	/* SLIDERS */
	$('.slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplay: true,
		speed: 600,
		autoplaySpeed: 8000
	});

	if($(window).width() < 840) {
		$('.grid').slick({
			dots: false,
			arrows: true,
			infinite: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 480,
				settings: {
					dots: false,
					arrows: true,
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}]
		});
	} else {
		$('.grid').slick('unslick');
	}
});