/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/global-animations.js":
/*!**************************************!*\
  !*** ./scripts/global-animations.js ***!
  \**************************************/
/***/ (() => {

gsap.defaults({
  ease: "power4.out"
});
var header = document.querySelector("header");

/* FOOTER */
var footer = document.querySelector("footer");
var footertl = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true
  }
});
footertl.from(footer.querySelector(".bottom-letter"), {
  x: 100
}, "<");
footertl.from(footer.querySelector(".top-letter"), {
  x: -100
}, "<");
if (window.location.pathname === "/") {
  var lastScrollTop;
  window.addEventListener("scroll", function () {
    var windowPos = window.pageYOffset || document.scrollTop || 0;
    if (windowPos >= window.innerHeight / 2 && windowPos > lastScrollTop) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    if (windowPos >= window.innerHeight) {
      header.classList.add("show-logo");
    } else {
      header.classList.remove("show-logo");
    }

    // used to detect scroll position
    lastScrollTop = windowPos <= 0 ? 0 : windowPos;
  });
}
var headerMenu = document.querySelector(".header__mobile-menu");
var headerAnimation = gsap.timeline({
  paused: true
});
headerAnimation.from(".header__mobile-menu", {
  autoAlpha: 0
});
headerAnimation.from(".header__mobile-menu a", {
  y: "100%",
  autoAlpha: 0,
  stagger: 0.05
}, "<");
document.querySelector(".header__menu-button").addEventListener("click", function () {
  document.documentElement.style.overflow = "hidden";
  header.classList.add("show-mobile-menu");
  headerAnimation.play();
});
document.querySelector(".header__menu-button-close").addEventListener("click", function () {
  document.documentElement.style.overflow = "";
  gsap.to(".header__mobile-menu", {
    autoAlpha: 0,
    onComplete: function onComplete() {
      headerAnimation.seek(0);
      headerAnimation.pause();
      header.classList.remove("show-mobile-menu");
      header.classList.remove("hide");
    }
  });
});
document.querySelector(".copy-year").innerText = new Date().getFullYear();
var cookieNotice = document.querySelector(".cookie-notice");
if (window.location.pathname !== "/") {
  if (!localStorage["cookie_dismissed"]) {
    gsap.to(cookieNotice, {
      autoAlpha: 1
    });
  }
}
cookieNotice.querySelector(".cookie-notice__accept").addEventListener("click", function () {
  localStorage.setItem("cookie_dismissed", true);
  dataLayer.push("config", "G-ZK3Q35ZF40", {
    anonymize_ip: true,
    page_title: document.title,
    page_location: window.location.href
  });
  gsap.to(cookieNotice, {
    autoAlpha: 0
  });
});

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_DrawSVGPlugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap/DrawSVGPlugin */ "./node_modules/gsap/DrawSVGPlugin.js");
/* harmony import */ var gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gsap/SplitText */ "./node_modules/gsap/SplitText.js");
/* harmony import */ var _global_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-animations.js */ "./scripts/global-animations.js");
/* harmony import */ var _global_animations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global_animations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _page_transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page-transitions.js */ "./scripts/page-transitions.js");
/* harmony import */ var _page_transitions_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_page_transitions_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sw.js */ "./scripts/sw.js");
/* harmony import */ var _sw_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sw_js__WEBPACK_IMPORTED_MODULE_2__);






gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.registerPlugin(gsap_DrawSVGPlugin__WEBPACK_IMPORTED_MODULE_4__.DrawSVGPlugin, gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__.SplitText);
window.addEventListener("load", function () {
  var dropdowns = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray("[data-dropdown]");
  dropdowns.forEach(function (dropdown) {
    var content = dropdown.nextSibling.nextSibling;
    var contentHeight = content.clientHeight;
    content.style.height = 0;
    dropdown.addEventListener("click", function (e) {
      var button = e.currentTarget;
      dropdowns.forEach(function (dd) {
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(dd.nextSibling.nextSibling, {
          height: 0
        });
        dd.classList.remove("dropdown-active");
      });
      if (content.style.height !== "0px") {
        button.classList.remove("dropdown-active");
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(content, {
          height: 0
        });
      } else {
        button.classList.add("dropdown-active");
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(content, {
          height: contentHeight + "px"
        });
      }
    });
  });
});

