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

const jumpToSection = document.getElementById(window.location.hash.substring(1))

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
    let intentObserver, hasExited = false

    const heroEl = gsap.utils.selector(".hero-intro");
    const heroText = gsap.utils.toArray(".hero-intro h1 div");
    const logo = gsap.utils.selector('.intro__logo')
    const mobileLogo = gsap.utils.selector('.intro__logo--mobile')
    const Sections = Array.from(document.querySelectorAll(".fixed-page > *"));
    const heroTextOne = new SplitText(heroText[0], { type: "words" });
    const heroTextTwo = new SplitText(heroText[1], { type: "words" });
    const introAnimation = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("intro-seen", true);

        if (intentObserver) {
          intentObserver.enable();
        }

        document.querySelector('.nav').classList.add('animation-complete')
      },
    });

    if (!sessionStorage.getItem("intro-seen")) {
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
        }
      );

      introAnimation.to(
        heroEl('h1 .page-one'),
        {
          y: 0,
          autoAlpha: .5,
          scale: .9,
          duration: 2
        }, "+=.5"
      )

      introAnimation.from(heroTextTwo.words, {
        rotateY: "10deg",
        x: 20,
        stagger: 0.04,
        autoAlpha: 0,
        duration: 2
      }, "<10%");

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
          duration: 2,
        },
        "<"
      );

      introAnimation.set("#intro", {
        background: "#111111",
      });

      introAnimation.set(
        [".hero-intro__blob", heroEl(".hero-intro--page-one")],
        {
          autoAlpha: 0,
        }
      );

      introAnimation.set(
        heroEl(".hero-intro--page-two"),
        {
          autoAlpha: 1,
        }
      );

      introAnimation.from(
        isMobile ? mobileLogo(".bottom-letter") : logo(".bottom-letter"),
        {
          autoAlpha: 0,
          x: -5,
          y: -5,
          ease: "elastic.out(2, 0.75)",
          duration: 1
        },
      );

      introAnimation.from(
        isMobile ? mobileLogo(".top-letter") : logo(".top-letter"),
        {
          autoAlpha: 0,
          x: 5,
          y: 5,
          ease: "elastic.out(2, 0.75)",
          duration: 1
        },
        "<"
      );

      introAnimation.fromTo(
        isMobile ? mobileLogo(".ventures path") : logo(".ventures path"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
          duration: 1
        }
      );

      introAnimation.fromTo(
        isMobile ? mobileLogo(".draw-me") : logo(".draw-me"),
        { drawSVG: "0%", ease: "none" },
        { drawSVG: "-100%", duration: 2 },
        "<"
      );

      introAnimation.from(heroEl('.scroll-down'), {
        autoAlpha: 0,
        duration: 2
      });

      introAnimation.from('.nav li a', {
        x: -100,
        autoAlpha: 0,
        attr: {
          class: 'nav__button active'
        },
        stagger: 0.05
    }, "<")

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
          x: isMobile ? - 3 : -5,
          y: isMobile ? - 3 : -5,
          ease: "elastic.out(2, 0.75)",
        },
      );

      introAnimation.from(
        heroEl(".top-letter"),
        {
          x: isMobile ? 3 : 5,
          y:isMobile ? 3 :  5,
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
        isMobile ? mobileLogo(".draw-me") : logo(".draw-me"),
        { drawSVG: "0%", ease: "none", autoAlpha: 1 },
        { drawSVG: "-100%", duration: 2 },
        "<"
      );

      introAnimation.from(heroEl('.scroll-down'), {
        autoAlpha: 0
      });

      introAnimation.from('.nav li a', {
        x: -100,
        autoAlpha: 0,
        attr: {
          class: 'nav__button active'
        },
        stagger: 0.05
    }, "<")
    }

    if (isDesktop) {
      let currentIndex = -1;
      let animating;

      const pageAnimations = [false]

      gsap.set(Sections, {
        zIndex: i => i,
        autoAlpha: (i) => !i ? 1 : 0,
        attr: {
          'data-index':  (i) => i+1,
        }
      });

      intentObserver = ScrollTrigger.observe({
        type: "scroll,wheel,touch",
        onUp: () => !animating && gotoPanel(currentIndex - 1, false),
        onDown: () => !animating && gotoPanel(currentIndex + 1, true),
        onChange: () => document.querySelector('body').style.overflow = 'visible',
        tolerance: 250,
        wheelSpeed: 0.5,
        scrollSpeed: 0.5,
        preventDefault: true
      })
      intentObserver.disable();

      ScrollTrigger.create({
        trigger: '.fixed-page',
        pin: true,
        start: "top top",
        end: "+=1",
        onEnterBack: () => {
          intentObserver.enable();
          gotoPanel(currentIndex - 1, false);
        }
      })

      function gotoPanel(index, isScrollingDown, isQuickNav) {
        if (index <= -1) {
          return
        }

        // prevent immediate scroll from button
        if (hasExited) {
          setTimeout(() => {
            hasExited = false
          }, 500)
          return
        }
        
        animating = true;
        const isSlider = index > 0 && index < 5

        let shouldSlide = ''

        if (isScrollingDown && Sections[currentIndex]?.className?.match('facts__section')) {
          shouldSlide = 'exit'
        } else if (!isScrollingDown && Sections[index]?.className?.match('facts__section')) {
          shouldSlide = 'enter'
        }

        if (pageAnimations[index] && shouldSlide !== 'enter') {
          pageAnimations[index].seek(0)
          pageAnimations[index].pause()
        }

        // Highlight correct nav
        gsap.utils.toArray(`.nav__list a[href^="#"]`).forEach((link) => {
          const indexes = link.getAttribute('data-indexes').split(',')
          link.classList.remove('active')
          link.classList.remove('previous')

          for (let linkIndex = 0; linkIndex < indexes.length; linkIndex++) {
            const i = Number(indexes[linkIndex]);

            if (i <= index) {
              link.classList.add('previous')
              if (i === index) {
                link.classList.remove('previous')
                link.classList.add('active')
              } else {
                link.classList.remove('active')
              }
            }
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
              hasExited = true
              isScrollingDown && intentObserver.disable();
            }
          });
          return
        }
      
        let target = isScrollingDown ? Sections[index]: Sections[currentIndex];

        header.classList.toggle('hide', isScrollingDown)

        const transition = gsap.timeline({
          duration: 0.75,
          ease: 'power1.in',
          onComplete: () => {
            if (pageAnimations[index] && shouldSlide !== 'enter') {
              pageAnimations[index].eventCallback('onComplete', () => animating = false)
              pageAnimations[index].play()
            } else {
              animating = false;
            }
          },
          onStart: () => {
            document.querySelector('.active-slide')?.classList.remove('active-slide')
            target.classList.add('active-slide')

            gsap.to(['body', 'header'], {
              color: Sections[index].getAttribute('data-bg') === '#ffffff' ? '#3E3E3E' : '#ffffff'
            })
          }
        })

        // make sure all previous slides are visible when using quicknav
        // quicknav pretty much takes over animating just the before and after slides
        if (isQuickNav) {
          for (let i = 0; i < Sections.length - 1; i++) {
            if (i === currentIndex || i === index) {
              if (!isScrollingDown) {
                transition.set(Sections[index], {
                  autoAlpha: 1,
                })
                transition.to(Sections[currentIndex], {
                  autoAlpha: 0
                })
              } else {
                transition.to(target, {
                  autoAlpha: 1
                }, "<")
                transition.set(Sections[currentIndex], {
                  autoAlpha: 0
                })
              }
            } else {
              transition.set(Sections[i], {
                autoAlpha: 0
              })
            }
          }
        } else {
          // else navigating normally

          // horizontal scroll section
          if (shouldSlide) {
            if (!isScrollingDown) {
              transition.to(Sections[currentIndex], {
                autoAlpha: 0,
              }, "<");
              if (isSlider) {
                transition.to(Sections[index].querySelector('.facts__section-content'), {
                  xPercent: 0
                }, "<")
                transition.to(Sections[currentIndex].querySelector('.facts__section-content'), {
                  xPercent: 20
                }, "<")
              }
              transition.to(Sections[index], {
                autoAlpha: 1
              }, "<")
              transition.to(Sections[index], {
                xPercent: 0
              }, "<")
            } else {
              transition.to(Sections[currentIndex], {
                autoAlpha: 0
              }, "<");
              
              if (isSlider) {
                transition.to(Sections[currentIndex].querySelector('.facts__section-content'), {
                  xPercent: -20
                }, "<")
                transition.to(Sections[index].querySelector('.facts__section-content'), {
                  xPercent: 0
                }, "<")
              }
  
              transition.to(target, {
                autoAlpha: 1,
              }, "<");
            }
          } else {
            if (!isScrollingDown) {
              Sections.forEach((section, i) => {
                if (i < currentIndex) {
                  transition.set(section, {
                    autoAlpha: 1
                  })
                }
              })
            }
            transition.to(target, {
              autoAlpha: isScrollingDown ? 1 : 0,
            }, "<");
          }
        }

        if (isSlider) {
          // horizontal scroll line
          transition.to('.facts-section-line', {
            autoAlpha: 1
          }, "<")
          gsap.fromTo('.facts-section-line path', {
            drawSVG: ((100 / document.querySelectorAll('.facts__section').length) * currentIndex) + '%',
            duration: 2
          }, {
            drawSVG: ((100 / document.querySelectorAll('.facts__section').length) * index) + '%',
            duration: 2
          }, "<")
        } else {
          transition.to('.facts-section-line', {
            autoAlpha: 0
          }, "<")
          
          gsap.fromTo('.facts-section-line path', {
            drawSVG: ((100 / document.querySelectorAll('.facts__section').length) * currentIndex) + '%'
          }, {
            drawSVG: index === 0 ? '0 0' : '-100% 100%'
          }, "<")
        }

        currentIndex = Number(index);

        if (currentIndex > 0) {
          // horizontal scroll needs a backgorund as each slide is offset sideways and does not have
          // the previous slide 'behind' it
          document.getElementById('intro').classList.add('add-background')
        } else {
          document.getElementById('intro').classList.remove('add-background')
        }
      }   
      
      let hasScrolled = false;
      function checkIfScrolled() {
        if(!hasScrolled) {
          queuedAnims.push(this.parent.pause(0));
        }
      }

      if (jumpToSection) {
        // if # in the url, jump to that index (if exists)
        gotoPanel(Number(jumpToSection.getAttribute('data-index')) - 1, true)
      } else {
        gotoPanel(0, true)
      }
      gsap.utils.toArray('[href^="#"]').forEach((link) => {
        const targetIndex = Number(document.getElementById(link.href.split('#')[1])?.getAttribute('data-index')) - 1;
        
        link.addEventListener("click", (e) => {
          e.preventDefault();
          
          header.classList.remove("show-mobile-menu");
      
          if (targetIndex) {
            gotoPanel(targetIndex, targetIndex > currentIndex, true )
          } else {
            // handle navigation to correct page
          }
        });
      });

      if (Sections) {
        const servicesSection = gsap.utils.selector(".facts__section-services");
        const firstSectionTimeline = gsap.timeline({
          defaults: {
            duration: 1
          }
        })
        const firstSectionHeading = new SplitText(servicesSection("h2"), {
          type: "words,lines",
        });

        firstSectionTimeline.set(firstSectionHeading.lines, {
          overflow: 'hidden'
        })

        firstSectionTimeline.set(servicesSection("h2"), {
          y: '100%'
        })

        firstSectionTimeline.from(firstSectionHeading.words, {
          y: '100%',
          autoAlpha: 0,
          stagger: 0.05,
        });

        firstSectionTimeline.to(servicesSection("h2"), {
          y: 0
        })

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
          defaults: {
            duration: 1
          }
        })

        immigrantSectionTimeline.from(immigrantsSection('.facts__section-content'), {
          x: 50
        })

        const immigrantsSectionHeading = new SplitText(
          immigrantsSection("h2"),
          { type: "words" }
        );
        immigrantSectionTimeline.from(
          immigrantsSectionHeading.words,
          {
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        
        immigrantSectionTimeline.from(immigrantsSection('.facts__section-subtitle'), {
          autoAlpha: 0,
        })

        immigrantSectionTimeline.from(
          immigrantsSection(".immigrant-section__digit"),
          {
            textContent: 0,
            snap: { textContent: 0.1 },
            duration: 2
          }, "<"
        );

        immigrantSectionTimeline.from(
          immigrantsSection(".immigrant-section__lessthan"),
          {
            autoAlpha: 0,
            scaleY: 0,
          }, "<10%"
        );

        immigrantSectionTimeline.from(
          new SplitText(immigrantSectionText[0], {
            type: "words",
          }).words,
          {
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<15%"
        );

        immigrantSectionTimeline.from(
          immigrantsSection(".immigrant-section__digit-two"),
          {
            textContent: 0,
            snap: { textContent: 1 },
            duration: 2
          },
          "<"
        );

        immigrantSectionTimeline.from(
          new SplitText(immigrantSectionText[1], {
            type: "words",
          }).words,
          {
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        immigrantSectionTimeline.from(".immigrant-section__astricks", {
          x: 10,
          autoAlpha: 0,
        }, "<");

        pageAnimations.push(immigrantSectionTimeline)

        // /* IMMIGRANT FOUNDERS */
        // 2.6X increase in UK Unicorn immigrant Founders
        const immigrantFoundersSection = gsap.utils.selector(
          ".immigrant-founders"
        );
        const immigrantFoundersTimeline = gsap.timeline({
          defaults: {
            duration: 1
          }
        })

        immigrantFoundersTimeline.from(immigrantFoundersSection('.facts__section-content'), {
          autoAlpha: 0,
          xPercent: 20
        })

        var immigrantFoundersHeading = new SplitText(
          immigrantFoundersSection(".immigrant-section__heading-text"),
          { type: "words" }
        );

        immigrantFoundersTimeline.from(
          immigrantFoundersHeading.words,
          {
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        immigrantFoundersTimeline.from(
          immigrantFoundersSection("h2 div")[0],
          {
            autoAlpha: 0,
          }, "<"
        );

        immigrantFoundersTimeline.from(
          immigrantFoundersSection("h2 .numbers")[0],
          {
            textContent: 0,
            snap: { textContent: .1 },
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
          }, "<50%"
        )

        immigrantFoundersTimeline.from(['.dashed-vertical', '.dashed-horizontal'], {
          autoAlpha: 0
        }, "<50%")

        immigrantFoundersTimeline.from('.number-thirty-six', {
          autoAlpha: 0,
          scale: 0,
          ease: "bounce.inOut",
        }, "<10%")

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
        const unicornFoundersTimeline = gsap.timeline({
          defaults: {
            duration: 1
          }
        })

        unicornFoundersTimeline.from(unicornFoundersSection('.facts__section-content'), {
          autoAlpha: 0,
          xPercent: 20
        })

        const unicornFoundersSectionHeading = new SplitText(
          unicornFoundersSection("h2"),
          { type: "words" }
        );
        unicornFoundersTimeline.from(
          unicornFoundersSectionHeading.words,
          {
            autoAlpha: 0,
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
            stagger: 0.05,
          },
          "<"
        );

        unicornFoundersSection(".dot").forEach((dot, index) => {
          unicornFoundersTimeline.from(dot, {
            scale: 0,
            ease: "bounce.inOut",
          }, "<15%");

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

        // /* PORTFOLIO SECTION */
        const portfolio = gsap.timeline({
          onStart: () => {
            gsap.to(".line-portfoli-about path", {
              drawSVG: '100%',
              duration: 2,
              autoAlpha: 1
            });
          }
        });

        portfolio.from('.portfolio__content', {
          y: 20,
          autoAlpha: 0
        })

        portfolio.set(".line-portfoli-about path", {
          autoAlpha: 0,
          drawSVG: 0,
        }, "<");

        portfolio.from(".portfolio-link__wrapper", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.05,
        }, "<");

        pageAnimations.push(portfolio)


        // /* ABOUT SECTION */
        const fonuderSection = gsap.utils.selector(".founder");
        const founderTimeline = gsap.timeline({})
        
        founderTimeline.from(
          ".founder > div",
          {
            autoAlpha: 0,
            y: 20,
            stagger: 0.05
          }
        );

        founderTimeline.from(".about-line--top path", {
          drawSVG: '0 0',
        });

        founderTimeline.from(".about__line-about path", {
          drawSVG: 0,
        });        


        pageAnimations.push(founderTimeline)


        // /* ABOUT - COMMUNITY */
        const communityEl = gsap.utils.selector(".community");
        const communityTimeline = gsap.timeline({
          defaults: {
            duration: 1
          }
        });

        communityTimeline.from(
          ".community",
          {
            y: 20,
            autoAlpha: 0
          },
          "<"
        );

        communityTimeline.from(communityEl(".about-content__content > div"), {
          y: 10,
          autoAlpha: 0,
          stagger: 0.075,
        }, "<");

        communityTimeline.from(".about__line-community-faq path", {
          drawSVG: "100% 100%",
        }, "<");

        pageAnimations.push(communityTimeline)

        const faqTimeline = gsap.timeline({})


        faqTimeline.from('.faq-line path', {
          drawSVG: 0,
          duration: 1
        })

        pageAnimations.push(faqTimeline)

        const pitchLines = gsap.utils.toArray(".pitch-lines--top:not(.pitch-lines--mobile) path");
        const pitchTimeline = gsap.timeline({})

        pitchTimeline.from([pitchLines[0], pitchLines[1]], {
          drawSVG: 0,
        }, "<");

        pitchTimeline.from('.pitch-lines--bottom path', {
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
    } else if (isMobile) {
      if (jumpToSection) {
        window.scrollTo({top: jumpToSection.offsetTop, behavior: 'smooth'})
      }

      gsap.from('.line-immigrant-unicorn-founders path', {
        scrollTrigger: {
          start: 'top bottom-=400',
          trigger: '.line-immigrant-unicorn-founders',
        },
        drawSVG: 0
      })
      
      gsap.from('.line-portfoli-about--mobile path', {
        scrollTrigger: {
          start: 'top bottom-=400',
          trigger: '.line-portfoli-about--mobile',
        },
        drawSVG: 0
      })
      
      gsap.from('.about__line-about path', {
        scrollTrigger: {
          start: 'top bottom-=400',
          trigger: '.about__line-about',
        },
        drawSVG: 0
      })

      const pitchLines = gsap.utils.toArray('#pitch .pitch-lines--mobile path')
      
      gsap.from([pitchLines[0], pitchLines[1]], {
        drawSVG: 0,
        scrollTrigger: {
          trigger: '#pitch',
          start: 'top center'
        }
      })

      gsap.from(pitchLines[2], {
        drawSVG: '100% 100%',
        scrollTrigger: {
          trigger: '#pitch',
          start: 'bottom bottom'
        }
      })

      const menuLinks = gsap.utils.toArray('.header__mobile-menu [href*="#"]')
      menuLinks?.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const index = document.getElementById(link.hash.substring(1))
          header.classList.remove('show-mobile-menu')
          window.scrollTo({top: index.offsetTop - 10, behavior: 'smooth'})
        })
      })

      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (e) => {
          const windowPos = window.pageYOffset || document.scrollTop || 0;
          
          Sections.forEach(section => {
            const sectionHeight = section.offsetHeight
            if(section.offsetTop + sectionHeight >= windowPos && section.offsetTop <= windowPos) {
              const currentBg = section.getAttribute('data-bg')
              header.style.color = currentBg === '#111111' ? '#ffffff' : '#111111'
            }
          })
        }
      })
    }
  }
);