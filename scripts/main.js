/*
 * FAQ Dropdowns
 */
const dropdowns = gsap.utils.toArray("[data-dropdown]");
dropdowns.forEach((dropdown) => {
  const content = dropdown.nextSibling.nextSibling;
  content.style.display = "none";
  const text = content.querySelector("div");
  dropdown.addEventListener("click", (e) => {
    const button = e.currentTarget;
    setTimeout(
      () => {
        content.style.display =
          content.style.display === "none" ? "block" : "none";
        button.classList.toggle(
          "dropdown-active",
          content.style.display === "block"
        );
      },
      content.style.display === "none" ? 0 : 300
    );

    gsap.fromTo(
      text,
      {
        x: content.style.display === "none" ? 10 : 0,
        autoAlpha: content.style.display === "none" ? 0 : 1,
      },
      {
        x: content.style.display === "none" ? 0 : 10,
        autoAlpha: content.style.display === "none" ? 1 : 0,
      }
    );
  });
});

let mm = gsap.matchMedia(),
  breakPoint = 1024;

mm.add(
  {
    isDesktop: `(min-width: ${breakPoint}px)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    let { isDesktop, isMobile, reduceMotion } = context.conditions;
    let intentObserver

    function pageScrollAnimation() {
      const pageScrollAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-intro",
          start: "top top",
          end: "center top",
          scrub: 1,
          ease: "none",
        },
      });
      pageScrollAnimation.set(".draw-me", { autoAlpha: 1 });
      pageScrollAnimation.fromTo(
        ".draw-me",
        { drawSVG: "0%", ease: "none" },
        { drawSVG: "-100%" },
        "<"
      );

      pageScrollAnimation.to(
        [".hero-intro--page-two", "#intro"],
        {
          background: "transparent",
        },
        "<"
      );
      pageScrollAnimation.to(
        "body",
        {
          background: "#ffffff",
          color: "#111111",
        },
        "<"
      );
      pageScrollAnimation.to(
        [
          heroEl(".top-letter path"),
          heroEl(".bottom-letter path"),
          heroEl(".ventures path"),
        ],
        {
          fill: "black",
        },
        "<"
      );

      pageScrollAnimation.to(
        [".nav__list", ".nav__button"],
        {
          color: "#ccc",
        },
        "<"
      );
    }

    const heroEl = gsap.utils.selector(".hero-intro");
    const heroText = gsap.utils.toArray(".hero-intro h1 div");
    const heroTextOne = new SplitText(heroText[0], { type: "words" });
    const heroTextTwo = new SplitText(heroText[1], { type: "words" });
    const introAnimation = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("intro-seen", true);
        intentObserver.enable();
        pageScrollAnimation();
      },
    });

    if (!sessionStorage.getItem("intro-seen")) {
      // Don't prevent scroll if the user lands down the page
      if (!window.pageYOffset && !document.scrollTop) {
        introAnimation.set("body", {
          overflow: "hidden",
        });
      }

      introAnimation.set(heroEl("h1"), {
        autoAlpha: 1,
      });

      /* INTRO ANIMATION */
      introAnimation.from(
        heroTextOne.words,
        {
          rotateY: "10deg",
          x: 20,
          stagger: 0.04,
          autoAlpha: 0,
          duration: 1,
        },
        "<"
      );

      introAnimation.to(
        heroTextOne.words,
        {
          filter: "blur(10px)",
          stagger: 0.04,
          autoAlpha: 0,
          duration: 2,
        },
        "+=1"
      );

      introAnimation.from(heroTextTwo.words, {
        rotateY: "10deg",
        x: 20,
        stagger: 0.04,
        autoAlpha: 0,
        duration: 1
      });

      introAnimation.to(
        ".hero-intro__blob",
        {
          delay: 0.5,
          clipPath: "circle(4% at 50% 100%)",
          ease: "elastic.out(1, 0.75)",
          duration: 1,
        },
        "+=1"
      );

      introAnimation.to(heroEl("h1"), {
        scale: ".95",
        duration: 1,
        autoAlpha: 0,
      });

      introAnimation.to(
        ".hero-intro__blob",
        {
          clipPath: "circle(100% at 50% 75%)",
          duration: 1,
        },
        "<"
      );

      introAnimation.set("#intro", {
        background: "#111111",
      });

      introAnimation.to(
        [".hero-intro__blob", heroEl(".hero-intro--page-one")],
        {
          autoAlpha: 0,
        }
      );

      introAnimation.set(
        heroEl(".hero-intro--page-two"),
        {
          autoAlpha: 1,
        },
        "<"
      );

      introAnimation.from(
        heroEl(".bottom-letter"),
        {
          autoAlpha: 0,
          x: -5,
          y: -5,
          ease: "elastic.out(2, 0.75)",
        },
        "<"
      );

      introAnimation.from(
        heroEl(".top-letter"),
        {
          autoAlpha: 0,
          x: 5,
          y: 5,
          ease: "elastic.out(2, 0.75)",
        },
        "<"
      );

      introAnimation.fromTo(
        heroEl(".ventures path"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
        }
      );

      introAnimation.set("body", {
        overflow: "",
      });
    } else {
      introAnimation.to("#intro", {
        background: "#111111",
      });

      introAnimation.set(
        heroEl(".hero-intro--page-two"),
        {
          autoAlpha: 1,
        },
        "<"
      );

      introAnimation.from(
        heroEl(".bottom-letter"),
        {
          x: -5,
          y: -5,
          ease: "elastic.out(2, 0.75)",
        },
      );

      introAnimation.from(
        heroEl(".top-letter"),
        {
          x: 5,
          y: 5,
          ease: "elastic.out(2, 0.75)",
        },
        "<"
      );

      introAnimation.fromTo(
        heroEl(".ventures path"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
        }
      );
    }

    /* FACTS HORIZONTAL SCROLL SECTION */
    if (isDesktop) {
      let Sections = gsap.utils.toArray("main > *");
      let currentIndex = -1;
      let animating;

      const pageAnimations = [false]

      gsap.set(Sections, {
        zIndex: i => i,
        autoAlpha: (i) => !i ? 1 : 0
      });

      intentObserver = ScrollTrigger.observe({
        type: "wheel,touch",
        onUp: () => !animating && gotoPanel(currentIndex - 1, false),
        onDown: () => !animating && gotoPanel(currentIndex + 1, true),
        tolerance: 20,
        preventDefault: true
      })
      intentObserver.disable();

      ScrollTrigger.create({
        trigger: 'main',
        pin: true,
        start: "top top",
        end: "+=1",
        onEnter: () => {
          // gotoPanel(currentIndex + 1, true);    
        },
        onEnterBack: () => {
          intentObserver.enable();
          gotoPanel(currentIndex - 1, false);
        }
      })

      function gotoPanel(index, isScrollingDown) {
        if (index < -1) {
          return
        }
        animating = true;

        if (pageAnimations[index]) {
          pageAnimations[index].seek(0)
        }

        // return to normal scroll if we're at the end or back up to the start
        if ((index === Sections.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
          let target = index;
          gsap.to(target, {
            // xPercent: isScrollingDown ? -100 : 0,
            duration: 0.00,
            onComplete: () => {
              animating = false;
              isScrollingDown && intentObserver.disable();
            }
          });
          return
        }
      
      //   target the second panel, last panel?
        let target = isScrollingDown ?  Sections[index]: Sections[currentIndex];
      
        gsap.to(target, {
          autoAlpha: isScrollingDown ? 1 : 0,
          duration: 0.75,
          onComplete: () => {
            if (pageAnimations[index]) {
              pageAnimations[index].eventCallback('onComplete', () => animating = false)
              pageAnimations[index].play()
            } else {
              animating = false;
            }
          }
        });
        currentIndex = index;
      }   
      
      let hasScrolled = false;
      function checkIfScrolled() {
        if(!hasScrolled) {
          queuedAnims.push(this.parent.pause(0));
        }
      }

      gotoPanel(0, true)

      if (Sections) {
        // const pinnedHorizontalScroll = Sections.map((section, index) => {
        //   const options = {
        //     scrollTrigger: {
        //       trigger: section,
        //       start: "center center",
        //       end: "+=" + window.innerHeight * 6,
        //       pin: true,
        //       snap: {
        //         snapTo: "labels", 
        //         duration: 3, 
        //         delay: 0.1, 
        //         inertia: false, 
        //         onStart: ({direction}) => {
        //           // document.querySelector('.header').classList.add('snapping')
        //           if (direction === 1) {
        //             document.querySelector('.header').classList.remove('hide')
        //             document.querySelector('.header').classList.remove('snapping')
        //           } else {
        //             document.querySelector('.header').classList.add('hide')
        //             document.querySelector('.header').classList.add('snapping')
        //           }
        //         },
        //         onComplete: (props) => {
        //           if(props.direction === 1) {
        //           }
        //         }
        //       },
        //       // preventOverlaps: "facts",
        //       scrub: true,
        //       toggleActions: "play none none none",
        //       ...(index === Sections.length - 1
        //         ? {
        //             onEnterBack: function () {
        //               gsap.set(".facts-section-line", {
        //                 position: "fixed",
        //                 bottom: "",
        //               });
        //             },
        //             onLeave: function () {
        //               gsap.set(".facts-section-line", {
        //                 position: "absolute",
        //                 bottom: -window.innerHeight * 0.25 + "px",
        //               });
        //             },
        //           }
        //         : {}),
        //     },
        //   };
        //   return gsap.timeline(options);
        // });

        const servicesSection = gsap.utils.selector(".facts__section-services");
        const firstSectionTimeline = gsap.timeline({})
        const firstSectionHeading = new SplitText(servicesSection("h2"), {
          type: "words",
        });
        firstSectionTimeline.from(firstSectionHeading.words, {
          autoAlpha: 0,
          y: 20,
          stagger: 0.05,
        });

        firstSectionTimeline.from(servicesSection(".facts__services > div"), {
          y: 10,
          autoAlpha: 0,
          stagger: 0.25,
        }, "<");

        firstSectionTimeline.pause()

        pageAnimations.push(firstSectionTimeline)


        // /* IMMIGRANT */
        const immigrantsSection = gsap.utils.selector(".immigrant-section");
        const immigrantSectionText = immigrantsSection(".facts__content-text");
        const immigrantSectionTimeline = gsap.timeline({
          duration: 3
        })

        immigrantSectionTimeline.to(
          immigrantsSection(".immigrant-section__digit"),
          {
            textContent: 14,
            snap: { textContent: 0.1 },
          }, "<"
        );

        const immigrantsSectionHeading = new SplitText(
          immigrantsSection("h2"),
          { type: "words" }
        );
        immigrantSectionTimeline.from(
          immigrantsSectionHeading.words,
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
          },
          "<"
        );

        let immigrantsSectionText = new SplitText(immigrantSectionText[0], {
          type: "words",
        });
        immigrantSectionTimeline.from(
          immigrantsSectionText.words,
          {
            y: 20,
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        immigrantSectionTimeline.from(
          immigrantsSection(".immigrant-section__lessthan"),
          {
            autoAlpha: 0,
            x: -10,
            scaleY: 0,
          }, "<"
        );

        immigrantSectionTimeline.from(
          immigrantsSection(".facts__section-subtitle")[1],
          {
            autoAlpha: 0,
          },
          "<"
        );

        immigrantSectionTimeline.to(
          immigrantsSection(".immigrant-section__digit-two"),
          {
            textContent: 36,
            snap: { textContent: 1 },
          },
          "<"
        );

        immigrantsSectionText = new SplitText(immigrantSectionText[1], {
          type: "words",
        });
        immigrantSectionTimeline.from(
          immigrantsSectionText.words,
          {
            y: 20,
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        immigrantSectionTimeline.from(".immigrant-section__astricks", {
          y: 10,
          autoAlpha: 0,
        }, "<");

        immigrantSectionTimeline.addLabel("animationComplete");

        immigrantSectionTimeline.pause()

        pageAnimations.push(immigrantSectionTimeline)

        // /* IMMIGRANT FOUNDERS */
        // 157% increase in UK Unicorn immigrant Founders
        const immigrantFoundersSection = gsap.utils.selector(
          ".immigrant-founders"
        );
        const immigrantFoundersTimeline = gsap.timeline({})

        immigrantFoundersTimeline.from(Sections[2], {
          autoAlpha: 0,
        });

        var immigrantFoundersHeading = new SplitText(
          immigrantFoundersSection(".immigrant-section__heading-text"),
          { type: "words" }
        );
        immigrantFoundersTimeline.from(
          immigrantFoundersHeading.words,
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
          },
          "<"
        );

        const immigrantFoundersSectionText = new SplitText(
          immigrantFoundersSection(".facts__title-text"),
          { type: "words" }
        );
        immigrantFoundersTimeline.from(
          immigrantFoundersSectionText.words,
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
          },
          "<"
        );

        immigrantFoundersTimeline.from(immigrantFoundersSection(".dot-zero"), {
          scale: 0,
          ease: "bounce.inOut",
        }, "<");

        immigrantFoundersTimeline.from(
          [
            immigrantFoundersSection(".graph-line"),
            immigrantFoundersSection(".graph-shade"),
          ],
          {
            clipPath: "inset(233px 0 0)",
          }
        ), "<";

        immigrantFoundersTimeline.from(
          immigrantFoundersSection(".dot-thirty-six"),
          {
            scale: 0,
            ease: "bounce.inOut",
          }
        ), "<";

        immigrantFoundersTimeline.addLabel("animationComplete");

        pageAnimations.push(immigrantFoundersTimeline)

        // /* UNICORN FOUNDERS */
        // const unicornFoundersSection = gsap.utils.selector(".unicorn-founders");
        // // const unicornFoundersTimeline = gsap.timeline({
        // //   scrollTrigger: {
        // //     trigger: unicornFoundersSection("h2"),
        // //     start: "left right",
        // //     end: "left 30%",
        // //     scrub: 1,
        // //     containerAnimation: horizontalScroll,
        // //     // once: true,
        // //   }
        // // })

        // pinnedHorizontalScroll[3].from(Sections[3], {
        //   autoAlpha: 0,
        // });

        // const unicornFoundersSectionHeading = new SplitText(
        //   unicornFoundersSection("h2"),
        //   { type: "words" }
        // );
        // pinnedHorizontalScroll[3].from(
        //   unicornFoundersSectionHeading.words,
        //   {
        //     autoAlpha: 0,
        //     y: 20,
        //     stagger: 0.05,
        //   },
        //   "<"
        // );

        // const unicornFoundersSectionText = new SplitText(
        //   unicornFoundersSection(".facts__title-text"),
        //   { type: "words" }
        // );
        // pinnedHorizontalScroll[3].from(
        //   unicornFoundersSectionText.words,
        //   {
        //     autoAlpha: 0,
        //     y: 20,
        //     stagger: 0.05,
        //   },
        //   "<"
        // );

        // unicornFoundersSection(".dot").forEach((dot, index) => {
        //   pinnedHorizontalScroll[3].from(dot, {
        //     scale: 0,
        //     ease: "bounce.inOut",
        //   });

        //   pinnedHorizontalScroll[3].from(dot.nextSibling.nextSibling, {
        //     autoAlpha: 0,
        //     x: -5,
        //   });
        // }, "<");

        // pinnedHorizontalScroll[3].from(
        //   unicornFoundersSection(".arrow"),
        //   {
        //     scale: 0,
        //   }
        // );

        // pinnedHorizontalScroll[3].addLabel("animationComplete");

        // pinnedHorizontalScroll[3].to({}, {
        //   delay: 2,
        // })

        // gsap.set(".facts-section-line", {
        //   position: "fixed",
        //   autoAlpha: 1,
        // });

        // gsap.from(".facts-section-line path", {
        //   drawSVG: 0,
        //   ease: "none",
        //   scrollTrigger: {
        //     trigger: ".facts-track",
        //     start: "top",
        //     end: `bottom`,
        //     scrub: 1,
        //   },
        // });

        // /* PORTFOLIO SECTION */
        // const portfolio = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".portfolio",
        //     start: "center center",
        //     end: "+=" + window.innerHeight * 4,
        //     snap: "labels",
        //     pin: true,
        //     scrub: true,
        //   },
        // });

        // portfolio.to("body", {
        //   background: "#111111",
        //   color: "#ffffff",
        // });

        // portfolio.from('.portfolio', {
        //   autoAlpha: 0,
        // }, "<")

        // portfolio.from(".portfolio-link__wrapper", {
        //   y: 30,
        //   autoAlpha: 0,
        //   stagger: 0.75,
        // });

        // portfolio.to({}, {duration: 2})

        // portfolio.addLabel("animationComplete")

        // portfolio.to('.portfolio', {
        //   autoAlpha: 0
        // })

        // gsap.from(".line-portfoli-about path", {
        //   drawSVG: 0,
        //   scrollTrigger: {
        //     trigger: ".portfolio",
        //     start: "center center",
        //     bottom: "+=" + window.innerHeight * 4,
        //     scrub: 2,
        //     ease: "none",
        //   },
        // });

        // /* ABOUT SECTION */
        // const fonuderSection = gsap.utils.selector(".founder");
        // const founderTimeline = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".founder__pinned-wrapper",
        //     start: "top",
        //     end: "+=" + window.innerHeight * 3,
        //     scrub: 1,
        //     pin: true,
        //     snap: "labels",
        //   },
        // });

        // founderTimeline.from(".founder > div", {
        //   autoAlpha: 0,
        // });

        // founderTimeline.to(
        //   fonuderSection(".about-content__content"),
        //   {
        //     autoAlpha: 1,
        //     x: -10,
        //   },
        //   "<"
        // );

        // founderTimeline.addLabel("animationComplete");

        // founderTimeline.to({}, { duration: 1 });

        // founderTimeline.to(".founder > div", {
        //   autoAlpha: 0,
        // });

        // gsap.from(".about__line-about path", {
        //   drawSVG: 0,
        //   scrollTrigger: {
        //     trigger: ".founder__pinned-wrapper",
        //     start: "top top",
        //     end: "bottom top",
        //     scrub: 2,
        //     delay: 2,
        //   },
        // });

        // /* ABOUT - COMMUNITY */
        // const communityEl = gsap.utils.selector(".community");
        // const communityTimeline = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".community-pinned-wrapper",
        //     start: "top",
        //     end: "+=" + window.innerHeight * 4,
        //     scrub: 1,
        //     pin: true,
        //     snap: "labels"
        //   },
        // });

        // communityTimeline.to("body", {
        //   background: "#ffffff",
        //   color: "#111111"
        // });

        // communityTimeline.from(".community", {
        //   autoAlpha: 0,
        // });

        // communityTimeline.to(
        //   communityEl(".about-content__content"),
        //   {
        //     autoAlpha: 1,
        //   },
        //   "<"
        // );

        // communityTimeline.from(communityEl(".about-content__content > div"), {
        //   y: -10,
        //   autoAlpha: 0,
        //   stagger: 0.5,
        // });

        // communityTimeline.addLabel("animationComplete")

        // communityTimeline.to({}, { duration: 1 });

        // gsap.from(".about__line-community-faq path", {
        //   drawSVG: "100% 100%",
        //   scrollTrigger: {
        //     trigger: ".community-pinned-wrapper",
        //     start: "center center",
        //     end: "+=" + window.innerHeight * 4,
        //     scrub: true,
        //   },
        // });

        // const pitchLines = gsap.utils.toArray(".pitch-lines path");


        // const pitchTimeline = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: "#pitch",
        //     start: "top bottom",
        //     end: "center bottom",
        //     scrub: 2,
        //   },
        // })
        
        // pitchTimeline.to('body', {
        //   background: '#111111',
        //   color: "#ffffff"
        // })

        // pitchTimeline.from([pitchLines[1], pitchLines[2]], {
        //   drawSVG: 0,
        // }, "<");

        // gsap.from(pitchLines[0], {
        //   drawSVG: "100% 100%",
        //   scrollTrigger: {
        //     trigger: "#pitch",
        //     start: "center bottom",
        //     end: "bottom bottom",
        //     scrub: 2,
        //   },
        // });
      } else if (isMobile) {
        gsap.from(".line-immigrant-unicorn-founders path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".line-immigrant-unicorn-founders",
            start: "top bottom",
            bottom: "+=100",
            scrub: true,
            ease: "none",
          },
        });

        gsap.from(".line-portfoli-about path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".line-portfoli-about",
            start: "top bottom",
            bottom: "bottom center",
            scrub: true,
            ease: "none",
          },
        });

        gsap.from(".about__line-about path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".founder__pinned-wrapper",
            start: "center center",
            end: "bottom center",
            scrub: true,
            ease: "none",
          },
        });

        const pitchLines = gsap.utils.toArray(".pitch-lines--mobile path");
        gsap.from([pitchLines[1], pitchLines[2]], {
          drawSVG: 0,
          scrollTrigger: {
            trigger: "#pitch",
            start: "top bottom",
            end: "center bottom",
            scrub: true,
          },
        });
        gsap.from(pitchLines[0], {
          drawSVG: "100% 100%",
          scrollTrigger: {
            trigger: "#pitch",
            start: "center bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }
  }
);

/*
 * Left hand navigation
 */
const navLinks = gsap.utils.toArray('.nav__button[href^="#"]')
const pageSections = navLinks.map(link => document.getElementById(link.href.split("#")[1]))

window.addEventListener("scroll", function () {
  const windowPos = window.pageYOffset || document.scrollTop || 0;

  pageSections.forEach((refElement, index) => {
    const elIsAboveScrollPos = refElement.offsetTop <= windowPos + window.innerHeight / 2;
    const elBottomIsBelowScrollPos = refElement.offsetTop + refElement.clientHeight >= windowPos + window.innerHeight / 2;
    const elIsEntirelyWithinWindow = refElement.offsetTop >= windowPos + window.innerHeight / 2 && refElement.offsetTop + refElement.clientHeight <= windowPos + window.innerHeight;

    navLinks[index].classList.toggle("active", elIsEntirelyWithinWindow || (elIsAboveScrollPos && elBottomIsBelowScrollPos));
  });
});


gsap.utils.toArray('[href^="#"]').forEach((link) => {
  const targetEl = document.getElementById(link.href.split("#")[1]);
  const top = targetEl.getBoundingClientRect().top

  link.addEventListener("click", (e) => {
    e.preventDefault();

    header.classList.remove("show-mobile-menu");

    if (targetEl) {
      window.scrollTo({
        top: top + 100,
        left: 0,
        behavior: "smooth",
      });
    } else {
      // handle navigation to correct page
    }
  });
});