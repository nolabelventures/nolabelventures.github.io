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
    const shouldClose = content.style.display === 'block'

    dropdowns.forEach(dd => {
      dd.nextSibling.nextSibling.style.display = 'none'
      dd.classList.remove("dropdown-active");
      gsap.to(dd.nextSibling.nextSibling.querySelector('div'), {
        x: 10,
        autoAlpha: 0
      })
    })

    // toggle action
    if (!shouldClose) {
      button.classList.add("dropdown-active");
      content.style.display = "block";
  
      gsap.to(
        text, {
          x: 0,
          autoAlpha: 1,
        }
      );
    }
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

      introAnimation.fromTo(
        ".draw-me",
        { drawSVG: "0%", ease: "none", autoAlpha: 1 },
        { drawSVG: "-100%" },
        "<"
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

      introAnimation.fromTo(
        ".draw-me",
        { drawSVG: "0%", ease: "none", autoAlpha: 1 },
        { drawSVG: "-100%" },
        "<"
      );
    }

    /* FACTS HORIZONTAL SCROLL SECTION */
    if (isDesktop) {
      let Sections = Array.from(document.querySelectorAll("main > *"));
      let currentIndex = -1;
      let animating;

      const pageAnimations = [false]

      gsap.set(Sections, {
        zIndex: i => i,
        autoAlpha: (i) => !i ? 1 : 0
      });

      intentObserver = ScrollTrigger.observe({
        type: "scroll,wheel,touch",
        onUp: () => !animating && gotoPanel(currentIndex - 1, false),
        onDown: () => !animating && gotoPanel(currentIndex + 1, true),
        tolerance: 100,
        wheelSpeed: 0.5,
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
        if (index <= -1) {
          return
        }
        
        animating = true;

        if (pageAnimations[index]) {
          pageAnimations[index].seek(0)
          pageAnimations[index].pause()
        }

        // Highlight correct nav
        gsap.utils.toArray(`.nav__list a[href^="#"]`).forEach(link => {
          const indexes = link.getAttribute('data-indexes').split(',')

          if (indexes.includes(String(index))) {
            link.classList.add('active')
          } else {
            link.classList.remove('active')
          }
        })
        // return to normal scroll if we're at the end or back up to the start
        if (index === Sections.length && isScrollingDown) {
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
      
        let target = isScrollingDown ? Sections[index]: Sections[currentIndex];

        const backgroundColor = window.getComputedStyle(Sections[index]).getPropertyValue("background-color")

        const transition = gsap.timeline({
          duration: 0.75,
          onComplete: () => {
            if (pageAnimations[index]) {
              pageAnimations[index].play()
              animating = false
            } else {
              animating = false;
            }
          }
        })
      
        transition.to(target, {
          autoAlpha: isScrollingDown ? 1 : 0,
        });

        transition.to('body', {
          color: backgroundColor === 'rgb(255, 255, 255)' ? '#111111' : '#ffffff'
        }, "<")

        currentIndex = index;
      }   
      
      let hasScrolled = false;
      function checkIfScrolled() {
        if(!hasScrolled) {
          queuedAnims.push(this.parent.pause(0));
        }
      }

      gotoPanel(0, true)
      gsap.utils.toArray('[href^="#"]').forEach((link) => {
        const targetIndex = link.href.split("#")[1];
      
        link.addEventListener("click", (e) => {
          e.preventDefault();
      
          header.classList.remove("show-mobile-menu");
      
          if (targetIndex) {
            gotoPanel(targetIndex, targetIndex > currentIndex)
          } else {
            // handle navigation to correct page
          }
        });
      });

      if (Sections) {
        const servicesSection = gsap.utils.selector(".facts__section-services");
        const firstSectionTimeline = gsap.timeline({
          onComplete: () => console.log('1st done'),
        })
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

        pageAnimations.push(firstSectionTimeline)


        // /* IMMIGRANT */
        const immigrantsSection = gsap.utils.selector(".immigrant-section");
        const immigrantSectionText = immigrantsSection(".facts__content-text");
        const immigrantSectionTimeline = gsap.timeline({
          onComplete: () => console.log('2nd done'),
        })

        immigrantSectionTimeline.from(immigrantsSection('.facts__section-content'), {
          autoAlpha: 0
        })

        immigrantSectionTimeline.from(
          immigrantsSection(".immigrant-section__digit"),
          {
            textContent: 0,
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

        immigrantSectionTimeline.from(
          new SplitText(immigrantSectionText[0], {
            type: "words",
          }).words,
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

        immigrantSectionTimeline.from(
          new SplitText(immigrantSectionText[1], {
            type: "words",
          }).words,
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

        pageAnimations.push(immigrantSectionTimeline)

        // /* IMMIGRANT FOUNDERS */
        // 157% increase in UK Unicorn immigrant Founders
        const immigrantFoundersSection = gsap.utils.selector(
          ".immigrant-founders"
        );
        const immigrantFoundersTimeline = gsap.timeline({
          onComplete: () => console.log('3rd done'),
        })

        immigrantFoundersTimeline.from(immigrantFoundersSection('.facts__section-content'), {
          autoAlpha: 0
        })

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

        immigrantFoundersTimeline.from(
          immigrantFoundersSection("h2 div")[0],
          {
            textContent: 0,
            snap: { textContent: 1 },
          }, "<"
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

        immigrantFoundersTimeline.from(immigrantFoundersSection(".dot-zero"), 
          {
            scale: 0,
            ease: "bounce.inOut",
          }, 
          "<"
        );

        immigrantFoundersTimeline.from(
          [
            immigrantFoundersSection(".graph-line"),
            immigrantFoundersSection(".graph-shade"),
          ],
          {
            clipPath: "inset(233px 0 0)",
          },
          "<"
        )

        immigrantFoundersTimeline.from(
          immigrantFoundersSection(".dot-thirty-six"),
          {
            scale: 0,
            ease: "bounce.inOut",
          }, 
          "<"
        )

        pageAnimations.push(immigrantFoundersTimeline)

        // /* UNICORN FOUNDERS */
        const unicornFoundersSection = gsap.utils.selector(".unicorn-founders");
        const unicornFoundersTimeline = gsap.timeline({})

        const unicornFoundersSectionHeading = new SplitText(
          unicornFoundersSection("h2"),
          { type: "words" }
        );
        unicornFoundersTimeline.from(
          unicornFoundersSectionHeading.words,
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
          },
          "<"
        );

        const unicornFoundersSectionText = new SplitText(
          unicornFoundersSection(".facts__title-text"),
          { type: "words" }
        );
        unicornFoundersTimeline.from(
          unicornFoundersSectionText.words,
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05,
          },
          "<"
        );

        unicornFoundersSection(".dot").forEach((dot, index) => {
          unicornFoundersTimeline.from(dot, {
            scale: 0,
            ease: "bounce.inOut",
          }, "<");

          unicornFoundersTimeline.from(dot.nextSibling.nextSibling, {
            autoAlpha: 0,
            x: -5,
          }, "<");
        });

        unicornFoundersTimeline.from(
          unicornFoundersSection(".arrow"),
          {
            scale: 0,
          }, "<"
        );

        pageAnimations.push(unicornFoundersTimeline)

        gsap.set(".facts-section-line", {
          position: "fixed",
          autoAlpha: 1,
        });

        gsap.from(".facts-section-line path", {
          drawSVG: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".facts-track",
            start: "top",
            end: `bottom`,
            scrub: 1,
          },
        }, "<");

        // /* PORTFOLIO SECTION */
        const portfolio = gsap.timeline({});

        portfolio.from(".portfolio-link__wrapper", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.05,
        });

        pageAnimations.push(portfolio)

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
        const fonuderSection = gsap.utils.selector(".founder");
        const founderTimeline = gsap.timeline({})

        founderTimeline.to(
          fonuderSection(".about-content__content"),
          {
            autoAlpha: 1,
            x: -10,
          },
          "<"
        );

        pageAnimations.push(founderTimeline)

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
        const communityEl = gsap.utils.selector(".community");
        const communityTimeline = gsap.timeline({});

        communityTimeline.from(communityEl('.community'), {
          autoAlpha: 0
        })

        communityTimeline.to(
          communityEl(".about-content__content"),
          {
            autoAlpha: 1,
          },
          "<"
        );

        communityTimeline.from(communityEl(".about-content__content > div"), {
          y: -10,
          autoAlpha: 0,
          stagger: 0.075,
        });

        pageAnimations.push(communityTimeline)

        pageAnimations.push(false)

        // gsap.from(".about__line-community-faq path", {
        //   drawSVG: "100% 100%",
        //   scrollTrigger: {
        //     trigger: ".community-pinned-wrapper",
        //     start: "center center",
        //     end: "+=" + window.innerHeight * 4,
        //     scrub: true,
        //   },
        // });

        const pitchLines = gsap.utils.toArray(".pitch-lines path");
        const pitchTimeline = gsap.timeline({})

        pitchTimeline.from([pitchLines[1], pitchLines[2]], {
          drawSVG: 0,
        }, "<");

        pitchTimeline.from(pitchLines[0], {
          drawSVG: "100% 100%",
        });

        pageAnimations.push(pitchTimeline)
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