/*
 * FAQ Dropdowns
 */
var hash = window.location.hash.substring(1);
var jumpToSection = hash ? document.getElementById(window.location.hash.substring(1)) : null;
var mm = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.matchMedia(),
  breakPoint = 1024;
mm.add({
  isDesktop: "(min-width: ".concat(breakPoint, "px)"),
  isMobile: "(max-width: ".concat(breakPoint - 1, "px)"),
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, function (context) {
  var _context$conditions = context.conditions,
    isDesktop = _context$conditions.isDesktop,
    isMobile = _context$conditions.isMobile,
    reduceMotion = _context$conditions.reduceMotion;
  var intentObserver,
    hasExited = false;
  var heroEl = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector(".hero-intro");
  var heroText = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray(".hero-intro h1 div");
  var logo = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector(".intro__logo");
  var mobileLogo = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector(".intro__logo--mobile");
  var Sections = Array.from(document.querySelectorAll(".fixed-page > *"));
  var heroTextOne = new gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__.SplitText(heroText[0], {
    type: "words"
  });
  var heroTextTwo = new gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__.SplitText(heroText[1], {
    type: "words"
  });
  var introAnimation = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
    onComplete: function onComplete() {
      sessionStorage.setItem("intro-seen", true);
      if (intentObserver) {
        intentObserver.enable();
      }
      document.querySelector(".nav").classList.add("animation-complete");
    }
  });
  if (!sessionStorage.getItem("intro-seen")) {
    introAnimation.set(heroEl("h1"), {
      autoAlpha: 1
    });

    /* INTRO ANIMATION */
    introAnimation.from(heroTextOne.words, {
      rotateY: "10deg",
      x: 20,
      stagger: 0.04,
      autoAlpha: 0,
      duration: 1
    });
    introAnimation.to(heroEl("h1 .page-one"), {
      y: 0,
      autoAlpha: 0.5,
      scale: 0.9,
      duration: 2
    }, "+=.5");
    introAnimation.from(heroTextTwo.words, {
      rotateY: "10deg",
      x: 20,
      stagger: 0.04,
      autoAlpha: 0,
      duration: 2
    }, "<10%");
    introAnimation.to(".hero-intro__blob", {
      delay: 0.5,
      clipPath: "circle(4% at 50% 100%)",
      ease: "elastic.out(1, 0.75)",
      duration: 1
    }, "+=1");
    introAnimation.to(heroEl("h1"), {
      scale: ".95",
      duration: 1,
      autoAlpha: 0
    });
    introAnimation.to(".hero-intro__blob", {
      clipPath: "circle(100% at 50% 75%)",
      duration: 2
    }, "<");
    introAnimation.set("#intro", {
      background: "#111111"
    });
    introAnimation.set([".hero-intro__blob", heroEl(".hero-intro--page-one")], {
      autoAlpha: 0
    });
    introAnimation.set(heroEl(".hero-intro--page-two"), {
      autoAlpha: 1
    });
    introAnimation.from(isMobile ? mobileLogo(".bottom-letter") : logo(".bottom-letter"), {
      autoAlpha: 0,
      x: -5,
      y: -5,
      ease: "elastic.out(2, 0.75)",
      duration: 1
    });
    introAnimation.from(isMobile ? mobileLogo(".top-letter") : logo(".top-letter"), {
      autoAlpha: 0,
      x: 5,
      y: 5,
      ease: "elastic.out(2, 0.75)",
      duration: 1
    }, "<");
    introAnimation.fromTo(isMobile ? mobileLogo(".ventures path") : logo(".ventures path"), {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      stagger: 0.05,
      duration: 1
    });
    introAnimation.fromTo(isMobile ? mobileLogo(".draw-me") : logo(".draw-me"), {
      drawSVG: "0%",
      ease: "none"
    }, {
      drawSVG: "-100%",
      duration: 2
    }, "<");
    introAnimation.from(heroEl(".scroll-down"), {
      autoAlpha: 0,
      duration: 2
    });
    introAnimation.set(".nav", {
      autoAlpha: 1
    }, "<");
    introAnimation.from(".nav li a", {
      x: -100,
      autoAlpha: 0,
      attr: {
        "class": "nav__button active"
      },
      stagger: 0.05
    }, "<");
    if (!localStorage["cookie_dismissed"]) {
      introAnimation.to(cookieNotice, {
        autoAlpha: 1
      }, "<");
    }
  } else {
    introAnimation.to("#intro", {
      background: "#111111"
    });
    introAnimation.set(heroEl(".hero-intro--page-two"), {
      autoAlpha: 1
    }, "<");
    introAnimation.from(heroEl(".bottom-letter"), {
      x: isMobile ? -3 : -5,
      y: isMobile ? -3 : -5,
      ease: "elastic.out(2, 0.75)"
    });
    introAnimation.from(heroEl(".top-letter"), {
      x: isMobile ? 3 : 5,
      y: isMobile ? 3 : 5,
      ease: "elastic.out(2, 0.75)"
    }, "<");
    introAnimation.fromTo(heroEl(".ventures path"), {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      stagger: 0.05
    });
    introAnimation.fromTo(isMobile ? mobileLogo(".draw-me") : logo(".draw-me"), {
      drawSVG: "0%",
      ease: "none",
      autoAlpha: 1
    }, {
      drawSVG: "-100%",
      duration: 2
    }, "<");
    introAnimation.from(heroEl(".scroll-down"), {
      autoAlpha: 0
    });
    if (!jumpToSection) {
      introAnimation.set(".nav", {
        autoAlpha: 1
      }, "<");
      introAnimation.from(".nav li a", {
        x: -100,
        autoAlpha: 0,
        attr: {
          "class": "nav__button active"
        },
        stagger: 0.05
      }, "<");
    } else {
      introAnimation.to(".nav", {
        autoAlpha: 1
      });
    }
    if (!localStorage["cookie_dismissed"]) {
      introAnimation.to(cookieNotice, {
        autoAlpha: 1
      }, "<");
    }
  }
  if (isDesktop) {
    var gotoPanel = function gotoPanel(index, isScrollingDown, isQuickNav) {
      var _Sections$currentInde, _Sections$index, _Sections$index2;
      if (index <= -1 || index === currentIndex) {
        return;
      }

      // portfolio functionality
      if (currentIndex === 5 && (portfolioDirection === 1 && !isScrollingDown || portfolioDirection === -1 && isScrollingDown)) {
        intentObserver.disable();
        return;
      }
      if (porfolioLinks.length > 15) {
        // enable scrolling on Portfolio section
        if (index === 5) {
          intentObserver.disable();
        } else {
          intentObserver.enable();
        }
      }
      document.querySelector("body").style.overflow = "hidden";

      // prevent immediate scroll from button
      if (hasExited) {
        setTimeout(function () {
          hasExited = false;
        }, 500);
        return;
      }
      animating = true;
      var isSlider = index > 0 && index < document.querySelectorAll(".facts__section").length + 1;
      var shouldSlide = "";
      if (isScrollingDown && (_Sections$currentInde = Sections[currentIndex]) !== null && _Sections$currentInde !== void 0 && (_Sections$currentInde = _Sections$currentInde.className) !== null && _Sections$currentInde !== void 0 && _Sections$currentInde.match("facts__section")) {
        shouldSlide = "exit";
      } else if (!isScrollingDown && (_Sections$index = Sections[index]) !== null && _Sections$index !== void 0 && (_Sections$index = _Sections$index.className) !== null && _Sections$index !== void 0 && _Sections$index.match("facts__section")) {
        shouldSlide = "enter";
      } else if ((_Sections$index2 = Sections[index]) !== null && _Sections$index2 !== void 0 && (_Sections$index2 = _Sections$index2.className) !== null && _Sections$index2 !== void 0 && _Sections$index2.match("facts__section") && isQuickNav) {
        shouldSlide = "enter";
      }
      if (pageAnimations[index]) {
        pageAnimations[index].seek(0);
        pageAnimations[index].pause();
      }

      // Highlight correct nav
      navLinks.forEach(function (link) {
        var indexes = link.getAttribute("data-indexes").split(",");
        link.classList.remove("active");
        link.classList.remove("previous");
        for (var linkIndex = 0; linkIndex < indexes.length; linkIndex++) {
          var i = Number(indexes[linkIndex]);
          if (i <= index) {
            link.classList.add("previous");
            if (i === index) {
              link.classList.remove("previous");
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          }
        }
      });

      // return to normal scroll if we're at the end or back up to the start
      if (index === Sections.length && isScrollingDown) {
        var _target = index;
        document.querySelector("body").style.overflow = "";
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(_target, {
          // xPercent: isScrollingDown ? -100 : 0,
          duration: 0.0,
          onComplete: function onComplete() {
            animating = false;
            hasExited = true;
            isScrollingDown && intentObserver.disable();
          }
        });
        return;
      }
      var target = isScrollingDown ? Sections[index] : Sections[currentIndex];
      header.classList.toggle("hide", isScrollingDown && !isQuickNav);
      var transition = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
        duration: 0.75,
        ease: "power1.in",
        onComplete: function onComplete() {
          if (!pageAnimations[index]) {
            animating = false;
          }
        },
        onStart: function onStart() {
          var _document$querySelect;
          (_document$querySelect = document.querySelector(".active-slide")) === null || _document$querySelect === void 0 || _document$querySelect.classList.remove("active-slide");

          // on page load, sometimes target is unavailable
          if (target) {
            target.classList.add("active-slide");
          }
          gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("body", {
            color: Sections[index].getAttribute("data-bg") === "#ffffff" ? "#3E3E3E" : "#ffffff"
          });
          gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to("header", {
            color: Sections[index].getAttribute("data-bg") === "#ffffff" ? "#000000" : "#ffffff"
          });
          if (pageAnimations[index]) {
            setTimeout(function () {
              pageAnimations[index].eventCallback("onComplete", function () {
                animating = false;
              });
              pageAnimations[index].play();
            }, 250);
          }
        }
      });
      if (!isSlider) {
        // Makes sure the line fades out before transition
        transition.to(".facts-section-line", {
          autoAlpha: 0
        }, "<");
      }

      // make sure all previous slides are visible when using quicknav
      // quicknav pretty much takes over animating just the before and after slides
      if (isQuickNav) {
        if (shouldSlide && !isScrollingDown) {
          transition.set(Sections[index].querySelector(".facts__section-content"), {
            xPercent: 0,
            autoAlpha: 1
          });
        }
        for (var i = 0; i < Sections.length - 1; i++) {
          if (i === currentIndex || i === index) {
            if (!isScrollingDown) {
              transition.set(Sections[index], {
                autoAlpha: 1
              });
              transition.to(Sections[currentIndex], {
                autoAlpha: 0
              });
            } else {
              transition.to(Sections[index], {
                autoAlpha: 1
              });
              if (Sections[currentIndex]) {
                // This may not exist if there is a # in url
                transition.set(Sections[currentIndex], {
                  autoAlpha: 0
                });
              }
            }
          } else {
            transition.set(Sections[i], {
              autoAlpha: 0
            });
          }
        }
      } else {
        // else navigating normally

        // horizontal scroll section
        if (shouldSlide) {
          if (!isScrollingDown) {
            transition.to(Sections[currentIndex], {
              autoAlpha: 0
            }, "<");
            if (isSlider) {
              if (Sections[currentIndex].querySelector(".facts__section-content")) {
                transition.to(Sections[currentIndex].querySelector(".facts__section-content"), {
                  xPercent: 20,
                  autoAlpha: 0
                }, "<");
              }
              transition.fromTo(Sections[index].querySelector(".facts__section-content"), {
                xPercent: -20,
                autoAlpha: 0
              }, {
                xPercent: 0,
                autoAlpha: 1
              }, "<50%");
            }
            transition.to(Sections[index], {
              autoAlpha: 1
            }, "<");
          } else {
            transition.to(Sections[currentIndex], {
              autoAlpha: 0
            }, "<");
            if (isSlider) {
              transition.to(Sections[currentIndex].querySelector(".facts__section-content"), {
                xPercent: -20,
                autoAlpha: 0
              }, "<");
              if (Sections[index].querySelector(".facts__section-content")) {
                transition.fromTo(Sections[index].querySelector(".facts__section-content"), {
                  xPercent: 20,
                  autoAlpha: 0
                }, {
                  xPercent: 0,
                  autoAlpha: 1
                }, "<50%");
              }
            }
            transition.to(Sections[index], {
              autoAlpha: 1
            }, "<");
          }
        } else {
          // Normal scroll
          if (!isScrollingDown) {
            Sections.forEach(function (section, i) {
              if (i < currentIndex) {
                transition.set(section, {
                  autoAlpha: 1
                });
              }
            });
          }
          transition.to(target, {
            autoAlpha: isScrollingDown ? 1 : 0
          }, isScrollingDown ? "<50%" : "");
        }
      }

      // horizontal scroll line
      if (isSlider) {
        transition.to(".facts-section-line", {
          autoAlpha: 1
        }, "<");
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.fromTo(".facts-section-line path", {
          drawSVG: 100 / document.querySelectorAll(".facts__section").length * currentIndex + "%",
          duration: 2
        }, {
          drawSVG: 100 / document.querySelectorAll(".facts__section").length * index + "%",
          duration: 2
        }, "<");
      } else {
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.fromTo(".facts-section-line path", {
          drawSVG: 100 / document.querySelectorAll(".facts__section").length * currentIndex + "%"
        }, {
          drawSVG: index === 0 ? "0 0" : "-100% 100%"
        }, "<");
      }
      currentIndex = Number(index);
      if (currentIndex > 0) {
        // horizontal scroll needs a backgorund as each slide is offset sideways and does not have
        // the previous slide 'behind' it
        document.getElementById("intro").classList.add("add-background");
        header.classList.add("show-logo");
      } else {
        document.getElementById("intro").classList.remove("add-background");
        header.classList.remove("show-logo");
      }
    };
    var currentIndex = -1;
    var animating;
    var pageAnimations = [false];
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.set(Sections, {
      zIndex: function zIndex(i) {
        return i;
      },
      autoAlpha: function autoAlpha(i) {
        return !i ? 1 : 0;
      },
      attr: {
        "data-index": function dataIndex(i) {
          return i + 1;
        }
      }
    });
    intentObserver = ScrollTrigger.observe({
      type: "scroll,wheel,touch",
      onUp: function onUp() {
        return !animating && gotoPanel(currentIndex - 1, false);
      },
      onDown: function onDown() {
        return !animating && gotoPanel(currentIndex + 1, true);
      },
      onLeft: function onLeft() {
        return !animating && currentIndex > 0 && currentIndex < 5 && gotoPanel(currentIndex - 1, false);
      },
      onRight: function onRight() {
        return !animating && currentIndex > 0 && currentIndex < 5 && gotoPanel(currentIndex + 1, true);
      },
      tolerance: 250,
      wheelSpeed: 0.5,
      scrollSpeed: 0.5,
      preventDefault: true
    });
    intentObserver.disable();
    ScrollTrigger.create({
      trigger: ".fixed-page",
      pin: true,
      start: "top top",
      end: "+=1",
      onEnterBack: function onEnterBack() {
        intentObserver.enable();
        gotoPanel(currentIndex - 1, false);
      }
    });
    var hasInteractedWithPortfolio = false;
    var portfolioDirection = 0;
    var navLinks = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray(".nav__list a[href^=\"#\"]");
    var porfolioLinks = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray("[portfolio-link]");
    var hasScrolled = false;
    window.addEventListener("keyup", function (e) {
      var goDown = ["ArrowRight", "ArrowDown"];
      var goUp = ["ArrowLeft", "ArrowUp"];
      if (goDown.indexOf(e.key) > -1) {
        gotoPanel(currentIndex + 1, true);
      } else if (goUp.indexOf(e.key) > -1) {
        gotoPanel(currentIndex - 1, false);
      }
    });
    if (jumpToSection) {
      // if # in the url, jump to that index (if exists)
      gotoPanel(Number(jumpToSection.getAttribute("data-index")) - 1, true, true);
    } else {
      gotoPanel(0, true, true);
    }
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray('[href^="#"]').forEach(function (link) {
      var _document$getElementB;
      var targetIndex = Number((_document$getElementB = document.getElementById(link.href.split("#")[1])) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.getAttribute("data-index")) - 1;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        header.classList.remove("show-mobile-menu");
        if (targetIndex) {
          window.location = "#" + link.href.split("#")[1];
          gotoPanel(targetIndex, targetIndex > currentIndex, true);
        }
      });
    });
    if (Sections) {
      // # THESIS
      var immigrantsSection = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector("[thesis-content]");
      var immigrantSectionTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
        defaults: {
          duration: 1
        }
      });
      var immigrantsSectionHeading = new gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__.SplitText(immigrantsSection("*"), {
        type: "words"
      });
      immigrantSectionTimeline.from(immigrantsSectionHeading.words, {
        autoAlpha: 0,
        y: 10,
        stagger: 0.05,
        duration: 1
      });
      pageAnimations.push(immigrantSectionTimeline);

      // /* PORTFOLIO SECTION */
      ScrollTrigger.create({
        scroller: "[portfolio-content]",
        scrub: true,
        onUpdate: function onUpdate(self) {
          portfolioDirection = self.direction;
          if (self.progress > 0.95 && hasInteractedWithPortfolio) {
            hasInteractedWithPortfolio = false;
            setTimeout(function () {
              intentObserver.enable();
            }, 1000);
          } else if (self.progress < 0.05 && hasInteractedWithPortfolio) {
            hasInteractedWithPortfolio = false;
            setTimeout(function () {
              intentObserver.enable();
            }, 1000);
          }
        },
        onToggle: function onToggle(self) {
          if (self.progress > 0 && !hasInteractedWithPortfolio) {
            hasInteractedWithPortfolio = true;
          }
        }
      });
      var portfolio = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
        paused: true,
        onStart: function onStart() {
          document.querySelector("[portfolio-content]").scroll(0, 0);
          hasInteractedWithPortfolio = false;
          gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.to(".line-portfolio-about path", {
            drawSVG: "100%",
            duration: 2,
            autoAlpha: 1
          });
        }
      });
      portfolio.from("[portfolio-content]", {
        y: 20,
        autoAlpha: 0
      });
      portfolio.set(".line-portfolio-about path", {
        autoAlpha: 0,
        drawSVG: 0
      }, "<");
      portfolio.from("[portfolio-link-wrapper]", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.05
      }, "<");
      pageAnimations.push(portfolio);

      // /* ABOUT SECTION */
      var founderTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({});
      founderTimeline.from(".founder > div", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05
      });
      founderTimeline.from(".about-line--top path", {
        drawSVG: "0 0"
      });
      founderTimeline.from(".about__line-about path", {
        drawSVG: 0
      });
      pageAnimations.push(founderTimeline);

      // /* ABOUT - COMMUNITY */
      var communitySection = document.querySelector(".community");
      if (communitySection) {
        var communityTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
          paused: true,
          defaults: {
            duration: 1
          }
        });
        communityTimeline.from(communitySection, {
          y: 20,
          autoAlpha: 0
        }, "<");
        communityTimeline.from(communitySection.querySelectorAll(".about-content__content > div"), {
          y: 10,
          autoAlpha: 0,
          stagger: 0.075
        }, "<");
        communityTimeline.from(communitySection.querySelector(".about__line-community-faq path"), {
          drawSVG: "100% 100%"
        }, "<");
        pageAnimations.push(communityTimeline);
      }

      // FAQ 1
      var faqTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
        paused: true
      });
      var faqSection = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector("#faq-1");
      faqTimeline.from(faqSection(".faq-line path"), {
        drawSVG: 0,
        duration: 1
      });
      faqTimeline.from(faqSection("h2"), {
        autoAlpha: 0
      }, "<");
      faqTimeline.from(faqSection(".faq__faq-item"), {
        autoAlpha: 0,
        stagger: 0.05,
        scaleY: 0
      }, "<");
      pageAnimations.push(faqTimeline);
    } else if (isMobile) {
      gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(".line-portfolio-about path", {
        drawSVG: 0,
        scrollTrigger: {
          trigger: ".line-portfolio-about",
          start: "top bottom",
          bottom: "bottom center",
          scrub: true,
          ease: "none"
        }
      });
      gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(".about__line-about path", {
        drawSVG: 0,
        scrollTrigger: {
          trigger: ".founder__pinned-wrapper",
          start: "center center",
          end: "bottom center",
          scrub: true,
          ease: "none"
        }
      });
    }
  } else if (isMobile) {
    if (jumpToSection) {
      window.scrollTo({
        top: jumpToSection.offsetTop,
        behavior: "smooth"
      });
    }
    window.addEventListener("DOMContentLoaded", function () {
      var height = window.innerHeight;
      document.querySelector(".hero-intro").style.height = "".concat(height, "px");
    });

    /* SECTION ONE */
    var _immigrantsSection = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector("[thesis-content]");
    var immigrantSectionTitle = new gsap_SplitText__WEBPACK_IMPORTED_MODULE_5__.SplitText(_immigrantsSection("*"), {
      type: "words"
    });
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(immigrantSectionTitle.words, {
      autoAlpha: 0,
      y: 20,
      stagger: 0.05,
      duration: 1,
      scrollTrigger: {
        trigger: "[thesis-content]",
        start: "top bottom",
        end: "+=500"
      }
    });

    /* PORTFOLIO SECTION (MOBILE) */
    var portfolioSection = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector("#portfolio");
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(portfolioSection("[portfolio-link-wrapper]"), {
      y: 200,
      autoAlpha: 0,
      stagger: 0.05,
      scrollTrigger: {
        trigger: "[portfolio-list]",
        start: "top bottom",
        end: "bottom bottom",
        scrub: false,
        once: true
      }
    });

    /* OUR APPROACH (COMMUNITY, MOBILE) */
    var _communitySection = document.querySelector(".community");
    if (_communitySection) {
      var _communityTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
        scrollTrigger: {
          trigger: ".community",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          once: true
        }
      });
      _communityTimeline.from(_communitySection.querySelector(".about__community-title"), {
        autoAlpha: 0
      });
      gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray(_communitySection.querySelectorAll(".about-content__content > div")).forEach(function (section) {
        gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(section, {
          autoAlpha: 0,
          y: 100,
          scrollTrigger: {
            trigger: section,
            end: "+=500",
            scrub: 1,
            once: true
          }
        });
      });
    }
    var _faqSection = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.selector("#faq-1");
    var _faqTimeline = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.timeline({
      scrollTrigger: {
        trigger: "#faq-1",
        start: "top bottom",
        end: "bottom bottom",
        scrub: false,
        once: true
      }
    });
    _faqTimeline.from(_faqSection("h2"), {
      autoAlpha: 0
    });
    _faqTimeline.from(_faqSection(".faq__faq-item"), {
      scaleY: 0,
      autoAlpha: 0,
      stagger: 0.05
    });
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(".line-portfolio-about--mobile path", {
      scrollTrigger: {
        start: "top bottom-=400",
        trigger: ".line-portfolio-about--mobile"
      },
      drawSVG: 0
    });
    gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.from(".about__line-about path", {
      scrollTrigger: {
        start: "top bottom-=400",
        trigger: ".about__line-about"
      },
      drawSVG: 0
    });
    var menuLinks = gsap__WEBPACK_IMPORTED_MODULE_3__.gsap.utils.toArray('.header__mobile-menu [href*="#"]');
    menuLinks === null || menuLinks === void 0 || menuLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var index = document.getElementById(link.hash.substring(1));
        header.classList.remove("show-mobile-menu");
        document.documentElement.style.overflow = "";
        window.scrollTo({
          top: index.offsetTop,
          behavior: "smooth"
        });
      });
    });
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: function onUpdate(e) {
        var windowPos = window.pageYOffset || document.scrollTop || 0;
        Sections.forEach(function (section) {
          var sectionHeight = section.offsetHeight;
          if (section.offsetTop + sectionHeight >= windowPos && section.offsetTop <= windowPos) {
            var currentBg = section.getAttribute("data-bg");
            header.style.color = currentBg === "#111111" ? "#ffffff" : "#111111";
          }
        });
      }
    });
  }
});

