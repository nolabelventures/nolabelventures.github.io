/*
 * Left hand navigation
 */
const introLink = document.querySelector('.nav__button[href="#intro"]');
const portfolioLink = document.querySelector('.nav__button[href="#portfolio"]');
const aboutLink = document.querySelector('.nav__button[href="#about"]');
const faqLink = document.querySelector('.nav__button[href="#faq"]');

window.addEventListener("scroll", function () {
  const windowPos = (window.pageYOffset || document.scrollTop) || 0;

  [introLink, portfolioLink, aboutLink, faqLink].forEach((link) => {
    const refElement = document.getElementById(link.href.split("#")[1]);
    const elIsAboveScrollPos = refElement.offsetTop <= ((windowPos + window.innerHeight / 2))
    const elBottomIsBelowScrollPos = refElement.offsetTop + refElement.clientHeight >= (windowPos + (window.innerHeight / 2))
    const elIsEntirelyWithinWindow = refElement.offsetTop >= ((windowPos + window.innerHeight / 2)) && (refElement.offsetTop + refElement.clientHeight) <= (windowPos + window.innerHeight)
    link.classList.toggle("active", elIsEntirelyWithinWindow || (elIsAboveScrollPos && elBottomIsBelowScrollPos));
  });
});

gsap.utils.toArray('[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()

    console.log(document.getElementById(link.href.split('#')[1]));

    window.scrollTo({ 
      top: document.getElementById(link.href.split('#')[1]).offsetTop, 
      left: 0,
      behavior: 'smooth'
    })
  })
})

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

    const heroEl = gsap.utils.selector('.hero-intro')
    const heroText = new SplitText(heroEl("h1"), { type: "words" });
    const introAnimation = gsap.timeline({
      onComplete: () => {
        const pageScrollAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-intro",
            start: "top top",
            end: "center top",
            scrub: 1,
            ease: 'none'
          },
        });
        pageScrollAnimation.set(".draw-me", { autoAlpha: 1 });
        pageScrollAnimation.fromTo(".draw-me", { drawSVG: "0%", ease: 'none' }, { drawSVG: "-100%" }, "<");

        pageScrollAnimation.to(
          [".hero-intro--page-two", ".hero-intro"],
          {
            background: "transparent",
          },
          "<"
        );
        pageScrollAnimation.to(
          "body",
          {
            background: "white",
            color: "black",
          },
          "<"
        );
        pageScrollAnimation.to(
          [heroEl(".top-letter path"), heroEl(".bottom-letter path"), heroEl(".ventures path")],
          {
            fill: "black",
          },
          "<"
        );

        pageScrollAnimation.to(['.nav__list', '.nav__button'], {
          color: '#ccc'
        }, "<")
      },
    });


    /* INTRO ANIMATION */
    introAnimation.from(heroText.words, {
      rotateY: "10deg",
      x: 20,
      stagger: 0.04,
      autoAlpha: 0,
    });

    introAnimation.to(".hero-intro__blob", {
      delay: 0.5,
      clipPath: "circle(50px at 50% 100%)",
      ease: "elastic.out(1, 0.75)",
      duration: 1,
    });

    introAnimation.to(".hero-intro__blob", {
      clipPath: "circle(100% at 50% 50%)",
      duration: 1,
    });

    introAnimation.to([".hero-intro__blob", heroEl(".hero-intro--page-one")], {
      autoAlpha: 0,
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
        autoAlpha: 0,
        x: 100,
      },
      "<"
    );

    introAnimation.from(
      heroEl(".top-letter"),
      {
        autoAlpha: 0,
        x: -100,
      },
      "<"
    );

    introAnimation.fromTo(heroEl(".ventures path"), {
        autoAlpha: 0,
        y: -100,
      },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.05
      }
    )

    /* FACTS HORIZONTAL SCROLL SECTION */
    if (isDesktop) {
      let Sections = gsap.utils.toArray(".facts__section");
  
      const horizontalScroll = gsap.to(".facts-track", {
        xPercent: -100 * (Sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".facts",
          end: `+=${Sections[0].offsetWidth * Sections.length}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      
      gsap.from('.facts-section-line path', {
        drawSVG: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: Sections[0],
          start: "left left",
          end: `+=${Sections[0].offsetWidth * (Sections.length - 1)}`,
          scrub: 1,
          containerAnimation: horizontalScroll,
        }
      })
      
      const servicesSection = gsap.utils.selector(".facts__section-services")
      const firstSectionEntry = gsap.timeline({
        scrollTrigger: {
          trigger: ".facts__section-services",
          start: "center bottom",
          end: "+=500",
          scrub: 1,
          // once: true,
        }
      })
  
      const firstSectionHeading = new SplitText(servicesSection('h2'), { type: "words" });
      firstSectionEntry.from(firstSectionHeading.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05,
      });
  
      firstSectionEntry.from(servicesSection('.facts__services > div'), {
        y: 10,
        autoAlpha: 0,
        stagger: 0.05
      })
  
      /* IMMIGRANT */
      const immigrantsSection = gsap.utils.selector('.immigrant-section')
      const immigrantSectionText = immigrantsSection(".facts__content-text")
  
      const immigrantsSectionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: immigrantsSection("h2"),
          start: "left 80%",
          end: "left 20%",
          scrub: 1,
          containerAnimation: horizontalScroll,
          // once: true,
        },
      })
      immigrantsSectionTimeline.to(
        immigrantsSection(".immigrant-section__digit"),
        {
          textContent: 14,
          snap: { textContent: 0.1 },
        },
        "<"
      );
  
      const immigrantsSectionHeading = new SplitText(immigrantsSection("h2"), { type: "chars" });
      immigrantsSectionTimeline.from(immigrantsSectionHeading.chars, {
        autoAlpha: 0,
        y: 20,
        ease: "none",
        stagger: 0.05
      }, "<");
  
      let immigrantsSectionText = new SplitText(immigrantSectionText[0], {type: "words" });
      immigrantsSectionTimeline.from(immigrantsSectionText.words, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
      }, "<");
  
      immigrantsSectionTimeline.from(immigrantsSection('.immigrant-section__lessthan'), {
        autoAlpha: 0,
        x: -10,
        scaleY: 0
      })
  
      immigrantsSectionTimeline.to(immigrantsSection('.immigrant-section__digit-two'), {
        textContent: 36,
        snap: { textContent: 1 },
      })
  
      immigrantsSectionText = new SplitText(immigrantSectionText[1], { type: "words" });
      immigrantsSectionTimeline.from(immigrantsSectionText.words, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
      }, "<");
  
      immigrantsSectionTimeline.from('.immigrant-section__astricks', {
        y: 10,
        autoAlpha: 0
      })
  
      /* UNICORN FOUNDERS */
      const unicornFoundersSection = gsap.utils.selector('.unicorn-founders')
      const unicornFoundersTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: unicornFoundersSection("h2"),
          start: "left right",
          end: "left 30%",
          scrub: 1,
          containerAnimation: horizontalScroll,
          // once: true,
        }
      })
  
      const unicornFoundersSectionHeading = new SplitText(unicornFoundersSection("h2"), { type: "words" });
      unicornFoundersTimeline.from(unicornFoundersSectionHeading.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05
      }, "<");
      
      const unicornFoundersSectionText = new SplitText(unicornFoundersSection(".facts__title-text"), { type: "words" });
      unicornFoundersTimeline.from(unicornFoundersSectionText.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05
      }, "<");
  
      unicornFoundersSection('.dot').forEach((dot, index) => {
        unicornFoundersTimeline.from(dot, {
          scale: 0,
          ease: 'bounce.inOut'
        }, !index ? '+=2' : '>')
  
        unicornFoundersTimeline.from(dot.nextSibling.nextSibling, {
          autoAlpha: 0,
          x: -5
        })
      })
  
      unicornFoundersTimeline.from(unicornFoundersSection('.arrow'), {
        scale: 0
      }, ">")
  
  
      /* IMMIGRANT FOUNDERS */
      // 157% increase in UK Unicorn immigrant Founders
      const immigrantFoundersSection = gsap.utils.selector('.immigrant-founders')
      const immigrantFoundersTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: immigrantFoundersSection("h2"),
          start: "left 80%",
          end: "left 20%",
          scrub: 1,
          containerAnimation: horizontalScroll,
        }
      })
  
      immigrantFoundersTimeline.from(immigrantFoundersSection('h2'), {
        autoAlpha: 0
      })
  
      var immigrantFoundersHeading = new SplitText(immigrantFoundersSection(".immigrant-section__heading-text"), { type: "words" });
      immigrantFoundersTimeline.from(immigrantFoundersHeading.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05
      }, "<");
  
      const immigrantFoundersSectionText = new SplitText(immigrantFoundersSection(".facts__title-text"), { type: "words" });
      immigrantFoundersTimeline.from(immigrantFoundersSectionText.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05
      }, "<");
  
      immigrantFoundersTimeline.from(immigrantFoundersSection('.dot-zero'), {
        scale: 0,
        ease: 'bounce.inOut'
      }, "+=1")
  
      immigrantFoundersTimeline.from([immigrantFoundersSection('.graph-line'), immigrantFoundersSection('.graph-shade')], {
        clipPath: "inset(233px 0 0)",
        stagger: 0.05
      })
  
      immigrantFoundersTimeline.from(immigrantFoundersSection('.dot-thirty-six'), {
        scale: 0,
        ease: 'bounce.inOut'
      })
    }


    /* PORTFOLIO SECTION */
    const portfolio = gsap.timeline({
      scrollTrigger: {
        trigger: ".portfolio",
        start: "top center",
        end: "+=300",
        scrub: true
      },
    });

    portfolio.from(".portfolio-link__wrapper", {
      y: 30,
      autoAlpha: 0,
      stagger: 0.5,
    });

    gsap.from('.line-portfoli-about path', {
      drawSVG: 0,
      scrollTrigger: {
        trigger: '.line-portfoli-about',
        start: 'top bottom',
        bottom: 'bottom center',
        scrub: 2,
        ease: 'none'
      }
    })

    /* ABOUT SECTION */
    const fonuderSection = gsap.utils.selector('.founder')
    const founderTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".founder__pinned-wrapper",
        start: "top",
        end: "bottom",
        scrub: 2,
        pin: true,
        snap: 1
      },
    });

    founderTimeline.from('.founder > div', {
      autoAlpha: 0,
    });

    founderTimeline.to(
      fonuderSection(".about-content__content"),
      {
        autoAlpha: 1,
        x: -10
      },
      "<"
    );

    founderTimeline.to({}, {duration:2})

    gsap.from('.about__line-about path', {
      drawSVG: 0,
      scrollTrigger: {
        trigger: '.about',
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: 2,
      }
    })

    /* ABOUT - COMMUNITY */
    const communityEl = gsap.utils.selector('.community')
    const communityTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".community-pinned-wrapper",
        start: "top",
        end: "bottom",
        scrub: 2,
        snap: 1,
        pin: true,
      },
    })

    communityTimeline.from(communityEl('.content-wrapper'), {
      autoAlpha: 0,
    })

    communityTimeline.to(communityEl(".about-content__content"), {
      autoAlpha: 1,
    }, "<");

    communityTimeline.from(communityEl('.about-content__content > div'), {
      y: -10,
      autoAlpha: 0,
      stagger: 0.05
    })

    communityTimeline.to({}, {duration: 2})

    gsap.from('.about__line-community-faq path', {
      drawSVG: '100% 100%',
      scrollTrigger: {
        trigger: '.about__line-community-faq', 
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 2,
      }
    })

    const pitchLines = gsap.utils.toArray('.pitch-lines path')
    gsap.from([pitchLines[1], pitchLines[2]], {
      drawSVG: 0,
      scrollTrigger: {
        trigger: '#pitch',
        start: 'top bottom',
        end: 'center bottom',
        scrub: 2,
      }
    })
    gsap.from(pitchLines[0], {
      drawSVG: '100% 100%',
      scrollTrigger: {
        trigger: '#pitch',
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: 2,
      }
    })
  }
);
