/*Переключение с меню десктоп на мобильное*/
function adaptive_header(e, o) {
  var t = $(".header-menu"),
    n = $(".header__nav-list"),
    i = $(".header__bascket");
  e <= 765
    ? n.hasClass("done") ||
      (n.addClass("done").appendTo(t), i.addClass("done").appendTo(t))
    : n.hasClass("done") &&
      (n.removeClass("done").prependTo($(".header__menu")),
      i.removeClass("done").prependTo($(".buy")));
}
function adaptive_function() {
  adaptive_header($(window).outerWidth(), $(window).outerHeight());
}

/*Формат фонового изображения */

function ibg() {
  $.each($(".ibg"), function(e, o) {
    0 < $(this).find("img").length &&
      $(this).css(
        "background-image",
        'url("' +
          $(this)
            .find("img")
            .attr("src") +
          '")'
      );
  });
}

/*Проверка валидности E-mail */

function isValidEmailAddress(e) {
  return new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  ).test(e);
}

/*Сортировка карточек */

function sortList(e) {
  for (
    var o = document.querySelector(".content__cards"), t = 0;
    t < o.children.length - 1;
    t++
  )
    for (var n = t; n < o.children.length; n++) {
      if (+o.children[t].getAttribute(e) > +o.children[n].getAttribute(e))
        insertAfter(
          o.replaceChild(o.children[n], o.children[t]),
          o.children[t]
        );
    }
}
function sortListDesc(e) {
  for (
    var o = document.querySelector(".content__cards"), t = 0;
    t < o.children.length - 1;
    t++
  )
    for (var n = t; n < o.children.length; n++) {
      if (+o.children[t].getAttribute(e) < +o.children[n].getAttribute(e))
        insertAfter(
          o.replaceChild(o.children[n], o.children[t]),
          o.children[t]
        );
    }
}
function insertAfter(e, o) {
  return o.parentNode.insertBefore(e, o.nextSibling);
}
$(window).resize(function(e) {
  adaptive_function();
}),
  adaptive_function(),
  $(".menu__icon").click(function(e) {
    $(this).toggleClass("active"),
      $(".header-menu").toggleClass("active"),
      $(this).hasClass("active") &&
        $("body").data("scroll", $(window).scrollTop()),
      $("body").toggleClass("lock"),
      $(this).hasClass("active") ||
        $("body,html").scrollTop(parseInt($("body").data("scroll")));
  }),
  ibg(),
  $(".filter__item").click(function(e) {
    var o = $(this).data("filter");
    1 == o
      ? $(".portfolio__column").show()
      : ($(".portfolio__column").hide(), $(".portfolio__column.f_" + o).show()),
      $(".filter__item").removeClass("active"),
      $(this).addClass("active");
  }),
  /*Слайдер на главной странице */
  $(document).ready(function() {
    $(function() {
      $(".slider__body").slick({
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        dots: !0,
        autoplay: !1,
        autoplaySpeed: 2e3,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: !0 }
          },
          { breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: !1,
              dots: !0
            }
          }
        ]
      });
    }),
      /*Двойной ползунок */

      $(function() {
        $("#slider-range").slider({
          range: !0,
          min: 0,
          max: 25e3,
          values: [0, 15e3],
          slide: function(e, o) {
            $("#amount").val(o.values[0]), $("#amount_1").val(o.values[1]);
          }
        }),
          $("#amount").val($("#slider-range").slider("values", 0)),
          $("#amount_1").val($("#slider-range").slider("values", 1));
      });
  }),
  /*Подключение карты */

  $(document).ready(function() {
    ymaps.ready(function() {
      var e = new ymaps.Map("map", { center: [59.938799, 30.32065], zoom: 16 }),
        o = new ymaps.Placemark(
          [59.938635, 30.323118],
          {},
          {
            iconLayout: "default#image",
            iconImageHref: "../images/main/pin.png",
            iconImageSize: [184, 155],
            iconImageOffset: [-35, -170],
            autoFitToViewport: "always"
          }
        );
      e.geoObjects.add(o),
        e.behaviors.disable("scrollZoom"),
        e.controls
          .remove("zoomControl")
          .remove("rulerControl")
          .remove("trafficControl")
          .remove("typeSelector")
          .remove("geolocationControl")
          .remove("fullscreenControl")
          .remove("searchControl");
    });
  }),
  /*Форма отправки */
  $(document).ready(function() {
    $("#form").submit(function() {
      return "" == document.form.name.value
        ? ((valid = !1), valid)
        : ($.ajax({
            type: "POST",
            url: "../php/mail.php",
            data: $(this).serialize()
          }).done(function() {
            $(".js-overlay-thank-you").fadeIn(),
              $(this)
                .find("input")
                .val(""),
              $("#form").trigger("reset");
          }),
          !1);
    });
  }),
  $(".js-close-thank-you").click(function() {
    $(".js-overlay-thank-you").fadeOut();
  }),
  $(document).mouseup(function(e) {
    var o = $(".popup");
    e.target != o[0] &&
      0 === o.has(e.target).length &&
      $(".js-overlay-thank-you").fadeOut();
  }),
  /*Проверка валидности E-mail */

  $(document).ready(function() {
    $("#validate").keyup(function() {
      var e = $("#validate").val();
      0 != e
        ? isValidEmailAddress(e)
          ? $("#validEmail").css({
              "background-image": "url('images/yes.png')",
              "background-repeat": "no-repeat"
            })
          : $("#validEmail").css({
              "background-image": "url('../images/no.png')",
              "background-repeat": "no-repeat"
            })
        : $("#validEmail").css({ "background-image": "none" });
    });
  }),
  /*Открытие формы обратной связи */

  $(".btn-small").click(function() {
    $(".js-overlay-thank-you").fadeIn();
  }),
  /*Сортировка карточек */

  (document.querySelector("#price").onclick = function() {
    (document.querySelector("#sort-up").onclick = function() {
      sortList("data-price");
    }),
      (document.querySelector("#sort-down").onclick = function() {
        sortListDesc("data-price");
      });
  }),
  (document.querySelector("#type").onclick = function() {
    (document.querySelector("#sort-up").onclick = function() {
      sortList("data-type");
    }),
      (document.querySelector("#sort-down").onclick = function() {
        sortListDesc("data-type");
      });
  }),
  (document.querySelector("#characteristic").onclick = function() {
    (document.querySelector("#sort-up").onclick = function() {
      sortList("data-char");
    }),
      (document.querySelector("#sort-down").onclick = function() {
        sortListDesc("data-char");
      });
  });
