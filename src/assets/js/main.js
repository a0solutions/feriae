/*
Theme Name: Lana
Description: Creative Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/lana/
Author URI: https://themeforest.net/user/erilisdesign
Version: 2.1
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------------------
[Table of contents]

1. Loader
2. Fullpage
3. Set Section Scheme
4. Scroll progress
5. Navigation
6. Back to top
7. Backgrounds
8. Animations
9. Countdown
10. Magnific Popup
11. Slider
12. Subscribe Form
13. Contact Form
14. Bootstrap
15. Helper Classes
-------------------------------------------------------------------*/

function scrollAll() {
  "use strict";

  // Vars
  var $body = $(".layout-wide"),
    $ln_fullPage = $(".ln-fullpage"),
    $siteNavbar = $(".site-navbar"),
    $siteNavbarCollapse = $("#navbarCollapse"),
    $siteNavbarToggler = $(".site-navbar .navbar-toggler-alternative"),
    $siteNavbarMenu = $("#navigation"),
    siteNavbar_base = $siteNavbar.attr("data-navbar-base")
      ? $siteNavbar.attr("data-navbar-base")
      : "",
    siteNavbar_toggled = $siteNavbar.attr("data-navbar-toggled")
      ? $siteNavbar.attr("data-navbar-toggled")
      : "",
    siteNavbar_scrolled = $siteNavbar.attr("data-navbar-scrolled")
      ? $siteNavbar.attr("data-navbar-scrolled")
      : "",
    $backtotop = $("a.backtotop"),
    animationsRepeat = true, // true, false - Only when you use Fullpage.js
    trueMobile;

  function getWindowWidth() {
    return Math.max($(window).width(), window.innerWidth);
  }

  function getWindowHeight() {
    return Math.max($(window).height(), window.innerHeight);
  }

  // System Detector
  function ln_systemDetector() {
    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };

    trueMobile = isMobile.any();
  }

  function ln_screenDetector() {
    if (getWindowWidth() >= 1200 && getWindowHeight() >= 768) {
      $body.removeClass("layout-mobile");
    } else {
      $body.addClass("layout-mobile");
    }
  }

  // [1. Loader]
  window.addEventListener("load", function () {
    document.querySelector(".layout-wide").classList.add("loaded");
  });

  // [2. Fullpage]
  function ln_fullpage() {
    if ($ln_fullPage.length > 0) {
      // Generate anchors
      var anchors = [];
      $ln_fullPage.children(".pageData").each(function () {
        var anchor = $(this).data("anchor");

        if (typeof anchor !== "undefined") {
          anchors.push(anchor);
        }
      });

      //Waypoint.destroyAll();

      if (getWindowWidth() >= 1200 && getWindowHeight() >= 768) {
        if (
          !$ln_fullPage.hasClass("fullpage-wrapper") ||
          $ln_fullPage.hasClass("fp-destroyed")
        ) {
          $(".pageData").each(function () {
            var section = $(this),
              sectionHeight = parseInt(section.innerHeight(), 10);
            if (sectionHeight > getWindowHeight()) {
              section.addClass("is-scrollable");
            }
          });

          $body.addClass("ln-fullpage-active");

          $ln_fullPage.fullpage({
            //Scrolling
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 700,
            scrollBar: false,
            easingcss3: "cubic-bezier(0.54, 0.18, 0.36, 0.81)",
            loopBottom: false,
            loopTop: false,
            scrollOverflow: true,

            //Design
            controlArrows: false,
            verticalCentered: false,
            paddingTop: false,
            paddingBottom: false,

            //Custom selectors
            sectionSelector: ".ln-section",
            slideSelector: ".ln-slide",

            // Events
            onLeave: function (index, nextIndex, direction) {
              if (nextIndex === 1) {
                $body.addClass("ln-fullpage-intro-active");
                $backtotop.removeClass("active");
              } else {
                $body.removeClass("ln-fullpage-intro-active");
                $backtotop.addClass("active");
              }

              // Global overlay animation - background color and opacity
              var sectionOverlayColor = $(".pageData")
                  .eq(nextIndex - 1)
                  .attr("data-overlay-color"),
                sectionOverlayOpacity = parseInt(
                  $(".pageData")
                    .eq(nextIndex - 1)
                    .attr("data-overlay-opacity"),
                  10
                );

              if (sectionOverlayColor) {
                $(".overlay-global-color").css(
                  "background-color",
                  sectionOverlayColor
                );
              }
              if (sectionOverlayOpacity) {
                $(".overlay-global-color").css(
                  "opacity",
                  sectionOverlayOpacity / 100
                );
              }

              // Set Section UI Scheme
              var uiScheme = $(".pageData")
                .eq(nextIndex - 1)
                .attr("data-ui");
              var navSelect = $(".pageData")
                .eq(nextIndex - 1)
                .attr("data-anchor");
              ln_setSectionScheme(uiScheme, navSelect);

              // Scroll progress
              ln_scrollProgress(nextIndex);
            },
            afterLoad: function (index) {
              if (index == 1) {
                $body.addClass("ln-fullpage-intro-active");
                $backtotop.removeClass("active");
              } else {
                $backtotop.addClass("active");
              }

              $(".animated").each(function () {
                var element = $(this),
                  animation = element.attr("data-animation") || "fadeInUp",
                  animationDelay =
                    parseInt(element.attr("data-animation-delay"), 10) || 0;

                if (element.parents(".ln-section").hasClass("active")) {
                  if (!element.hasClass("visible")) {
                    if (animationDelay) {
                      setTimeout(function () {
                        element.addClass(animation + " visible");
                      }, animationDelay);
                    } else {
                      element.addClass(animation + " visible");
                    }
                  }
                } else {
                  if ((animationsRepeat = true)) {
                    element.removeClass(animation + " visible");
                  }
                }
              });
            },
            afterRender: function () {
              // Global overlay animation - background color and opacity
              var sectionOverlayColor = $(".pageData")
                  .eq(0)
                  .attr("data-overlay-color"),
                sectionOverlayOpacity = parseInt(
                  $(".pageData").eq(0).attr("data-overlay-opacity"),
                  10
                );

              if (sectionOverlayColor) {
                $(".overlay-global-color").css(
                  "background-color",
                  sectionOverlayColor
                );
              }
              if (sectionOverlayOpacity) {
                $(".overlay-global-color").css(
                  "opacity",
                  sectionOverlayOpacity / 100
                );
              }
              // Set Section UI Scheme
              var uiScheme = $(".pageData").eq(0).attr("data-ui");
              var navSelect = $(".pageData").eq(0).attr("data-anchor");
              ln_setSectionScheme(uiScheme, navSelect);
            },
          });
        }
      } else {
        // Fullpage - Destroy
        if (
          $ln_fullPage.hasClass("fullpage-wrapper") &&
          !$ln_fullPage.hasClass("fp-destroyed")
        ) {
          $body.removeClass(
            "ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark"
          );
          $.fn.fullpage.destroy("all");
          $(".pageData").removeClass("is-scrollable");
        }
        ln_animations();
      }
    } else {
      $body.removeClass(
        "ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark"
      );
      $(".pageData").removeClass("is-scrollable");
      ln_animations();
    }
  }

  // [3. Set Section Scheme]
  function ln_setSectionScheme(uiScheme, navSelect) {
    if (uiScheme === "light") {
      $body.removeClass("ui-dark").addClass("ui-light");
      setTimeout(function () {
        $siteNavbar
          .delay(2000)
          .removeClass("navbar-light")
          .addClass("navbar-dark");
        $(".btn-soft-dark")
          .addClass("btn-soft-white text-white")
          .removeClass("btn-soft-dark text-dark");
        $(".navbar-brand-img").attr("src", "assets/images/logo-light.png");
      }, 500);
    } else if (uiScheme === "dark") {
      $body.removeClass("ui-light").addClass("ui-dark");
      setTimeout(function () {
        $siteNavbar
          .delay(2000)
          .removeClass("navbar-dark")
          .addClass("navbar-light");
        $(".btn-soft-white")
          .addClass("btn-soft-dark  text-dark")
          .removeClass("btn-soft-white  text-white");
        $(".navbar-brand-img").attr("src", "assets/images/logo.png");
      }, 500);
    } else {
      $body.removeClass("ui-dark ui-light");
    }

    setTimeout(function () {
      $siteNavbarMenu
        .find("li")
        .removeClass("active")
        .each(function () {
          if ($(this).attr("data-menuanchor") == navSelect) {
            $(this).addClass("active");
          }
        });
    }, 500);
  }

  // [4. Scroll progress]
  function ln_scrollProgress(nextIndex) {
    if (getWindowWidth() >= 1200) {
      if (nextIndex === "none" && !$body.hasClass("ln-fullpage-active")) {
        var scvp = $(window).scrollTop(),
          dh = $(document).height();
      } else {
        var scvp = getWindowHeight() * (nextIndex - 1),
          dh = $(".pageData").length * getWindowHeight();
      }

      var wh = $(window).height(),
        scrollPercent = (scvp / (dh - wh)) * 100,
        position = scrollPercent;
      $(".scroll-progress .progress").css("height", position + "%");
    }
  }

  // [5. Navigation]

  function ln_navigationResize() {
    var scrollPos = $(window).scrollTop();

    if (getWindowWidth() >= 1200) {
      if ($siteNavbarToggler.attr("aria-expanded") == "true") {
        $siteNavbar.removeClass("navbar-toggled-show");
        $siteNavbarCollapse.removeClass("show").css("display", "");
        $siteNavbarToggler.attr("aria-expanded", "false").addClass("collapsed");
      }
    }

    if (scrollPos > 0) {
      $siteNavbar.addClass("scrolled");
      $siteNavbar.removeClass("scrolled-0");
    } else {
      $siteNavbar.removeClass("scrolled");
      $siteNavbar.addClass("scrolled-0");

      if ($siteNavbar.hasClass("navbar-toggled-show")) {
      } else {
        if ($body.hasClass("ln-fullpage-active")) {
          return false;
        }
      }
    }
  }

  var nav_event_old;

  // [6. Back to top]
  function ln_backToTop() {
    var scrollpos = $(window).scrollTop();

    if (!$body.hasClass("ln-fullpage-active")) {
      if (getWindowWidth() >= 576) {
        if (scrollpos > 100) {
          $backtotop.addClass("active");
        } else {
          $backtotop.removeClass("active");
        }
      } else {
        $backtotop.removeClass("active");
      }
    }

    $backtotop.off("click");
    $backtotop.on("click", function (e) {
      e.preventDefault();

      if ($body.hasClass("ln-fullpage-active")) {
        $.fn.fullpage.moveTo(1);
      } else {
        var target = $(this).attr("href");

        $.smoothScroll({
          offset: 0,
          easing: "swing",
          speed: 800,
          scrollTarget: target,
          preventDefault: false,
        });
      }
    });
  }

  // [7. Backgrounds]
  function ln_backgrounds() {
    // Image
    var $bgImage = $(".bg-image-holder");
    if ($bgImage.length) {
      $bgImage.each(function () {
        var $self = $(this);
        var src = $self.children("img").attr("src");

        $self
          .css("background-image", "url(" + src + ")")
          .children("img")
          .hide();
      });
    }

    // Global overlay animation
    // Add a background color and a opacity to the overlays in the sections that has use a animated backgrounds on scroll
    if ($(".overlay-global").length > 0) {
      $(".pageData").each(function () {
        var element = $(this),
          sectionOverlayOpacity = parseInt(
            element.attr("data-overlay-opacity"),
            10
          ),
          sectionOverlayColor = element.attr("data-overlay-color");

        if (sectionOverlayColor) {
          element
            .find(".overlay.has-mobile-overlay .overlay-inner")
            .css("background-color", sectionOverlayColor);
        }

        if (sectionOverlayOpacity) {
          element
            .find(".overlay.has-mobile-overlay .overlay-inner")
            .css("opacity", sectionOverlayOpacity / 100);
        }
      });
    }

    // Video Background
    if ($body.hasClass("mobile")) {
      $(".video-wrapper").css("display", "none");
    }

    // Granim
    $("[data-gradient-bg]").each(function (index, element) {
      var granimParent = $(this),
        granimID = "granim-" + index + "",
        colours = granimParent.attr("data-gradient-bg"),
        colours = colours.replace(" ", ""),
        colours = colours.replace(/'/g, '"');
      colours = JSON.parse(colours);

      // Add canvas
      granimParent.prepend('<canvas id="' + granimID + '"></canvas>');

      var granimInstance = new Granim({
        element: "#" + granimID,
        name: "basic-gradient",
        direction: "left-right", // 'diagonal', 'top-bottom', 'radial'
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
          "default-state": {
            gradients: colours,
          },
        },
      });
    });
  }

  // [8. Animations]
  function ln_animations() {
    $(".animated").each(function () {
      var $element = $(this);

      new Waypoint({
        element: $element,
        handler: function (direction) {
          var $element = this.element,
            animation = $element.attr("data-animation"),
            animationDelay = parseInt(
              $element.attr("data-animation-delay"),
              10
            );

          if (!$element.hasClass("visible")) {
            if (animationDelay) {
              setTimeout(function () {
                $element.addClass(animation + " visible");
              }, animationDelay);
            } else {
              $element.addClass(animation + " visible");
            }
          }
          this.destroy();
        },
        offset: "100%",
      });
    });
  }

  // [10. Magnific Popup]

  // [11. Slider]
  function ln_slider() {
    var slider = $(".slider");

    if (slider.length > 0) {
      if (getWindowWidth() >= 992 && getWindowHeight() >= 768) {
        if (!slider.hasClass("slick-initialized")) {
          slider.slick({
            slidesToShow: 1,
            infinite: true,
            nextArrow:
              '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
            prevArrow:
              '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
          });
        }
      } else {
        if (slider.hasClass("slick-initialized")) {
          slider.slick("unslick");
        }
      }
    }
  }

  // [13. Contact Form]

  // [14. Bootstrap]
  function ln_bootstrap() {
    // Botostrap Tootltips
    $('[data-toggle="tooltip"]').tooltip();

    // Bootstrap Popovers
    $('[data-toggle="popover"]').popover();
  }

  // [15. Helper Classes]
  function ln_helperClasses() {
    const class_JsMinVh100 = document.querySelectorAll(".js-min-vh-100");
    for (let i = 0; i < class_JsMinVh100.length; i++) {
      class_JsMinVh100[i].style.minHeight = getWindowHeight() + "px";
    }
  }

  $(document).ready(function ($) {
    $("html").scrollTop(0);
    ln_screenDetector();
    ln_helperClasses();
    ln_slider();
    ln_fullpage();
    ln_backgrounds();
  });

  $(window).on("load", function () {
    $(window).scroll();
    ln_helperClasses();
  });

  $(window).on("resize", function () {
    ln_screenDetector();
    ln_helperClasses();
    ln_slider();
    ln_navigationResize();
    ln_fullpage();
    ln_scrollProgress("none");
    ln_backToTop();
  });

  $(window).on("scroll", function () {
    ln_scrollProgress("none");
    ln_backToTop();
  });

  let wrapper;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function writingAll(stringTarget, container) {
    wrapper = document.querySelector("[" + container + "]");
    const stringsContainer = document.getElementsByClassName(stringTarget);

    while (wrapper) {
      for (var i = 0; i < stringsContainer.length; i++) {
        const string = stringsContainer[i].textContent;
        await write(string);
        await sleep(1000);
        await erase();
        await sleep(1000);
      }
    }
  }

  async function write(text) {
    let index = 0;
    while (index < text.length) {
      const timeout = 100;
      await sleep(timeout);
      index++;
      wrapper.innerHTML = text.substring(0, index);
    }
  }

  async function erase() {
    while (wrapper.textContent.length) {
      const timeout = 100;
      await sleep(timeout);
      wrapper.textContent = wrapper.textContent.substring(
        0,
        wrapper.textContent.length - 2
      );
    }
  }

  writingAll("item", "data-text");
}
