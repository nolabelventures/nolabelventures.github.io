
window.addEventListener('load', () => {
  const dropdowns = gsap.utils.toArray("[data-dropdown]");
  dropdowns.forEach((dropdown) => {
    const content = dropdown.nextSibling.nextSibling;
    const contentHeight = content.clientHeight
    content.style.height = 0;

    dropdown.addEventListener("click", (e) => {
      const button = e.currentTarget;

      dropdowns.forEach(dd => {
        gsap.to(dd.nextSibling.nextSibling, {
          height: 0
        })

        dd.classList.remove("dropdown-active");
      })

      if (content.style.height !== '0px') {
        button.classList.remove("dropdown-active");

        gsap.to(content, {
          height: 0
        })
      } else {
        button.classList.add("dropdown-active");

        gsap.to(content, {
          height: contentHeight + 'px'
        })
      }
    });
  });
})

/*
 * FAQ Dropdowns
 */
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

      introAnimation.set('.nav', {
        autoAlpha: 1
      }, "<")

      introAnimation.from('.nav li a', {
        x: -100,
        autoAlpha: 0,
        attr: {
          class: 'nav__button active'
        },
        stagger: 0.05
      }, "<")

      if (!localStorage['cookie_dismissed']) {
        introAnimation.to(cookieNotice, {
          autoAlpha: 1
        }, "<")
      }
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
          y: isMobile ? 3 : 5,
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

      if (!jumpToSection) {
        introAnimation.set('.nav', {
          autoAlpha: 1
        }, "<")

        introAnimation.from('.nav li a', {
          x: -100,
          autoAlpha: 0,
          attr: {
            class: 'nav__button active'
          },
          stagger: 0.05
        }, "<")
      } else {
        introAnimation.to('.nav', {
          autoAlpha: 1
        })
      }

      if (!localStorage['cookie_dismissed']) {
        introAnimation.to(cookieNotice, {
          autoAlpha: 1
        }, "<")
      }
    }

    if (isDesktop) {
      let currentIndex = -1;
      let animating;

      const pageAnimations = [false]

      gsap.set(Sections, {
        zIndex: i => i,
        autoAlpha: (i) => !i ? 1 : 0,
        attr: {
          'data-index': (i) => i + 1,
        }
      });

      intentObserver = ScrollTrigger.observe({
        type: "scroll,wheel,touch",
        onUp: () => !animating && gotoPanel(currentIndex - 1, false),
        onDown: () => !animating && gotoPanel(currentIndex + 1, true),
        onLeft: () => !animating && currentIndex > 0 && currentIndex < 5 && gotoPanel(currentIndex - 1, false),
        onRight: () => !animating && currentIndex > 0 && currentIndex < 5 && gotoPanel(currentIndex + 1, true),
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

      let hasInteractedWithPortfolio = false
      let portfolioDirection = 0

      const navLinks = gsap.utils.toArray(`.nav__list a[href^="#"]`)
      const porfolioLinks = gsap.utils.toArray('.portfolio__link')

      function gotoPanel(index, isScrollingDown, isQuickNav) {
        if (index <= -1 || index === currentIndex) {
          return
        }

        // portfolio functionality
        if (currentIndex === 5 && (portfolioDirection === 1 && !isScrollingDown || portfolioDirection === -1 && isScrollingDown)) {
          intentObserver.disable();
          return
        }

        if (porfolioLinks.length > 15) {
          // enable scrolling on Portfolio section
          if (index === 5) {
            intentObserver.disable();
          } else {
            intentObserver.enable();
          }
        }

        document.querySelector('body').style.overflow = 'hidden'

        // prevent immediate scroll from button
        if (hasExited) {
          setTimeout(() => {
            hasExited = false
          }, 500)
          return
        }

        animating = true;

        const isSlider = index > 0 && index < 4

        let shouldSlide = ''


        if (isScrollingDown && Sections[currentIndex]?.className?.match('facts__section')) {
          shouldSlide = 'exit'
        } else if (!isScrollingDown && Sections[index]?.className?.match('facts__section')) {
          shouldSlide = 'enter'
        } else if (Sections[index]?.className?.match('facts__section') && isQuickNav) {
          shouldSlide = 'enter'
        }

        if (pageAnimations[index]) {
          pageAnimations[index].seek(0)
          pageAnimations[index].pause()
        }

        // Highlight correct nav
        navLinks.forEach((link) => {
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
          document.querySelector('body').style.overflow = ''
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

        let target = isScrollingDown ? Sections[index] : Sections[currentIndex];

        header.classList.toggle('hide', isScrollingDown && !isQuickNav)

        const transition = gsap.timeline({
          duration: 0.75,
          ease: 'power1.in',
          onComplete: () => {
            if (!pageAnimations[index]) {
              animating = false;
            }
          },
          onStart: () => {
            document.querySelector('.active-slide')?.classList.remove('active-slide')

            // on page load, sometimes target is unavailable
            if (target) {
              target.classList.add('active-slide')
            }

            gsap.to('body', {
              color: Sections[index].getAttribute('data-bg') === '#ffffff' ? '#3E3E3E' : '#ffffff'
            })

            gsap.to('header', {
              color: Sections[index].getAttribute('data-bg') === '#ffffff' ? '#000000' : '#ffffff'
            })

            if (pageAnimations[index]) {
              setTimeout(() => {
                pageAnimations[index].eventCallback('onComplete', () => {
                  animating = false
                })
                pageAnimations[index].play()
              }, 250)
            }
          }
        })

        if (!isSlider) {
          // Makes sure the line fades out before transition
          transition.to('.facts-section-line', {
            autoAlpha: 0
          }, "<")
        }

        // make sure all previous slides are visible when using quicknav
        // quicknav pretty much takes over animating just the before and after slides
        if (isQuickNav) {
          if (shouldSlide && !isScrollingDown) {
            transition.set(Sections[index].querySelector('.facts__section-content'), {
              xPercent: 0,
              autoAlpha: 1
            })
          }

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
                transition.to(Sections[index], {
                  autoAlpha: 1
                })
                if (Sections[currentIndex]) {
                  // This may not exist if there is a # in url
                  transition.set(Sections[currentIndex], {
                    autoAlpha: 0
                  })
                }
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
                if (Sections[currentIndex].querySelector('.facts__section-content')) {
                  transition.to(Sections[currentIndex].querySelector('.facts__section-content'), {
                    xPercent: 20,
                    autoAlpha: 0
                  }, "<")
                }

                transition.fromTo(Sections[index].querySelector('.facts__section-content'), {
                  xPercent: -20,
                  autoAlpha: 0
                }, {
                  xPercent: 0,
                  autoAlpha: 1
                }, "<50%")
              }

              transition.to(Sections[index], {
                autoAlpha: 1,
              }, "<")
            } else {
              transition.to(Sections[currentIndex], {
                autoAlpha: 0
              }, "<");

              if (isSlider) {
                transition.to(Sections[currentIndex].querySelector('.facts__section-content'), {
                  xPercent: -20,
                  autoAlpha: 0
                }, "<")
                if (Sections[index].querySelector('.facts__section-content')) {
                  transition.fromTo(Sections[index].querySelector('.facts__section-content'), {
                    xPercent: 20,
                    autoAlpha: 0
                  }, {
                    xPercent: 0,
                    autoAlpha: 1
                  }, "<50%")
                }
              }

              transition.to(Sections[index], {
                autoAlpha: 1,
              }, "<");
            }
          } else {
            // Normal scroll
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
            }, isScrollingDown ? "<50%" : "");
          }
        }

        // horizontal scroll line
        if (isSlider) {
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
          header.classList.add('show-logo')
        } else {
          document.getElementById('intro').classList.remove('add-background')
          header.classList.remove('show-logo')
        }
      }

      let hasScrolled = false;

      window.addEventListener('keyup', (e) => {
        const goDown = ['ArrowRight', 'ArrowDown']
        const goUp = ['ArrowLeft', 'ArrowUp']

        if (goDown.indexOf(e.key) > -1) {
          gotoPanel(currentIndex + 1, true)
        } else if (goUp.indexOf(e.key) > -1) {
          gotoPanel(currentIndex - 1, false)
        }
      })

      if (jumpToSection) {
        // if # in the url, jump to that index (if exists)
        gotoPanel(Number(jumpToSection.getAttribute('data-index')) - 1, true, true)
      } else {
        gotoPanel(0, true, true)
      }
      gsap.utils.toArray('[href^="#"]').forEach((link) => {
        const targetIndex = Number(document.getElementById(link.href.split('#')[1])?.getAttribute('data-index')) - 1;

        link.addEventListener("click", (e) => {
          e.preventDefault();

          header.classList.remove("show-mobile-menu");

          if (targetIndex) {
            window.location = '#' + link.href.split('#')[1]
            gotoPanel(targetIndex, targetIndex > currentIndex, true)
          }
        });
      });

      if (Sections) {
        // /* IMMIGRANT */
        const immigrantsSection = gsap.utils.selector(".immigrant-section");
        const immigrantSectionTimeline = gsap.timeline({
          defaults: {
            duration: 1
          }
        })

        const immigrantsSectionHeading = new SplitText(
          immigrantsSection("h2"),
          { type: "words" }
        );

        immigrantSectionTimeline.from(
          immigrantsSectionHeading.words,
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
          }
        );

        const immigrantSectionText = immigrantsSection(".facts__section-body-content .split");
        immigrantSectionTimeline.from(
          new SplitText(immigrantSectionText, {
            type: "words",
          }).words,
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
          }
        );

        immigrantSectionTimeline.from(immigrantsSection('.immigrant-section__digit'), {
          textContent: 0,
          autoAlpha: 0,
          snap: { textContent: 1 },
        }, "<10%")

        const immigrantSectionHilightedText = immigrantsSection('.facts__section-body-content .text-highlight')
        immigrantSectionTimeline.from(immigrantSectionHilightedText, {
          autoAlpha: 0,
          y: 10
        }, "<50%")

        immigrantSectionTimeline.from(immigrantsSection('.immigrant-section__digit-two'), {
          textContent: 0,
          snap: { textContent: 1 },
        }, "<")

        immigrantSectionTimeline.from(".facts-section__astricks", {
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

        var immigrantFoundersHeading = new SplitText(
          immigrantFoundersSection(".immigrant-section__heading-text"),
          { type: "words" }
        );

        immigrantFoundersTimeline.from(
          immigrantFoundersHeading.words,
          {
            autoAlpha: 0,
            y: 10,
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
        const unicornFoundersTimeline = gsap.timefaline({
          defaults: {
            duration: 1
          }
        })

        const unicornFoundersHeading = unicornFoundersSection("h2 .split")

        const unicornFoundersSectionHeadingSplitOne = new SplitText(
          unicornFoundersHeading[0],
          { type: "words" }
        );
        unicornFoundersTimeline.from(
          unicornFoundersSectionHeadingSplitOne.words,
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
          },
        );

        const unicornFoundersSectionHeadingSplitTwo = new SplitText(
          unicornFoundersHeading[1],
          { type: "words" }
        );

        unicornFoundersTimeline.from(
          unicornFoundersSectionHeadingSplitTwo.words,
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
          },
          "<10%"
        );

        unicornFoundersTimeline.from(unicornFoundersSection('h2 .text-highlight'), {
          autoAlpha: 0,
          y: 10
        }, "<10%")

        const unicornFoundersSectionHeadingSplitThree = new SplitText(
          unicornFoundersHeading[2],
          { type: "words" }
        );

        unicornFoundersTimeline.from(
          unicornFoundersSectionHeadingSplitThree.words,
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.05,
          },
          "<10%"
        );

        unicornFoundersTimeline.from(unicornFoundersSection('.facts__section-content > div')[1], {
          autoAlpha: 0
        }, "<10%")

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
        ScrollTrigger.create({
          scroller: '.portfolio__content',
          scrub: true,
          onUpdate: (self) => {
            portfolioDirection = self.direction

            if (self.progress > 0.95 && hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = false
              setTimeout(() => {
                intentObserver.enable()
              }, 1000)
            } else if (self.progress < 0.05 && hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = false
              setTimeout(() => {
                intentObserver.enable()
              }, 1000)
            }
          },
          onToggle: (self) => {
            if (self.progress > 0 && !hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = true
            }
          }
        })

        const portfolio = gsap.timeline({
          paused: true,
          onStart: () => {
            document.querySelector('.portfolio__content').scroll(0, 0)

            hasInteractedWithPortfolio = false

            gsap.to(".line-portfolio-about path", {
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

        portfolio.set(".line-portfolio-about path", {
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
          paused: true,
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

        // FAQ 1
        const faqTimeline = gsap.timeline({ paused: true })
        const faqSection = gsap.utils.selector('#faq-1')

        faqTimeline.from(faqSection('.faq-line path'), {
          drawSVG: 0,
          duration: 1
        })

        faqTimeline.from(faqSection('h2'), {
          autoAlpha: 0
        }, "<")

        faqTimeline.from(faqSection('.faq__faq-item'), {
          autoAlpha: 0,
          stagger: 0.05,
          scaleY: 0,
        }, "<")

        pageAnimations.push(faqTimeline)
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

        gsap.from(".line-portfolio-about path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".line-portfolio-about",
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
      }
    } else if (isMobile) {
      if (jumpToSection) {
        window.scrollTo({ top: jumpToSection.offsetTop, behavior: 'smooth' })
      }

      window.addEventListener("DOMContentLoaded", () => {
        const height = window.innerHeight;
        document.querySelector('.hero-intro').style.height = `${height}px`;
      })

      /* SECTION ONE */
      const immigrantsSection = gsap.utils.selector('.immigrant-section')
      const immigrantSectionTitle = new SplitText(immigrantsSection('h2'), { type: 'words' })

      gsap.from(immigrantSectionTitle.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.immigrant-section',
          start: 'top bottom',
          end: '+=500',
          scrub: true,
          once: true
        }
      })

      const immigrantSectionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.immigrant-section',
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
          once: true
        }
      })

      immigrantSectionTimeline.from(immigrantsSection('.immigrant-section__digit'), {
        textContent: 0,
        snap: { textContent: 1 },
      })


      immigrantSectionTimeline.from(immigrantsSection('.immigrant-section__digit-two'), {
        textContent: 0,
        snap: { textContent: 1 },
      })

      immigrantSectionTimeline.from(immigrantsSection('.facts-section__astricks'), {
        autoAlpha: 0
      })

      /* SECTION FOUR */
      const immigrantFoundersSection = gsap.utils.selector('.immigrant-founders')
      const immigrantFoundersTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.immigrant-founders',
          scrub: true,
          end: 'bottom bottom',
          once: true
        }
      })

      immigrantFoundersTimeline.from(immigrantFoundersSection('.numbers'), {
        textContent: 0,
        snap: { textContent: .1 }
      })

      const headingText = new SplitText(immigrantFoundersSection('.immigrant-section__heading-text'), { type: 'words' })
      immigrantFoundersTimeline.from(headingText.words, {
        autoAlpha: 0,
        stagger: 0.05
      })

      immigrantFoundersTimeline.from(immigrantFoundersSection('.facts__section-content > div')[1], {
        autoAlpha: 0
      })

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

      /* SECTION FIVE */
      const unicornFoundersSection = gsap.utils.selector('.unicorn-founders')
      const unicornFoundersTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.unicorn-founders',
          scrub: true,
          end: 'bottom bottom',
          once: true
        }
      })

      const unicornFoundersHeading = unicornFoundersSection("h2 .split")

      const unicornFoundersSectionHeadingSplitOne = new SplitText(
        unicornFoundersHeading[0],
        { type: "words" }
      );
      unicornFoundersTimeline.from(
        unicornFoundersSectionHeadingSplitOne.words,
        {
          autoAlpha: 0,
          y: 10,
          stagger: 0.05,
        },
      );

      const unicornFoundersSectionHeadingSplitTwo = new SplitText(
        unicornFoundersHeading[1],
        { type: "words" }
      );

      unicornFoundersTimeline.from(
        unicornFoundersSectionHeadingSplitTwo.words,
        {
          autoAlpha: 0,
          y: 10,
          stagger: 0.05,
        }
      );

      unicornFoundersTimeline.from(unicornFoundersSection('h2 .text-highlight'), {
        autoAlpha: 0
      })

      const unicornFoundersSectionHeadingSplitThree = new SplitText(
        unicornFoundersHeading[2],
        { type: "words" }
      );

      unicornFoundersTimeline.from(
        unicornFoundersSectionHeadingSplitThree.words,
        {
          autoAlpha: 0,
          y: 10,
          stagger: 0.05,
        }
      );

      unicornFoundersTimeline.from(unicornFoundersSection('.facts__section-content > div')[1], {
        autoAlpha: 0
      }, "<10%")

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

      /* PORTFOLIO SECTION (MOBILE) */
      const portfolioSection = gsap.utils.selector('.portfolio')
      gsap.from(portfolioSection('.portfolio-link__wrapper'), {
        y: 200,
        autoAlpha: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.portfolio-items',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          once: true
        }
      })


      /* OUR APPROACH (COMMUNITY, MOBILE) */
      const communitySection = gsap.utils.selector('.community')
      const communityTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.community',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          once: true
        }
      })

      communityTimeline.from(communitySection('.about__community-title'), {
        autoAlpha: 0
      })

      gsap.utils.toArray('.community .about-content__content > div').forEach(section => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 100,
          scrollTrigger: {
            trigger: section,
            end: '+=500',
            scrub: 1,
            once: true,
          }
        })
      })

      const faqSection = gsap.utils.selector('#faq-1')
      const faqTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#faq-1',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          once: true
        }
      })

      faqTimeline.from(faqSection('h2'), {
        autoAlpha: 0
      })

      faqTimeline.from(faqSection('.faq__faq-item'), {
        scaleY: 0,
        autoAlpha: 0,
        stagger: 0.05
      })

      const faqSection2 = gsap.utils.selector('#faq-2')
      const faqTimeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: '#faq-2',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          once: true
        }
      })

      faqTimeline2.from(faqSection2('h2'), {
        autoAlpha: 0
      })

      faqTimeline2.from(faqSection2('.faq__faq-item'), {
        scaleY: 0,
        autoAlpha: 0,
        stagger: 0.05
      })


      gsap.from('.line-immigrant-unicorn-founders path', {
        scrollTrigger: {
          start: 'top bottom-=400',
          trigger: '.line-immigrant-unicorn-founders',
        },
        drawSVG: 0
      })

      gsap.from('.line-portfolio-about--mobile path', {
        scrollTrigger: {
          start: 'top bottom-=400',
          trigger: '.line-portfolio-about--mobile',
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

      const menuLinks = gsap.utils.toArray('.header__mobile-menu [href*="#"]')
      menuLinks?.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const index = document.getElementById(link.hash.substring(1))
          header.classList.remove('show-mobile-menu')
          document.documentElement.style.overflow = ''
          window.scrollTo({ top: index.offsetTop, behavior: 'smooth' })
        })
      })

      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (e) => {
          const windowPos = window.pageYOffset || document.scrollTop || 0;

          Sections.forEach(section => {
            const sectionHeight = section.offsetHeight
            if (section.offsetTop + sectionHeight >= windowPos && section.offsetTop <= windowPos) {
              const currentBg = section.getAttribute('data-bg')
              header.style.color = currentBg === '#111111' ? '#ffffff' : '#111111'
            }
          })
        }
      })
    }
  }
);