//list layout view
$('.grid-layout-view').on('click', function (e) {
  $('.products-wrapper-grid').removeClass('list-view');
  $('.products-wrapper-grid').children().children().removeClass('col-xl-12');
});
$('.list-layout-view').on('click', function (e) {
  $('.collection-grid-view').css('opacity', '0');
  $('.products-wrapper-grid').css('opacity', '0.2');
  $('.products-wrapper-grid').addClass('list-view');
  $('.products-wrapper-grid').children().children();
  $('.products-wrapper-grid').children().children().addClass('col-xl-12');
  setTimeout(function () {
    $('.products-wrapper-grid').css('opacity', '1');
  }, 500);
});

// owl carousl
$(document).ready(function () {
  $('#testimonial').owlCarousel({
    items: 1,
    margin: 30,
    loop: true,
    pagination: true,
    navigationText: true,
    dots: false,
    nav: true,
  });
});

// grid options
$('.products-2-layout-view').on('click', function (e) {
  if ($('.products-wrapper-grid').hasClass('list-view')) {
  } else {
    $('.products-wrapper-grid').children().children().removeClass();
    $('.products-wrapper-grid').children().children().addClass('col-xl-6');
    $('.products-wrapper-grid').children().children().addClass('col-sm-6');
  }
});
$('.products-3-layout-view').on('click', function (e) {
  if ($('.products-wrapper-grid').hasClass('list-view')) {
  } else {
    $('.products-wrapper-grid').children().children().removeClass();
    $('.products-wrapper-grid').children().children().addClass('col-xl-4');
    $('.products-wrapper-grid').children().children().addClass('col-sm-4');
  }
});
$('.products-4-layout-view').on('click', function (e) {
  if ($('.products-wrapper-grid').hasClass('list-view')) {
  } else {
    $('.products-wrapper-grid').children().children().removeClass();
    $('.products-wrapper-grid').children().children().addClass('col-xl-3');
    $('.products-wrapper-grid').children().children().addClass('col-sm-3');
  }
});
$('.products-6-layout-view').on('click', function (e) {
  if ($('.products-wrapper-grid').hasClass('list-view')) {
  } else {
    $('.products-wrapper-grid').children().children().removeClass();
    $('.products-wrapper-grid').children().children().addClass('col-xl-2');
  }
});
