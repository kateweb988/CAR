window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  $('.about__link').click(function (event) {
    $(this).css('display', 'none');
    $('.about__see').slideToggle();
    $('.about__content').addClass('opened');
    return false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  (function ($) {
    var elActive = '';
    $.fn.selectCF = function (options) {

      // option
      var settings = $.extend({
        color: "#888888", // color
        backgroundColor: "#FFFFFF", // background
        change: function () { }, // event change
      }, options);

      return this.each(function () {

        var selectParent = $(this);
        list = [],
          html = '';

        //parameter CSS
        var width = $(selectParent).width();

        $(selectParent).hide();
        if ($(selectParent).children('option').length == 0) { return; }
        $(selectParent).children('option').each(function () {
          if ($(this).is(':selected')) { s = 1; title = $(this).text(); } else { s = 0; }
          list.push({
            value: $(this).attr('value'),
            text: $(this).text(),
            selected: s,
          })
        })

        // style
        var style = " background: " + settings.backgroundColor + "; color: " + settings.color + " ";

        html += "<ul class='selectCF'>";
        html += "<li>";
        html += "<span class='arrowCF ion-chevron-right' style='" + style + "'></span>";
        html += "<span class='titleCF' style='" + style + "; width:" + width + "px'>" + title + "</span>";
        html += "<span class='searchCF' style='" + style + "; width:" + width + "px'><input style='color:" + settings.color + "' /></span>";
        html += "<ul>";
        $.each(list, function (k, v) {
          s = (v.selected == 1) ? "selected" : "";
          html += "<li value=" + v.value + " class='" + s + "'>" + v.text + "</li>";
        })
        html += "</ul>";
        html += "</li>";
        html += "</ul>";
        $(selectParent).after(html);
        var customSelect = $(this).next('ul.selectCF'); // add Html
        var seachEl = $(this).next('ul.selectCF').children('li').children('.searchCF');
        var seachElOption = $(this).next('ul.selectCF').children('li').children('ul').children('li');
        var seachElInput = $(this).next('ul.selectCF').children('li').children('.searchCF').children('input');

        // handle active select
        $(customSelect).unbind('click').bind('click', function (e) {
          e.stopPropagation();
          if ($(this).hasClass('onCF')) {
            elActive = '';
            $(this).removeClass('onCF');
            $(this).removeClass('searchActive'); $(seachElInput).val('');
            $(seachElOption).show();
          } else {
            if (elActive != '') {
              $(elActive).removeClass('onCF');
              $(elActive).removeClass('searchActive'); $(seachElInput).val('');
              $(seachElOption).show();
            }
            elActive = $(this);
            $(this).addClass('onCF');
            $(seachEl).children('input').focus();
          }
        })

        // handle choose option
        var optionSelect = $(customSelect).children('li').children('ul').children('li');
        $(optionSelect).bind('click', function (e) {
          var value = $(this).attr('value');
          if ($(this).hasClass('selected')) {
            //
          } else {
            $(optionSelect).removeClass('selected');
            $(this).addClass('selected');
            $(customSelect).children('li').children('.titleCF').html($(this).html());
            $(selectParent).val(value);
            settings.change.call(selectParent); // call event change
          }
        })

        // handle search 
        $(seachEl).children('input').bind('keyup', function (e) {
          var value = $(this).val();
          if (value) {
            $(customSelect).addClass('searchActive');
            $(seachElOption).each(function () {
              if ($(this).text().search(new RegExp(value, "i")) < 0) {
                // not item
                $(this).fadeOut();
              } else {
                // have item
                $(this).fadeIn();
              }
            })
          } else {
            $(customSelect).removeClass('searchActive');
            $(seachElOption).fadeIn();
          }
        })

      });
    };
    $(document).click(function () {
      if (elActive != '') {
        $(elActive).removeClass('onCF');
        $(elActive).removeClass('searchActive');
      }
    })
  }(jQuery));

  $(function () {
    var event_change = $('#event-change');
    $(".select").selectCF({
      change: function () {
        var value = $(this).val();
        var text = $(this).children('option:selected').html();
        console.log(value + ' : ' + text);
        event_change.html(value + ' : ' + text);
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  $(window).on('load', function () {
    $(".calc__btn_one").prop('disabled', !$("input[name='formKitchen']:checked").length);
    $("input[name='formKitchen']").on('change', function () {
      $(".calc__btn_one").prop('disabled', !$("input[name='formKitchen']:checked").length);
    });
    // $(".calc__btn_two").prop('disabled', !$("input[name='typeFacade']:checked").length);
    // $("input[name='typeFacade']").on('change', function () {
    //   $(".calc__btn_two").prop('disabled', !$("input[name='typeFacade']:checked").length);
    // });
    // $(".calc__btn_three").prop('disabled', !$("input[name='model']:checked").length);
    // $("input[name='model']").on('change', function () {
    //   $(".calc__btn_three").prop('disabled', !$("input[name='model']:checked").length);
    // });
    $(".calc__btn_four").prop('disabled', !$("input[name='typePanel']:checked").length);
    $("input[name='typePanel']").on('change', function () {
      $(".calc__btn_four").prop('disabled', !$("input[name='typePanel']:checked").length);
    });
    $(".calc__btn_five").prop('disabled', !$("input[name='typeWash']:checked").length);
    $("input[name='typeWash']").on('change', function () {
      $(".calc__btn_five").prop('disabled', !$("input[name='typeWash']:checked").length);
    });
    $(".calc__btn_six").prop('disabled', !$("input[name='classFurniture']:checked").length);
    $("input[name='classFurniture']").on('change', function () {
      $(".calc__btn_six").prop('disabled', !$("input[name='classFurniture']:checked").length);
    });
    $(".calc__btn_seven").prop('disabled', !$("input[name='classF']:checked").length);
    $("input[name='classF']").on('change', function () {
      $(".calc__btn_seven").prop('disabled', !$("input[name='classF']:checked").length);
    });
  });
  $('.calc__btn_one').click(function (event) {
    $('.calc__one').css('display', 'none');
    $('.calc__two').fadeIn();
    return false;
  });
  $('.calc__btn_two').click(function (event) {
    $('.calc__two').css('display', 'none');
    $('.calc__three').fadeIn();
    return false;
  });
  $('.calc__btn_three').click(function (event) {
    $('.calc__three').css('display', 'none');
    $('.calc__four').fadeIn();
    return false;
  });
  $('.calc__btn_four').click(function (event) {
    $('.calc__four').css('display', 'none');
    $('.calc__five').fadeIn();
    return false;
  });
  $('.calc__btn_five').click(function (event) {
    $('.calc__five').css('display', 'none');
    $('.calc__six').fadeIn();
    return false;
  });
  $('.calc__btn_six').click(function (event) {
    $('.calc__six').css('display', 'none');
    $('.calc__seven').fadeIn();
    return false;
  });
  $('.calc__btn_seven').click(function (event) {
    $('.calc__seven').css('display', 'none');
    $('.calc__eight').fadeIn();
    return false;
  });

  $('.calc__two .calc__prev').click(function (event) {
    $('.calc__two').css('display', 'none');
    $('.calc__one').fadeIn();
    return false;
  });

  $('.calc__three .calc__prev').click(function (event) {
    $('.calc__three').css('display', 'none');
    $('.calc__two').fadeIn();
    return false;
  });

  $('.calc__four .calc__prev').click(function (event) {
    $('.calc__four').css('display', 'none');
    $('.calc__three').fadeIn();
    return false;
  });

  $('.calc__five .calc__prev').click(function (event) {
    $('.calc__five').css('display', 'none');
    $('.calc__four').fadeIn();
    return false;
  });

  $('.calc__six .calc__prev').click(function (event) {
    $('.calc__six').css('display', 'none');
    $('.calc__five').fadeIn();
    return false;
  });

  $('.calc__seven .calc__prev').click(function (event) {
    $('.calc__seven').css('display', 'none');
    $('.calc__six').fadeIn();
    return false;
  });
});
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".mySwiper1", {
    spaceBetween: 0,
    slidesPerView: "4",
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  var swiper2 = new Swiper(".swiper2", {
    spaceBetween: 30,
    loop: true,
    slidesPerView: "2",
    navigation: {
      nextEl: ".swiper-button-next2",
      prevEl: ".swiper-button-prev2",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 0,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 15,
        slidesPerView: 2
      },
      1200: {
        spaceBetween: 30,
        slidesPerView: 2
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup1
  let popupBg = document.querySelector('.popup__bg');
  let popup = document.querySelector('.popup');
  let openPopupButtons = document.querySelectorAll('.header__btn, footer__btn, .adaptive__call');
  let closePopupButton = document.querySelector('.close-popup');

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    })
  });

  closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn2 = document.querySelector('.menu-btn2');
  let menu2 = document.querySelector('.menu2');
  menuBtn2.addEventListener('click', function () {
    menuBtn2.classList.toggle('active');
    menu2.classList.toggle('active');
  });
});