/***/ }),

/***/ "./scripts/page-transitions.js":
/*!*************************************!*\
  !*** ./scripts/page-transitions.js ***!
  \*************************************/
/***/ (() => {

// const internalLinks = Array.from(
//   document.querySelectorAll(
//     '[href]:not([href^="#"]):not([href^="mailto"]):not([href^="http"])'
//   )
// );

// if (internalLinks.length) {
//   internalLinks.forEach((link) => {
//     link.addEventListener("click", async (e) => {
//       window.pageFunctions = [];
//       e.preventDefault();
//       const linkPath = e.currentTarget.pathname || "/";

//       const newPage = await fetch(e.currentTarget.href || "/");
//       const html = await newPage.text();
//       var parser = new DOMParser();
//       var doc = parser.parseFromString(html, "text/html");

//       document.querySelector("body script").innerHTML = "";

//       document.querySelector("body").innerHTML =
//         '<div class="page-transition">' +
//         document.querySelector("body").innerHTML +
//         "</div>" +
//         doc.querySelector("body").innerHTML;

//       function transitionPage(cb) {
//         const transitionAnimation = gsap.timeline({
//           onComplete: () => {
//             const pageTransition = document.querySelector(".page-transition");
//             const url = new URL(window.location.origin + linkPath);
//             // window.history.pushState({}, '', url);
//             window.location = url;
//             pageTransition.parentNode.removeChild(pageTransition);

//             let el = document.body;
//             pgia.elementAnimationsManager.refreshAnimations(el, true);
//             pgia.scrollSceneManager.updateScene(el, true);

//             // fire page javascript
//             window.pageFunctions.forEach((fn) => fn());

//             if (cb) {
//               cb();
//             }
//           },
//         });

//         transitionAnimation.to(".page-transition", {
//           autoAlpha: 0,
//         });

//         if (linkPath === "/") {
//           window.scrollTo(0,0)
//           transitionAnimation.to(
//             ".header__link-logo",
//             {
//               autoAlpha: 0,
//             },
//             "<"
//           );

//           transitionAnimation.to(
//             "body",
//             {
//               background: "#111111",
//               color: "white",
//             },
//             "<"
//           );

//           transitionAnimation.to(
//             [".nav__list", ".nav__button"],
//             {
//               color: "white",
//             },
//             "<"
//           );

//           transitionAnimation.to(".nav", {
//             x: 0,
//           });
//         } else {
//           transitionAnimation.to(".nav", {
//             x: "-100%",
//           });

//           transitionAnimation.set(".header", {
//             justifyContent: "space-between",
//           });
//           transitionAnimation.to(
//             ".header__link-logo",
//             {
//               autoAlpha: 1,
//               display: "block",
//             },
//             "<"
//           );
//           transitionAnimation.to(
//             [".hero-intro--page-two", "#intro"],
//             {
//               background: "transparent",
//             },
//             "<"
//           );
//           transitionAnimation.to(
//             "body",
//             {
//               background: "white",
//               color: "black",
//             },
//             "<"
//           );
//           transitionAnimation.to(
//             [
//               ".hero-intro .top-letter path",
//               ".hero-intro .bottom-letter path",
//               ".hero-intro .ventures path",
//             ],
//             {
//               fill: "black",
//             },
//             "<"
//           );

//           transitionAnimation.to(
//             [".nav__list", ".nav__button"],
//             {
//               color: "#ccc",
//             },
//             "<"
//           );
//         }
//       }

//       if ((window.pageYOffset || document.scrollTop) > window.innerHeight) {
//         transitionPage()
//           // gsap.to(window, {
//           //   duration: 0.5,
//           //   scrollTo: 0,
//             // onComplete: transitionPage
//           // });
//       } else {
//         transitionPage();
//       }
//     });
//   });
// }

/***/ }),

/***/ "./scripts/sw.js":
/*!***********************!*\
  !*** ./scripts/sw.js ***!
  \***********************/
/***/ (() => {

// Ensure that the browser supports the service worker API
if (navigator.serviceWorker) {
  // Start registration process on every page load
  window.addEventListener('load', function () {
    navigator.serviceWorker
    // The register function takes as argument
    // the file path to the worker's file
    .register('/scripts/service_worker.js')
    // Gives us registration object
    .then(function (reg) {
      return console.log('Service Worker Registered');
    })["catch"](function (swErr) {
      return console.log("Service Worker Installation Error: ".concat(swErr, "}"));
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunknolabelventures_website"] = self["webpackChunknolabelventures_website"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./scripts/main.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map